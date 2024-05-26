const express = require('express');
const router = express.Router();
const Tour = require('../../models/TourModel')
const Category = require('../../models/CategoryModel');
const Region = require('../../models/RegionModel');
const Location = require('../../models/LocationModel');
const { Op } = require('sequelize');

router.get('/:location/:orderby/:order/:page', (req, res) => {
    const isHot = req.query.isHot === 'true'
    const isDiscount = req.query.isDiscount === 'true'
    const priceRange = req.query.priceRange
    let whereClause = {
        title: {
            [Op.like]: `%${req.query.keyword}%`,
        },
        days: {
            [Op.between]: [req.query.minDay, req.query.maxDay]
        }
    };
    if (priceRange > 0) {
        if (priceRange == 1) {
            whereClause.adult_price = {
                [Op.lt]: 2000000
            }
        }
        if (priceRange == 2) {
            whereClause.adult_price = {
                [Op.and]: [
                    { [Op.gt]: 2000000 },
                    { [Op.lt]: 5000000 }
                ]
            }
        }
        if (priceRange == 3) {
            whereClause.adult_price = {
                [Op.and]: [
                    { [Op.gt]: 5000000 },
                    { [Op.lt]: 8000000 }
                ]
            }
        }
        if (priceRange == 4) {
            whereClause.adult_price = {
                [Op.gt]: 8000000
            }
        }
    }
    if (isHot && isDiscount) {
        whereClause[Op.and] = [{ ishottour: true }, { isdiscount: true }];
    } else {
        if (isHot) {
            whereClause.ishottour = true;
        }
        if (isDiscount) {
            whereClause.isdiscount = true;
        }
    }
    if (req.query.tourType.length > 0) {
        whereClause.tourtype = req.query.tourType
    }
    Tour.findAndCountAll({
        include: {
            model: Location,
            required: true,
            where: {
                slug: req.params.location,
            },
            include: {
                model: Region,
                required: true,
                include: {
                    model: Category,
                }
            }
        },
        attributes: { exclude: ['images', 'special', 'bonus', 'priceservice', 'visa', 'detail', 'guide'] },
        order: [[req.params.orderby, req.params.order]],
        limit: 10,
        where: whereClause,
        // separate: true,
        offset: (req.params.page - 1) * 10
    }).then((result) => {
        const { count, rows } = result;
        res.send(result)
    })
        .catch((error) => {
            console.error(error);
        })
})
router.get('/name/:location', (req, res) => {
    Location.findOne({
        where: {
            slug: req.params.location,
        },
    }).then((result) => {
        res.send(result)
    })
})

module.exports = router;
