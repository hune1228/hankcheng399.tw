import React, { useRef } from 'react';
import { ExperienceItem } from '../types';
import { Briefcase } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ExperienceProps {
  items: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reverse items to show newest first
  const reversedItems = [...items].reverse();

  return (
    <div ref={containerRef} className="relative space-y-8 md:space-y-0 pb-12">
      {/* Central Line for Desktop */}
      <div className="hidden md:block absolute left-1/2 top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 rounded-full"></div>
      
      {/* Animated Progress Line for Desktop */}
      <motion.div 
        style={{ scaleY }}
        className="hidden md:block absolute left-1/2 top-4 bottom-0 w-0.5 bg-blue-500 -translate-x-1/2 origin-top rounded-full z-0"
      />

      {/* Mobile Continuous Line */}
      <div className="absolute left-6 top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 md:hidden rounded-full"></div>
      <motion.div
         style={{ scaleY }}
         className="absolute left-6 top-4 bottom-0 w-0.5 bg-blue-500 md:hidden origin-top rounded-full z-0"
      />


      {reversedItems.map((item, index) => {
        const isLeft = index % 2 === 0;
        
        // Card Animation Variants
        const cardVariants = {
           offscreen: { 
             y: 50, 
             opacity: 0, 
             rotate: isLeft ? -2 : 2, 
             scale: 0.9 
           },
           onscreen: { 
             y: 0, 
             opacity: 1, 
             rotate: 0, 
             scale: 1,
             transition: { 
               type: "spring", 
               bounce: 0.4, 
               duration: 0.8 
             }
           }
        };

        return (
          <motion.div 
            key={index}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className={`relative md:flex items-center justify-between md:gap-8 ${
              isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
            } mb-12 last:mb-0`}
          >
             {/* Timeline Dot */}
             {/* Centered absolutely on the line. Line is at left-6 (mobile) or left-1/2 (desktop) */}
             <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                 <motion.div 
                    initial={{ backgroundColor: 'transparent', borderColor: '#94a3b8' }} // slate-400 (hollow)
                    whileInView={{ backgroundColor: '#3b82f6', borderColor: '#3b82f6' }} // blue-500 (solid)
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }} // Trigger logic centered
                    transition={{ duration: 0.4 }}
                    // Use onViewportEnter/Leave logic or layoutEffect if strict "all previous solid" is needed, 
                    // but whileInView with margin covers the "active in center" case. 
                    // To keep previous ones solid, we can rely on standard CSS/JS state or just the fact that 
                    // if it's "in view" (with large margin) it stays active. 
                    // However, standard framer-motion whileInView toggles off when out of view.
                    // The request: "previous nodes must be solid".
                    // Best approach: Use a custom component that tracks scroll position relative to self.
                    className="w-4 h-4 rounded-full border-[3px] bg-white dark:bg-slate-900 shadow-md ring-4 ring-white dark:ring-slate-900 box-content"
                 >
                    {/* Inner solid circle to mask line if hollow? No, the parent div background handles masking if ring is thick enough. */}
                 </motion.div>
             </div>
             
             {/* Custom Dot Logic Component to handle "Stay Solid" */}
             <TimelineDot />

             {/* Date Side (Desktop) - Opposing side to card */}
             <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-bold shadow-sm">
                  {item.period}
                </span>
             </div>

             {/* Content Side */}
             <div className={`pl-16 md:pl-0 md:w-1/2 ${isLeft ? 'md:mr-16' : 'md:ml-16'}`}>
               <div className="relative">
                 {/* Mobile Date (Above Card) */}
                 <div className="md:hidden mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold shadow-sm">
                      {item.period}
                    </span>
                 </div>

                 <motion.div 
                   whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                   className={`bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60 relative overflow-hidden group`}
                 >
                    {/* Decorative Background Gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">{item.organization}</h3>
                    {item.department && (
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-3">{item.department}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-5">
                        <Briefcase size={18} />
                        <span className="font-semibold text-sm md:text-base">{item.position}</span>
                    </div>

                    <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-300 mb-6 text-sm md:text-base leading-relaxed">
                        {item.description?.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>

                    {item.techStack && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                            {item.techStack.map((tech, i) => (
                                <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                 </motion.div>
                 
                 {/* Connecting Line (Horizontal) for Desktop */}
                 <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-slate-200 dark:bg-slate-700 ${isLeft ? '-right-8' : '-left-8'}`}></div>
               </div>
             </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Helper component for the dot logic
const TimelineDot = () => {
    return (
        <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
            <motion.div 
               initial={{ backgroundColor: 'var(--dot-bg)', borderColor: 'var(--dot-border)' }}
               whileInView={{ backgroundColor: '#3b82f6', borderColor: '#3b82f6' }}
               viewport={{ once: true, margin: "-50% 0px -10% 0px" }} // Triggers when element is near center/top, stays true once triggered
               transition={{ duration: 0.4 }}
               className="w-4 h-4 rounded-full border-[3px] bg-white dark:bg-slate-900 shadow-md ring-4 ring-white dark:ring-slate-900 box-content border-slate-400 dark:border-slate-500"
               style={{ 
                   // @ts-ignore
                   '--dot-bg': 'transparent', 
                   '--dot-border': '#94a3b8' 
               }}
            />
        </div>
    );
}

export default Experience;