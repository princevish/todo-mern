import request from "supertest";
import { app } from "../server";
import { Task } from "../models/task";
import "../firebaseMock"; // Mock Firebase authentication

describe("Task API", () => {
  beforeAll(async () => {
    await Task.deleteMany({});
  });

  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "This is a test task",
        status: "To Do",
        dueDate: new Date(),
      })
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Task");
  });

  it("should get all tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Test Task");
  });

  it("should update a task", async () => {
    const task = await Task.findOne({ title: "Test Task" });
    const response = await request(app)
      .put(`/api/tasks/${task?._id}`)
      .send({
        title: "Updated Task",
        status: "In Progress",
      })
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.status).toBe("In Progress");
  });

  it("should delete a task", async () => {
    const task = await Task.findOne({ title: "Updated Task" });
    const response = await request(app)
      .delete(`/api/tasks/${task?._id}`)
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted");
  });

  it("should return 404 for a non-existent task", async () => {
    const response = await request(app)
      .get("/api/tasks/60c72b2f9b1e8a5c9c9e9b0a")
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Task not found");
  });

  it("should return 400 for creating a task without a title", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        description: "This task has no title",
        status: "To Do",
        dueDate: new Date(),
      })
      .set("Authorization", "Bearer testToken"); // Mock token

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Title is required");
  });
});
