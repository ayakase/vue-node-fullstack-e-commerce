const express = require('express');
const Tour = require('../../models/TourModel')
const router = express.Router();
const Advisory = require('../../models/AdvisoryModel');
const { Op } = require('sequelize');

router.get('/:order/:state/:page', (req, res) => {
    Advisory.findAndCountAll({
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
    console.log(req.params.id)
    Advisory.findOne({
        where: { id: req.params.id }
    }).then((result) => {
        if (result.solved == 0) {
            Advisory.update({
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
            Advisory.update({
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
