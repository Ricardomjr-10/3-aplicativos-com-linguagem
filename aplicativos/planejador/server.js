const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('eventos.db', (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados", err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            data TEXT NOT NULL,
            organizador_id INTEGER,
            FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS disponibilidades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            evento_id INTEGER,
            data TEXT NOT NULL,
            disponivel INTEGER, -- 1 para disponível, 0 para indisponível
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (evento_id) REFERENCES eventos(id)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            evento_id INTEGER,
            descricao TEXT NOT NULL,
            atribuido_a INTEGER,
            FOREIGN KEY (evento_id) REFERENCES eventos(id),
            FOREIGN KEY (atribuido_a) REFERENCES usuarios(id)
        )`);
    }
});

// Rotas da API (exemplo: cadastrar usuário)
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    db.run('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Outras rotas para eventos, disponibilidades e tarefas aqui...

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});