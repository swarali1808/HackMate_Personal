import React from "react";
import { FaUsers, FaBrain, FaTasks, FaChartBar, FaTools, FaLayerGroup, FaHeartbeat } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers size={24} />,
    title: "Smart Team Matchmaking",
    description:
      "Creates balanced teams using GitHub profiles, eliminating awkward networking.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <FaBrain size={24} />,
    title: "AI Problem Breakdown",
    description:
      "Transforms complex challenges into clear tasks within minutes.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FaTasks size={24} />,
    title: "Intelligent Task Distribution",
    description:
      "Assigns work based on GitHub contributions, maximizing strengths.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: <FaChartBar size={24} />,
    title: "Real-Time Dashboard",
    description:
      "Shows tasks, commits, and timeline in one view, preventing surprises.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: <FaTools size={24} />,
    title: "Resource Engine",
    description:
      "Suggests optimal tools for your project, cutting research time significantly.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <FaLayerGroup size={24} />,
    title: "All-in-One Suite",
    description:
      "Integrates boards, canvas, and documents, eliminating context switching.",
    color: "from-gray-500 to-slate-500",
  },
  {
    icon: <FaHeartbeat size={24} />,
    title: "Wellness Assistant",
    description:
      "Provides timely breaks, maintaining team energy throughout the hackathon.",
    color: "from-yellow-500 to-green-500",
  },
];


const Features = () => {
  return (
    <div className="h-max w-full max-w-full px-10 py-10 bg-light-primary">
      <h1 className="h-max w-full text-left text-4xl md:text-4xl lg:text-6xl font-bold font-dmsans m-1 text-dark-primary">
        Features
      </h1>
        
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/4 bg-dark-primary rounded-2xl shadow-lg p-6 text-center flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            {/* Icon with Gradient Background */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${feature.color} text-light-primary shadow-lg`}
            >
              {feature.icon}
            </div>

            {/* Title & Description */}
            <h2 className="mt-4 text-lg font-bold text-light-primary ">{feature.title}</h2>
            <p className="text-light-primary  mt-2 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Features;
