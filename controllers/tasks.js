const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, tasks });
});

const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, task });
});
const getTask = asyncWrapper (async (req, res, next) => {
    //try {
        const { id:taskID } = req.params;
        const task = await Task.findById(taskID);
        if(!task)
            return next(createCustomError(`No task with id: ${taskID}`, 404));
            //return res.status(404).json({ msg: `No task with id: ${taskID}`});
        res.status(200).json({ success: true, task });
    // }
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({ msg: error });
    // }
});
const updateTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        //const task  = await Task.findByIdAndUpdate(taskID, { name: req.body.name, completed: false });
        const task  = await Task.findByIdAndUpdate(taskID, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({ task });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task) return res.status(404).json({ msg: `No task with id: ${taskID}`});
        res.status(200).json({ success: true, msg: `Task with id: ${taskID} deleted` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask, 
    updateTask,
    deleteTask
};