//CRUD - Create, read, update, delete
const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(dbName);
    // db.collection('users').deleteMany({age:27})
    // .then(result => console.log('Success: ', result))
    // .catch(error => console.log('Error: ', error))

    db.collection('tasks').deleteOne({description: 'Wash dishes'})
    .then(result => console.log(result))
    .catch(error => console.log('Error! ',error));

})


