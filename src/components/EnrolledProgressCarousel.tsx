import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressCourse {
  id: string;
  title: string;
  image: string;
  completedClasses: number;
  totalClasses: number;
  nextClassTime: string;
  nextClassEndTime: string;
  nextClassTopic: string;
  bgColor: string; // Dynamic bg color as per figma annotations
  badgeText: string;
  badgeTime: string;
  colorTheme: 'orange' | 'yellow' | 'green' | 'blue';
  state?: 'live' | 'upcoming';
}

const mockProgressCourses: ProgressCourse[] = [
  {
    id: 'ep1',
    title: 'Generative AI & Prompt Engineering',
    image: 'course_illustration_1.png',
    completedClasses: 8,
    totalClasses: 48,
    nextClassTime: '6 PM',
    nextClassEndTime: '8 PM',
    nextClassTopic: 'If Else Loops using AI',
    bgColor: 'bg-[#fee2e2]', // Dynamic background: red-100/bg-red font color for live
    badgeText: 'STARTS SOON',
    badgeTime: '00:00',
    colorTheme: 'orange',
    state: 'live'
  },
  {
    id: 'ep2',
    title: 'Data Structures & Algorithms',
    image: 'course_illustration_1.png',
    completedClasses: 5,
    totalClasses: 45,
    nextClassTime: '10 AM',
    nextClassEndTime: '12 PM',
    nextClassTopic: 'Graph Traversals: DFS and BFS',
    bgColor: 'bg-[#e0f2fe]', // light blue tint
    badgeText: 'TODAY',
    badgeTime: '9:00 PM',
    colorTheme: 'yellow',
    state: 'upcoming'
  },
  {
    id: 'ep3',
    title: 'Full Stack MERN Developer',
    image: 'course_illustration_1.png',
    completedClasses: 3,
    totalClasses: 60,
    nextClassTime: '6 PM',
    nextClassEndTime: '8 PM',
    nextClassTopic: 'Express.js Routing and Middlewares',
    bgColor: 'bg-[#fee2e2]', // light red tint
    badgeText: 'RECORDING',
    badgeTime: '1h 23m',
    colorTheme: 'green',
    state: 'upcoming'
  },
  {
    id: 'ep4',
    title: 'System Design Fundamentals',
    image: 'course_illustration_1.png',
    completedClasses: 2,
    totalClasses: 30,
    nextClassTime: '8 PM',
    nextClassEndTime: '10 PM',
    nextClassTopic: 'Horizontal vs Vertical Scaling',
    bgColor: 'bg-[#f3e8ff]', // light purple tint
    badgeText: 'UPCOMING',
    badgeTime: 'Tomorrow',
    colorTheme: 'blue',
    state: 'upcoming'
  }
];

const CircularMiniProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const radius = 20;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // ~125.6
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="absolute -top-1 -right-1 w-11 h-11 bg-white rounded-full shadow-md border border-slate-100/50 flex items-center justify-center z-20 select-none">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#0043FF" // Bright brand blue arc
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Progress percent text inside circle */}
      <span className="text-[9px] font-extrabold text-slate-800 z-10">
        {percent}%
      </span>
    </div>
  );
};

