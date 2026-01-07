import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Language } from "./types";
import { dataZh, dataEn } from "./data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectsAwards from "./components/ProjectsAwards";
import Community from "./components/Community";
import ScrollToTop from "./components/ScrollToTop";
import { Mail, Linkedin, Github } from "lucide-react";

const App: React.FC = () => {
  // --- Language State ---
  const [lang, setLang] = useState<Language>(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith("zh") ? "zh" : "en";
    }
    return "zh"; // Default fallback
  });

  const data = lang === "zh" ? dataZh : dataEn;

  // --- Theme State ---
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      <Helmet>
        <html lang={lang === "zh" ? "zh-TW" : "en"} />
        <title>{data.contact.name} - About me</title>
        <meta
          name="description"
          content={
            lang === "zh"
              ? `${data.contact.name} - About me`
              : `About ${data.contact.name} - Network Engineer.`
          }
        />
        <meta
          name="keywords"
          content={
            lang === "zh"
              ? "鄭弘易, Hank Cheng, 小弘, HankCheng399"
              : "鄭弘易, Hank Cheng, 小弘, HankCheng399"
          }
        />
        <meta name="author" content={data.contact.name} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hankcheng399.tw/" />
        <meta property="og:title" content={`${data.contact.name} - Resume`} />
        <meta
          property="og:description"
          content={
            lang === "zh"
              ? `${data.contact.name} - About me`
              : `About ${data.contact.name} - Network Engineer.`
          }
        />
        <meta property="og:image" content="https://hankcheng399.tw/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hankcheng399.tw/" />
        <meta property="twitter:title" content={`${data.contact.name} - Resume`} />
        <meta
          property="twitter:description"
          content={
            lang === "zh"
              ? `${data.contact.name} - About me`
              : `About ${data.contact.name} - Network Engineer.`
          }
        />
        <meta property="twitter:image" content="https://hankcheng399.tw/og-image.png" />

        <link rel="canonical" href="https://hankcheng399.tw/" />
      </Helmet>

      <Navbar
        data={data}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <ScrollToTop lang={lang} darkMode={darkMode} />

      <Hero data={data} />

      <main className="pb-24">
        {/* Experience Section */}
        <Section id="experience" title={data.ui.titles.experience}>
          <Experience items={data.experience} />
        </Section>

        {/* Education Section */}
        <Section
          id="education"
          title={data.ui.titles.education}
          className="bg-slate-100 dark:bg-slate-800/30"
        >
          <Education items={data.education} />
        </Section>

        {/* Projects & Awards Section */}
        <Section
          id="projects"
          title={`${data.ui.titles.projects} & ${data.ui.titles.awards}`}
        >
          <ProjectsAwards
            projects={data.projects}
            awards={data.awards}
            titles={{
              projects: data.ui.titles.projects,
              awards: data.ui.titles.awards,
            }}
          />
        </Section>

        {/* Community Section */}
        <Section
          id="community"
          title={data.ui.titles.community}
          className="bg-slate-100 dark:bg-slate-800/30"
        >
          <Community groups={data.community} />
        </Section>
      </main>

      <footer
        id="contact"
        className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 select-none"
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            {data.ui.titles.contact}
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  {lang === 'zh' 
                    ? <>歡迎技術交流與合作機會。<br />若有任何想法或專案需求，歡迎隨時透過 Email 與我聯絡。</>
                    : <>Welcome technical discussions and collaboration opportunities.<br />Feel free to reach out via email for any inquiries or project needs.</>}
          </p>

          <div className="flex gap-6 mb-12">
            <a
              href={`mailto:${data.contact.email}`}
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
            >
              <Mail size={24} />
            </a>
            <a
              href={`https://${data.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`https://${data.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
            >
              <Github size={24} />
            </a>
          </div>

          <div className="text-slate-500 dark:text-slate-400 text-sm">
            <p className="mb-2">
              © {new Date().getFullYear()} Hank Cheng (鄭弘易, 小弘). All rights
              reserved.
            </p>
            <p>
              Special thanks to Tai-Ming Chen.
            </p>
            <p className="opacity-70">
              Designed & Built with React, Tailwind CSS & Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
