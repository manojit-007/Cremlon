const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRoute = require("./Routers/AuthRoute");
const ServiceRoute = require("./Routers/ServiceRoute");
const app = express();

dotenv.config();

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => {
    console.log("Connection is successfully established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cremlon");
}
app.use("/auth", AuthRoute);
app.use("/service", ServiceRoute);

app.get("/", (req, res) => {
  res.send("Server and page is ready");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening");
});
