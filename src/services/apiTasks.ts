const API_URL = "http://localhost:5555/api/tasks";

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

export interface GetTasks {
  category_id?: string;
  status?: string;
  search?: string;
  sort?: string;
}

export const createTask: Function = async (task: ITask): Promise<ITask> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error(`Failed to create task: ${res.statusText}`);
  }

  const data: ITask = await res.json();
  return data;
};

// export const getAllTasks: Function = async (): Promise<ITask[]> => {
//   const res = await fetch(API_URL);

//   if (!res.ok) {
//     throw new Error(`Faild to fetch the tasks: ${res.statusText}`);
//   }

//   const data: ITask[] = await res.json();
//   return data;
// };

// TODO: using interface for filter
export const getTasks = async (filtersAndSort: GetTasks): Promise<ITask[]> => {
  const query = new URLSearchParams(
    filtersAndSort as Record<string, string>
  ).toString();

  const res = await fetch(`${API_URL}?${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching tasks: ${res.statusText}`);
  }

  const data: ITask[] = await res.json();
  return data;
};

export const deleteTask: Function = async (taskId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete the task: ${res.statusText}`);
  }

  const data: string = await res.json();
  console.log(data);
};

export const editTask: Function = async (
  task: Partial<ITask>
): Promise<ITask> => {
  const res = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error(`Failed to edit the task: ${res.statusText}`);
  }

  const data: ITask = await res.json();
  return data;
};
