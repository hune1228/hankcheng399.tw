import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
    lang: 'zh' | 'en';
    darkMode: boolean;
}

export default function ScrollToTop({ lang, darkMode }: ScrollToTopProps) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const prevYRef = useRef(0);

    // Geometry
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const segmentLength = circumference / 4;

    const segments = [
        { id: 'grad-red-yellow', d: `M 24 4  A ${radius} ${radius} 0 0 1 44 24`, start: 0.00 },
        { id: 'grad-yellow-green', d: `M 44 24 A ${radius} ${radius} 0 0 1 24 44`, start: 0.25 },
        { id: 'grad-green-blue', d: `M 24 44 A ${radius} ${radius} 0 0 1 4  24`, start: 0.50 },
        { id: 'grad-blue-red', d: `M 4  24 A ${radius} ${radius} 0 0 1 24 4`, start: 0.75 },
    ];

    useEffect(() => {
        const UP_THRESHOLD = 4;
        const DOWN_THRESHOLD = 4;
        const HIDE_OFFSET = 80;
        const MOBILE_BREAKPOINT = 768;

        const onScroll = () => {
            const y = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const p = docH > 0 ? y / docH : 0;
            setProgress(Math.max(0, Math.min(p, 1)));

            const dy = y - prevYRef.current;
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

            if (isMobile) {
                if (dy < -UP_THRESHOLD) {
                    setVisible(true);
                } else if (dy > DOWN_THRESHOLD && y > HIDE_OFFSET) {
                    setVisible(false);
                }
            } else {
                setVisible(true);
            }

            prevYRef.current = y;
        };

        prevYRef.current = window.scrollY;
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div
            className={[
                'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50',
                'transition-opacity duration-300',
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
            style={{ width: '3.25rem', height: '3.25rem' }}
        >
            <div className="relative w-full h-full aspect-square">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label={lang === 'zh' ? '回到頂端' : 'Back to top'}
                    className={[
                        'absolute inset-0 rounded-full flex items-center justify-center',
                        'shadow-lg transition-transform duration-300 hover:scale-110',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        !darkMode
                            ? 'bg-slate-200/90 text-slate-900 focus-visible:ring-slate-800'
                            : 'bg-slate-800/85 text-white focus-visible:ring-slate-200',
                    ].join(' ')}
                    style={{ lineHeight: 0, zIndex: 0 }}
                >
                    <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ pointerEvents: 'none', zIndex: 10 }}
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="grad-red-yellow" x1="24" y1="4" x2="44" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ea4335" />
                            <stop offset="100%" stopColor="#f9ab00" />
                        </linearGradient>
                        <linearGradient id="grad-yellow-green" x1="44" y1="24" x2="24" y2="44" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#f9ab00" />
                            <stop offset="100%" stopColor="#34a853" />
                        </linearGradient>
                        <linearGradient id="grad-green-blue" x1="24" y1="44" x2="4" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#34a853" />
                            <stop offset="100%" stopColor="#4285f4" />
                        </linearGradient>
                        <linearGradient id="grad-blue-red" x1="4" y1="24" x2="24" y2="4" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#4285f4" />
                            <stop offset="100%" stopColor="#ea4335" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        strokeWidth="4"
                        fill="none"
                        className={!darkMode ? 'stroke-slate-300' : 'stroke-slate-700'}
                    />

                    {segments.map(({ id, d, start }) => {
                        const segProgress = (progress - start) * 4;
                        if (segProgress <= 0) return null;
                        const clamped = Math.min(segProgress, 1);
                        return (
                            <path
                                key={id}
                                d={d}
                                stroke={`url(#${id})`}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength={segmentLength}
                                strokeDasharray={segmentLength}
                                strokeDashoffset={segmentLength * (1 - clamped)}
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
