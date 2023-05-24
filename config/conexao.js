//carrega o ORM
var sequelize = require("sequelize");

var Conexao = function () {
  //inicia o arquivo de banco de dados
  this.conexao = new sequelize("null", "null", "null", {
    //passa null para usuario, senha e ip
    dialect: "sqlite",
    storage: "bdtarefas.sqlite",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log, 
  });
};

module.exports = new Conexao().conexao;
