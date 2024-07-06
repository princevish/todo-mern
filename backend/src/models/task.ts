import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate?: Date;
  userId: string;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  dueDate: Date,
  userId: { type: String, required: true },
});

export const Task = model<ITask>("Task", taskSchema);
