const {default: agent} = require('skywalking-backend-js');
agent.start({
        serviceName: 'GMMI::TESTE-NODE-VUE-MANUAL',
        collectorAddress: '10.0.28.209:11800',
});

const express = require('express');
const cors = require('cors');
const app = express(),
      bodyParser = require('body-parser');
      port = 8092;
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/dist'));

const corsOptions = {
/*      origin: 'http://10.0.28.209:12800',*/
        origin: true,
        credentials: true,
        optionSucessStatus: 200
}
app.use(cors(corsOptions))

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        next();
});

/*app.get('/products/:id', function (req, res, next){
        res.json({msg: 'This is CORS-enabled for all origins!'});
})*/

app.get('/', (req,res) => {
        res.sendFile(process.cwd() + '/dist/index.html');
});

app.listen(port, () => {
        console.log(`Server listening on port:: ${port}`);
        console.log('CORS-enabled web server listening');

});
