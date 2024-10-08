import { useState, useCallback, useEffect } from "react";

import { mapUseCaseErrorToAdapterError } from "../../../../shared";
import { Task } from "../../../../entities";
import {
  AddTodoListUseCase,
  DeleteTodoListUseCase,
  InMemoryTodoListRepository,
  ToggleMarkTodoListUseCase,
} from "../../model";

/**
 * 지역 상태를 사용하는 예시를 적었지만,
 * redux, jotai 등 다른 전역 상태에서 활용하는게 더 수월함
 *
 * setTask로 명시적으로 상태 변경하는 대신
 * useReducer나 observable pattern, useSyncExternalStore 등을 사용하는게 좋을것이라 추측됨
 *
 */
export const useTodoListAdapter = () => {
  const [tasks, setTasks] = useState<Map<string, Task>>(
    new Map<string, Task>()
  );
  const [taskRepository] = useState(() => new InMemoryTodoListRepository());

    useEffect(() => {
      /*** etc.. network logic */
    }, []);

    const handleAddTask = useCallback(
      async ({ title }: { title: string }) => {
        try {
          const addTaskUseCase = new AddTodoListUseCase(taskRepository);

          const id = new Date().toISOString();
          await addTaskUseCase.execute({ id, title });
          setTasks(await taskRepository.getAllTasks());
        } catch (error) {
          throw mapUseCaseErrorToAdapterError(error as Error);
        }
      },
      [InMemoryTodoListRepository]
    );

    const handleDeleteTask = useCallback(
      async (params: { id: string }) => {
        try {
          const deleteTaskUseCase = new DeleteTodoListUseCase(taskRepository);

          await deleteTaskUseCase.execute(params);
          setTasks(await taskRepository.getAllTasks());
        } catch (error) {
          throw mapUseCaseErrorToAdapterError(error as Error);
        }
      },
      [InMemoryTodoListRepository]
    );

    const handleMarkTaskAsCompleted = useCallback(
      async (params: { id: string }) => {
        try {
          const toggleTodoListMarkUseCase = new ToggleMarkTodoListUseCase(
            taskRepository
          );

          await toggleTodoListMarkUseCase.execute(params);
          setTasks(await taskRepository.getAllTasks());
        } catch (error) {
          throw mapUseCaseErrorToAdapterError(error as Error);
        }
      },
      [InMemoryTodoListRepository]
    );

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleMarkTaskAsCompleted,
  };
};
