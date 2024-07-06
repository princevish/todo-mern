"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const task_1 = require("../models/task");
require("../firebaseMock"); // Mock Firebase authentication
describe("Task API", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield task_1.Task.deleteMany({});
    }));
    it("should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
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
    }));
    it("should get all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get("/api/tasks")
            .set("Authorization", "Bearer testToken"); // Mock token
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe("Test Task");
    }));
    it("should update a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield task_1.Task.findOne({ title: "Test Task" });
        const response = yield (0, supertest_1.default)(server_1.app)
            .put(`/api/tasks/${task === null || task === void 0 ? void 0 : task._id}`)
            .send({
            title: "Updated Task",
            status: "In Progress",
        })
            .set("Authorization", "Bearer testToken"); // Mock token
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Updated Task");
        expect(response.body.status).toBe("In Progress");
    }));
    it("should delete a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield task_1.Task.findOne({ title: "Updated Task" });
        const response = yield (0, supertest_1.default)(server_1.app)
            .delete(`/api/tasks/${task === null || task === void 0 ? void 0 : task._id}`)
            .set("Authorization", "Bearer testToken"); // Mock token
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Task deleted");
    }));
    it("should return 404 for a non-existent task", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get("/api/tasks/60c72b2f9b1e8a5c9c9e9b0a")
            .set("Authorization", "Bearer testToken"); // Mock token
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Task not found");
    }));
    it("should return 400 for creating a task without a title", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post("/api/tasks")
            .send({
            description: "This task has no title",
            status: "To Do",
            dueDate: new Date(),
        })
            .set("Authorization", "Bearer testToken"); // Mock token
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Title is required");
    }));
});
