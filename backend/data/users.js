import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "w@w.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@doe.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
