const express = require('express');
const bodyParser = require('body-parser');

const searchRouter = require('./routes/search');
const trendingRouter = require('./routes/trending');
const showRouter = require('./routes/show');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/search',searchRouter);
app.use('/trending',trendingRouter);
app.use('/show',showRouter);

app.listen(8080);
