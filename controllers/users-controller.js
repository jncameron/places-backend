const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Cameron",
    email: "john.n.cameron@gmail.com"
  },
  {
    id: "u2",
    name: "Celina Yoo",
    email: "celina.j.yoo@gmail.com"
  }
];

const getUserById = (req, res, next) => {
  const userId = req.params.id;
  const user = DUMMY_USERS.find(u => {
    return u.id === userId;
  });
  res.json({ user });
};

exports.getUserById = getUserById;
