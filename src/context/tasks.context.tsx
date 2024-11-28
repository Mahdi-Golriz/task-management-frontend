import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getTasks } from "@services/tasks.service";
import type { FilterAndSortOptions, ITask } from "@models/tasks.model";

interface TasksContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (taskId: string) => void;
  updateTask: (task: ITask) => void;
  fetchTasks: (filters: FilterAndSortOptions) => Promise<void>;
  filtersAndSort: FilterAndSortOptions;
  updateFiltersAndSort: (
    key: keyof FilterAndSortOptions,
    value: string
  ) => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

interface TasksState {
  tasks: ITask[];
  filtersAndSort: FilterAndSortOptions;
}

type Action =
  | { type: "tasks/loaded"; payload: ITask[] }
  | { type: "tasks/added"; payload: ITask }
  | { type: "tasks/removed"; payload: string }
  | { type: "tasks/updated"; payload: ITask }
  | {
      type: "filtersAndSort/updated";
      payload: { key: keyof FilterAndSortOptions; value: string };
    };

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

// use a combination of useReducer and useContext to manage the tasks
// it uses the getTasks method to load the tasks based on filters
// other actions are implemented to keep the UI in sync with database after creating, deleting and editing a task
const initialState: TasksState = { tasks: [], filtersAndSort: {} };

const reducer: Reducer<TasksState, Action> = (state, action): TasksState => {
  switch (action.type) {
    case "tasks/loaded":
      return { ...state, tasks: action.payload };

    case "tasks/added":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "tasks/removed":
      return {
        ...state,
        tasks: state.tasks.filter((task: ITask) => task._id !== action.payload),
      };

    case "tasks/updated":
      return {
        ...state,
        tasks: state.tasks.map((task: ITask) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };

    case "filtersAndSort/updated":
      return {
        ...state,
        filtersAndSort: {
          ...state.filtersAndSort,
          [action.payload.key]: action.payload.value,
        },
      };

    default:
      throw new Error("Action unknown!");
  }
};

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [{ tasks, filtersAndSort }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchTasks = async (filtersAndSort: FilterAndSortOptions) => {
    const data = await getTasks(filtersAndSort);
    dispatch({ type: "tasks/loaded", payload: data });
  };

  useEffect(() => {
    fetchTasks(filtersAndSort);
  }, [filtersAndSort]);

  const addTask = (task: ITask) => {
    if (
      task.category_id === filtersAndSort.category_id &&
      task.status === filtersAndSort.status
    )
      dispatch({ type: "tasks/added", payload: task });
  };

  const removeTask = (taskId: string) => {
    dispatch({ type: "tasks/removed", payload: taskId });
  };

  const updateTask = (task: ITask) => {
    dispatch({ type: "tasks/updated", payload: task });
  };

  const updateFiltersAndSort = (
    key: keyof FilterAndSortOptions,
    value: string
  ) => {
    dispatch({ type: "filtersAndSort/updated", payload: { key, value } });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        fetchTasks,
        filtersAndSort,
        updateFiltersAndSort,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks: Function = (): TasksContextProps => {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("useContext is used outside of the Provider");
  }
  return context;
};

export { TasksProvider, useTasks };
