require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let todoList = [
  {
    id: 1,
    task: "learn express",
    done: false
  },
  {
    id: 2,
    task: "learn Express-generator",
    done: false
  }
];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// get all todo list

app.get("/", (req, res) => {
  res.send({ message: "halooo Hotman", todoList });
});

app.get("/id", (req, res) => {
  try {
    const filteredTodo = todoList.find(item => item.id == req.params.id);

    res.send({
      message: "Here is what you looking for",
      filteredTodo
    });
  } catch (error) {
    res.send(error);
  }
});

// add new todo
app.post("/", (req, res) => {
  try {
    let newId = todoList.length + 1;
    let newTodo = {
      id: newId,
      task: req.body.task,
      done: false
    };
    todoList.push(newTodo);
    res.status(200).send({
      message: "Haloooooo Guys!",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

// delete todo by its id

app.delete("/:id", (req, res) => {
  try {
    const idToDelete = req.params.id;
    let newTodo = todoList.filter(item => item.id !== parseInt(idToDelete));

    todoList = newTodo;

    res.status(200).send(todoList);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// update a to do by its id
app.put("/:id", (req, res) => {
  try {
    let getTodoUpdate = todoList.findIndex(data => data.id == req.params.id);

    todoList.map(data => {
      if (data.id == req.params.id) {
        todoList[getTodoUpdate].task = req.body.task;
      }
    });
    res.send({
      message: "data succesfully updated",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/", (req, res, next) => res.send("<h1>welcome Iqbal hehe!</h1>"));

app.get("/hello", (request, response, next) => {
  response.send({
    message: "Hello world!"
  });
});

app.listen(process.env.PORT, () =>
  console.log("Express server is ready on localhost: " + process.env.PORT)
);
