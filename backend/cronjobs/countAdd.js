const cron = require('node-cron');
const Count = require("../models/CountModel");
const client = require('../redisClient');

cron.schedule('*/15 * * * * *', () => {
    client.get('count', (err, value) => {
        if (err) {
            console.error("Error occurred:", err);
        } else {
            console.log(value);
            Count.increment('count', { by: parseInt(value), where: { id: 1 } }).then(() => {
                client.set('count', 0)
            }).catch((err) => {
                console.log("Error occurred:", err)
            })
        }
    })
});
module.exports = cron;