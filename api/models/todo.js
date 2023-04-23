const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ID",
    required: true,
  },
  sub_total: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

const Todo = mongoose.model("Order", todoSchema);

module.exports = Todo;
