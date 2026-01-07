import React, { useRef } from 'react';
import { CommunityYearGroup } from '../types';
import { motion, useScroll, useSpring } from 'framer-motion';

interface CommunityProps {
  groups: CommunityYearGroup[];
}

const Community: React.FC<CommunityProps> = ({ groups }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sorting groups to be oldest first (far-to-near) as requested
  const sortedGroups = [...groups].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative pb-12">
      {/* Background Timeline Line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
      
      {/* Animated Progress Line */}
      <motion.div 
        style={{ scaleY }}
        className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top rounded-full z-10"
      />
      
      <div className="space-y-20">
        {sortedGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="relative pl-14 md:pl-24">
            {/* Year Marker */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute left-0 top-0 flex flex-col items-center"
            >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white dark:bg-slate-900 border-4 border-blue-500 rounded-2xl flex items-center justify-center font-black text-sm md:text-xl text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/20 z-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   {group.year}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {group.items.map((item, itemIdx) => (
                 <motion.div 
                    key={itemIdx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                        delay: itemIdx * 0.1,
                        type: "spring",
                        stiffness: 100
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative group"
                 >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                    
                    <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-blue-500/30">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                                    ${item.organization?.includes('HITCON') ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                                      item.organization?.includes('COSCUP') ? 'bg-green-50 text-green-600 border border-green-100' :
                                      item.organization?.includes('SITCON') ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                      item.organization?.includes('GDG') ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                      item.organization?.includes('學生會') ? 'bg-pink-50 text-pink-600 border border-pink-100' :
                                      'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-600'}
                                `}>
                                    {item.organization?.includes('HITCON') ? 'H' : 
                                     item.organization?.includes('COSCUP') ? 'C' :
                                     item.organization?.includes('SITCON') ? 'S' :
                                     item.organization?.includes('GDG') ? 'G' :
                                     item.organization?.includes('學生會') ? 'SA' :
                                     item.organization ? item.organization[0].toUpperCase() : '•'}
                                </div>
                                
                                <motion.div 
                                    whileHover={{ rotate: 45 }}
                                    className="text-slate-300 dark:text-slate-600"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </motion.div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-100 leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                                    {item.role}
                                </h4>
                                {item.organization && (
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                        {item.organization}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;