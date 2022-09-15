const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const { Pool } = require("pg");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
//CREATE TODO

app.post("/todos", async (req, res) => {
    try {
        
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
    res.json(newTodo.rows[0]);

    console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

//Get BY ID
app.get("/todos/:id", async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;
        const getID = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(getID.rows);
    }catch (err) {
        console.error(err.message);
    }
})

//Get all of em
app.get("/todos", async (req, res) => {
    try {
        const getAll = await pool.query("SELECT * FROM todo");
        res.json(getAll.rows);
    }catch (err) {
        console.error(err.message);
    }
})


//update
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const UpDo = await pool.query("UPDATE   todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo Was Updated");
        console.log(`updated id of ${id}`);
    } catch (err) {
        console.error(err.message);
    }
})
//delete ALL
app.delete("/todos", async (req, res) => {
    try {
        const DelAll = await pool.query("DELETE FROM todo");
        res.json("All Todos Deleted");
    }catch (err) {
        console.error(err.message);
    }
})
//delete
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const del = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo Was Deleted");
        console.log(`Deleted id of ${id}`);
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});