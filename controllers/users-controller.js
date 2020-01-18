const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "John Cameron",
    email: "john.n.cameron@gmail.com",
    password: "1234"
  },
  {
    id: "u2",
    name: "Celina Yoo",
    email: "celina.j.yoo@gmail.com",
    password: "1234"
  }
];

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

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs - check your data", 422);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError(
      "Sorry, this email address is already registered.",
      422
    );
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user. Incorrect email or password",
      401
    );
  }
  res.status(200).json({ message: "Logged In!" });
};

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
