const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('eventos.db');

db.serialize(() => { // Usar db.serialize garante a ordem de execução
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela usuarios:", err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS eventos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        data TEXT,
        organizador_id INTEGER,
        FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela eventos:", err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS disponibilidades (
        usuario_id INTEGER,
        evento_id INTEGER,
        data TEXT,
        disponivel INTEGER,
        PRIMARY KEY (usuario_id, evento_id, data),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (evento_id) REFERENCES eventos(id)
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela disponibilidades:", err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        evento_id INTEGER,
        descricao TEXT,
        atribuido_a INTEGER,
        FOREIGN KEY (evento_id) REFERENCES eventos(id),
        FOREIGN KEY (atribuido_a) REFERENCES usuarios(id)
    )`, (err) => {
        if (err) {
            return console.error("Erro ao criar tabela tarefas:", err.message);
        }
    });
});

// db.serialize(() => { // Serializa as operações para evitar concorrência
//     db.run(`CREATE TABLE IF NOT EXISTS usuarios (...)`); // (mesmo código de criação de tabelas da resposta anterior)
//     db.run(`CREATE TABLE IF NOT EXISTS eventos (...)`);
//     db.run(`CREATE TABLE IF NOT EXISTS disponibilidades (...)`);
//     db.run(`CREATE TABLE IF NOT EXISTS tarefas (...)`);
// });

module.exports = db; // Exporta o objeto do banco de dados