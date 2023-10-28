import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./dataBase/db.js";
import taskRoutes from "./routes/taskRoutes.js";

// load environment variables
dotenv.config();
const app = express();

// Connect to MongoDB
dbConnection();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
