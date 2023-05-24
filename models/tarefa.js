var Sequelize = require("sequelize");

var Tarefa = function () {
 //conexao com banco de dados
 this.con = require('../config/conexao');
 //define uma tabela chamada tarefa com os campos indicados
 this.Modelo = this.con.define('tarefa', {
  descricao: {
   type: Sequelize.STRING,
   allowNull: false
  },
  data: {
   type: Sequelize.DATE,
   allowNull: true
  }
 });
 //importa o modelo pessoa
 var Pessoa = require('../models/pessoa');
 //associa o tarefa a pessoa
 //uma pessoa pode ter uma tarefa
 //this.Modelo.belongsTo(Pessoa.Modelo);
 //uma pessoa pode ter varias tarefas
 //no modelo Tarefa é criado um campo FK chamado pessoaId
 Pessoa.Modelo.hasMany(this.Modelo, {foreignKey: 'pessoaId', sourceKey: 'id'});
 //this.Modelo.belongsTo(Pessoa.Modelo, {foreignKey: 'pessoaId', targetKey: 'id'});

 this.setConexao = function (c) {
  this.con = c;
 };

 /**
  * cadastra os dados referentes 
  * @param {type} dados
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.cadastra = function (dados, cbSucesso, cbErro) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.create(dados).then(cbSucesso).catch(cbErro);
   });
  }
 };

 /**
  * altera os dados referentes ao modelo 
  * @param {type} dados 
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.altera = function (dados, cbSucesso, cbErro) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findOne({where: {id: dados.id}}).then(function (obj) {
     if (obj) {
      obj.update(dados).then(cbSucesso).catch(cbErro);
     }
    });
   });
  }
 };

 //recebe uma função para ter o retorno dos dados
 this.todos = function (funcao) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findAll().then(funcao);
   });
  }
 };

 //recebe um id para pesquisa e uma função para ter o retorno dos dados
 this.selecionaPorID = function (idC, funcao) {
  if (this.con != null) {
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.findOne({where: {id: idC}}).then(funcao);
   });
  }
 };

 /**
  * exclui uma tarefa pelo id 
  * @param {type} id
  * @param {type} cbSucesso função de callback a ser chamada em caso de sucesso
  * @param {type} cbErro função de callback a ser chamada em caso de erro
  * @return {undefined}
  */
 this.exclui = function (id, cbSucesso, cbErro) {
  if (this.con != null) {
   console.log('---> ' + id);
   var modelo = this.Modelo;
   this.con.sync().then(function () {
    modelo.destroy({
     where: {
      id: id
     }
    }).then(cbSucesso).catch(cbErro);
   });
  }
 };

};

module.exports = new Tarefa();