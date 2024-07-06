import { fireEvent, render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";
import axios from "axios";

jest.mock("axios");

const mockTasks = [
  { _id: "1", title: "Task 1", description: "Description 1", status: "To Do" },
  {
    _id: "2",
    title: "Task 2",
    description: "Description 2",
    status: "In Progress",
  },
  { _id: "3", title: "Task 3", description: "Description 3", status: "Done" },
];

test("renders TaskList and filters tasks", async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: mockTasks });
  render(<TaskList tasks={[]} fetchTasks={() => {}} />);

  const filterSelect = screen.getByDisplayValue("All");
  fireEvent.change(filterSelect, { target: { value: "To Do" } });

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
});
