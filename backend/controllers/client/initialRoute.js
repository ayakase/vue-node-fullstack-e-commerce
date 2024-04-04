const express = require('express');
const router = express.Router();
const Category = require('../../models/CategoryModel');
const Region = require('../../models/RegionModel');
const Location = require('../../models/LocationModel');
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
    client.exists('menu', (err, result) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        if (result === 1) {
            console.log(`exist in ređis`);
            client.get('menu', (err, result) => {
                res.send(JSON.parse(result));
            })
        } else {
            console.log(`does not exist in redis`);
            Category.findAll({
                include: {
                    model: Region,
                    include: {
                        model: Location
                    }
                }
            }).then((result) => {
                client.set('menu', JSON.stringify(result), (err, reply) => {
                    if (err) {
                        console.error(err);
                    }
                })
                res.send(result)
            })
        }
    });

})
module.exports = router;
