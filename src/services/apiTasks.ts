import { TaskStat } from "../components/Footer";
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

export const createTask: Function = async (task: ITask) => {
  return await fetcher<ITask>({ path: "/tasks", method: "POST", body: task });
};

export const getTasks = async (filtersAndSort: FilterAndSortOtions) => {
  const query = new URLSearchParams(
    filtersAndSort as Record<string, string>
  ).toString();

  return await fetcher<ITask[]>({ path: `/tasks?${query}`, method: "GET" });
};

export const deleteTask = async (taskId: string) => {
  return await fetcher({ path: `/tasks/${taskId}`, method: "DELETE" });
};

export const editTask = async (task: Partial<ITask>) => {
  return await fetcher({
    path: `/tasks/${task._id}`,
    method: "PUT",
    body: task,
  });
};

export const countTasks = async () => {
  return await fetcher<TaskStat>({ path: "/tasks/stats", method: "GET" });
};
