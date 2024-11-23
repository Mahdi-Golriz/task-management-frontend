export interface ITask {
  _id: string;
  title: string;
  dueDate: string;
  category_id: string;
  description?: string;
  status: "Done" | "Planned" | "Pending";
  createdAt: string;
}
export interface FilterAndSortOptions {
  category_id?: string;
  status?: string;
  search?: string;
  sort?: string;
}

export enum Status {
  Pending = "Pending",
  Planned = "Planned",
  Done = "Done",
}
