const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Professor = sequelize.define('nome', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'professor',
  timestamps: false,
});

module.exports = Professor;