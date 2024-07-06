import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager";
export const PORT = process.env.PORT || 5000;
