import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import axios from "axios";

jest.mock("axios");

test("renders TaskForm and submits data", async () => {
  const fetchTasks = jest.fn();
  render(<TaskForm fetchTasks={fetchTasks} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const descriptionInput = screen.getByPlaceholderText("Description");
  const statusSelect = screen.getByDisplayValue("To Do");
  const addButton = screen.getByText("Add Task");

  fireEvent.change(titleInput, { target: { value: "Test Task" } });
  fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
  fireEvent.change(statusSelect, { target: { value: "In Progress" } });
  fireEvent.click(addButton);

  expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/tasks", {
    title: "Test Task",
    description: "Test Description",
    status: "In Progress",
  });
});
