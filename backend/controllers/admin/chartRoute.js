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
        limit: 10,
        // offset: 1,
        order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'DESC']]
    })
        .then(result => {
            result.forEach(element => {
                console.log(element.dataValues)
            });
            res.send(result)
        })
        .catch(err => {
            console.error('Error:', err);
        });
    console.log("request")
});
router.get("/revenue", (req, res) => {
    Order.findAll({
        attributes: [
            [sequelize.fn('DATE', sequelize.col('createdAt')), 'day'],
            [sequelize.fn('sum', sequelize.col('price')), 'sum']
        ],
        group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
        limit: 10,
        // offset: 1,
        order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'DESC']]
    })
        .then(result => {
            result.forEach(element => {
                console.log(element.dataValues)
            });
            res.send(result)
        })
        .catch(err => {
            console.error('Error:', err);
        });
    console.log("request")
});
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
