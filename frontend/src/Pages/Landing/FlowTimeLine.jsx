import React from "react";
import Spline from '@splinetool/react-spline';

const timelineSteps = [
  { title: "Start", description: "User begins interaction with the platform." },
  { title: "Account Setup", description: "User registers and enters skills." },
  {
    title: "Team Creation / Join Team",
    description: "Team formation process.",
  },
  { title: "Decision: Team Leader or Member?", description: "Role selection." },
  {
    title: "Planning with AI Mentor",
    description: "Task breakdown and timeline generation.",
  },
  { title: "Development", description: "Coding and collaboration." },
  { title: "Wellness", description: "Reminders for breaks and hydration." },
  {
    title: "Progress Tracking",
    description: "Monitoring tasks and achievements.",
  },
  { title: "Submission", description: "Project upload and checklist." },
  { title: "Post-Hackathon", description: "Analytics and portfolio export." },
];

const FlowTimeLine = () => {
  return (
    <section className="h-max">
      <div className="bg-light-primary text-dark-primary px-10 py-10 font-dmsans">
        <h1 className="h-max w-full text-left text-4xl md:text-4xl lg:text-6xl font-bold font-dmsans m-1">
          Flow
        </h1>
        <div className="container flex flex-col md:flex-row items-start my-12 md:my-24">
          {/* Left Section - Sticky */}
          <div className="h-[400px] w-full md:w-1/3 px-4 relative">

            <div className='absolute bottom-0 left-0 z-0 h-full w-full overflow-hidden'>
                <Spline
                  scene="https://prod.spline.design/5C-pqKbk1GTryLrJ/scene.splinecode"
                  className='h-full w-full object-cover'
                /> 
            </div>     
          </div>

          {/* Right Section - Timeline */}
          <div className="ml-0 md:ml-12 w-full md:w-2/3">
            <div className="container mx-auto w-full h-[500px] overflow-y-auto" id="scrollbar">
              <div className="relative wrap p-10">
                {/* Vertical Timeline Lines */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dark-secondary1"></div>

                {/* Timeline Items */}
                {timelineSteps.map((step, index) => (
                  <div
                    key={index}
                    className="mb-2 md:mb-8 flex items-center justify-between w-full"
                  >
                    {/* Left Side (Text for Even, Empty for Odd) */}
                    {index % 2 === 0 ? (
                      <div className="w-5/12 px-1 py-4 text-right">
                        <h4 className="mb-2 font-bold text-lg md:text-2xl">
                          {step.title}
                        </h4>
                        <p className="text-sm md:text-base text-dark-primary">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <div className="w-5/12"></div>
                    )}

                    {/* Centered Circle */}
                    <div className="relative w-1/12 flex justify-center">
                      <div className="w-5 h-5 bg-dark-secondary1 rounded-full"></div>
                    </div>

                    {/* Right Side (Text for Odd, Empty for Even) */}
                    {index % 2 !== 0 ? (
                      <div className="w-5/12 px-1 py-4 text-left">
                        <h4 className="mb-2 font-bold text-lg md:text-2xl">
                          {step.title}
                        </h4>
                        <p className="text-sm md:text-base text-dark-primary">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <div className="w-5/12"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowTimeLine;