export const EnrolledProgressCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      
      const observer = new ResizeObserver(checkScroll);
      observer.observe(el);
      
      return () => {
        el.removeEventListener('scroll', checkScroll);
        observer.disconnect();
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title + Controls Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-slate-800 font-heading tracking-tight">
            Enrolled Courses
          </h2>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
            {mockProgressCourses.length} Batches
          </span>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              canScrollLeft 
                ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm active:scale-95' 
                : 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              canScrollRight 
                ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm active:scale-95' 
                : 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 px-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {mockProgressCourses.map((course) => {
          const progressPercent = Math.round((course.completedClasses / course.totalClasses) * 100);
          const isLive = course.state === 'live';
          
          // Dynamically resolve border colors based on theme bg
          const isRedTheme = course.bgColor.includes('red') || isLive;
          const isBlueTheme = course.bgColor.includes('blue') || course.bgColor.includes('sky');
          const borderClass = isRedTheme
            ? `border-red-200 bg-white shadow-[0px_4px_16px_rgba(239,68,68,0.04)] ring-1 ring-red-100/50 ${isLive ? 'animate-live-pulse-glow border-red-300' : ''}`
            : isBlueTheme
            ? 'border-blue-100 bg-white shadow-[0px_4px_16px_rgba(59,130,246,0.03)] ring-1 ring-blue-50/50'
            : 'border-slate-200 bg-white shadow-[0px_2px_8px_rgba(15,23,42,0.02)]';

          // Theme classes for time strip
          let themeStyles = {
            badgeBg: 'bg-orange-50/70',
            badgeText: 'text-orange-600',
            dotColor: 'bg-orange-500'
          };
          
          if (course.colorTheme === 'yellow') {
            themeStyles = {
              badgeBg: 'bg-amber-50/70',
              badgeText: 'text-amber-700',
              dotColor: 'bg-amber-500'
            };
          } else if (course.colorTheme === 'green') {
            themeStyles = {
              badgeBg: 'bg-emerald-50/70',
              badgeText: 'text-emerald-700',
              dotColor: 'bg-emerald-500'
            };
          } else if (course.colorTheme === 'blue') {
            themeStyles = {
              badgeBg: 'bg-blue-50/70',
              badgeText: 'text-blue-600',
              dotColor: 'bg-blue-500'
            };
          }

          return (
            <div
              key={course.id}
              className={`flex-shrink-0 w-[295px] xs:w-[360px] sm:w-[450px] min-h-[178px] border flex flex-col hover:shadow-md transition-all duration-300 snap-start rounded-[28px] overflow-hidden bg-white ${borderClass}`}
            >
              {/* Card Header Bar (Time Strip) */}
              {!isLive && (
                <div className={`flex items-center justify-between px-5 py-2.5 rounded-t-[28px] border-b border-slate-100/60 select-none ${themeStyles.badgeBg}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.dotColor}`} />
                    <span className={`text-[10px] font-extrabold tracking-wider ${themeStyles.badgeText}`}>
                      {course.badgeText}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {course.badgeTime}
                  </span>
                </div>
              )}

              {/* Main content: Old Card Content */}
              <div className="p-4 flex items-center gap-4 flex-1">
                {/* Dynamic Color Image Area */}
                <div className={`relative shrink-0 w-[96px] h-[96px] rounded-full ${course.bgColor} flex items-center justify-center overflow-visible`}>
                  <img 
                    src={course.image} 
                    alt="Illustration" 
                    className="w-16 h-16 object-contain pointer-events-none"
                  />
                  {/* Circular Progress Badge overlay */}
                  <CircularMiniProgress percent={progressPercent} />
                </div>

                {/* Course details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[14px] font-extrabold text-slate-900 leading-snug truncate">
                      {course.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-400 font-bold mt-0.5">
                      {course.completedClasses} of {course.totalClasses} Classes Completed
                    </p>
                  </div>

                  {/* Slots timing info */}
                  <div className="flex gap-1 items-center text-[12px] text-slate-450 w-full pr-2 font-medium">
                    {isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse mr-1 shrink-0" />
                    )}
                    <span className="truncate flex-1 min-w-0 font-medium text-slate-500 ml-0.5">
                      {course.nextClassTopic}
                    </span>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex gap-3.5 items-center mt-0.5">
                    {isLive ? (
                      <button 
                        onClick={() => alert(`Joining live class for: ${course.title}`)}
                        className="h-8 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl text-xs font-black px-4.5 transition-all cursor-pointer shadow-sm shadow-red-500/15 select-none active:scale-[0.97]"
                      >
                        Join Live
                      </button>
                    ) : (
                      <button 
                        onClick={() => alert(`Starting class at: ${course.nextClassTime}`)}
                        className="h-8 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black px-4.5 transition-all cursor-pointer shadow-sm select-none active:scale-[0.97]"
                      >
                        Starts at {course.nextClassTime}
                      </button>
                    )}
                    <button 
                      onClick={() => alert(`Showing details for: ${course.title}`)}
                      className="text-xs font-black text-[#0043ff] hover:underline cursor-pointer select-none whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
