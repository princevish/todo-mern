import React, { useState } from "react";
import axios from "axios";
import { TaskType } from "../types";

interface TaskFormProps {
  fetchTasks: () => void;
}

const TaskForm = ({ fetchTasks }: TaskFormProps) => {
  const [todos, setTodos] = useState<TaskType | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todos?.title) return alert("Title is required");

    try {
      await axios.post("http://localhost:5000/api/tasks", todos);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = ({ key, value }: { key: string; value: string }) => {
    if (!todos) return;
    setTodos((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={todos?.title}
        onChange={(e) =>
          onChangeHandler({ key: "title", value: e.target.value })
        }
        required
      />
      <textarea
        placeholder="Description"
        value={todos?.description}
        onChange={(e) =>
          onChangeHandler({ key: "description", value: e.target.value })
        }
      />
      <select
        value={todos?.status}
        onChange={(e) =>
          onChangeHandler({ key: "status", value: e.target.value })
        }
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
