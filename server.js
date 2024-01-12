const express = require("express");
const erroHandler = require("./middleware/errorHandler");

const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/notes", require("./routes/noteRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(erroHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
