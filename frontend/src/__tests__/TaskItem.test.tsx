import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";
import axios from "axios";
import { StatusType } from "../types";

jest.mock("axios");

const mockTask = {
  _id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "To Do" as StatusType,
  dueDate: new Date(),
  userId: "1",
};

test("renders TaskItem and updates status", async () => {
  const fetchTasks = jest.fn();
  render(<TaskItem task={mockTask} fetchTasks={fetchTasks} />);

  const statusSelect = screen.getByDisplayValue("To Do");
  fireEvent.change(statusSelect, { target: { value: "In Progress" } });

  expect(axios.put).toHaveBeenCalledWith(
    `http://localhost:5000/api/tasks/${mockTask._id}`,
    {
      ...mockTask,
      status: "In Progress",
    }
  );
});

test("renders TaskItem and deletes task", async () => {
  const fetchTasks = jest.fn();
  render(<TaskItem task={mockTask} fetchTasks={fetchTasks} />);

  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  expect(axios.delete).toHaveBeenCalledWith(
    `http://localhost:5000/api/tasks/${mockTask._id}`
  );
});
