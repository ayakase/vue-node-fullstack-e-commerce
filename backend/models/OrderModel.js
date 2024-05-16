const sequelize = require('../connect');
const { DataTypes } = require('sequelize');
const Tour = require('./TourModel');
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.STRING,
    },
    tour_id: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    adult: {
        type: DataTypes.INTEGER
    },
    teenager: {
        type: DataTypes.INTEGER
    },
    children: {
        type: DataTypes.INTEGER
    },
    infant: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER(11)
    },
    date: {
        type: DataTypes.DATEONLY
    },
    note: {
        type: DataTypes.STRING(255)
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    solved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})
Tour.hasMany(Order, { foreignKey: 'tour_id' });
Order.belongsTo(Tour, { foreignKey: 'tour_id' });
module.exports = Order;
