const express = require('express');
const app = express();

const apiRouter = require('./routes/api');

app.use('/static/img', express.static(__dirname + '/dist/static/img/'));
app.use('/static/css', express.static(__dirname + '/dist/static/css/'));
app.use('/static/js', express.static(__dirname + '/dist/static/js/'));

app.listen(3000, () => console.log('3000'));

app.use('/api', apiRouter);

app.use('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});