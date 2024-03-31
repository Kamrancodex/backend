const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
app.use(express.json());
const port = 3000;
const cors = require("cors");
app.use(cors());
app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong inputs",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "todo created",
  });
});
app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updatePayload.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong inputs",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "maked completed",
  });
});
app.listen(port, () => {
  console.log(`listening`);
});
