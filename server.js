require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const orderRoute = require("./src/routes/orderRoute.js");
const app = express();
app.use(express.json());
app.use("/order", orderRoute);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});
app.get("/health", (req, res) => res.json({ ok: true }));




async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB Atlas");

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

start().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});