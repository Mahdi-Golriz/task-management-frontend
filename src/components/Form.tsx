import { useState } from "react";
import { useCategories } from "../context/categoriesContext";
import { ICategory } from "../services/apiCategories";
import { Status } from "./TaskForm";
import { useTasks } from "../context/tasksContext";

const Form: React.FC = () => {
  enum Sorted {
    sortedBydueDate = "sortedBydueDate",
    sortedBycreationDate = "sortedBycreationDate",
    initialOrder = "initialOrder",
  }

  const [filters, setFilters] = useState<{
    category_id?: string;
    status?: string;
    search?: string;
  }>({});

  const [sortedBy, setSortedBy] = useState<Sorted>(Sorted.initialOrder);

  const { fetchTasks, sortTasks } = useTasks();
  const categories = useCategories();

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value || "" };
    setFilters(updatedFilters);
    fetchTasks(updatedFilters);
  };

  const handleSortTasks = (sortBy: Sorted) => {
    if (sortBy === Sorted.initialOrder) {
      fetchTasks(filters); // Re-fetch tasks to reset the order
    } else {
      sortTasks(sortBy); // Use the current state for other sorts
    }
    setSortedBy(sortBy); // Update the sort type in the component
  };

  return (
    <div className="w-full flex justify-between border mb-2">
      <input
        type="text"
        placeholder="Quick Search"
        className="p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />
      <div className="flex">
        <select
          value={filters.category_id || ""}
          onChange={(e) => {
            handleFilterChange("category_id", e.target.value);
          }}
          className="p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value="">All Categories</option>
          {categories.map((cat: ICategory) => (
            <option value={cat._id} key={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        <select
          value={filters.status || ""}
          onChange={(e) => {
            handleFilterChange("status", e.target.value);
          }}
          className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value="">All Status</option>
          <option value={Status.Done}>{Status.Done}</option>
          <option value={Status.Pending}>{Status.Pending}</option>
          <option value={Status.Planned}>{Status.Planned}</option>
        </select>

        <select
          value={sortedBy}
          onChange={(e) => {
            handleSortTasks(e.target.value as Sorted);
          }}
          className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value={Sorted.initialOrder}>Default Sort</option>
          <option value={Sorted.sortedBycreationDate}>
            Sort by Creation Date
          </option>
          <option value={Sorted.sortedBydueDate}>Sort by Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
