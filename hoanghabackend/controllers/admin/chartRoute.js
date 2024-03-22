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
        // where: {
        //     createdAt: {
        //         [Op.gte]: sequelize.literal('CURRENT_DATE - INTERVAL 7 DAY')
        //     }
        // },
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
module.exports = router;
