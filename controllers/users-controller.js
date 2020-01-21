const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUserById = (req, res, next) => {
  const userId = req.params.id;
  const user = DUMMY_USERS.find(u => {
    return u.id === userId;
  });
  res.json({ user });
};

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs - check your data", 422));
  }
  const { name, email, password, places } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed. Please try again.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Sorry - that user exists already. Please login.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://i.pinimg.com/474x/6c/2e/50/6c2e50c78952f2fbc073417a61359f36--scary-movies-horror-movies.jpg",
    places
  });

  try {
    await createdUser.save();
  } catch (err) {
    new HttpError("Sorry - couldn't signup.", 500);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed. Please try again.", 500);
    return next(error);
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError("Could not identify user. Incorrect email or password", 401)
    );
  }
  res.status(200).json({ message: "Logged In!" });
};

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
