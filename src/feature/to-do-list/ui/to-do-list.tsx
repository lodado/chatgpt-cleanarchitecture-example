import React, { useState } from "react";
import { useTodoListAdapter } from "./adapter/TodoListAdapter";

export const TodoList: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasks, handleAddTask, handleDeleteTask, handleMarkTaskAsCompleted } =
    useTodoListAdapter();

  const [error, setError] = useState<Error | null>(null);

  /** error는 global Error 나 지역적인 Error Boundary에서 최대한 늦게 처리, 예시 코드임 */
  if (error) {
    throw error;
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter new task"
      />
      <button
        onClick={() => {
          try {
            handleAddTask({ title: newTaskTitle });
          } catch (error) {
            setError(error as Error);
            alert((error as Error).message);
          } finally {
            setNewTaskTitle("");
          }
        }}
      >
        Add Task
      </button>

      <ul>
        {Array.from(tasks.values()).map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.title}
            <button onClick={() => handleMarkTaskAsCompleted({ id: task.id })}>
              {task.isCompleted ? "Completed" : "Mark as Completed"}
            </button>
            <button onClick={() => handleDeleteTask({ id: task.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
