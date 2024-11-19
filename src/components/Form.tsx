import { useCategories } from "../context/categoriesContext";
import { ICategory } from "../services/apiCategories";
import { Status } from "./TaskForm";
import { useTasks } from "../context/tasksContext";
import { useState } from "react";
import { FilterAndSortOtions } from "../services/apiTasks";

const Form: React.FC = () => {
  const [filtersAndSortOptions, setFiltersAndSortOptions] =
    useState<FilterAndSortOtions>({});
  enum Sorted {
    sortedBydueDate = "sortedBydueDate",
    sortedBycreationDate = "sortedBycreationDate",
    initialOrder = "",
  }

  const { fetchTasks } = useTasks();
  const categories = useCategories();

  const handleFilterAndSortTasks = (key: string, value: string) => {
    const updatedFiltersAndSort = {
      ...filtersAndSortOptions,
      [key]: value || "",
    };

    setFiltersAndSortOptions(updatedFiltersAndSort);
    fetchTasks(updatedFiltersAndSort);
    console.log(updatedFiltersAndSort);
  };

  return (
    <div className="w-full flex justify-between border mb-2">
      <input
        type="text"
        placeholder="Quick Search"
        className="p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        onChange={(e) => handleFilterAndSortTasks("search", e.target.value)}
      />
      <div className="flex">
        <select
          value={filtersAndSortOptions.category_id || ""}
          onChange={(e) => {
            handleFilterAndSortTasks("category_id", e.target.value);
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
          value={filtersAndSortOptions.status || ""}
          onChange={(e) => {
            handleFilterAndSortTasks("status", e.target.value);
          }}
          className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value="">All Status</option>
          <option value={Status.Done}>{Status.Done}</option>
          <option value={Status.Pending}>{Status.Pending}</option>
          <option value={Status.Planned}>{Status.Planned}</option>
        </select>

        <select
          value={filtersAndSortOptions.sort || ""}
          onChange={(e) => {
            handleFilterAndSortTasks("sort", e.target.value as Sorted);
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
