const expenseschema = require("../models/expense.model");
const addexpense = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, amount, category } = req.body;
    if (!description || !amount || !category) {
      return res
        .status(300)
        .json({ message: "require all fields", success: false });
    }
    const expense = await expenseschema.create({
      description,
      amount,
      category,
      userId,
    });
    return res.json({ message: "your expense added", expense,success:true });
  } catch (error) {
    console.log(error);

    return res.json({ message: "error while adding your expenses" });
  }
};
const markasdone = async (req, res) => {
  const expenseid = req.params.id;
  const done = req.body;
  const expense = await expenseschema.findByIdAndUpdate(expenseid, done, {
    new: true,
  });
  if (!expense) {
    return res
      .status(404)
      .json({ message: "expense not found", success: false });
  }
  return res.json({
    message: `expense mark as done ${expense.done ? "done" : "undone"}`,
    success: true,
  });
};
const removeexpense = async (req, res) => {
  const expenseid = req.params.id;
  await expenseschema.findByIdAndDelete(expenseid);
  return res.status(200).json({
    message: "expense removed",
    success: true,
  });
};
const updateexpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expenseid = req.params.id;
    const updatedata = { description, amount, category };
    const expense = await expenseschema.findByIdAndUpdate(
      expenseid,
      updatedata,
      { new: true }
    );
    return res.status(200).json({
      message: "expense updated",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
const getallexpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const query = {
      userId,
    };
    const category = req.query.category || null;
    console.log(category);

    const done = req.query.done;
    console.log(done);

    if (category && category.toLowerCase !== "all") {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (done.toLowerCase() === "done") {
      query.done = false;
    }
    const expenses = await expenseschema.find(query);

    if (!expenses || expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found", success: false });
    }

    return res.status(200).json({ expenses, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
module.exports = {
  addexpense,
  getallexpenses,
  markasdone,
  removeexpense,
  updateexpense,
};




