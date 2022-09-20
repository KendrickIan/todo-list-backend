const pool = require('../config.js');

//Create query
async function queryAddTodo(title) {
    try {
        await pool.query("INSERT INTO todo.todos (title, is_done) VALUES ($1, false);", [title]);
        return;
    } catch (err) {
        console.error('Error in DB: ', err.message);
        return {
            status: 500,
            message: err.message
        }
    }
};

//Read queries
async function queryGetAllTodo(pageNumber, pageSize) {
    try {
        let queryGetAllResult = await pool.query("SELECT * FROM todo.todos LIMIT $2 OFFSET (($1-1) * $2);", [pageNumber, pageSize]);
        return queryGetAllResult.rows;
    } catch (err) {
        console.error('Error in DB: ', err.message);
    }
};
async function queryGetTodoById(id) {
    try {
        let queryGetByIdResult = await pool.query("SELECT * FROM todo.todos WHERE id = $1;", [id]);
        return queryGetByIdResult.rows;
    } catch (err) {
        console.error('Error in DB: ', err.message);
        return {
            status: 500,
            message: err.message
        }
    }
};
async function queryCheckIfExisting(id) {
    try {
        let checkIfExisting = await pool.query("SELECT COUNT(*) FROM todo.todos WHERE id = $1;", [id]);
        return checkIfExisting.rows;
    } catch (err) {
        console.error('Error in DB: ', err.message);
    }
}

//Update queries
async function queryEditTodo(id, title, isDone) {
    try {
        if (title === null) {
            await pool.query("UPDATE todo.todos SET is_done = $2 WHERE id = $1;", [id, isDone]);
            return;
        } else if(title !== null) {
            await pool.query("UPDATE todo.todos SET title = $2, is_done = $3 WHERE id = $1;", [id, title, isDone]);
            return;
        }
    } catch (err) {
        console.error('Error in DB: ', err.message);
    }
}

//Delete queries
async function queryDeleteTodo(id) {
    try {
        await pool.query("DELETE FROM todo.todos WHERE id = $1;", [id]);
        return;
    } catch (err) {
        console.error('Error in DB: ', err.message);
    }
}

module.exports = {
    queryAddTodo,
    queryGetAllTodo,
    queryGetTodoById,
    queryCheckIfExisting,
    queryEditTodo,
    queryDeleteTodo
};