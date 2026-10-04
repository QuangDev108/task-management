const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

database.connect();

const task = require("./models/task.model");

app.get("/tasks", async (req, res) => {
    const tasks = await task.find({
        deleted: false
    });

    console.log(tasks);

    res.json(tasks);
});

app.get("/tasks/detail/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findOne({
            _id: id,
            deleted: false
        });

        res.json(task);
    } catch (error) {
        res.json({
            message: "Task not found"
        });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});