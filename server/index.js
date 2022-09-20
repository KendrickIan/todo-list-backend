const express = require('express');
const bodyParser = require('body-parser');

const listController = require('../controllers/ListController.js')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//Create
app.post('/add-todo', async function(req, res, next) {
    try {
        let reqTodoDetails = req.body;
        const addResult = await listController.addTodo(reqTodoDetails);
        res.json(addResult);
    } catch (err) {
        console.error('Error: ', err.message);
        next(err);
    }
});

//Read
app.get('/get-all-todo', async function(req, res, next) {
    try {
        let pageNumber = (!req.query.pageNumber ? null : req.query.pageNumber);
        let pageSize = (!req.query.pageSize ? null : req.query.pageSize);
        const getAllResult = await listController.getAllTodo(pageNumber, pageSize);
        res.json(getAllResult);
    }
    catch (err) {
        console.error('Error: ', err.message);
        next(err);
    }
});
app.get('/get-todo-by-id/:todoId', async function(req, res, next) {
    try {
        let reqGetTodoId = req.params;
        const getByIdResult = await listController.getTodoById(reqGetTodoId);
        res.json(getByIdResult);
    } catch (err) {
        console.error('Error: ', err.message);
        next(err);
    }
});

//Update
app.put('/edit-todo/:todoId', async function(req, res, next) {
    try {
        let reqEditTodoId = req.params;
        let reqEditTodoDetails = req.body;
        const editByIdResult = await listController.editTodo(reqEditTodoId, reqEditTodoDetails);
        res.json(editByIdResult);
    } catch (err) {
        console.error('Error: ', err.message);
        next(err);
    }
});

//Delete
app.delete('/delete-todo/:todoId', async function(req, res, next) {
    try {
        let reqDeleteTodoId = req.params;
        const deleteByIdResult = await listController.deleteTodo(reqDeleteTodoId);
        res.json(deleteByIdResult);
    } catch (err) {
        console.error('Error: ', err.message);
        next(err);
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});