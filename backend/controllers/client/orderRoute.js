const express = require('express');
const router = express.Router();
const Order = require('../../models/OrderModel');
const Notification = require('../../models/NotificationModel')
const Tour = require('../../models/TourModel')
const sendEmail = require('../../utils/sendEmail');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const client = require('../../redisClient');
const DOMAIN = process.env.FE_LOCAL_URL
const PayOS = require("@payos/node");
const payos = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);

router.post('/', upload.none(), async (req, res) => {
    console.log(req.body.date + 'date');
    let orderId = generateRandomString()
    Order.create({
        tour_id: req.body.tourId,
        order_id: orderId,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        note: req.body.note,
        adult: req.body.adult,
        teenager: req.body.teenager,
        children: req.body.children,
        infant: req.body.infant,
        price: req.body.price,
        date: req.body.date,
    })
        .then(async (result) => {
            console.log(`return: ${result.order_id}`)
            Notification.create({
                action: `Khách hàng <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.name} </span> đã đặt tour  <span style="color: rgb(255, 98, 0);font-weight: bold;">${req.body.tourTitle} </span>`
            })
            try {
                const order = {
                    amount: req.body.price,
                    description: 'Thanh toán đơn hàng',
                    orderCode: result.order_id,
                    returnUrl: `${DOMAIN}/thanh-cong`,
                    cancelUrl: `${DOMAIN}/that-bai`
                }
                const paymentLink = await payos.createPaymentLink(order)
                res.json({ url: paymentLink.checkoutUrl })
            } catch (err) {
                console.error(err)
                res.status(500);
            }
        }).catch((err) => {
            console.error(err)
        })
});
router.get('/transaction', upload.none(), (req, res) => {
    Tour.findOne({
        where: {
            id: 3
        }
    }).then((results) => {
        console.log(results.title)
        // sendEmail(
        //     'an', '123123', '24124124', '19279124', 'sldfnwle', '120480120', '239rn23', '123lfe', '123'
        // )
    }).catch((err) => {
        console.error(err)
    })

    res.send('a')
})
router.post('/transaction', upload.none(), async (req, res) => {

    console.log(req.body)
    try {
        const order = await Order.findOne(({
            where: { order_id: req.body.data.orderCode.toString() },
            include: {
                model: Tour,
                attributes: ['title', 'slug']
            }
        }))
        console.log(order.name)
        let detail = `${order.adult || 0} người lớn, ${order.teenager || 0} trẻ em (Từ 6 - 10 tuổi), ${order.children || 0} trẻ em (Từ 2 - 5 tuổi), ${order.infant || 0} trẻ em (Dưới 2 tuổi)`;
        await sendEmail(
            order.name, order.phone, order.order_id, req.body.data.transactionDateTime, order.Tour.title, order.price, detail, order.note, order.date
        )
        await Order.update({
            paid: true
        }, {
            where: { order_id: req.body.data.orderCode.toString() },
        })
        // await Tour.increment('order_count', { by: 1, where: { id: req.body.data.orderCode.toString() } })
        res.json()
    } catch (e) {
        console.error(e)
    }

});
function generateRandomString() {
    return Date.now();
}
// async function transaction() {
//     try {
//         const order = {
//             amount: 5000,
//             description: 'Thanh toán đơn hàng',
//             orderCode: Math.floor(Math.random() * 900) + 100,
//             returnUrl: `${DOMAIN}/success.html`,
//             cancelUrl: `${DOMAIN}/cancel.html`
//         }
//         const paymentLink = await payos.createPaymentLink(order)
//         res.send(paymentLink.checkoutUrl)
//     } catch (err) {
//         console.error(err)
//         res.status(500).send('Lỗi gì đấy idk');
//     }
// }
module.exports = router;
