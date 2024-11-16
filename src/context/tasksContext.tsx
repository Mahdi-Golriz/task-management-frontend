import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
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
}

interface TasksProviderProps {
  children: ReactNode;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = async (filters: {
    category_id?: string;
    status?: string;
    search?: string;
  }) => {
    const data = await getTasks(filters);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks({});
  }, []);

  const addTask = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const updateTask = (task: ITask) => {
    console.log(task);
    setTasks((prevTasks) =>
      prevTasks.map((tk) => (tk._id === task._id ? { ...tk, ...task } : tk))
    );
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, fetchTasks }}
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
