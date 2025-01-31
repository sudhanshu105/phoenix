const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index.js'); // Import the sequelize instance from index.js

class Gadget extends Model {}

Gadget.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    defaultValue: 'Available',
  },
}, {
  sequelize, // Use the imported sequelize instance
  modelName: 'Gadget',
});

module.exports = Gadget;
