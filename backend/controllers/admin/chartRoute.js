const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { Op } = require('sequelize');

const Order = require("../../models/OrderModel");
const Advisory = require("../../models/AdvisoryModel");
router.get("/day", (req, res) => {
    Order.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('createdAt')), 'day'],
            [sequelize.fn('count', sequelize.col('*')), 'order_count']
        ],
        group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
        limit: 7,
        // offset: 1,
        order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'DESC']]
    })
        .then(result => {
            result.forEach(element => {
            });
            res.send(result)
        })
        .catch(err => {
            console.error('Error:', err);
        });
});
router.get("/revenue", (req, res) => {
    Order.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('createdAt')), 'day'],
            [sequelize.fn('sum', sequelize.col('price')), 'sum']
        ],
        group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
        limit: 7,
        // offset: 1,
        order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'DESC']]
    })
        .then(result => {
            result.forEach(element => {
            });
            res.send(result)
        })
        .catch(err => {
            console.error('Error:', err);
        });
});
router.get("/cancel-rate", async (req, res) => {
    let paid = await Order.count({
        where: {
            paid: true
        }
    })
    let cancel = await Order.count({
        where: {
            paid: false
        }
    })
    console.log(paid, cancel)
    res.json({paid: paid, cancel: cancel})
})
router.get("/guest", async (req, res) => {
    try {
        const [sumAdult, sumTeenager, sumChildren, sumInfant] = await Promise.all([
            Order.sum("adult"),
            Order.sum("teenager"),
            Order.sum("children"),
            Order.sum("infant")
        ]);
        res.json({
            adult: sumAdult,
            teenager: sumTeenager,
            children: sumChildren,
            infant: sumInfant
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while calculating sums.");
    }
});
module.exports = router;
