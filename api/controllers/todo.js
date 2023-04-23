const Todo = require("../models/todo");

const mongoose = require("mongoose");

//create todo
exports.create_todo = (req, res, next) => {

  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    sub_total: req.body.sub_total,
    phone_number: req.body.phone_number,
  });

  //save the order to the db
  todo
    .save()
    .then((result) => {
      //send back some results to validate creation of the product
      res.status(201).json({
        message: "Todo added successfully",
        createdOrder: {
          user_id: result.user_id,
          sub_total: result.sub_total,
          phone_number: result.phone_number,
          _id: result._id,
        },
        request: {
          type: "POST",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//get todo
exports.get_todo = (req, res, next) => {
  const id = req.params.id;

  //grab the product based on the id, and send back the doc
  Todo.findById(id)
    .select("user_id sub_total phone_number")
    .exec()
    .then((result) => {
      //config a response with extra info
      const response = {
         todo: result,
        request: {
          type: "GET",
          description: "Get Todo",
        },
      };

      if (result) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//update Todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Todo Update Successfully",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "faild",
      data: {
        err,
      },
    });
  }
};


// delete Todo

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: "Todo deleted Successfully",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "faild",
      data: {
        err,
      },
    });
  }
};

//get all todo
exports.getAllTodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "faild",
      data: {
        err,
      },
    });
  }
};