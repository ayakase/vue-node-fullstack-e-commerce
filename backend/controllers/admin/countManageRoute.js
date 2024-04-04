const express = require("express");
const router = express.Router()
const Count = require("../../models/CountModel");
const Order = require("../../models/OrderModel");
const Advisory = require("../../models/AdvisoryModel");
router.get("/view", (req, res) => {
    Count.findOne({
        where: { id: 1 }
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.error(err);
    });
});
router.get("/order", (req, res) => {
    Order.count().then((count) => {
        res.send(count.toString());
    }).catch((err) => {
        console.log(err)
    })
})
router.get("/advisory", (req, res) => {
    Advisory.count().then((count) => {
        res.send(count.toString());
    }).catch((err) => {
        console.log(err)
    })
})
router.get("/revenue", (req, res) => {
    Order.sum("price").then((sum) => {
        res.send(sum.toString());
    }).catch((err) => {
        console.log(err)
    })
})
router.get("/advise", (req, res) => {
    Advisory.count().then((count) => {
        res.send(count.toString());
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;
