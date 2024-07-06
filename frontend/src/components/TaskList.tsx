import React, { useState } from "react";

import TaskItem from "./TaskItem";
import { TaskType } from "../types";

interface TaskListProps {
  tasks: TaskType[];
  fetchTasks: () => void;
}

const TaskList = ({ tasks, fetchTasks }: TaskListProps) => {
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
