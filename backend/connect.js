require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_SERVER,
    dialect: 'mysql',
    port: process.env.SQL_PORT,
    logging: false
});
(async function authenticateWithRetry() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        console.log('Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await authenticateWithRetry();
    }
})()

module.exports = sequelize;


