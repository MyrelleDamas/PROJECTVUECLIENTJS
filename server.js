const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 8088;

// place holder for the data
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/dist'));


app.get('/', (req,res) => {
  res.sendFile(process.cwd() + '/dist/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
