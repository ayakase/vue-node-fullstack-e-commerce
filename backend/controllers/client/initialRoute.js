const express = require('express');
const router = express.Router();
const Tour = require('../../models/TourModel')
const Category = require('../../models/CategoryModel');
const Region = require('../../models/RegionModel');
const Location = require('../../models/LocationModel');
const Count = require("../../models/CountModel");
const client = require('../../redisClient');

router.post("/count", (req, res) => {
    client.incr("count", (err, value) => {
        if (err) {
            console.error('Error incrementing key:', err);
        } else {
            console.log(`value ${value}`);
        }
    })
});
router.get("/connect", (req, res) => {
    res.send("Connected to Backend");
});
router.get('/menu', (req, res) => {
    Category.findAll({
        include: {
            model: Region,
            include: {
                model: Location
            }
        }
    }).then((result) => {
        res.send(result)
    })
})
module.exports = router;
