// ==========================
// Configuração SkyWalking AGENT
// ==========================
const { default: agent } = require('skywalking-backend-js');
agent.start({
	serviceName: 'NOMEDOGRUPO::NOMEDOSERVICO', // nome do serviço no SkyWalking
	collectorAddress: 'ipdoservidor:11800',     // substitua pelo IP real do SkyWalking
});

// ==========================
// Dependências principais
// ==========================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

// ==========================
// Inicialização do app
// ==========================
const app = express();
const port = 8092;

// ==========================
// Middlewares
// ==========================
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Headers CORS extras (compatibilidade total)
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
const db = mysql.createConnection({
  host: 'localhost',
  user: 'usuario do banco criado',
  password: 'senha do banco',
  database: 'projetovue'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso!');
  }
});

// ==========================
// Rotas da API para o Vue
// ==========================

// Pega todos os comentários
app.get('/api/comments', (req, res) => {
  db.query('SELECT * FROM comentarios ORDER BY id DESC', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Adiciona novo comentário
app.post('/api/comments', (req, res) => {
  const { name, message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem é obrigatória.' });
  }

  db.query(
    'INSERT INTO comentarios (name, message) VALUES (?, ?)',
    [name || null, message],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, message });
    }
  );
});

// Exclui comentário
app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM comentarios WHERE id = ?', [id], err => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
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
  console.log(`Server listening on port ${port}`);
  console.log('CORS-enabled web server running');
});

