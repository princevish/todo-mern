import { Request, Response, NextFunction } from "express";
import { Task } from "../models/task";
import { NotFoundError, BadRequestError } from "../types/errors";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ userId: req.user?.uid });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, status, dueDate } = req.body;

  if (!title) {
    return next(new BadRequestError("Title is required"));
  }

  const task = new Task({
    title,
    description,
    status,
    dueDate,
    userId: req.user?.uid,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.uid,
    });
    if (!task) {
      return next(new NotFoundError("Task not found"));
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req?.params.id,
      userId: req?.user?.uid,
    });
    if (!task) {
      return next(new NotFoundError("Task not found"));
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
