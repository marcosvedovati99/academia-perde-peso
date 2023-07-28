const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Aluno = require('./Aluno');
const Professor = require('./Professor');

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_professor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_avaliacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  altura: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
}, {
  tableName: 'avaliacao',
  timestamps: false,
});

// Definindo as associações
Avaliacao.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Avaliacao.belongsTo(Professor, { foreignKey: 'id_professor' });

module.exports = Avaliacao;
