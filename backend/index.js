const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;

const expensesRoute = require("./routes/categoryRoute")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/expenses", expensesRoute);

app.listen(PORT || 3000 , () => {
  console.log("server is running on port:", PORT);
});
