var cron = require('node-cron');
const Count = require("../models/CountModel");

cron.schedule('*/1 * * * * *', () => {
    console.log('cron executed');
    Count.increment('count', { by: 1, where: { id: 1 } })
});
module.exports = cron;