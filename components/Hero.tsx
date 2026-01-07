import React from 'react';
import { ResumeData } from '../types';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone, ChevronDown } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import NetworkBackground from './NetworkBackground';

interface HeroProps {
  data: ResumeData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <NetworkBackground />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/80 dark:via-slate-900/10 dark:to-slate-900/80 pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-5xl px-4"
      >
        <div className="relative group perspective-1000">
          <motion.div
            whileHover={{ rotateX: 1, rotateY: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-16 transform-style-3d relative overflow-hidden"
          >
             {/* Decorative top border */}
             <motion.div 
               animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"
             ></motion.div>

            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative shrink-0">
                 <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-2xl ring-4 ring-white/50 dark:ring-slate-700/50">
                    <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src="https://gravatar.com/avatar/950c738d64f47fa63f8bcec1e845b3063938d48ff1e2102a165c4b51ecf288d1?s=400" 
                          alt={data.contact.name}
                          className="w-full h-full object-cover"
                        />
                    </div>
                 </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="select-none">
                    <h1 className="text-7xl md:text-9xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    {data.contact.name.split(' ')[0]}
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light">
                        {data.contact.name.split(' ').slice(1).join(' ')}
                    </p>
                </div>
                
                <div className="text-lg md:text-2xl font-mono text-blue-600 dark:text-blue-400 h-8 select-none">
                  <Typewriter
                    options={{
                      strings: [
                        'Network Engineer',
                        'Full Stack Developer',
                        'Open Source Contributor',
                        'Student @ NCUE'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 pt-6">
                  <a href={`mailto:${data.contact.email}`} className="flex flex-col items-center justify-center gap-1 md:gap-2 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold select-none">Email</span>
                  </a>
                  <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 md:gap-2 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group">
                    <Linkedin className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold select-none">LinkedIn</span>
                  </a>
                  <a href={`https://${data.contact.github}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 md:gap-2 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group">
                    <Github className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs md:text-sm font-semibold select-none">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 cursor-pointer z-10"
        onClick={() => {
            const exp = document.getElementById('experience');
            if(exp) exp.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronDown size={32} />
      </motion.div>

      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Hero;