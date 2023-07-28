const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Classificacao = sequelize.define('Classificacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  faixa_1: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  faixa_2: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'classificacao',
  timestamps: false,
});

module.exports = Classificacao;
