import { useCategories } from "../context/categoriesContext";
import { ICategory } from "../services/apiCategories";
import { Status } from "./TaskForm";
import { useTasks } from "../context/tasksContext";
import { useState } from "react";
import { FilterAndSortOtions } from "../services/apiTasks";

enum SortOptions {
  sortedBydueDate = "sortedBydueDate",
  sortedBycreationDate = "sortedBycreationDate",
  initialOrder = "",
}

// form section in the UI is used to search, filter and sort the tasks using backend api
const Form: React.FC = () => {
  const [filtersAndSort, setFiltersAndSort] =
    // store the selected search, filter and sort to send them as the query string to backend with fetchTasks method
    useState<FilterAndSortOtions>({});

  const { fetchTasks } = useTasks();
  const categories = useCategories(); // sort by categories

  const handleFilterAndSortTasks = (key: string, value: string) => {
    const updatedFiltersAndSort = {
      ...filtersAndSort,
      [key]: value || "",
    };

    setFiltersAndSort(updatedFiltersAndSort);
    // fetchTasks method get this parameter and works based on filter, sort and search done in backend
    fetchTasks(updatedFiltersAndSort);
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
          value={filtersAndSort.category_id || ""}
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
          value={filtersAndSort.status || ""}
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
          value={filtersAndSort.sort || ""}
          onChange={(e) => {
            handleFilterAndSortTasks("sort", e.target.value as SortOptions);
          }}
          className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value={SortOptions.initialOrder}>Default Sort</option>
          <option value={SortOptions.sortedBycreationDate}>
            Sort by Creation Date
          </option>
          <option value={SortOptions.sortedBydueDate}>Sort by Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
