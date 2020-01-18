const uuid = require("uuid/v4");

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
    password: 1234
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
  const { name, email, password } = req.body;

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {};

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
