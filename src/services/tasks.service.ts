import { TaskStats } from "@components/footer";
import { FilterAndSortOptions, ITask } from "@models/tasks.model";
import fetcher from "@utils/fetcher";

/**
 * This method is responsible for create a new task
 * @param task ITask
 * @returns ITask
 */
export const createTask: Function = async (task: ITask) => {
  return await fetcher<ITask>({ path: "/tasks", method: "POST", body: task });
};

/**
 * This method is responsible for loading tasks based on filters and sort params
 * @param filtersAndSort FilterAndSortOptions
 * @returns ITask[]
 */
export const getTasks = async (filtersAndSort: FilterAndSortOptions) => {
  const query = new URLSearchParams(
    filtersAndSort as Record<string, string>
  ).toString();

  return await fetcher<ITask[]>({ path: `/tasks?${query}`, method: "GET" });
};

/**
 * This method is responsible for deleting a task and returns the deleted task's id
 * @param taskId string
 * @returns string
 */
export const deleteTaskFromDatabase = async (taskId: string) => {
  return await fetcher({ path: `/tasks/${taskId}`, method: "DELETE" });
};

/**
 * This method is responsible for editing the selected task and returns the edited task
 * @param task Partial<ITask>
 * @returns ITask
 */
export const editTask = async (task: Partial<ITask>) => {
  return await fetcher<ITask>({
    path: `/tasks/${task._id}`,
    method: "PUT",
    body: task,
  });
};

/**
 * This method is responsible for loading the tasks' statistics like their total number and number of task with same status
 * @returns TaskStat
 */
export const countTasks = async () => {
  return await fetcher<TaskStats>({ path: "/tasks/stats", method: "GET" });
};
