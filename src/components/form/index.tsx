import { useCategories, useTasks } from "@context";
import { ICategory } from "@models/categories.model";
import { FilterAndSortOptions, SortOption, Status } from "@models/tasks.model";

// form section in the UI is used to search, filter and sort the tasks using backend api
const Form: React.FC = () => {
  // store the selected search, filter and sort to send them as the query string to backend with fetchTasks method

  const { filtersAndSort, updateFiltersAndSort } = useTasks();
  // sort by categories
  const { categories } = useCategories();

  const handleFilterAndSortTasks = (key: string, value: string) => {
    updateFiltersAndSort(key as keyof FilterAndSortOptions, value);
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
            handleFilterAndSortTasks("sort", e.target.value as SortOption);
          }}
          className="flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold"
        >
          <option value={SortOption.InitialOrder}>Default Sort</option>
          <option value={SortOption.SortedByCreationDate}>
            Sort by Creation Date
          </option>
          <option value={SortOption.SortedByDueDate}>Sort by Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
