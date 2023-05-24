'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
 var Pessoa = require('../models/pessoa');
 Pessoa.todos(function (pessoas) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(pessoas));
 });
});

router.get('/:id', function (req, res) {
 var Pessoa = require('../models/pessoa');
 var idConsulta = req.params.id;
 Pessoa.selecionaPorID(idConsulta, function (pessoa) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(pessoa));
 });
});

router.get('/:id/tarefa', function (req, res) {
 var Pessoa = require('../models/pessoa');
 var idConsulta = req.params.id;
 Pessoa.selecionaTarefas(idConsulta, function (tarefas) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(tarefas));
 });
});

router.post('/', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Pessoa = require('../models/pessoa');
 Pessoa.cadastra({
  nome: req.body.nome, //aqui são indicados os campos usados no swagger para passagem de valores
 }, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Inserido com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

router.put('/', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Pessoa = require('../models/pessoa');
 Pessoa.altera({
  id: req.body.id,
  nome: req.body.nome
 }, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Alterado com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

router.delete('/:id', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Pessoa = require('../models/pessoa');
 Pessoa.exclui(req.params.id, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Excluído com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

module.exports = router;
