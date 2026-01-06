import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Generate 50 tasks alternating completed / active
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Todo ${i}`,
      completed: i % 2 === 1, // odd = completed, even = active
    });
  }
  return tasks;
};

// Artificial slowdown
const slowDown = () => {
  const start = performance.now();
  while (performance.now() - start < 2) {} // 2ms per task
};

const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState("All"); // All, Active, Completed

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      slowDown();
      if (filter === "All") return true;
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className="app" style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Filter Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      {/* Note */}
      <p><strong>Note:</strong> List is artificially slowed down!</p>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.completed ? <s>{task.title}</s> : task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
