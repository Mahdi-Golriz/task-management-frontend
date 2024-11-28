import { countTasks } from "@services/tasks.service";
import { useEffect, useState } from "react";

export interface TaskStats {
  totalTasks: number | string;
  plannedPercentage: number | string;
  pendingPercentage: number | string;
  donePercentage: number | string;
}

// create a footer to display a summery of tasks' information including the total number of tasks and number of tasks categorized by predefined statuses
const Footer: React.FC = () => {
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    plannedPercentage: 0,
    pendingPercentage: 0,
    donePercentage: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      // this is an api calculating the tasks' statistics and sending then as an array
      const data = await countTasks();
      setStats(data);
    };

    getStats();
  }, [stats]);

  if (!stats) {
    return (
      <p className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
        Loading task statistics...
      </p>
    );
  }

  return (
    <div className="w-full justify-around flex mt-auto border p-2 box-border text-xs dark:text-white">
      <p>Total number of tasks:{stats.totalTasks}</p>
      <p>
        {`You have done the ${stats.donePercentage} percent of all tasks, ${stats.pendingPercentage} percent of tasks are pending to done and ${stats.plannedPercentage} percent of tasks were planned to done later`}
      </p>
    </div>
  );
};

export default Footer;
