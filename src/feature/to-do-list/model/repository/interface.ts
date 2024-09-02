import { Task } from "../../../../entities";

export interface TodoListRepositoryImpl {
  addTask(params: { task: Task }): Promise<void>;
  getTaskById(params: { id: string }): Promise<Task | null>;
  deleteTask(params: { id: string }): Promise<void>;
  toggleMark(params: { id: string }): Promise<void>;
}
