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
  status: "Done" | "Planed" | "Pending";
  createdAt: string;
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

export const getTasks = async (filters: {
  category_id?: string;
  status?: string;
  search?: string;
}): Promise<ITask[]> => {
  const query = new URLSearchParams(
    filters as Record<string, string>
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
