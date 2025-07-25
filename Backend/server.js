  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  require("dotenv").config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://my-to-do-app-blue.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());


  // Routes
  app.use("/api/todos", require("./routes/todoRoutes"));

  app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


  // MongoDB connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
