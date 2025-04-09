import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiDiscord, SiDevpost, SiSlack } from "react-icons/si";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-light-primary px-4 py-12 text-dark-primary font-dmsans">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0.5, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-dark-primary/20 bg-light-secondary2 p-6 shadow-lg",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Hacker"
      alt="avatar"
      className="mb-4 size-14 rounded-full bg-dark-primary/10"
    />
    <h1 className="mb-12 font-poppins text-4xl font-medium leading-tight">
      Welcome to HackMate!{" "}
      <span className="text-dark-secondary1">
        Your ultimate hackathon companion.
      </span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-1 text-dark-primary hover:underline"
    >
      Explore Resources <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-dark-primary md:col-span-3"
    >
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-[#5865F2] md:col-span-3"
    >
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiDiscord />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-[#003E54] md:col-span-3"
    >
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiDevpost />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-[#4A154B] md:col-span-3"
    >
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiSlack />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 font-outfit text-2xl leading-snug">
    <p>
      Level up your hackathon game!{" "}
      <span className="text-dark-secondary1">
        Find teammates, access resources, and track upcoming hackathons all in one
        place. Join our community of innovators and bring your ideas to life.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl text-dark-primary" />
    <p className="text-center text-lg text-dark-secondary1 font-dmsans">
      Global Community
    </p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg font-poppins">Stay updated with hackathon alerts</p>
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-dark-primary/20 bg-light-secondary2 px-3 py-1.5 
        transition-colors focus:border-dark-primary focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-dark-primary px-3 py-2 
        text-sm font-medium text-white transition-colors hover:bg-dark-secondary1"
      >
        <FiMail /> Subscribe
      </button>
    </form>
  </Block>
);

// Update Logo component with your actual logo
const Logo = () => {
  return (
    <div className="mx-auto mb-12 text-4xl font-poppins font-bold text-dark-primary">
      HackMate
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-dark-secondary1 font-dmsans">
        Made with ❤️ by{" "}
        <a href="#" className="text-dark-primary hover:underline">
          HackMate Team
        </a>
      </p>
    </footer>
  );
};

export default Dashboard;