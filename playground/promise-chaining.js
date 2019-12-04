require('../src/db/mongoose');
const User = require('../src/db/models/user')
// 5d890293636e291628d216dd

// User.findByIdAndUpdate('5d890293636e291628d216dd', {age: 1})
// .then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1})
// })
// .then((result)=>{
//     console.log(result)
// })
// .catch(error => console.log(error))

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5d890293636e291628d216dd',2)
    .then(count => console.log(count))
    .catch(e => console.log(e))

