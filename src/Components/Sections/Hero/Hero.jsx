import React from 'react';
import heroPic1 from '../../../assets/hero-img-1.jpg'
import { motion } from "motion/react"
import { delay } from 'motion';

const Hero = () => {
    return (
        <div className='h-[500px] w-full bg-cover bg-center rounded-2xl flex items-center justify-end p-10'
            style={{ backgroundImage: `url(${heroPic1})` }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className='p-10 bg-purple-900/70 rounded-2xl flex gap-5 flex-col shadow-sm'>
                <h2 className='heading-one text-white tracking-wider leading-10'> Decotate Your Home, <br /> Kitchen & Office</h2>
                <p className='text-white font-medium '>Creating stunning home, kitchen,<br /> and office spaces with expert decoration</p>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className='btn btn-primary rounded-full font-semibold shadow hover:scale-105'>Book Decoration Service</motion.button>
            </motion.div>
        </div>
    );
};

export default Hero;