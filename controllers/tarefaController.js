'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
 var Tarefa = require('../models/tarefa');
 Tarefa.todos(function (tarefas) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(tarefas));
 });
});

router.get('/:id', function (req, res) {
 var Tarefa = require('../models/tarefa');
 var idConsulta = req.params.id;
 Tarefa.selecionaPorID(idConsulta, function (tarefa) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(tarefa));
 });
});

router.post('/', function (req, res) {
 var mess = {
  mensagem: ''
 };
 var Tarefa = require('../models/tarefa');
 Tarefa.cadastra({
  descricao: req.body.descricao,//aqui são indicados os campos usados no swagger para passagem de valores
  data: req.body.data,
  pessoaId: req.body.pessoaId
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
 var Tarefa = require('../models/tarefa');
 Tarefa.altera({
  id: req.body.id,
  descricao: req.body.descricao,
  data: req.body.data,
  pessoaId: req.body.pessoaId
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
 var Tarefa = require('../models/tarefa');
 Tarefa.exclui(req.params.id, () => { //essa é a função para passar uma mensagem de aviso que executou ok
  mess.mensagem = 'Excluído com sucesso';
  res.send(mess);
 }, (erro) => { //essa é a função para passar uma mensagem de erro
  mess.mensagem = 'Ocorreu um erro: ' + erro;
  res.send(mess);
 });
});

module.exports = router;
