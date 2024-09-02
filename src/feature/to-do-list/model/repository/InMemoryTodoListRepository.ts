import { Task } from "../../../../entities";
import {
  RepositoryError,
  mapEntityErrorToRepositoryError,
} from "../../../../shared";

import { TodoListRepositoryImpl } from "./interface";

export default class InMemoryTodoListRepository
  implements TodoListRepositoryImpl
{
  private tasks: Map<string, Task> = new Map();

  async getAllTasks() {
    return new Map(this.tasks);
  }

  async addTask(params: { task: Task }): Promise<void> {
    try {
      if (this.tasks.has(params.task.id)) {
        throw new RepositoryError({
          message: "Task with this ID already exists.",
        });
      }
      this.tasks.set(params.task.id, params.task);
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error as Error);
    }
  }

  async getTaskById(params: { id: string }): Promise<Task | null> {
    try {
      return this.tasks.get(params.id) ?? null;
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error as Error);
    }
  }

  async deleteTask(params: { id: string }): Promise<void> {
    try {
      if (!this.tasks.delete(params.id)) {
        throw new RepositoryError({ message: "Task not found for deletion." });
      }
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error as Error);
    }
  }

  async toggleMark(params: { id: string }): Promise<void> {
    try {
      const task = await this.getTaskById({ id: params.id });
      if (!task) {
        throw new RepositoryError({
          message: "Task not found to mark as completed.",
        });
      }
      task.toggleMark();
    } catch (error) {
      throw mapEntityErrorToRepositoryError(error as Error);
    }
  }
}
