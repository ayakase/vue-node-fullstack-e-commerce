const cron = require('node-cron');
const Region = require('../models/RegionModel')
const Category = require('../models/CategoryModel')
const Location = require('../models/LocationModel')
const client = require('../redisClient');
cron.schedule('0 */4 * * *', () => {
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
            console.log(reply);
        })
    })
});