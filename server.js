import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
/*import { default as agent } from 'skywalking-backend-js';*/
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicia o agente SkyWalking
/*agent.start({
  serviceName: 'PROJETOSHELLOWORLD::BACKEND-VUE',
  collectorAddress: 'IPDOSERVER:11800',
});*/

const app = express();
const port = 8092;

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors({ origin: true, credentials: true }));

// Headers CORS adicionais
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Serve o index.html do Vue
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log('CORS-enabled web server running');
});
