import { Task } from "../../../../entities";
import { mapRepositoryErrorToUseCaseError } from "../../../../shared";
import { TodoListRepositoryImpl } from "../repository/interface";

export class AddTodoListUseCase {
  constructor(private taskRepository: TodoListRepositoryImpl) {}

  async execute(params: { id: string; title: string }): Promise<void> {
    const task = new Task({ id: params.id, title: params.title });
    try {
      return await this.taskRepository.addTask({ task });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error as Error);
    }
  }
}

export class DeleteTodoListUseCase {
  constructor(private taskRepository: TodoListRepositoryImpl) {}

  async execute(params: { id: string }): Promise<void> {
    try {
      await this.taskRepository.deleteTask({ id: params.id });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error as Error);
    }
  }
}

export class ToggleMarkTodoListUseCase {
  constructor(private taskRepository: TodoListRepositoryImpl) {}

  async execute(params: { id: string }): Promise<void> {
    try {
      await this.taskRepository.toggleMark({ id: params.id });
    } catch (error) {
      throw mapRepositoryErrorToUseCaseError(error as Error);
    }
  }
}
