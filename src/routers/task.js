const express = require('express');
const Task = require('../models/task');

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    }
    catch (e){
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    }
    catch (e){
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', async (req, res) => {
    const { id: _id } = req.params;
    try {
        const task = await Task.findById(_id);
        if (!task){
            return res.status(404).send() 
        }
        res.send(task)
    }
    catch (e){
        res.status(500).send(error);
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const { params, body } = req;
    const updatedProps = Object.keys(body);
    const allowedUpdates = ['description', 'completed'];
    const validOperation = updatedProps.every (prop => allowedUpdates.includes(prop));
    if (!validOperation){
        return res.status(400).send({error: 'Invalid properties :('})
    }
    
    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
        const task = await Task.findById(params.id)
        if (!task){
            return res.status(404).send({error: 'Task not found'});
        }

        updatedProps.forEach ( prop => task [prop] = body [prop]);
        await task.save();

        res.send(task);
    }
    catch (e){
        console.log(e)
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task){
            return res.status(404).send({error: 'Task not found'});
        }
        res.send(task);
    }
    catch (e){
        res.status(500).send(e)
    }
})

module.exports = router;