import React from 'react';
import { EducationItem } from '../types';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  items: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
        >
          <div className="absolute -right-4 -top-4 opacity-5 dark:opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
             <GraduationCap size={120} />
          </div>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-2">
              {item.period}
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">
              {item.school}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{item.department}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
             <div className="flex justify-between items-center">
                 <span className="font-medium text-slate-700 dark:text-slate-300">{item.degree}</span>
                 <span className={`px-2 py-0.5 text-xs rounded border ${
                    item.status.includes("休學") || item.status === "Suspended" 
                    ? "border-amber-500 text-amber-600 dark:text-amber-400" 
                    : "border-green-500 text-green-600 dark:text-green-400"
                 }`}>
                    {item.status}
                 </span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;