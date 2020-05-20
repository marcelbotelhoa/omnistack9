const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb+srv://admin:m4rc3l@cluster0-zfums.mongodb.net/abnb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);