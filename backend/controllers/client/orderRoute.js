const express = require('express');
const router = express.Router();
const Order = require('../../models/OrderModel');
const Notification = require('../../models/NotificationModel')
const Tour = require('../../models/TourModel')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const client = require('../../redisClient');

router.post('/', upload.none(), (req, res) => {
    const key = `rate_limit:${req.ip}`;
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
            client.setex(key, 120, 1, (err) => {
                if (err) {
                    console.error('Redis error:', err);
                    res.status(500).send('Internal Server Error');
                }
                addToDatabase()
            });
        }
    })
    function addToDatabase() {
        // console.log('add to database')
        // res.status(200).send('Added')
        Order.create({
            tour_id: req.body.tourId,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            note: req.body.note,
            adult: req.body.adult,
            teenager: req.body.teenager,
            children: req.body.children,
            infant: req.body.infant,
            price: req.body.price,
        })
            .then(() => {
                res.status(200).send("Đặt tour thành công, hãy đợi chúng tôi liên lạc lại");
                Tour.increment('order_count', { by: 1, where: { id: req.body.tourId } })
                Notification.create({
                    action: `Khách hàng <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.name} </span> đã đặt tour  <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.tourTitle} </span>`
                })

            }).catch((err) => {
                console.error(err)
            })
    }

});
module.exports = router;
