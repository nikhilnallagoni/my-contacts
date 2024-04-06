const express = require("express");
const router = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
connectDb();
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use('/')
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
app.use(router);
