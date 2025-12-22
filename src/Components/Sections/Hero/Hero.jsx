import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="hero min-h-[70vh] bg-base-200 relative mt-20">
            <div className="hero-content text-center">

                <div className="max-w-3xl">


                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                        Premium Decoration Services
                    </motion.span>


                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] text-base-content"
                    >
                        Elevate Your Events <br />
                        <span className="text-primary italic">With Style</span>
                    </motion.h1>


                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl mb-10 text-base-content/70 max-w-xl mx-auto leading-relaxed"
                    >
                        Creating breathtaking spaces for weddings, corporate galas, and
                        private celebrations. Your vision, our artistic touch.
                    </motion.p>


                    <div
                    >
                        <motion.button onClick={() => navigate('/services')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="btn btn-primary btn-lg rounded-full px-10 shadow-2xl shadow-primary/30 font-bold"
                        >
                            Book Decoration Service
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;