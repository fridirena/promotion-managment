const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser");
const promotionApi = require("./api/promotionAPI");
port = 3080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

app.use('/promotions', promotionApi);