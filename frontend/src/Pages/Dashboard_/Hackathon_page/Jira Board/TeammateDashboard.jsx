import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { priorityColorsLight } from "./taskUtils";
import RecentActivity from "./RecentActivity";

const TeammateDashboard = ({ teamId }) => {
  const [teammates, setTeammates] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("week"); // 'day', 'week', 'month'

  useEffect(() => {
    // Fetch teammates data
    const fetchTeammates = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with API call
        const mockTeammates = [
          {
            id: "user1",
            name: "John Smith",
            avatar: "https://i.pravatar.cc/150?img=1",
            role: "Frontend Developer",
            tasksCompleted: 12,
            tasksInProgress: 3,
            totalTasks: 18,
            lastActive: "2025-04-11T11:45:23Z",
          },
          {
            id: "user2",
            name: "Emma Johnson",
            avatar: "https://i.pravatar.cc/150?img=5",
            role: "Backend Developer",
            tasksCompleted: 15,
            tasksInProgress: 2,
            totalTasks: 22,
            lastActive: "2025-04-11T10:22:45Z",
          },
          {
            id: "user3",
            name: "Michael Davis",
            avatar: "https://i.pravatar.cc/150?img=3",
            role: "UI/UX Designer",
            tasksCompleted: 8,
            tasksInProgress: 4,
            totalTasks: 14,
            lastActive: "2025-04-11T09:15:10Z",
          },
          {
            id: "user4",
            name: "Sarah Wilson",
            avatar: "https://i.pravatar.cc/150?img=10",
            role: "Project Manager",
            tasksCompleted: 20,
            tasksInProgress: 1,
            totalTasks: 25,
            lastActive: "2025-04-10T17:30:00Z",
          },
        ];

        setTeammates(mockTeammates);
        setSelectedUser(mockTeammates[0].id);
        setIsLoading(false);

        /* Backend integration:
        const response = await fetch(`http://localhost:5000/api/teams/${teamId}/members`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch teammates');
        
        const data = await response.json();
        setTeammates(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id);
        }
        setIsLoading(false);
        */
      } catch (err) {
        console.error("Error fetching teammates:", err);
        setError("Failed to load teammates data");
        setIsLoading(false);
      }
    };

    fetchTeammates();
  }, [teamId]);

  // Fetch selected user's tasks and activity when selection changes
  useEffect(() => {
    if (!selectedUser) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with API calls
        const mockTasks = generateMockTasks(selectedUser, 5);
        const mockActivity = generateMockActivity(selectedUser, 10);

        setUserTasks(mockTasks);
        setUserActivity(mockActivity);
        setIsLoading(false);

        /* Backend integration:
        const [tasksResponse, activityResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/users/${selectedUser}/tasks?teamId=${teamId}`, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }),
          fetch(`http://localhost:5000/api/users/${selectedUser}/activity?teamId=${teamId}`, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
        ]);
        
        if (!tasksResponse.ok) throw new Error('Failed to fetch user tasks');
        if (!activityResponse.ok) throw new Error('Failed to fetch user activity');
        
        const tasksData = await tasksResponse.json();
        const activityData = await activityResponse.json();
        
        setUserTasks(tasksData);
        setUserActivity(activityData);
        setIsLoading(false);
        */
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [selectedUser, teamId]);

  // Generate mock user tasks for development
  const generateMockTasks = (userId, count) => {
    const statuses = ["PENDING", "TODO", "IN_PROGRESS", "COMPLETED"];
    const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const mockTasks = [];

    for (let i = 1; i <= count; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) - 3);

      mockTasks.push({
        id: `task-${userId}-${i}`,
        title: `Task ${i}: ${
          ["Implement", "Design", "Test", "Fix", "Review"][i % 5]
        } ${["UI", "API", "Database", "Login", "Dashboard"][i % 5]}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        dueDate: dueDate.toISOString(),
        estimatedTime: Math.floor(Math.random() * 8) + 1,
        actualTime:
          Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : null,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 10 * 86400000)
        ).toISOString(),
        updatedAt: new Date(
          Date.now() - Math.floor(Math.random() * 5 * 86400000)
        ).toISOString(),
      });
    }

    return mockTasks;
  };

  // Generate mock user activity for development
  const generateMockActivity = (userId, count) => {
    const activityTypes = [
      "created_task",
      "completed_task",
      "updated_task",
      "commented",
      "updated_checklist",
    ];
    const mockActivity = [];

    for (let i = 1; i <= count; i++) {
      const activityDate = new Date();
      activityDate.setHours(activityDate.getHours() - i * 3);

      const activityType =
        activityTypes[Math.floor(Math.random() * activityTypes.length)];
      let description = "";

      switch (activityType) {
        case "created_task":
          description = `Created task "${
            [
              "New feature",
              "Bug fix",
              "Documentation",
              "UI improvement",
              "Performance optimization",
            ][i % 5]
          }"`;
          break;
        case "completed_task":
          description = `Completed task "${
            [
              "Login page",
              "API integration",
              "Database schema",
              "User profile",
              "Dashboard",
            ][i % 5]
          }"`;
          break;
        case "updated_task":
          description = `Updated task "${
            ["Backend", "Frontend", "Testing", "Deployment", "Design"][i % 5]
          }"`;
          break;
        case "commented":
          description = `Commented on task "${
            [
              "Authentication",
              "Data visualization",
              "Mobile responsiveness",
              "Error handling",
              "Search functionality",
            ][i % 5]
          }"`;
          break;
        case "updated_checklist":
          description = `Updated checklist on task "${
            [
              "Settings page",
              "Notifications",
              "User management",
              "File upload",
              "Reporting",
            ][i % 5]
          }"`;
          break;
        default:
          description = `Interacted with task`;
      }

      mockActivity.push({
        id: `activity-${userId}-${i}`,
        type: activityType,
        description,
        timestamp: activityDate.toISOString(),
        taskId: `task-${Math.floor(Math.random() * 20) + 1}`,
      });
    }

    return mockActivity;
  };

  // Get selected user data
  const selectedUserData =
    teammates.find((user) => user.id === selectedUser) || {};

  // Calculate activity chart data based on timeframe
  const getActivityChartData = () => {
    if (!userActivity.length) return { labels: [], data: [] };

    const now = new Date();
    let startDate = new Date();
    let labels = [];

    switch (timeframe) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        labels = Array.from({ length: 24 }, (_, i) => i);
        break;
      case "week":
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString("en-US", { weekday: "short" }));
        }
        break;
      case "month":
        startDate.setDate(now.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          if (i % 3 === 0 || i === 29) {
            // Only show every 3rd day for readability
            labels.push(
              date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            );
          } else {
            labels.push("");
          }
        }
        break;
      default:
        break;
    }

    // Calculate activity counts per time period
    const activityData = Array(labels.length).fill(0);

    userActivity.forEach((activity) => {
      const activityDate = new Date(activity.timestamp);

      if (activityDate >= startDate) {
        let index = 0;

        switch (timeframe) {
          case "day":
            index = activityDate.getHours();
            break;
          case "week":
            index = Math.floor(
              (activityDate - startDate) / (1000 * 60 * 60 * 24)
            );
            break;
          case "month":
            index = Math.floor(
              (activityDate - startDate) / (1000 * 60 * 60 * 24)
            );
            break;
          default:
            break;
        }

        if (index >= 0 && index < activityData.length) {
          activityData[index]++;
        }
      }
    });

    return { labels, data: activityData };
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get user active status
  const getActiveStatus = (lastActive) => {
    const lastActiveDate = new Date(lastActive);
    const now = new Date();
    const diffMs = now - lastActiveDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 15) {
      return { status: "Online", className: "text-green-600" };
    } else if (diffMins < 60) {
      return {
        status: `Last seen ${diffMins}m ago`,
        className: "text-yellow-600",
      };
    } else {
      return {
        status: `Last seen ${formatDate(lastActive)}`,
        className: "text-gray-600",
      };
    }
  };

  // If loading, show spinner
  if (isLoading && !teammates.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 my-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-primary"></div>
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error && !teammates.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 my-6">
        <div className="text-center text-red-600">
          <FaExclamationTriangle className="mx-auto mb-4 text-4xl" />
          <p className="text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-dark-primary text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow my-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-dark-primary">
          Team Activity Dashboard
        </h2>
        <p className="text-dark-secondary1">
          Monitor your teammates' progress and activity
        </p>
      </div>

      {/* Teammate selector */}
      <div className="p-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-4">
          {teammates.map((teammate) => (
            <div
              key={teammate.id}
              onClick={() => setSelectedUser(teammate.id)}
              className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedUser === teammate.id
                  ? "bg-light-secondary1 bg-opacity-30 border border-light-secondary1"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <img
                  src={teammate.avatar}
                  alt={teammate.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    getActiveStatus(teammate.lastActive).status === "Online"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <p className="mt-2 font-medium text-dark-primary">
                {teammate.name}
              </p>
              <p className="text-xs text-dark-secondary1">{teammate.role}</p>
              <div className="mt-1 flex items-center text-xs">
                <span
                  className={getActiveStatus(teammate.lastActive).className}
                >
                  {getActiveStatus(teammate.lastActive).status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats and activity */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: User stats */}
          <div className="col-span-1 space-y-6">
            <div className="bg-light-primary p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUserData.avatar}
                  alt={selectedUserData.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h3 className="text-xl font-bold text-dark-primary">
                    {selectedUserData.name}
                  </h3>
                  <p className="text-dark-secondary1">
                    {selectedUserData.role}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs text-dark-secondary1">Completed</p>
                  <p className="text-xl font-bold text-green-600">
                    {selectedUserData.tasksCompleted}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs text-dark-secondary1">In Progress</p>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedUserData.tasksInProgress}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-xs text-dark-secondary1">Total</p>
                  <p className="text-xl font-bold text-dark-primary">
                    {selectedUserData.totalTasks}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-dark-secondary1">
                    Completion rate
                  </span>
                  <span className="text-xs font-medium text-dark-primary">
                    {Math.round(
                      (selectedUserData.tasksCompleted /
                        selectedUserData.totalTasks) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-dark-primary h-2 rounded-full"
                    style={{
                      width: `${Math.round(
                        (selectedUserData.tasksCompleted /
                          selectedUserData.totalTasks) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right column: Activity chart and feed */}
            <div className="space-y-6">
              {/* Activity feed */}
              <div className="bg-light-primary p-6 rounded-lg">
                <h3 className="text-lg font-medium text-dark-primary mb-4">
                  Recent Activity
                </h3>
                <RecentActivity activities={userActivity} />
              </div>
            </div>
          </div>

          {/* Current tasks */}
          <div className="bg-light-primary h-max p-6 col-span-2 rounded-lg">
            <h3 className="text-lg font-medium text-dark-primary mb-4">
              Recent Tasks
            </h3>

            {userTasks.length === 0 ? (
              <p className="text-center text-dark-secondary1 py-4">
                No tasks found
              </p>
            ) : (
              <div className="space-y-3">
                {userTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-dark-primary">
                        {task.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          priorityColorsLight[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-xs">
                      <span className="flex items-center text-dark-secondary1">
                        <FaClock className="mr-1" />
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className={`font-medium ${
                          task.status === "COMPLETED"
                            ? "text-green-600"
                            : task.status === "IN_PROGRESS"
                            ? "text-blue-600"
                            : "text-dark-secondary1"
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeammateDashboard;
