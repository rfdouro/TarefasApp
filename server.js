'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//const router = express.Router();

//abre os repositórios e cria uma conexão simples
//isso é para sincronizar - atualizar - o schema de banco de dados
require('./models/pessoa');
require('./models/tarefa');
const con = require("./config/conexao");
con.sync({alter: true}).then(function (r) {
 console.log(r);
 console.log("Modelos sincronizados");
});

//Carrega as rotas
const indexRoute = require('./controllers/indexController');
const pessoaRoute = require('./controllers/pessoaController');
const tarefaRoute = require('./controllers/tarefaController');

//app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true})); // usado para parsing de um form application/x-www-form-urlencoded
app.use(bodyParser.json()); // usado para fazer parsing de um application/json
// adiciona headers para liberar o 'consumo' do ws
app.use(function (req, res, next) {
 // website que deseja permitir a conexão
 //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
 res.setHeader('Access-Control-Allow-Origin', '*');
 // métodos de requisição que deseja permitir
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 // solicita os cabeçalhos de requisição que deseja permitir
 //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 // coloca como verdadeiro se precisar que o website inclua cookies na requisição 
 // e envie até a API (no caso de usar session)
 res.setHeader('Access-Control-Allow-Credentials', true);
 // passa oara o próximo quadro do middleware
 next();
});

//define as rotas
app.use('/', indexRoute);
app.use('/pessoa', pessoaRoute);
app.use('/tarefa', tarefaRoute);

module.exports = app;
