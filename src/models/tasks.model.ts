interface ITask {
  _id: string;
  title: string;
  dueDate: string;
  category_id: string;
  description?: string;
  status: "Done" | "Planned" | "Pending";
  createdAt: string;
}
interface FilterAndSortOptions {
  category_id?: string;
  status?: string;
  search?: string;
  sort?: string;
}

enum Status {
  Pending = "Pending",
  Planned = "Planned",
  Done = "Done",
}

enum SortOption {
  SortedByDueDate = "sortedByDueDate",
  SortedByCreationDate = "sortedByCreationDate",
  InitialOrder = "",
}

export type { ITask, FilterAndSortOptions };
export { Status, SortOption };
