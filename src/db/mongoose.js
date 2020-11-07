const mongoose = require('mongoose');
//const validator = require('validator');

const connectionUrl = process.env.MONGODB_URL;
const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(connectionUrl, connectionOptions)

