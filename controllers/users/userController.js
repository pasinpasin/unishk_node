const User = require("../../models/users/userModel");
//const moment=require("moment");

exports.checkBody = (req, res, next) => {
  if (!req.body.emertimi || !req.body.fakulteti) {
    return res.status(400).json({
      status: "fail",
      message: "Mungon emertimi i  Departamentit ose i fakultetit",
    });
  }
  next();
};
exports.getAllUsers = async (req, res) => {
  let filter = {};
  console.log(req.params);
  if (req.params.id) {
    filter = { departamenti: req.params.id };
  }
  try {
    // EXECUTE QUERY

    const users = await User.find(filter).populate("fakulteti departamenti");

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("fakulteti departamenti");
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
