const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rohitvlogs02:RwH0X8bJF3IpfoxL@cluster0.lhw3atd.mongodb.net/todos"
);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("todos", todoSchema);
module.exports = { todo };
