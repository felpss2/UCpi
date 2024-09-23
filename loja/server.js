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

app.post('/produtos,', (req, res) => {
    const { nome, descricao, preco } = req.body;
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
    connection.query('SELECT * FROM produtos', (error, results) => {
        if (error) {
            res.status(500).send('Erro ao obter usuário.');
            return;
        }
        res.json(results[0]);
    });
});

// Endpoint para obter um produto por ID (GET)

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT FROM produtos WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error ao obter usuário.');
            return;
        }
        res.json(results[0]);
    });
});

// Endpoint para atualizar um produto (PUT)

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
    connection.query(sql, [nome, descricao, preco, id], (error, results) => {
        if (error) {
            res.status(500).send('Error ao atualizar produto.');
            return;
        }
        res.send('Produto atualizado com sucesso.');
    });
});

// Endpoint para deletar um produto (DELETE)
app.delete('/produtos/:id', (req, res) => {
    const { id } =  req.params;
    connection.query('DELETE FROM produtos WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Erro ao deletar produto.');
            return;
        }
        res.send('Produto deletado com sucesso.');
    });
});

//Iniciar o servidor

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
