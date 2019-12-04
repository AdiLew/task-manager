require('../src/db/mongoose');
const Task = require('../src/db/models/task');

// Task.findByIdAndDelete('5d8907535986931628149bbb')
// .then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed: false})
// })
// .then(tasks => console.log(tasks))
// .catch(error => console.log(error))


const deleteTaskAndCount = async (id) => {
    const deleted = await Task.findByIdAndDelete(id);
    const count = Task.countDocuments({completed: false})
    return count;
}

deleteTaskAndCount('5d8502dc5383d60a40daddf9')
    .then(count => console.log(`${count} tasks left`))
    .catch(e => console.log(e))