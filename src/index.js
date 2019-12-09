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

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async()=>{
//     // const task = await Task.findById ('5dee23c70c4f522434a68979')
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner)
//     const user = await User.findById('5dee224144483c2f94697636')
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }
// main()