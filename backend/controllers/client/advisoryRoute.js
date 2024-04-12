const express = require('express');
const router = express.Router();
const Advisory = require('../../models/AdvisoryModel');
const Notification = require('../../models/NotificationModel');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const client = require('../../redisClient');

router.post('/', upload.none(), (req, res) => {
    const key = `advisory_limit:${req.ip}`;
    console.log(key);
    client.exists(key, (err, exists) => {
        if (err) {
            console.error('Redis error:', err);
            res.status(500).send('Internal Server Error');
        }
        if (exists) {
            client.incr(key, (err, count) => {
                if (err) {
                    console.error('Redis error:', err);
                    res.status(500).send('Internal Server Error');
                }
                if (count > 5) {
                    client.ttl(key, (err, ttl) => {
                        if (err) {
                            console.error('Error:', err);
                            return;
                        }
                        let timeLeft
                        if (ttl < 60) {
                            timeLeft = `${ttl} giây`
                        } else {
                            timeLeft = `${Math.round(ttl / 60)} phút`
                        }
                        res.status(429).send(`Quá nhiều yêu cầu, thử lại sau ${timeLeft}`);
                    });
                } else {
                    addToDatabase()
                }
            });
        } else {
            client.setex(key, 30, 1, (err) => {
                if (err) {
                    console.error('Redis error:', err);
                    res.status(500).send('Internal Server Error');
                }
                addToDatabase()
            });
        }
    })
    function addToDatabase() {
        Advisory.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            note: req.body.note,
            tour_id: req.body.tour_id
        })
            .then(() => {
                res.json("Yêu cầu thành công");
                let actionMessage = `Khách hàng <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.name} </span> đã yêu cầu tư vấn`;

                if (req.body.tour_title) {
                    actionMessage += ` tour <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.tour_title} </span>`;
                }

                Notification.create({
                    action: actionMessage
                });


            }).catch((err) => {
                console.error(err)
            })
    }
});
module.exports = router;
