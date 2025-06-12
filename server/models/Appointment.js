const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Appointment = sequelize.define('Appointment', {
  title: DataTypes.STRING,
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  description: DataTypes.TEXT
});

module.exports = Appointment;