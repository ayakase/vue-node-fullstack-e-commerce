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

router.post('/', upload.none(), (req, res) => {
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
            res.json("done");
            Tour.increment('order_count', { by: 1, where: { id: req.body.tourId } })
            Notification.create({
                action: `Khách hàng <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.name} </span> đã đặt tour  <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.tourTitle} </span>`
            })

        }).catch((err) => {
            console.error(err)
        })

});
module.exports = router;
