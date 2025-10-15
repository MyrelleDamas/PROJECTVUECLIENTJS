// Configuracao SkyWalking AGENT

const { default: agent } = require('skywalking-backend-js');
agent.start({
  serviceName: 'GMMI::TESTE-NODE-VUE-MANUAL', // nome do serviço no SkyWalking
  collectorAddress: 'ipdoservidor:11800',     // substitua pelo IP real do SkyWalking
});

// ==========================
// Dependencias principais
// ==========================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// ==========================
// Configuracao do servidor
// ==========================
const app = express();
const port = 8092;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Headers CORS extras (garante compatibilidade total)
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
// Rota padrao para o Vue
// ==========================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ==========================
// Inicializacao
// ==========================
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log('CORS-enabled web server running');
});
