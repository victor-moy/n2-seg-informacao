require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Conexão com o banco
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// Rotas
app.use("/users", userRoutes);
app.post("/register", userRoutes);
app.post("/login", userRoutes);

// Iniciar
app.listen(3000, () => console.log("API v2 rodando na porta 3000"));
