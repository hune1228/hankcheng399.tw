import React, { useState } from 'react';
import { ProjectItem, AwardItem } from '../types';
import { Award, FolderGit2, Users, Calendar, ArrowUpRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  projects: ProjectItem[];
  awards: AwardItem[];
  titles: { projects: string; awards: string };
}

const ProjectsAwards: React.FC<Props> = ({ projects, awards, titles }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
      
      {/* Projects Section (Left Side) - WIDER (70%) */}
      <section className="xl:w-[70%] flex flex-col">
         <div className="flex items-center gap-4 mb-8">
             <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
                <FolderGit2 size={28} />
             </div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{titles.projects}</h3>
         </div>
         
         <div className="flex-1 flex flex-col gap-8">
            {projects.map((project, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredProject(idx)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative flex-1 flex flex-col"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60 flex-1 flex flex-col xl:flex-row gap-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-blue-500/30 dark:group-hover:border-blue-400/30 overflow-hidden relative">
                        
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                        {/* Left Content: Info */}
                        <div className="flex-1 flex flex-col">
                            <div className="mb-6">
                                <div className="flex justify-between items-start gap-4">
                                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h4>
                                    <ArrowUpRight className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={28} />
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>{project.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users size={16} className="text-purple-500" />
                                        <span>{project.team.join(", ")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 flex-grow">
                                {project.description.map((desc, i) => (
                                    <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                        {desc}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Right Content: Awards (Desktop Split) */}
                        {project.awards.length > 0 && (
                           <div className="xl:w-[40%] xl:border-l xl:border-slate-100 dark:xl:border-slate-700/50 xl:pl-8 flex flex-col justify-center gap-3">
                                <h5 className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Trophy size={14} />
                                    <span>Achievements</span>
                                </h5>
                                {project.awards.map((award, i) => (
                                    <div key={i} className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/20">
                                        <p className="text-sm font-bold text-amber-800 dark:text-amber-200 leading-snug">
                                            {award}
                                        </p>
                                    </div>
                                ))}
                           </div>
                        )}
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

      {/* Awards Section (Right Side) - 30% - 2x2 Grid */}
      <section className="xl:w-[30%] flex flex-col">
         <div className="flex items-center gap-4 mb-8">
             <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/20 text-white">
                <Award size={28} />
             </div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{titles.awards}</h3>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 flex-1">
            {awards.map((award, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-700/50 transition-all duration-300 group overflow-hidden flex flex-col justify-center h-full min-h-[140px]"
                >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-orange-500/10 blur-xl rounded-full -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div className="flex flex-col gap-3 relative z-10">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800/50 shadow-inner">
                            <span className="text-xs">{award.year}</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {award.title}
                            </h4>
                            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {award.organization}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default ProjectsAwards;