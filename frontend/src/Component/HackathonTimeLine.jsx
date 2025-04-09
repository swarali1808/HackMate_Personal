import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

// Timeline animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const HackathonTimeLine = ({ hackathon }) => {
  // Generate timeline events from hackathon data
  const getTimelineEvents = () => {
    if (hackathon.timeline && hackathon.timeline.length > 0) {
      return hackathon.timeline;
    } else {
      // Default timeline if none is provided
      return [
        {
          id: "registration",
          title: "Registration Opens",
          description: "Registration begins for all participants",
          date: new Date(new Date(hackathon.startDate).getTime() - 7 * 24 * 60 * 60 * 1000),
          icon: "registration",
          color: "blue"
        },
        {
          id: "kickoff",
          title: "Hackathon Begins",
          description: "Kickoff and challenge announcement",
          date: new Date(hackathon.startDate),
          icon: "start",
          color: "green"
        },
        {
          id: "submission",
          title: "Submission Deadline",
          description: "All projects must be submitted by this time",
          date: new Date(new Date(hackathon.endDate).getTime() - 3 * 60 * 60 * 1000),
          icon: "deadline",
          color: "orange"
        },
        {
          id: "judging",
          title: "Judging & Awards",
          description: "Winners announced and prizes awarded",
          date: new Date(hackathon.endDate),
          icon: "awards",
          color: "purple"
        }
      ];
    }
  };

  const timelineEvents = getTimelineEvents();
  const now = new Date();

  // Function to determine if an event is in the past, present or future
  const getEventStatus = (date) => {
    const eventDate = new Date(date);
    if (eventDate < now) return "past";
    if (eventDate.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) return "present";
    return "future";
  };
  
  // Function to get icon based on event type
  const getEventIcon = (event) => {
    return (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEventColorClass(event.color || "blue")}`}>
        {event.icon === "registration" && <CalendarIcon className="w-6 h-6 text-white" />}
        {event.icon === "start" && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )}
        {event.icon === "deadline" && <ClockIcon className="w-6 h-6 text-white" />}
        {event.icon === "awards" && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        )}
        {(!event.icon || !["registration", "start", "deadline", "awards"].includes(event.icon)) && (
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg font-bold">
            {event.id ? event.id.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
    );
  };
  
  // Function to get color class based on event color
  const getEventColorClass = (color) => {
    switch (color) {
      case "blue": return "bg-blue-500";
      case "green": return "bg-green-500";
      case "orange": return "bg-orange-500";
      case "purple": return "bg-purple-500";
      case "red": return "bg-red-500";
      default: return "bg-dark-primary";
    }
  };

  // Format date to display in a readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time to display in a readable format
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      className="bg-light-secondary2 rounded-xl shadow-md p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-dark-primary font-poppins flex items-center">
        <CalendarIcon className="w-6 h-6 mr-2" />
        Event Timeline
      </h2>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-dark-primary via-dark-secondary1 to-dark-primary rounded-full"></div>
        
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {timelineEvents.map((event, index) => {
            const status = getEventStatus(event.date);
            
            return (
              <motion.div 
                key={event.id || index}
                className="relative flex items-start"
                variants={itemVariants}
              >
                {/* Event marker */}
                <div className="absolute left-6 transform -translate-x-1/2 mt-1">
                  <motion.div 
                    className={`w-4 h-4 rounded-full ${
                      status === "past" ? "bg-dark-secondary1" : 
                      status === "present" ? "bg-green-500" : "bg-white border-2 border-dark-primary"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5, type: "spring" }}
                  />
                </div>
                
                {/* Card content */}
                <div className="ml-16 bg-white rounded-xl shadow-md overflow-hidden">
                  <motion.div 
                    className="flex flex-col md:flex-row"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon section */}
                    <div className="p-4 flex items-center justify-center md:border-r border-gray-200">
                      {getEventIcon(event)}
                    </div>
                    
                    {/* Content section */}
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-dark-primary font-poppins">{event.title}</h3>
                        
                        <div className={`text-sm ${
                          status === "past" ? "text-gray-500" : 
                          status === "present" ? "text-green-600" : "text-blue-600"
                        } font-medium mt-1 md:mt-0 flex items-center`}>
                          {status === "past" && "Completed"}
                          {status === "present" && "Happening Now"}
                          {status === "future" && "Upcoming"}
                          
                          <span className={`ml-2 w-2 h-2 rounded-full ${
                            status === "past" ? "bg-gray-500" : 
                            status === "present" ? "bg-green-500" : "bg-blue-500"
                          }`}></span>
                        </div>
                      </div>
                      
                      <p className="text-dark-secondary1 font-dmsans mb-3">{event.description}</p>
                      
                      <div className="flex items-center text-dark-secondary1 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HackathonTimeLine;