const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parcer');
const { Connection } = require('mysql2/typings/mysql/lib/Connection');

const app = express();
app.use(bodyParser.json());

// configuração da conexão com o banco de dados

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passoword: '', // Senha padrão é vazia
    database: 'loja'
});

// Conectar ao banco de dados

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ' + error.stack);
        return;
    }
    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
})

// Endpoint para adicionar um produto (POST)

app.post('/produtos,',(req, res) => {
    const {nome, descricao, preco} = req.body;
    const sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?,?,?)';

    connection.query(sql, [nome, descricao, preco], (error, results) => {
       if (error) {
        res.status(500).send('Erro ao adicionar produto.');
        return;
       }
       res.status(201).send('Produto adicionado com sucesso.');
    });

});

// Endpoint para obter todos os produtos (GET)

app.get('/produtos', (req, res) => {

    
})