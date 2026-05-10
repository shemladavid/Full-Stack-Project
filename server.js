const express = require("express");
const path = require("path");
const initializeDB = require("./db/init");
const mainRouter = require("./routes/serverRouter");

const app = express();
const port = 3000;

// Initialize Database (Create tables and seed data)
initializeDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public", "pages")));
app.use("/scripts", express.static(path.join(__dirname, "public", "scripts")));
app.use("/styles", express.static(path.join(__dirname, "public", "styles")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});