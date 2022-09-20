const db = require('../models/ListModel.js');

//Create
async function addTodo(todoDetails) {
    try {
        let title = todoDetails.title;
        await db.queryAddTodo(title);
        return { 
            status: 200,
            message: "Successfully added!" 
        };
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        };
    };
};

//Read
async function getAllTodo(pageNumber, pageSize) {
    try {
        let getAllResult = await db.queryGetAllTodo(pageNumber, pageSize);
        return {
            status: 200,
            message: "Successfully retrieved!",
            data: getAllResult,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        };
    };
};
async function getTodoById(id) {
    try {
        let todoId = id.todoId;
        let getResultById = await db.queryGetTodoById(todoId);
        if(getResultById.status === 500) {
            return {
                status: 500,
                message: getResultById.message
            }
        } else if(getResultById.length === 0) {
            return {
                status: 200,
                message: `Entry #${todoId} does not exist!`
            }
        } else {
            return {
                status: 200,
                message: "Successfully retrieved!",
                data: getResultById
            }
        }
        
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        };
    };
};

//Update
async function editTodo(id, todoDetails) {
    try {
        let todoId = id.todoId;
        let isExisting = await db.queryCheckIfExisting(todoId);
        let editResult;
        if(isExisting !== 0) {
            let title = todoDetails.title;
            let isDone = todoDetails.isDone;
            editResult = await db.queryEditTodo(todoId, title, isDone);
        }
        return {
            status: 200,
            message: "Successfully edited!"
        }
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        };
    }
}

//Delete
async function deleteTodo(id) {
    try {
        let todoId = id.todoId;
        await db.queryDeleteTodo(todoId);
        return {
            status: 200,
            message: "Successfully deleted!" 
        };
    } catch (err) {
        return {
            status: err.status,
            message: err.message
        };
    };
};

module.exports = {
    addTodo,
    getAllTodo,
    getTodoById,
    editTodo,
    deleteTodo
};