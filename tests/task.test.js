const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOne, setupDatabase, taskThree } = require('./fixtures/db')

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            "description": "Do the dishes"
        })
        .expect(201);

    const taskFromDB = await Task.findById(response.body._id);
    expect(taskFromDB).not.toBeNull();
    expect(taskFromDB.completed).toEqual(false);
});

test('Should get user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
    expect(200);

    expect(response.body.length).toEqual(2);
});

test('Should not allow user to delete another user\'s task', async () => {
    await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)

    const taskFromDB = await Task.findById(taskThree._id);
    expect(taskFromDB).not.toBeNull();

});