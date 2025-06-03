const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// Conexão com o banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portfolio'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rota de projetos para exibir no navegador
app.get('/projetos', (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.render('projetos', { projetos: results });
    });
});

// Inicia servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
