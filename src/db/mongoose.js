const mongoose = require('mongoose');
const validator = require('validator');

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';
const connectionOptions =  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true , 
    useCreateIndex:true,
    useFindAndModify: false
};

mongoose.connect( connectionUrl,  connectionOptions)

