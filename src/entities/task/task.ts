// Import necessary error classes
import { EntityError } from "../../shared/error";

/**
 * Represents a Task in the To-Do List
 */
export class Task {
  id: string;
  title: string;
  isCompleted: boolean;

  constructor(params: { id: string; title: string; isCompleted?: boolean }) {
    if (!params.id || !params.title) {
      throw new EntityError({ message: "Task must have an id and a title." });
    }

    this.id = params.id;
    this.title = params.title;
    this.isCompleted = params.isCompleted ?? false;
  }

  /**
   * Mark the task as completed
   */
  toggleMark(): void {
    this.isCompleted = !this.isCompleted;
  }

  /**
   * Change the title of the task
   */
  changeTitle(newTitle: string): void {
    if (!newTitle) {
      throw new EntityError({ message: "New title cannot be empty." });
    }
    this.title = newTitle;
  }
}
