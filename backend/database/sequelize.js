const { Sequelize } = require('sequelize');

const database = 'projetodb1';
const user = 'root';
const password = '';

const sequelize = new Sequelize (
  database,
  user,
  password,
  {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    define: {
      timestamps: false
    }
  }
);


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
  }) .catch(err => {
    console.log('Erro ao conectar com o banco de dados: ', err);
  });


module.exports = sequelize;