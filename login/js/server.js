const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const SECRET_KEY = 'faz_o_l'; // Troque para um segredo seguro


app.use(cors(/*{
    origin: 'http://127.0.0.1:5500'
}*/ ));


app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // Compara a senha fornecida com o hash armazenado no banco
            const match = await bcrypt.compare(password, results[0].password);

            if (match) {
                res.sendStatus(200); // Login bem-sucedido
            } else {
                res.status(401).send('Credenciais inválidas');
            }
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
});


app.post('/register', async (req, res) => {
    const { email, password } = req.body;


    // Gera o hash da senha com um salt de 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).send('Usuário já existe');
        }

        // Insere o email e a senha criptografada no banco de dados
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
            if (err) throw err;
            res.sendStatus(201); // Usuário registrado com sucesso
        } );

    });

});





app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
