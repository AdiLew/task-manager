const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

//This user will be added to the DB before each test and can be addressed as an existing user
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Omri',
    email: 'omri@heffer.com',
    password: 'testsMakeMeSad',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

//This user will not be added in advance, and can be addressed as a new user
const userTwo = {
    name: 'Adi',
    email: 'adi@lewenstein.com',
    password: 'thisIsASecuredToken'
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();

});

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send(userTwo)
        .expect(201);

    const userFromDB = await User.findById(response.body.user._id);
    expect(userFromDB).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            name: userTwo.name,
            email: userTwo.email
        },
        token: userFromDB.tokens[0].token
    });
    expect(userFromDB.password).not.toBe(userTwo.password);
});

test('Should log in existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const userFromDB = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(userFromDB.tokens[1].token);
});

test('Should not login nonexistant user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userTwo.email,
            password: userTwo.password
        })
        .expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for an unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

        const userFromDB = await User.findById(userOne._id);
        expect(userFromDB).toBeNull();
});

test('Should not delete account for an unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});