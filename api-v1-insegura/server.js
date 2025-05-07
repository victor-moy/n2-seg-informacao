const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Conectar ao MongoDB Atlas
mongoose.connect(
  "mongodb+srv://seg-info:pnT5E9EtjhNpnCUv@cluster0.xky0myz.mongodb.net/"
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Modelo de Usuário
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// GET - Listar todos
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// POST - Criar novo
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json({ message: "Usuário criado" });
});

// PUT - Atualizar
app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ message: "Usuário atualizado" });
});

// DELETE - Remover
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Usuário deletado" });
});

// Iniciar servidor
app.listen(3000, () => console.log("API rodando na porta 3000"));
