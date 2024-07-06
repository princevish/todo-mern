import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { authenticate } from "./middleware/firebase";
import { MONGO_URI, PORT } from "./config";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI);

app.use(authenticate);

app.use("/api/tasks", taskRoutes);

app.use(errorHandler); // Apply error handler

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
