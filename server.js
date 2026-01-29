/**
 * server.js — versão FINAL funcional
 * - SkyWalking tolerante a falha (não trava app)
 * - MySQL funcionando (select / insert / delete)
 * - PM2 safe
 * - Vue SPA servida pelo dist
 * - Ultima atualização: 29/01/2026
 */

// ==========================
// Configuração SkyWalking AGENT
// ==========================
const { default: agent } = require('skywalking-backend-js');
agent.start({
  serviceName: 'PROJETOSHELLOWORLD::BACKEND-VUE', // nome do serviço no SkyWalking
  collectorAddress: '10.0.28.209:11800', // substitua pelo IP do servidor aonde roda o Skywalking
});

// ==========================
// Dependências principais
// ==========================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2/promise');

// ==========================
// Inicialização do app
// ==========================
const app = express();
const port = 8092;

// ==========================
// Middlewares
// ==========================
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// ==========================
// Conexão com o MySQL
// ==========================
const db = mysql.createPool({
  host: 'localhost',
  user: 'skywalking',
  password: 'skywalking',
  database: 'projetovue',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// Teste inicial
(async () => {
  try {
    const conn = await db.getConnection();
    console.log('MySQL conectado com sucesso');
    conn.release();
  } catch (err) {
    console.error('Erro MySQL:', err.message);
  }
})();

// ==========================
// Rotas da API para o Vue
// ==========================

// Pega todos os comentários (LISTAR)
app.get('/api/comments', async (req, res) => {
  try {
    const [rows] = await db.query(
        "SELECT id, name, message, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i') AS created_at FROM comentarios ORDER BY id DESC"
        );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

// Adiciona novo comentário (INSERIR)
app.post('/api/comments', async (req, res) => {
  const { name, message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem obrigatória' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO comentarios (name, message) VALUES (?, ?)',
      [name || null, message]
    );

    res.json({
      id: result.insertId,
      name,
      message,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao inserir comentário' });
  }
});

// Exclui comentário (DELETAR)
app.delete('/api/comments/:id', async (req, res) => {
  try {
    await db.query(
      'DELETE FROM comentarios WHERE id = ?',
      [req.params.id]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar comentário' });
  }
});

// Simulação de Erro: Latência
app.get('/api/simulate-latency', async (req, res) => {
        setTimeout(() => {
                res.json({ message: 'Resposta com atraso de 5 segundos.'});
        }, 5000); // Setando valor desejado
});

// Simulação de Erro: Processamento de dados
app.get('/api/simulate-processing-error', (req, res) => {
        try{
                //Simula erro de JSON malformado
                JSON.parse('{"invalidJson": }');
                res.json({ message: 'Isso não deveria parecer :(.'});
        } catch (err) {
                res.status(500).json({ error: 'Erro de processamento simulado.'});
        }
});

// Simulação de Erro: Adiciona novo comentário
app.post('/api/comments/erro', (req, res) => {
  const { name, message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem é obrigatória.' });
  }

  db.query(
    'INSERT INTO TESTE (name, message) VALUES (?, ?)',
    [name || null, message],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, message });
    }
  );
});

// ==========================
// Rota padrão para o Vue (SPA)
// ==========================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================
// Inicialização do servidor
// ==========================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
