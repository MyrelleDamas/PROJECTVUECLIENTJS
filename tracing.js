const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');

// Configura o exportador para a porta 4317 (gRPC) do Zabbix
const traceExporter = new OTLPTraceExporter({
  url: 'http://IPDOSERVER:4317', // Substitua pelo IP real do Zabbix
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'helloworld-node-backend', // Nome que vai aparecer no painel do Zabbix
});

// Inicializa o SDK antes do restante da aplicação
sdk.start();
console.log('[OpenTelemetry] SDK Node.js inicializado na porta 4317.');

// Garante o encerramento correto do envio ao parar o processo
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing finalizado'))
    .catch((err) => console.log('Erro ao finalizar tracing', err))
    .finally(() => process.exit(0));
});
