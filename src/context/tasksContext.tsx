import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { GetTasks, getTasks, ITask } from "../services/apiTasks";

interface TasksContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (taskId: string) => void;
  updateTask: (task: ITask) => void;
  fetchTasks: (filters: GetTasks) => void;
}
interface TasksProviderProps {
  children: ReactNode;
}

interface TasksState {
  tasks: ITask[];
}

type Action =
  | { type: "tasks/loaded"; payload: ITask[] }
  | { type: "tasks/added"; payload: ITask }
  | { type: "tasks/removed"; payload: string }
  | { type: "tasks/updated"; payload: ITask };

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

    default:
      throw new Error("Action unknown!");
  }
};

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [{ tasks }, dispatch] = useReducer(reducer, initialState);

  const fetchTasks = async (filtersAndSort: GetTasks) => {
    const data = await getTasks(filtersAndSort);
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

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        fetchTasks,
      }}
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
