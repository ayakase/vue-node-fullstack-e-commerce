const express = require('express');
const router = express.Router();
const Order = require('../../models/OrderModel');
const Tour = require('../../models/TourModel')
const { Op } = require('sequelize');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:order/:state/:page', (req, res) => {
    Order.findAndCountAll({
        where: {
            solved: req.params.state,
            name: {
                [Op.like]: `%${req.query.keyword}%`,
            },
        },
        order: [["createdAt", req.params.order]],
        limit: 10,
        include: {
            model: Tour,
            attributes: ['title', 'slug']
        },
        offset: (req.params.page - 1) * 10
    }).then((result) => {
        const { count, rows } = result;
        res.send(result)
    }).catch((error) => {
        console.error(error);
    })
})
router.put('/:id', (req, res) => {
    Order.findOne({
        where: { id: req.params.id }
    }).then((result) => {
        if (result.solved == 0) {
            Order.update({
                solved: 1
            },
                {
                    where: { id: req.params.id }
                }).then((result) => {
                    res.sendStatus(200)

                }).catch((error) => {
                    console.error(error);
                })
        } else {
            Order.update({
                solved: 0
            },
                {
                    where: { id: req.params.id }
                },
            ).then((result) => {
                res.sendStatus(200)

            }).catch((error) => {
                console.error(error);
            })
        }
    })
});
module.exports = router;
