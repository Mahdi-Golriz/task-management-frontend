import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getTasks, ITask } from "../services/apiTasks";

interface TasksContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (taskId: string) => void;
  updateTask: (task: ITask) => void;
  fetchTasks: (filters: {
    category_id?: string;
    status?: string;
    search?: string;
  }) => void;
  sortTasks: (sortedBy: Sorted) => void;
}
interface TasksProviderProps {
  children: ReactNode;
}

enum Sorted {
  sortedBydueDate = "sortedBydueDate",
  sortedBycreationDate = "sortedBycreationDate",
  initialOrder = "initialOrder",
}

interface TasksState {
  tasks: ITask[];
}

type Action =
  | { type: "tasks/loaded"; payload: ITask[] }
  | { type: "tasks/added"; payload: ITask }
  | { type: "tasks/removed"; payload: string }
  | { type: "tasks/updated"; payload: ITask }
  | { type: "tasks/sorted"; payload: Sorted };

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const initialState: TasksState = { tasks: [] };

const reducer = (state: TasksState, action: Action) => {
  switch (action.type) {
    case "tasks/loaded":
      return { tasks: action.payload };

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

    case "tasks/sorted":
      return {
        ...state,
        tasks:
          action.payload === Sorted.sortedBycreationDate
            ? state.tasks.sort(
                (a: ITask, b: ITask) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
            : state.tasks.sort(
                (a: ITask, b: ITask) =>
                  new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              ),
      };

    default:
      throw new Error("Action unknown!");
  }
};

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = async (filters: {
    category_id?: string;
    status?: string;
    search?: string;
  }) => {
    const data = await getTasks(filters);
    dispatch({ type: "tasks/loaded", payload: data });
  };

  useEffect(() => {
    fetchTasks({});
  }, []);

  const addTask = (task: ITask) => {
    dispatch({ type: "tasks/added", payload: task });
  };

  const removeTask = (taskId: string) => {
    dispatch({ type: "tasks/removed", payload: taskId });
  };

  const updateTask = (task: ITask) => {
    dispatch({ type: "tasks/updated", payload: task });
  };

  const sortTasks = (sortedBy: Sorted) => {
    dispatch({ type: "tasks/sorted", payload: sortedBy });
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, fetchTasks, sortTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks: Function = () => {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("useContext is used outside of the Provider");
  }
  return context;
};

export { TasksProvider, useTasks };
