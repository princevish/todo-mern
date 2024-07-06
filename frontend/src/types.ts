export type StatusType = "To Do" | "In Progress" | "Done";

export interface TaskType {
  _id?: string;
  title: string;
  description?: string;
  status: StatusType;
  dueDate?: Date;
  userId: string;
}
