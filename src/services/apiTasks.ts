import { TaskStats } from "../components/Footer";
import { fetcher } from "../utils/fetcher";

type Category_id = {
  _id: string;
  title: string;
};

export interface ITask {
  _id: string;
  title: string;
  dueDate: string;
  category_id: string;
  description?: string;
  status: "Done" | "Planned" | "Pending";
  createdAt: string;
}

export interface FilterAndSortOtions {
  category_id?: string;
  status?: string;
  search?: string;
  sort?: string;
}

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
export const getTasks = async (filtersAndSort: FilterAndSortOtions) => {
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
export const deleteTask = async (taskId: string) => {
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
