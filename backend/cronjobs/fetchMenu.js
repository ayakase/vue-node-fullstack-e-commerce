const cron = require('node-cron');
const Region = require('../models/RegionModel')
const Category = require('../models/CategoryModel')
const Location = require('../models/LocationModel')
const client = require('../redisClient');
const updateMenu = require('../utils/updateMenu')


cron.schedule('0 * * * *', () => {
    updateMenu();
  });
  
// Category.findAll({
//     include: {
//         model: Region,
//         include: {
//             model: Location
//         }
//     }
// }).then((result) => {
//     client.set('menu', JSON.stringify(result), (err, reply) => {
//         if (err) {
//             console.error(err);
//         }
//         console.log(reply);
//     })
// })