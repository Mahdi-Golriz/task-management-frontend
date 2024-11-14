import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllTasks, ITask } from "../services/apiTasks";

interface TasksContextProps {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  removeTask: (taskId: string) => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };

    fetchAllTasks();
  }, []);

  const addTask = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
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
