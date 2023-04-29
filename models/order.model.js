const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Order = db.define('orders', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },

  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Order;
