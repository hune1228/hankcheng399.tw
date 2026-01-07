import React, { useState, useEffect } from 'react';
import { ResumeData, Language } from '../types';
import { Moon, Sun, Languages, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  data: ResumeData;
  lang: Language;
  setLang: (l: Language) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ data, lang, setLang, darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: data.ui.titles.experience, href: "#experience" },
    { label: data.ui.titles.projects, href: "#projects" },
    { label: data.ui.titles.community, href: "#community" },
    { label: data.ui.titles.contact, href: "#contact" },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold cursor-pointer text-slate-900 dark:text-white flex items-center gap-2 group select-none"
          >
            <div className="w-9 h-9 rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
              H
            </div>
            <span className={`font-mono tracking-tight transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              Hank Cheng
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
               {navItems.map(item => (
                  <button 
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group select-none"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                  </button>
               ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-500 select-none"
                aria-label={data.ui.actions.toggleTheme}
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              
              <button
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-bold hover:border-blue-500 transition-colors text-slate-700 dark:text-slate-200 select-none"
                aria-label={data.ui.actions.toggleLang}
              >
                <Languages size={18} />
                {lang === 'zh' ? 'EN' : '中'}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 dark:text-white z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-40 md:hidden p-8 flex flex-col"
            >
               <div className="mt-16 flex flex-col gap-6">
                 {navItems.map(item => (
                    <button 
                      key={item.href}
                      onClick={() => scrollTo(item.href)}
                      className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-between group"
                    >
                      {item.label}
                      <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                    </button>
                 ))}
               </div>

               <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-slate-500 dark:text-slate-400 font-medium">Appearance</span>
                     <button 
                        onClick={toggleTheme}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2"
                      >
                        {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-600" />}
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{darkMode ? 'Dark' : 'Light'}</span>
                      </button>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-slate-500 dark:text-slate-400 font-medium">Language</span>
                     <button
                        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                      >
                        <Languages size={16} />
                        {lang === 'zh' ? 'English' : '中文'}
                      </button>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;