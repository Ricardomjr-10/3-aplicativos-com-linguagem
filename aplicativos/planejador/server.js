const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Importa o banco de dados
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos



// Rotas (exemplos mais completos):


// Cadastrar usuário
app.post('/usuarios', (req, res) => { /* ... (mesmo código da resposta anterior) */ });

// Criar evento
app.post('/eventos', (req, res) => {
    const { nome, data, organizador_id } = req.body;
    db.run('INSERT INTO eventos (nome, data, organizador_id) VALUES (?, ?, ?)', [nome, data, organizador_id], function(err) {
        if (err) { /* ... */ }
        res.json({ id: this.lastID });
    });
});

// Registrar disponibilidade
app.post('/disponibilidades', (req, res) => {
  const { usuario_id, evento_id, data, disponivel } = req.body;
  db.run(`INSERT OR IGNORE INTO disponibilidades (usuario_id, evento_id, data, disponivel) VALUES (?, ?, ?, ?)`, [usuario_id, evento_id, data, disponivel], function(err) {
      if (err) { return res.status(500).json({ error: err.message }); }
      res.json({ message: "Disponibilidade registrada" });
  });
});

// Listar datas ideais (com lógica mais robusta)
app.get('/eventos/:id/datas-ideais', (req, res) => {
  const eventoId = req.params.id;
  db.all(`SELECT data, COUNT(usuario_id) AS disponiveis
          FROM disponibilidades
          WHERE evento_id = ? AND disponivel = 1
          GROUP BY data
          ORDER BY disponiveis DESC`, [eventoId], (err, rows) => {
      if (err) { /* ... */ }
      res.json(rows);
  });
});

// Adicionar tarefa
app.post('/tarefas', (req, res) => {
    const { evento_id, descricao, atribuido_a } = req.body;
    db.run('INSERT INTO tarefas (evento_id, descricao, atribuido_a) VALUES (?, ?, ?)', [evento_id, descricao, atribuido_a], function(err) {
      if (err) { return res.status(500).json({ error: err.message }); }
        res.json({ id: this.lastID });
    });
});


// Lembretes (exemplo com Nodemailer - configure suas credenciais)
const transporter = nodemailer.createTransport({
    // Suas configurações de email (ex: Gmail, Outlook)
    service: 'gmail',
    auth: {
        user: 'seu_email@gmail.com',
        pass: 'sua_senha'
    }
});

cron.schedule('0 0 * * *', () => { // Executa diariamente à meia-noite
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const dataAmanha = amanha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    db.all('SELECT * FROM eventos WHERE data = ?', [dataAmanha], (err, eventos) => {
        if (err) { /* ... */ }
        eventos.forEach(evento => {
            db.all('SELECT email FROM usuarios INNER JOIN disponibilidades ON usuarios.id = disponibilidades.usuario_id WHERE disponibilidades.evento_id = ? AND disponibilidades.disponivel = 1', [evento.id], (err, emails) => {
                if (err) { /* ... */ }
                const emailsArray = emails.map(email => email.email)
                const mailOptions = {
                    from: 'seu_email@gmail.com',
                    to: emailsArray.join(','),
                    subject: `Lembrete: ${evento.nome} é amanhã!`,
                    text: `Olá, este é um lembrete de que o evento ${evento.nome} será realizado amanhã, ${evento.data}.`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
        });
    });
});

app.listen(port, () => { /* ... */ })

