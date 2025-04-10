// Priority colors mapping for dark theme
export const priorityColors = {
  LOW: "bg-blue-500 bg-opacity-20 text-blue-400",
  MEDIUM: "bg-green-500 bg-opacity-20 text-green-400",
  HIGH: "bg-yellow-500 bg-opacity-20 text-yellow-400",
  CRITICAL: "bg-red-500 bg-opacity-20 text-red-400",
  DEFAULT: "bg-purple-500 bg-opacity-20 text-purple-400",
};

// Priority colors mapping for light theme
export const priorityColorsLight = {
  LOW: "bg-blue-100 text-blue-700",
  MEDIUM: "bg-green-100 text-green-700",
  HIGH: "bg-yellow-100 text-yellow-700",
  CRITICAL: "bg-red-100 text-red-700",
  DEFAULT: "bg-purple-100 text-purple-700",
};

// Calculate days remaining until a due date
export const getDaysRemaining = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Format time display
export const formatTime = (hours) => {
  if (!hours && hours !== 0) return "Not set";

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (wholeHours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${wholeHours}h`;
  } else {
    return `${wholeHours}h ${minutes}m`;
  }
};

// Calculate task completion percentage based on checklist
export const calculateCompletion = (task) => {
  if (!task.checkList || task.checkList.length === 0) return 0;

  const completed = task.checkList.filter((item) => item.completed).length;
  return Math.round((completed / task.checkList.length) * 100);
};
