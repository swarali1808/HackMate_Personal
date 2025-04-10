import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FiChevronsRight,
  FiChevronDown,
  FiArrowLeft,
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdDraw, MdOutlineIntegrationInstructions } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { SiJira } from "react-icons/si";
import { GoProject } from "react-icons/go";
import { TbFileDescription } from "react-icons/tb";

const HackathonSidebar = ({ hackathonSlug }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Determine selected sidebar item based on current path
  const [selected, setSelected] = useState(
    currentPath.includes("/submit") ? "Submit" :
    currentPath.includes("/jira") ? "Jira" :
    currentPath.includes("/draw") ? "Excalidraw" :
    "Overview"
  );

  const handleBackToDashboard = () => {
    navigate("/dashboard/hackathons");
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-[#b6cbff] bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
        fontFamily: "var(--font-poppins)",
      }}
      data-state={open ? "open" : "closed"}
    >
      <div className="mb-3 border-b border-[#b6cbff] pb-3">
        <div className="flex items-center justify-between rounded-md transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6ebff]">
              <FaUser className="text-[#340062]" />
            </div>
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                style={{ fontFamily: "var(--font-dmsans)" }}
              >
                <Link className="block text-sm font-semibold text-[#340062]"
                  to="/dashboard/profile"
                >
                  Tanish Shah
                </Link>
                <span className="block text-xs text-[#11014c]">
                  shahtanish207@gmail.com
                </span>
              </motion.div>
            )}
          </div>
          {open && <FiChevronDown className="mr-2 text-[#340062]" />}
        </div>
      </div>

      <button 
        onClick={handleBackToDashboard}
        className="flex items-center mb-4 text-[#340062] hover:bg-[#f6ebff] px-2 py-1 rounded-md w-full"
      >
        <FiArrowLeft className="mr-2" />
        {open && <span>Back to Hackathons</span>}
      </button>

      <div className="space-y-1">
        <HackOption
          Icon={TbFileDescription}
          title="Overview"
          path={`/dashboard/hackathon/${hackathonSlug}`}
          selected={selected}
          setSelected={setSelected}
          open={open}
          exact={true}
        />
        <HackOption
          Icon={SiJira}
          title="Jira"
          path={`/dashboard/hackathon/${hackathonSlug}/jira`}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <HackOption
          Icon={MdDraw}
          title="Excalidraw"
          path={`/dashboard/hackathon/${hackathonSlug}/draw`}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <HackOption
          Icon={BsClipboardData}
          title="Resources"
          path={`/dashboard/hackathon/${hackathonSlug}/resources`}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <HackOption
          Icon={GoProject}
          title="Project"
          path={`/dashboard/hackathon/${hackathonSlug}/project`}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <HackOption
          Icon={MdOutlineIntegrationInstructions}
          title="Submit"
          path={`/dashboard/hackathon/${hackathonSlug}/submit`}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const HackOption = ({ Icon, title, path, selected, setSelected, open, exact }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = exact 
    ? location.pathname === path
    : location.pathname.includes(path);
  
  const handleClick = () => {
    setSelected(title);
    navigate(path);
  };
  
  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors font-medium ${
        selected === title || isActive
          ? "bg-[#f6ebff] text-[#340062]" 
          : "text-[#11014c] hover:bg-[#f6ebff] hover:bg-opacity-50"
      }`}
      style={{ fontFamily: "var(--font-dmsans)" }}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-[#b6cbff] transition-colors hover:bg-[#f6ebff] hover:bg-opacity-50"
      style={{ fontFamily: "var(--font-dmsans)" }}
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg text-[#340062]"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-[#340062]"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default HackathonSidebar;