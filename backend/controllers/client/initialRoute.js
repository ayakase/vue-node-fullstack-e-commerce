const express = require('express');
const router = express.Router();
const Category = require('../../models/CategoryModel');
const Region = require('../../models/RegionModel');
const Location = require('../../models/LocationModel');
const client = require('../../redisClient');

router.post("/count", (req, res) => {
    client.exists('count', (err, result) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        if (result === 1) {
            client.incrby("count", 7, (err, value) => {
                if (err) {
                    console.error('Error incrementing key:', err);
                } else {
                    console.log(`count: ${value}`);
                }
            })
        } else {
            console.log('no count in redis')
            client.set('count', 1)
        }
    });

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
            console.log(`menu exist in ređis`);
            client.get('menu', (err, result) => {
                res.send(JSON.parse(result));
            })
        } else {
            console.log(`no menu in redis`);
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
