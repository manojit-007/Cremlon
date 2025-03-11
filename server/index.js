const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRoute = require("./Routers/AuthRoute");
const ServiceRoute = require("./Routers/ServiceRoute");
const PostRoute = require("./Routers/PostRoute");
const SendMessageRoute = require("./Routers/SendMessageRoute");
const app = express();
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server...");
  console.log(err.stack);
  process.exit(1);
});
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
  await mongoose.connect(process.env.MONGODB_URL);
}
app.use("/auth", AuthRoute);
app.use("/service", ServiceRoute);
app.use("/post", PostRoute);
app.use("/sendMessage", SendMessageRoute);

app.get("/", (req, res) => {
  res.send("Server and page is ready");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening");
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection:", err.message);
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(1);
  });
});