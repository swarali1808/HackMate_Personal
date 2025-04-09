import React, { useEffect, useState } from 'react';
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <motion.header 
            className={`w-full flex justify-between items-center px-4 md:px-8 py-4 font-dmsans fixed top-0 left-0 z-10 transition-all duration-300 ${
                scrolled 
                ? 'bg-dark-primary shadow-lg' 
                : 'bg-gradient-to-b from-dark-secondary1 to-dark-primary'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <Link to="/">
                    <h1 className='text-white text-[6vw] sm:text-[4.5vw] md:text-[2.5vw] font-bold transition-all duration-300 hover:text-light-secondary1'>
                        <span className="inline-block hover:scale-105 transition-transform">H</span>
                        <span className="inline-block hover:scale-105 transition-transform">a</span>
                        <span className="inline-block hover:scale-105 transition-transform">c</span>
                        <span className="inline-block hover:scale-105 transition-transform">k</span>
                        <span className="inline-block hover:scale-105 transition-transform">M</span>
                        <span className="inline-block hover:scale-105 transition-transform">a</span>
                        <span className="inline-block hover:scale-105 transition-transform">t</span>
                        <span className="inline-block hover:scale-105 transition-transform">e</span>
                    </h1>
                </Link>
            </motion.div>

            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <Link 
                    className='group relative overflow-hidden px-6 py-3 flex items-center justify-center gap-2 bg-dark-primary border-2 border-light-secondary1 rounded-full text-white font-medium hover:text-dark-primary transition-colors duration-300' 
                    to="/signup"
                >
                    <span className='relative z-10'>SignUp/Login</span>
                    <FiLogIn className='relative z-10 transition-transform group-hover:rotate-12 group-hover:scale-110' />
                    <span className='absolute inset-0 bg-light-secondary1 transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0'></span>
                </Link>
            </motion.div>
        </motion.header>
    );
};

export default Header;