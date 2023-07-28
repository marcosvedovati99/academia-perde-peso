const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Aluno = sequelize.define('aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'aluno',
  timestamps: false,
});

module.exports = Aluno;
