import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { countTasks, ITask } from "../services/apiTasks";

export interface TaskStat {
  total: number;
  planned: number;
  pending: number;
  done: number;
}

const Footer: React.FC = () => {
  const [stats, setStats] = useState<TaskStat>({
    total: 0,
    planned: 0,
    pending: 0,
    done: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      const data = await countTasks();
      setStats(data);
    };

    getStats();
  }, []);

  const donePercentage = Math.round((stats.done / stats.total) * 100);
  const pendingPercentage = Math.round((stats.pending / stats.total) * 100);
  const plannedPercentage = Math.round((stats.planned / stats.total) * 100);
  if (!stats) {
    return (
      <p className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
        Loading task statistics...
      </p>
    );
  }

  return (
    <div className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
      <p>Total number of tasks:{stats.total}</p>
      <p>
        {`You have done the ${donePercentage}% of all tasks, ${pendingPercentage}% of tasks are pending to done and ${plannedPercentage}% of tasks were planned to done later`}
      </p>
    </div>
  );
};

export default Footer;
