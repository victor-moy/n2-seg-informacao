const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no registro do usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Usuário ou senha inválidos" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (err) {
    res.status(500).json({ error: "Erro no login" });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.status(200).json(users);
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Usuário atualizado" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuário deletado" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
