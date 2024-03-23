const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
router.get('/:orderby/:order/:page', (req, res) => {
    Tour.findAndCountAll({
        where: { isdiscount: 1 },
        include: {
            model: Location,
            required: true,
            include: {
                model: Region,
                required: true,
                include: {
                    model: Category,
                    required: true
                }
            }
        },
        order: [[req.params.orderby, req.params.order]],
        limit: 10,
        offset: (req.params.page - 1) * 10
    }).then((result) => {
        const { count, rows } = result;
        res.send(result)
    }).catch((error) => {
        console.error(error);
    })
})

module.exports = router;