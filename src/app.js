const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão com MySQL
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

// Rota: Listar todos os projetos
app.get('/', (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.render('index', { projetos: results });
    });
});

// Rota: Formulário novo projeto
app.get('/projetos/novo', (req, res) => {
    res.render('new');
});

// Rota: Criar projeto
app.post('/projetos', (req, res) => {
    const { nome, descricao, repositorio, video, tecnologias } = req.body;
    const sql = 'INSERT INTO projetos (nome, descricao, repositorio, video, tecnologias) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, descricao, repositorio, video, tecnologias], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

// Rota: Formulário de edição
app.get('/projetos/editar/:id', (req, res) => {
    db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send('Projeto não encontrado');
        res.render('edit', { projeto: result[0] });
    });
});

// Rota: Atualizar projeto
app.post('/projetos/editar/:id', (req, res) => {
    const { nome, descricao, repositorio, video, tecnologias } = req.body;
    const sql = 'UPDATE projetos SET nome = ?, descricao = ?, repositorio = ?, video = ?, tecnologias = ? WHERE id = ?';
    db.query(sql, [nome, descricao, repositorio, video, tecnologias, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});


// Rota: Excluir projeto
app.get('/projetos/excluir/:id', (req, res) => {
    db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
