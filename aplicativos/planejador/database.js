const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('eventos.db');

db.serialize(() => { // Serializa as operações para evitar concorrência
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (...)`); // (mesmo código de criação de tabelas da resposta anterior)
    db.run(`CREATE TABLE IF NOT EXISTS eventos (...)`);
    db.run(`CREATE TABLE IF NOT EXISTS disponibilidades (...)`);
    db.run(`CREATE TABLE IF NOT EXISTS tarefas (...)`);
});

module.exports = db; // Exporta o objeto do banco de dados