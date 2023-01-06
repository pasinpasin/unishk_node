const User = require("../../models/users/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");

const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()

  const newUser = await User.create(req.body);
  const token = signedToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email });

  if (!user || (await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signedToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Ju nuk jeni te loguar!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUSer = await User.findById(decoded.id);
  if (!freshUSer) {
    return next(
      new AppError("Useri qe i perket ketij token nuk ekziston me", 401)
    );
  }

  if (freshUSer.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = freshUSer;
  next();
});
