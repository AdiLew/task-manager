const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next)=>{
//     if (req.method === 'GET'){
//         res.send('GET Requests are disabled')
//     }
//     else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Go away, we are busy!')
// })


app.use(express.json())

//Routers
app.use(userRouter)
app.use(taskRouter);


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

const jwt = require('jsonwebtoken');
const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'HeyThere', {expiresIn: '1 seconds'});
    console.log(token);

    const data = jwt.verify(token, 'HeyThere');
    console.log(data);
};
myFunction();