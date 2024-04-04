const Region = require('../models/RegionModel')
const Category = require('../models/CategoryModel')
const Location = require('../models/LocationModel')
const client = require('../redisClient');
function updateMenu() {
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
}
module.exports = updateMenu 