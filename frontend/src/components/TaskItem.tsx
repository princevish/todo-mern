
import axios from "axios";
import { StatusType, TaskType } from "../types";

interface TaskItemProps {
  task: TaskType;
  fetchTasks: () => void;
}

const TaskItem = ({ task, fetchTasks }: TaskItemProps) => {
  const updateStatus = async (newStatus: StatusType) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <select
        value={task.status}
        onChange={(e) => updateStatus(e.target.value as StatusType)}      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default TaskItem;
