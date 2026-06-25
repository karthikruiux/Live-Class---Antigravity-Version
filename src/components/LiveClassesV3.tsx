import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Calendar, 
  Monitor, 
  FileText, 
  Clock, 
  Trophy, 
  CheckCircle, 
  Sparkles,
  ChevronRight,
  Users,
  FileDown,
  Activity,
  BookOpen,
  UserCheck,
  ArrowLeftRight,
  CalendarDays,
  Sparkle,
  GraduationCap,
  Play
} from 'lucide-react';
import { highlightText } from '../utils/searchHighlight';

interface WeeklyMilestone {
  week: number;
  topic: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface PeerRank {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  isUser?: boolean;
}

interface Batch {
  id: string;
  title: string;
  cohort: string;
  category: 'placement' | 'dsa' | 'ai' | 'backend' | 'frontend' | 'revision';
  status: 'running' | 'upcoming' | 'past';
  progressPercent: number;
  currentWeek: number;
  totalWeeks: number;
  completedClasses: number;
  totalClasses: number;
  attendance: number;
  nextSession: string;
  seatCount?: number;
  totalSeats?: number;
  schedule: string;
  instructor: string;
  image: string;
  tags: string[];
  mockScore?: string;
  syllabus: WeeklyMilestone[];
  leaderboard: PeerRank[];
  scheduleType: 'weekly' | 'weekend';
}

const mockBatches: Batch[] = [
  // Running Batches - Weekly
  {
    id: 'b-run-1',
    title: 'Data Structures & Algorithms',
    cohort: 'Batch Alpha (May 2026)',
    category: 'dsa',
    status: 'running',
    progressPercent: 75,
    currentWeek: 9,
    totalWeeks: 12,
    completedClasses: 27,
    totalClasses: 36,
    attendance: 94,
    nextSession: 'Live in 2 Hours (8:30 PM)',
    schedule: 'Mon, Wed, Fri • 8:30 PM - 10:30 PM',
    instructor: 'Arjun Mehta (Ex-Google L6)',
    image: 'course_illustration_1.png',
    tags: ['Recursion', 'Graphs', 'Dynamic Programming'],
    scheduleType: 'weekly',
    syllabus: [
      { week: 1, topic: 'Big-O Analysis & Array Listings', status: 'completed' },
      { week: 2, topic: 'Linked Lists & Multi-Pointer Logic', status: 'completed' },
      { week: 3, topic: 'Stacks, Queues & Hash Implementations', status: 'completed' },
      { week: 4, topic: 'Trees & Advanced BST Traversals', status: 'completed' },
      { week: 5, topic: 'Searching, Sorting & Divide & Conquer', status: 'completed' },
      { week: 6, topic: 'Recursion Depth & Backtracking mazes', status: 'completed' },
      { week: 7, topic: 'Heaps, Priority Queues & Greedy Logic', status: 'completed' },
      { week: 8, topic: 'Graph Traversals (BFS & DFS Matrix)', status: 'completed' },
      { week: 9, topic: 'Shortest Paths & Spanning Trees (Dijkstra)', status: 'active' },
      { week: 10, topic: 'Intro to Dynamic Programming States', status: 'upcoming' },
      { week: 11, topic: 'Knapsack & LCS Matrix Optimization', status: 'upcoming' },
      { week: 12, topic: 'Syllabus Review & FAANG Mock Interviews', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Deepak Rao', xp: 2840, streak: 34 },
      { rank: 2, name: 'Aditi Sharma', xp: 2610, streak: 21 },
      { rank: 3, name: 'Sanjay Kumar', xp: 2580, streak: 12, isUser: true },
      { rank: 4, name: 'Kunal Sen', xp: 2240, streak: 8 },
      { rank: 5, name: 'Priya Patel', xp: 2150, streak: 15 }
    ]
  },
  {
    id: 'b-run-2',
    title: 'Generative AI & Prompt Engineering',
    cohort: 'Batch Gamma (June 2026)',
    category: 'ai',
    status: 'running',
    progressPercent: 33,
    currentWeek: 4,
    totalWeeks: 12,
    completedClasses: 12,
    totalClasses: 36,
    attendance: 88,
    nextSession: 'Tomorrow, 7:00 PM',
    schedule: 'Tue, Thu, Sat • 7:00 PM - 9:00 PM',
    instructor: 'Dr. Kabir Roy (AI Researcher)',
    image: 'course_illustration_1.png',
    tags: ['LLMs', 'Prompt Engineering', 'LangChain'],
    scheduleType: 'weekly',
    syllabus: [
      { week: 1, topic: 'Foundations of Neural Nets & Deep Learning', status: 'completed' },
      { week: 2, topic: 'Natural Language Processing & Word Vectors', status: 'completed' },
      { week: 3, topic: 'Attention Mechanics & Transformers Architectures', status: 'completed' },
      { week: 4, topic: 'Large Language Models & Zero/Few-Shot Prompts', status: 'active' },
      { week: 5, topic: 'Chaining & Orchestrations with LangChain', status: 'upcoming' },
      { week: 6, topic: 'Vector DBs (Pinecone) & RAG pipeline setups', status: 'upcoming' },
      { week: 7, topic: 'Agents, Tool Use & AutoGPT Orchestrations', status: 'upcoming' },
      { week: 8, topic: 'Fine-Tuning Open-Source LLMs (Llama 3)', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Rohan Mehra', xp: 1420, streak: 19 },
      { rank: 2, name: 'Sanjay Kumar', xp: 1290, streak: 12, isUser: true },
      { rank: 3, name: 'Preeti Das', xp: 1210, streak: 7 },
      { rank: 4, name: 'Preeti Das', xp: 1210, streak: 7 },
      { rank: 5, name: 'Nisha Gupta', xp: 950, streak: 3 }
    ]
  },
  // Running Batches - Weekend
  {
    id: 'b-run-3',
    title: 'Full Stack MERN Developer',
    cohort: 'Batch Delta (May 2026)',
    category: 'frontend',
    status: 'running',
    progressPercent: 18,
    currentWeek: 2,
    totalWeeks: 10,
    completedClasses: 8,
    totalClasses: 45,
    attendance: 92,
    nextSession: 'Live in 1 Hour (6:00 PM)',
    schedule: 'Sat, Sun • 6:00 PM - 8:00 PM',
    instructor: 'Neha Sharma (Staff Engineer)',
    image: 'course_illustration_1.png',
    tags: ['Node.js', 'React', 'MongoDB', 'Express'],
    scheduleType: 'weekend',
    syllabus: [
      { week: 1, topic: 'HTML5 Semantic Layouts & CSS Grid Flexbox', status: 'completed' },
      { week: 2, topic: 'Express.js Routing, Request Params & Middlewares', status: 'active' },
      { week: 3, topic: 'MongoDB Aggregations & Schema Validations', status: 'upcoming' },
      { week: 4, topic: 'React 19 State, Hooks & Context Providers', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Aditi Sharma', xp: 940, streak: 12 },
      { rank: 2, name: 'Sanjay Kumar', xp: 820, streak: 12, isUser: true },
      { rank: 3, name: 'Kunal Sen', xp: 750, streak: 8 }
    ]
  },

  // Upcoming Batches - Weekly
  {
    id: 'b-up-1',
    title: 'React & Next.js Production Architecture',
    cohort: 'Batch Epsilon (Starts July 2026)',
    category: 'frontend',
    status: 'upcoming',
    progressPercent: 0,
    currentWeek: 0,
    totalWeeks: 10,
    completedClasses: 0,
    totalClasses: 30,
    attendance: 100,
    nextSession: 'Starts in 4 Days (July 1st)',
    seatCount: 84,
    totalSeats: 100,
    schedule: 'Mon, Wed, Fri • 6:30 PM - 8:30 PM',
    instructor: 'Sameer Sen (Principal Engineer)',
    image: 'course_illustration_1.png',
    tags: ['React 19', 'RSCs', 'Tailwind v4', 'Performance'],
    scheduleType: 'weekly',
    syllabus: [
      { week: 1, topic: 'React 19 Hooks, Actions & Server Features', status: 'upcoming' },
      { week: 2, topic: 'Vite Compilation, Bundling & Assets Pipelines', status: 'upcoming' },
      { week: 3, topic: 'Next.js App Router, SSR, SSG & ISR architectures', status: 'upcoming' },
      { week: 4, topic: 'React Server Components (RSCs) & Data Hydration', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sanjay Kumar', xp: 0, streak: 12, isUser: true }
    ]
  },
  // Upcoming Batches - Weekend
  {
    id: 'b-up-2',
    title: 'System Design & FAANG Career Track',
    cohort: 'Batch Omega (Starts July 2026)',
    category: 'placement',
    status: 'upcoming',
    progressPercent: 0,
    currentWeek: 0,
    totalWeeks: 14,
    completedClasses: 0,
    totalClasses: 42,
    attendance: 100,
    nextSession: 'Starts in 8 Days (July 5th)',
    seatCount: 52,
    totalSeats: 80,
    schedule: 'Sat, Sun • 10:00 AM - 1:00 PM',
    instructor: 'Naman Gupta (Ex-Amazon L7)',
    image: 'course_illustration_1.png',
    tags: ['Scalability', 'Load Balancers', 'Microservices'],
    scheduleType: 'weekend',
    syllabus: [
      { week: 1, topic: 'Vertical vs Horizontal Scalability Architectures', status: 'upcoming' },
      { week: 2, topic: 'Load Balancers, Round-Robin & Consistent Hashing', status: 'upcoming' },
      { week: 3, topic: 'Caching Layers (Redis, Memcached) & Evictions', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sanjay Kumar', xp: 0, streak: 12, isUser: true }
    ]
  },

  // Past Batches - Weekly
  {
    id: 'b-past-1',
    title: 'Placement Preparation Bootcamp',
    cohort: 'Batch Beta (Completed April 2026)',
    category: 'placement',
    status: 'past',
    progressPercent: 100,
    currentWeek: 10,
    totalWeeks: 10,
    completedClasses: 30,
    totalClasses: 30,
    attendance: 96,
    nextSession: 'Completed on April 20, 2026',
    schedule: 'Mon, Wed, Fri • 8:30 PM - 10:30 PM',
    instructor: 'Arjun Mehta (Ex-Google L6)',
    image: 'course_illustration_1.png',
    tags: ['Aptitude', 'Resume Build', 'Mock Coding'],
    mockScore: '8.8/10 (High FAANG Readiness)',
    scheduleType: 'weekly',
    syllabus: [
      { week: 1, topic: 'Resume Building & ATS Optimization', status: 'completed' },
      { week: 2, topic: 'Aptitude Speed Hacks & Quantitative Math', status: 'completed' },
      { week: 3, topic: 'Behavioral Interviews & STAR Methodology', status: 'completed' }
    ],
    leaderboard: [
      { rank: 1, name: 'Deepak Rao', xp: 3420, streak: 40 },
      { rank: 2, name: 'Sanjay Kumar', xp: 3290, streak: 12, isUser: true },
      { rank: 3, name: 'Aditi Sharma', xp: 3100, streak: 21 }
    ]
  }
];

// Mock Search databases for Global Search Modal (identical to V2)
const mockCoursesData = [
  { id: 'mc1', title: 'Full Stack MERN Developer Elite', desc: 'Master MongoDB, Express, React, Node.js with production scale.', duration: '9 Months' },
  { id: 'mc2', title: 'Data Science & Machine Learning Pro', desc: 'Stats, Python, Scikit-Learn, TensorFlow, and Deep Learning.', duration: '6 Months' },
  { id: 'mc3', title: 'Generative AI & LLM Engineering', desc: 'LangChain, Vector DBs, Fine-tuning, RAG, and prompt engineering.', duration: '3 Months' },
  { id: 'mc4', title: 'System Design Interview Prep', desc: 'Scale systems from zero to billions of daily active users.', duration: '2 Months' }
];

const mockEventsData = [
  { id: 'me1', title: 'System Design Bootcamp by Director of Eng', time: 'Today, 6:00 PM', speaker: 'Siddharth (Ex-Google)' },
  { id: 'me2', title: 'React 19 Hooks & Suspense Workshop', time: 'Tomorrow, 4:00 PM', speaker: 'Arjun (Vercel Core Contributor)' },
  { id: 'me3', title: 'Mock Interview Marathon with FAANG Mentors', time: '26th June, 10:00 AM', speaker: 'Panel of 4 Mentors' }
];

const mockResourcesData = [
  { id: 'mr1', title: 'DSA Ultimate Cheat Sheet & Checklist', type: 'PDF • 45 pages', category: 'DSA' },
  { id: 'mr2', title: 'System Design Template & Production Checklist', type: 'Markdown • 12 pages', category: 'Architecture' },
  { id: 'mr3', title: 'Clean Code Best Practices in JavaScript', type: 'PDF • 8 pages', category: 'Clean Code' }
];

interface LiveClassesV3Props {
  handleEnrollCourse: (courseId: string) => void;
  handleJoinClass: (courseId: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isScrolled?: boolean;
}

export const LiveClassesV3: React.FC<LiveClassesV3Props> = ({
  handleEnrollCourse,
  handleJoinClass,
  searchTerm,
  onSearchChange,
  isScrolled = false
}) => {
  const [activeTab, setActiveTab] = useState<'running' | 'upcoming' | 'past'>('running');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  
  // Cohort Swap Request states
  const [isSwapperOpen, setIsSwapperOpen] = useState(false);
  const [swapTargetSchedule, setSwapTargetSchedule] = useState('');
  const [swapReason, setSwapReason] = useState('');
  
  // Feedback states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // V2 Header replicating states
  const [primaryFilter, setPrimaryFilter] = useState<'weekly' | 'weekend'>('weekly');
  const [selectedSecondary, setSelectedSecondary] = useState<string[]>([]);
  const [activeStatus, setActiveStatus] = useState<'live' | 'upcoming' | 'past'>('live');
  
  // Global Search Modal states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeSearchTab, setActiveSearchTab] = useState<'live' | 'courses' | 'events' | 'resources'>('live');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle escape key to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync header activeStatus dot filter with vertical sidebar activeTab
  useEffect(() => {
    const targetTab = activeStatus === 'live' ? 'running' : activeStatus;
    if (activeTab !== targetTab) {
      setActiveTab(targetTab);
      setSelectedBatch(null); // Reset detail panel selection on tab change
    }
  }, [activeStatus]);

  // Sync vertical sidebar activeTab back to header activeStatus dot filter
  useEffect(() => {
    const targetStatus = activeTab === 'running' ? 'live' : activeTab;
    if (activeStatus !== targetStatus) {
      setActiveStatus(targetStatus);
    }
  }, [activeTab]);

  // Auto-select first batch on tab load
  useEffect(() => {
    const matching = mockBatches.filter(b => b.status === activeTab && b.scheduleType === primaryFilter);
    if (matching.length > 0 && !selectedBatch) {
      setSelectedBatch(matching[0]);
    }
  }, [activeTab, primaryFilter, selectedBatch]);

  // Category list chips configuration (same as V2)
  const secondaryChips = [
    { id: 'placement', label: 'Placement' },
    { id: 'revision', label: 'Revision' },
    { id: 'interview-prep', label: 'Interview Prep' },
    { id: 'projects', label: 'Projects' },
    { id: 'challenges', label: 'Challenges' }
  ];

  // Status badges configuration (same as V2)
  const statusFilters: {
    id: 'live' | 'upcoming' | 'past';
    label: string;
    icon: string;
    activeBg: string;
    activeBorder: string;
    activeText: string;
  }[] = [
    { 
      id: 'live', 
      label: 'Live Now', 
      icon: '🔴', 
      activeBg: 'bg-red-50', 
      activeBorder: 'border-red-200', 
      activeText: 'text-red-700' 
    },
    { 
      id: 'upcoming', 
      label: 'Upcoming', 
      icon: '📅', 
      activeBg: 'bg-blue-50', 
      activeBorder: 'border-blue-200', 
      activeText: 'text-blue-700' 
    },
    { 
      id: 'past', 
      label: 'Past (with recording)', 
      icon: '📼', 
      activeBg: 'bg-emerald-50', 
      activeBorder: 'border-emerald-200', 
      activeText: 'text-emerald-700' 
    }
  ];

  // Primary filters switching
  const handlePrimaryChange = (val: 'weekly' | 'weekend') => {
    setPrimaryFilter(val);
    setSelectedBatch(null);
  };

  // Status dot filters switching
  const handleStatusChange = (val: 'live' | 'upcoming' | 'past') => {
    setActiveStatus(val);
    setSelectedBatch(null);
  };

  // Category chip clicks
  const handleSecondaryClick = (id: string) => {
    setSelectedSecondary(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    setSelectedBatch(null);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setPrimaryFilter('weekly');
    setSelectedSecondary([]);
    setActiveStatus('live');
    setSearchQuery('');
    onSearchChange('');
    setSelectedBatch(null);
  };

  // Dynamic filter counts
  const runningCount = mockBatches.filter(b => b.status === 'running' && b.scheduleType === primaryFilter).length;
  const upcomingCount = mockBatches.filter(b => b.status === 'upcoming' && b.scheduleType === primaryFilter).length;
  const pastCount = mockBatches.filter(b => b.status === 'past' && b.scheduleType === primaryFilter).length;

  // Filter batches dynamically
  const filteredBatches = mockBatches.filter(batch => {
    // 1. Weekly / Weekend Schedule Filter
    if (batch.scheduleType !== primaryFilter) return false;

    // 2. Tab / Status Filter
    if (batch.status !== activeTab) return false;

    // 3. Category Chip filter (multi-select filter like V2)
    if (selectedSecondary.length > 0) {
      const matchesCategory = selectedSecondary.some(secId => {
        if (secId === 'placement') return batch.category === 'placement';
        if (secId === 'revision') return batch.category === 'revision';
        if (secId === 'interview-prep') return batch.category === 'placement' || batch.category === 'dsa';
        if (secId === 'projects') return batch.category === 'frontend' || batch.category === 'backend';
        if (secId === 'challenges') return batch.category === 'dsa';
        return false;
      });
      if (!matchesCategory) return false;
    }

    // 4. Search Filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const titleMatch = batch.title.toLowerCase().includes(query);
      const instructorMatch = batch.instructor.toLowerCase().includes(query);
      const tagMatch = batch.tags.some(tag => tag.toLowerCase().includes(query));
      return titleMatch || instructorMatch || tagMatch;
    }

    return true;
  });

  // Global search helpers
  const getFilteredLiveClasses = () => {
    if (!searchQuery.trim()) return mockBatches;
    const q = searchQuery.toLowerCase();
    return mockBatches.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.instructor.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  };

  const getFilteredCourses = () => {
    if (!searchQuery.trim()) return mockCoursesData;
    const q = searchQuery.toLowerCase();
    return mockCoursesData.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  };

  const getFilteredEvents = () => {
    if (!searchQuery.trim()) return mockEventsData;
    const q = searchQuery.toLowerCase();
    return mockEventsData.filter(e => e.title.toLowerCase().includes(q) || e.speaker.toLowerCase().includes(q));
  };

  const getFilteredResources = () => {
    if (!searchQuery.trim()) return mockResourcesData;
    const q = searchQuery.toLowerCase();
    return mockResourcesData.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
  };

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!swapTargetSchedule) return;
    
    setToastMessage(`Batch swap request submitted for ${selectedBatch?.title}! We will process this in 24 hours.`);
    setShowToast(true);
    setIsSwapperOpen(false);
    setSwapTargetSchedule('');
    setSwapReason('');
    
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const getAttendanceHealth = (attendance: number) => {
    if (attendance >= 90) return { label: 'Excellent', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' };
    if (attendance >= 80) return { label: 'Good Standing', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' };
    return { label: 'Attendance Warning', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-100' };
  };

  return (
    <div className="w-full relative min-h-screen pb-20 bg-slate-50/40">
      
      {/* 1. STICKY DISCOVERY BAR (Page Header identical to V2) */}
      <div className={`sticky top-0 z-30 bg-white border-b border-slate-150 px-4 sm:px-6 lg:px-10 shadow-sm transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4 sm:py-5'
      }`}>
        
        {/* Row 1: Title and Search (hidden when scrolled) */}
        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <h1 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] font-heading tracking-tight">Live Classes</h1>
              
              {/* Capsule Search Bar */}
              <button
                onClick={() => {
                  setActiveSearchTab('live');
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2.5 w-full sm:w-[280px] px-4 py-2 bg-slate-55 hover:bg-slate-100/60 border border-slate-200/50 text-slate-400 hover:text-slate-500 rounded-full transition-all text-[13px] cursor-pointer text-left shrink-0 font-medium"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-400">Search Live Classes</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 2: Filters */}
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center flex-wrap gap-4 sm:gap-5 min-w-0">
            
            {/* Primary Filter: Weekly / Weekend slider */}
            <div className="bg-[#0F172A] p-0.5 rounded-full flex items-center border border-slate-950/10 shadow-inner shrink-0">
              <button
                onClick={() => handlePrimaryChange('weekly')}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer select-none h-7 flex items-center justify-center ${
                  primaryFilter === 'weekly'
                    ? 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                    : 'text-slate-400 hover:text-white font-bold'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => handlePrimaryChange('weekend')}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer select-none h-7 flex items-center justify-center ${
                  primaryFilter === 'weekend'
                    ? 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                    : 'text-slate-400 hover:text-white font-bold'
                }`}
              >
                Weekend
              </button>
            </div>

            {/* Divider (Hidden below desktop) */}
            <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1 shrink-0"></div>

            {/* Secondary Filter: Text tabs */}
            <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-0.5 min-w-0">
              {secondaryChips.map(chip => {
                const isActive = selectedSecondary.includes(chip.id);
                return (
                  <button
                    key={chip.id}
                    onClick={() => handleSecondaryClick(chip.id)}
                    className={`relative py-1.5 text-xs font-extrabold tracking-tight transition-all cursor-pointer select-none whitespace-nowrap ${
                      isActive
                        ? 'text-slate-800 font-black'
                        : 'text-slate-400 hover:text-slate-655'
                    }`}
                  >
                    <span>{chip.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSecondaryLineV3"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider (Hidden below desktop) */}
            <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1 shrink-0"></div>

            {/* Third Filter: Status Dot selectors */}
            <div className="flex items-center gap-5 shrink-0">
              {statusFilters.map(status => {
                const isActive = activeStatus === status.id;
                const dotColor = 
                  status.id === 'live' 
                    ? 'bg-red-550' 
                    : status.id === 'upcoming'
                    ? 'bg-blue-500'
                    : 'bg-slate-400';
                return (
                  <button
                    key={status.id}
                    onClick={() => handleStatusChange(status.id)}
                    className={`flex items-center gap-1.5 text-xs font-extrabold transition-all cursor-pointer select-none ${
                      isActive ? 'text-slate-800 font-black' : 'text-slate-400 hover:text-slate-655 font-bold'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0 ${status.id === 'live' && isActive ? 'animate-pulse' : ''}`} />
                    <span>{status.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Side Options (Search capsule and Clear filters) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search capsule shown on right when scrolled */}
            {isScrolled && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setActiveSearchTab('live');
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-55 hover:bg-slate-100/60 border border-slate-200/50 text-slate-400 rounded-full transition-all text-[13px] font-semibold cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search Live Classes</span>
              </motion.button>
            )}

            {/* Clear Filters Button (Visible when filters are customized) */}
            {(selectedSecondary.length > 0 || activeStatus !== 'live' || primaryFilter !== 'weekly' || searchTerm !== '') && (
              <button
                onClick={handleClearAllFilters}
                className="text-xs font-bold text-red-650 hover:text-red-800 hover:bg-red-55/10 px-3 py-1.5 rounded-full border border-red-200/50 hover:border-red-300 flex items-center gap-1 cursor-pointer transition-all shrink-0 select-none bg-red-50/5 active:scale-[0.97]"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* 2. Main Page Content (V3 Side-Tabbed Cohort Hub Layout) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 space-y-12">
        
        {/* Cohort Hub Section */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left Side: Navigation Tab Sidebar & Grid Display */}
          <div className="flex-1 w-full min-w-0 space-y-6">
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* Tabs Sidebar Selector (Vertical on desktop, Horizontal on mobile) */}
              <div className="w-full md:w-[240px] shrink-0 bg-white border border-slate-200/60 rounded-[24px] shadow-sm overflow-hidden flex flex-row md:flex-col">
                
                {/* Running Batches Tab */}
                <button
                  onClick={() => { setActiveTab('running'); setSelectedBatch(null); }}
                  className={`flex-1 md:flex-initial flex items-center justify-between px-5 py-4 text-left transition-all cursor-pointer relative select-none border-b md:border-b-0 md:border-l-4 ${
                    activeTab === 'running'
                      ? 'bg-emerald-50/45 text-emerald-750 md:border-l-emerald-500 font-black'
                      : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs sm:text-[13px] tracking-tight">Active Batches</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold leading-none ${
                    activeTab === 'running' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {runningCount}
                  </span>
                  
                  {activeTab === 'running' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 md:hidden" />
                  )}
                </button>

                {/* Upcoming Batches Tab */}
                <button
                  onClick={() => { setActiveTab('upcoming'); setSelectedBatch(null); }}
                  className={`flex-1 md:flex-initial flex items-center justify-between px-5 py-4 text-left transition-all cursor-pointer relative select-none border-b md:border-b-0 md:border-l-4 ${
                    activeTab === 'upcoming'
                      ? 'bg-blue-50/45 text-blue-750 md:border-l-blue-500 font-black'
                      : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays className={`w-4 h-4 shrink-0 ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-slate-450'}`} />
                    <span className="text-xs sm:text-[13px] tracking-tight">Upcoming Cohorts</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold leading-none ${
                    activeTab === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {upcomingCount}
                  </span>

                  {activeTab === 'upcoming' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 md:hidden" />
                  )}
                </button>

                {/* Completed Batches Tab */}
                <button
                  onClick={() => { setActiveTab('past'); setSelectedBatch(null); }}
                  className={`flex-1 md:flex-initial flex items-center justify-between px-5 py-4 text-left transition-all cursor-pointer relative select-none md:border-l-4 ${
                    activeTab === 'past'
                      ? 'bg-purple-50/45 text-purple-750 md:border-l-purple-500 font-black'
                      : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'past' ? 'text-purple-600' : 'text-slate-450'}`} />
                    <span className="text-xs sm:text-[13px] tracking-tight">Past Cohorts</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold leading-none ${
                    activeTab === 'past' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {pastCount}
                  </span>

                  {activeTab === 'past' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 md:hidden" />
                  )}
                </button>
              </div>

              {/* Grid of Batch Cards */}
              <div className="flex-1 w-full min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + '-' + primaryFilter + '-' + selectedSecondary.join(',') + '-' + searchTerm}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {filteredBatches.map((batch) => {
                      const health = getAttendanceHealth(batch.attendance);
                      const isSelected = selectedBatch?.id === batch.id;
                      
                      return (
                        <motion.div
                          key={batch.id}
                          onClick={() => setSelectedBatch(batch)}
                          className={`bg-white border rounded-[24px] p-5.5 cursor-pointer flex flex-col justify-between h-[340px] transition-all duration-300 relative group select-none ${
                            isSelected
                              ? 'border-blue-500 ring-2 ring-blue-100 shadow-md'
                              : 'border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-blue-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.04)]'
                          }`}
                          whileHover={{ y: -3 }}
                        >
                          {/* Top corner status badges */}
                          <div className="absolute top-4 right-4 z-10">
                            {batch.status === 'running' ? (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                <span>ACTIVE COHORT</span>
                              </span>
                            ) : batch.status === 'upcoming' ? (
                              <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 fill-current text-amber-500 animate-pulse" />
                                <span>FAST FILLING</span>
                              </span>
                            ) : (
                              <span className="bg-purple-50 text-purple-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                                <UserCheck className="w-3 h-3 text-purple-500" />
                                <span>COMPLETED</span>
                              </span>
                            )}
                          </div>

                          {/* Card Top Block */}
                          <div className="space-y-3.5">
                            <div className="space-y-1">
                              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                                {batch.cohort}
                              </span>
                              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight font-heading group-hover:text-blue-600 transition-colors pr-20">
                                {highlightText(batch.title, searchTerm)}
                              </h3>
                            </div>

                            {/* Quick details chips */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] text-slate-605 bg-slate-55 px-2.5 py-1 rounded-lg font-bold">
                                {batch.instructor}
                              </span>
                              {batch.tags.slice(0, 2).map((tag, idx) => (
                                <span key={idx} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/10 font-medium">
                                  {highlightText(tag, searchTerm)}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Card Middle: Progress & Health indicators depending on status */}
                          <div className="border-y border-slate-100 py-3.5 space-y-3.5">
                            {batch.status === 'running' ? (
                              <div className="space-y-2">
                                {/* Progress bar */}
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-505 font-bold flex items-center gap-1">
                                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Syllabus Progress: <span className="text-slate-800 font-extrabold">Week {batch.currentWeek} of {batch.totalWeeks}</span></span>
                                  </span>
                                  <span className="font-bold text-blue-600">{batch.progressPercent}%</span>
                                </div>
                                <div className="w-full bg-[#e2e8f0] h-[6px] rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${batch.progressPercent}%` }} />
                                </div>
                                
                                {/* Attendance health metric */}
                                <div className="flex justify-between items-center text-[11px] pt-1">
                                  <span className="text-slate-400 font-semibold">Cohort Attendance:</span>
                                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${health.bg} ${health.text} ${health.border}`}>
                                    {batch.attendance}% • {health.label}
                                  </span>
                                </div>
                              </div>
                            ) : batch.status === 'upcoming' ? (
                              <div className="space-y-2">
                                {/* Seat progress bar */}
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-505 font-bold flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Allocated Seats: <span className="text-slate-800 font-extrabold">{batch.seatCount} of {batch.totalSeats}</span></span>
                                  </span>
                                  <span className="font-extrabold text-amber-600">
                                    {Math.round(((batch.seatCount || 0) / (batch.totalSeats || 1)) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-[#e2e8f0] h-[6px] rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500" 
                                    style={{ width: `${((batch.seatCount || 0) / (batch.totalSeats || 1)) * 100}%` }} 
                                  />
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Schedule: <span className="text-slate-700 font-semibold">{batch.schedule}</span></span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {/* Past batch overview */}
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-505 font-bold flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span>Total Classes Attended:</span>
                                  </span>
                                  <span className="text-slate-800 font-black">{batch.completedClasses} of {batch.totalClasses}</span>
                                </div>
                                <div className="w-full bg-emerald-500 h-[6px] rounded-full" />
                                
                                {/* Performance scorecard */}
                                <div className="flex justify-between items-center text-[11px] pt-1">
                                  <span className="text-slate-400 font-semibold">Mock Coding Rounds:</span>
                                  <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-100 font-bold text-[10px]">
                                    {batch.mockScore}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card Bottom: Actions / Context trigger */}
                          <div className="flex items-center justify-between pt-1 shrink-0">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-450" />
                              <span className="text-xs text-slate-600 font-bold">
                                {batch.nextSession}
                              </span>
                            </div>
                            <button
                              className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                              }`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                        </motion.div>
                      );
                    })}

                    {filteredBatches.length === 0 && (
                      <div className="col-span-2 bg-white border border-slate-200/60 rounded-[24px] p-12 text-center text-slate-400 font-bold text-xs shadow-sm space-y-2 h-[260px] flex flex-col items-center justify-center">
                        <div className="text-2xl">📭</div>
                        <p>No cohort batches match your active search and filters.</p>
                        <button 
                          onClick={handleClearAllFilters}
                          className="text-xs text-blue-600 hover:underline font-extrabold mt-1 cursor-pointer"
                        >
                          Reset Search Filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* Right Side: Interactive Cohort Utility Drawer Panel */}
          <div className="w-full xl:w-[360px] shrink-0 bg-white border border-slate-200/70 rounded-[28px] shadow-sm overflow-hidden p-6 space-y-6">
            <AnimatePresence mode="wait">
              {selectedBatch ? (
                <motion.div
                  key={selectedBatch.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6"
                >
                  {/* Panel Header */}
                  <div className="border-b border-slate-100 pb-4 space-y-2">
                    <span className="text-[9.5px] bg-blue-50 border border-blue-100 text-blue-700 font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-max">
                      {selectedBatch.cohort}
                    </span>
                    <h2 className="text-[17px] font-black text-slate-900 leading-snug tracking-tight font-heading">
                      {selectedBatch.title}
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Mentored by: <span className="text-slate-600 font-semibold">{selectedBatch.instructor}</span>
                    </p>
                  </div>

                  {/* Main Tab Controls depending on Status */}
                  {selectedBatch.status === 'running' && (
                    <>
                      {/* Live Session Join alert if batch has active session */}
                      {(selectedBatch.id === 'b-run-1' || selectedBatch.id === 'b-run-3') && (
                        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-[20px] p-4 text-white flex items-center justify-between shadow-lg shadow-red-500/10 mb-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-black bg-white/25 px-2 py-0.5 rounded uppercase tracking-wider block w-max">
                              LIVE NOW
                            </span>
                            <h4 className="text-xs font-bold leading-tight">
                              {selectedBatch.id === 'b-run-1' ? 'Week 9 Lecture is Active' : 'Week 2 Lecture is Active'}
                            </h4>
                          </div>
                          <button
                            onClick={() => handleJoinClass(selectedBatch.id === 'b-run-1' ? 'd1' : 'f1')}
                            className="bg-white hover:bg-slate-50 text-red-600 font-black px-3.5 py-1.5 rounded-xl text-[11px] transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-md shrink-0"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Join Lecture</span>
                          </button>
                        </div>
                      )}

                      {/* Attendance Metric Card */}
                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-[20px] flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100/50">
                            <Activity className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12px] font-bold text-slate-800">Your Attendance</span>
                            <span className="text-[10px] text-slate-400 font-medium">Weekly track score</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-800 block">{selectedBatch.attendance}%</span>
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide">HEALTHY</span>
                        </div>
                      </div>

                      {/* Interactive weekly timeline roadmap */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <h3 className="font-bold text-slate-700 flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            <span>Cohort Roadmap</span>
                          </h3>
                          <span className="text-[11px] text-blue-600 font-bold">Week {selectedBatch.currentWeek} Active</span>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-4 max-h-[160px] overflow-y-auto space-y-3 no-scrollbar shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                          {selectedBatch.syllabus.map((mile) => (
                            <div key={mile.week} className="flex gap-3 items-start relative">
                              {/* Line connecting milestones */}
                              {mile.week < selectedBatch.syllabus.length && (
                                <div className="absolute left-2 top-4 bottom-[-16px] w-0.5 bg-slate-200" />
                              )}
                              
                              {/* Circle Indicator */}
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                mile.status === 'completed' 
                                  ? 'bg-emerald-550 border-emerald-550 text-white' 
                                  : mile.status === 'active' 
                                  ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                                  : 'bg-white border-slate-300'
                              }`}>
                                {mile.status === 'completed' && <span className="text-[9px] font-bold">✓</span>}
                                {mile.status === 'active' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className={`text-[11.5px] font-bold ${
                                  mile.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-850'
                                }`}>
                                  Week {mile.week}: {mile.topic}
                                </p>
                                <span className={`text-[9px] font-bold ${
                                  mile.status === 'completed' ? 'text-emerald-600' : mile.status === 'active' ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                  {mile.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gamified Batch Peer Leaderboard */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span>Peer Leaderboard</span>
                        </h3>

                        <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-3.5 space-y-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                          {selectedBatch.leaderboard.map((peer) => (
                            <div 
                              key={peer.name} 
                              className={`flex items-center justify-between p-1.5 rounded-xl text-xs transition-all ${
                                peer.isUser 
                                  ? 'bg-blue-105 border border-blue-200/50' 
                                  : 'hover:bg-white/40'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className={`w-5 h-5 rounded-md font-black flex items-center justify-center text-[10px] ${
                                  peer.rank === 1 
                                    ? 'bg-amber-100 text-amber-800' 
                                    : peer.rank === 2 
                                    ? 'bg-slate-200 text-slate-800'
                                    : 'text-slate-500 font-semibold'
                                }`}>
                                  {peer.rank}
                                </span>
                                <span className={`font-bold truncate ${peer.isUser ? 'text-blue-700 font-extrabold' : 'text-slate-700'}`}>
                                  {peer.name} {peer.isUser && '(You)'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[10px] text-slate-500 font-semibold">{peer.xp} XP</span>
                                <span className="text-[10px] bg-orange-55 text-orange-600 font-bold px-1.5 py-0.5 rounded border border-orange-100 flex items-center gap-0.5">
                                  ⚡️ {peer.streak}d
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Schedule Swap Utility Buttons */}
                      <div className="pt-2">
                        <button
                          onClick={() => setIsSwapperOpen(true)}
                          className="w-full py-2.5 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/20 text-slate-600 hover:text-blue-600 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                          <span>Request Batch Schedule Swap</span>
                        </button>
                      </div>
                    </>
                  )}

                  {selectedBatch.status === 'upcoming' && (
                    <>
                      {/* Upcoming Pre-requisite Block */}
                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-[20px] space-y-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Sparkle className="w-4 h-4 text-amber-500 fill-amber-100" />
                          <span>Prep-Kit & Prerequisites</span>
                        </h3>
                        <p className="text-[11px] text-slate-550 leading-relaxed">
                          To guarantee a solid foundation, this cohort includes a free <strong>Javascript ES6 Foundation Module</strong> which you can start reading immediately.
                        </p>
                        <button
                          onClick={() => alert("Loading prep-kit modules... 📚")}
                          className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[10.5px] transition-all cursor-pointer select-none"
                        >
                          Launch Pre-Course Prep Kit
                        </button>
                      </div>

                      {/* Schedule slots overview */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-slate-450" />
                          <span>Available Lecture Slots</span>
                        </h3>
                        <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-4 space-y-3.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-505 font-medium">Standard slot:</span>
                            <span className="text-slate-800 font-bold">{selectedBatch.schedule}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-505 font-medium">First session:</span>
                            <span className="text-blue-600 font-extrabold">{selectedBatch.nextSession}</span>
                          </div>
                          <button
                            onClick={() => alert("Added to calendar! 📅")}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
                          >
                            <CalendarDays className="w-4 h-4" />
                            <span>Sync to Google Calendar</span>
                          </button>
                        </div>
                      </div>

                      {/* Fast-filling Seat Alert Banner */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-4 rounded-[20px] space-y-2">
                        <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-amber-605" />
                          <span>Seat Limit Reaching Soon</span>
                        </h3>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                          This high-demand cohort is already <strong>{Math.round(((selectedBatch.seatCount || 0) / (selectedBatch.totalSeats || 1)) * 100)}% full</strong>. We recommend securing your seat now to lock in your timings.
                        </p>
                        <button
                          onClick={() => handleEnrollCourse(selectedBatch.id)}
                          className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-550 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg text-[10.5px] transition-all cursor-pointer select-none shadow-sm"
                        >
                          Confirm Slot Pre-Registration
                        </button>
                      </div>
                    </>
                  )}

                  {selectedBatch.status === 'past' && (
                    <>
                      {/* Performance scorecard card */}
                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-[20px] space-y-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Mock Performance</span>
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-black text-slate-800 leading-none">{selectedBatch.mockScore?.split(' ')[0]}</span>
                          <span className="text-[10px] text-emerald-605 font-bold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">PASSED</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Your scores in problem solving, code formatting, and complexity analyses qualified you for our premier FAANG referral pipeline.
                        </p>
                      </div>

                      {/* Past Cohort Archives & Credentials downloads */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-slate-450" />
                          <span>Credentials & Archives</span>
                        </h3>

                        <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-3.5 space-y-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                          <button
                            onClick={() => alert("Downloading verified course certificate... 🎓")}
                            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none shadow-sm"
                          >
                            <FileDown className="w-4 h-4 text-slate-400" />
                            <span>Download Certificate</span>
                          </button>

                          <button
                            onClick={() => alert("Downloading full performance report card... 📊")}
                            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none shadow-sm"
                          >
                            <FileDown className="w-4 h-4 text-slate-400" />
                            <span>View Performance Report</span>
                          </button>

                          <button
                            onClick={() => alert("Opening complete recorded lecture library... 📺")}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none shadow-md shadow-blue-500/10"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Access Recorded Archives</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                </motion.div>
              ) : (
                <div className="h-[380px] flex flex-col items-center justify-center text-center text-slate-400 font-bold text-xs gap-2">
                  <Users className="w-10 h-10 text-slate-300" />
                  <p>Select a cohort batch card to manage standings, roadmaps, and credentials.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. Styled Visual Separator */}
        <div className="relative py-6 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200/60" />
          </div>
          <div className="relative bg-white border border-slate-200/80 shadow-sm rounded-full px-5 py-1.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">
              Upgradable FAANG Cohort Options
            </span>
          </div>
        </div>

        {/* 4. Upgrade Section: Premium Cohort FAANG Mentor Upgrades */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-955 p-8 sm:p-10 text-white shadow-xl border border-neutral-800 shrink-0">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/20 px-3 py-1 rounded-full text-xs font-bold text-blue-400 uppercase tracking-wider leading-none">
                <Trophy className="w-3.5 h-3.5 text-blue-500" />
                <span>Premium Cohorts</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-heading leading-tight text-neutral-100">
                Upgrade to FAANG Elite Mentorship Cohorts.
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Accelerate your journey by upgrading your active batches. Get mentored directly in small, closed 1-on-1 groups by engineering managers and staff developers from top-tier tech companies.
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-neutral-300 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                  <span>1-on-1 Weekly Code Debugging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                  <span>FAANG Priority Referrals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                  <span>Dedicated Q&A Support</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-64">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">PREMIUM COHORT UPGRADE</span>
                <div className="flex items-baseline justify-center gap-1.5 mt-1.5">
                  <span className="text-2xl font-extrabold text-neutral-100">₹1,499</span>
                  <span className="text-xs text-neutral-400">/ month</span>
                </div>
                <span className="text-[9px] text-amber-550 font-bold block mt-1">⚠️ 3 Slots left in May Cohort</span>
              </div>
              
              <button 
                onClick={() => alert("Launching premium cohort upgrade checkout... 🚀")}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                Secure Upgrade Spot
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 3. GLOBAL SEARCH MODAL (identical to V2) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex justify-center items-start pt-[10vh] overflow-y-auto px-4">
            
            <div className="fixed inset-0 cursor-default" onClick={() => setIsSearchOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative w-full max-w-[800px] bg-white rounded-[24px] shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[80vh] z-10"
            >
              
              {/* Top Search bar */}
              <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Live Classes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-slate-800 placeholder-slate-400 text-base font-semibold focus:outline-none"
                />
                
                <span className="text-[10px] text-slate-400 font-bold border border-slate-100 bg-slate-55 px-2 py-1 rounded">
                  ESC
                </span>
                
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs Switcher */}
              <div className="bg-slate-55 px-5 border-b border-slate-100 flex gap-4 overflow-x-auto no-scrollbar">
                {(['live', 'courses', 'events', 'resources'] as const).map((tab) => {
                  const label = tab === 'live' ? 'Live Classes' : tab === 'courses' ? 'Courses' : tab === 'events' ? 'Events' : 'Resources';
                  const isActive = activeSearchTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveSearchTab(tab)}
                      className={`py-3 px-1 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Search Results Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[300px]">
                
                {/* 1. Live Classes tab */}
                {activeSearchTab === 'live' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {searchQuery ? `Live Class Results (${getFilteredLiveClasses().length})` : 'Trending Live Classes'}
                    </div>
                    {getFilteredLiveClasses().length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {getFilteredLiveClasses().map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl border border-slate-100/60 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                <Monitor className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                                  {course.title}
                                </h4>
                                <div className="flex gap-2 items-center mt-1">
                                  <span className="text-[11px] text-slate-400 font-semibold">{course.totalClasses} Syllabus Classes</span>
                                  {course.status === 'running' && (
                                    <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">Live Now</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setIsSearchOpen(false);
                                if (course.status === 'running') {
                                  handleJoinClass(course.id === 'b-run-1' ? 'd1' : 'f1');
                                } else {
                                  handleEnrollCourse(course.id);
                                }
                              }}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl active:scale-95 transition-all cursor-pointer"
                            >
                              {course.status === 'running' ? 'Join Live' : 'Register'}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 text-sm font-bold">
                        No live classes found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Courses tab */}
                {activeSearchTab === 'courses' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {searchQuery ? `Career Programs (${getFilteredCourses().length})` : 'Popular Career Programs'}
                    </div>
                    {getFilteredCourses().length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {getFilteredCourses().map((c) => (
                          <div
                            key={c.id}
                            className="p-3.5 hover:bg-slate-50 rounded-2xl border border-slate-100/60 transition-colors flex items-center justify-between group"
                          >
                            <div className="space-y-1">
                              <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                  {c.title}
                              </h4>
                              <p className="text-slate-500 text-xs leading-normal">{c.desc}</p>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg shrink-0">
                              {c.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 text-sm font-bold">
                        No career programs found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Events tab */}
                {activeSearchTab === 'events' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {searchQuery ? `Workshops & Events (${getFilteredEvents().length})` : 'Featured Workshops'}
                    </div>
                    {getFilteredEvents().length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {getFilteredEvents().map((e) => (
                          <div
                            key={e.id}
                            className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl border border-slate-100/60 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                                <Calendar className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                                  {e.title}
                                </h4>
                                <p className="text-slate-400 text-xs mt-0.5">By {e.speaker} • {e.time}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setIsSearchOpen(false);
                                alert(`Successfully registered for the workshop: "${e.title}"!`);
                              }}
                              className="text-xs border border-amber-500 hover:bg-amber-50 text-amber-700 font-bold px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                            >
                              Register
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 text-sm font-bold">
                        No events found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Resources tab */}
                {activeSearchTab === 'resources' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {searchQuery ? `Learning Documents (${getFilteredResources().length})` : 'Popular Downloadables'}
                    </div>
                    {getFilteredResources().length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {getFilteredResources().map((r) => (
                          <div
                            key={r.id}
                            className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl border border-slate-100/60 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-50 text-emerald-605 rounded-xl flex items-center justify-center font-bold">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-emerald-605 transition-colors">
                                  {r.title}
                                </h4>
                                <p className="text-slate-400 text-xs mt-0.5">{r.type}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setIsSearchOpen(false);
                                alert(`Downloading: "${r.title}"...`);
                              }}
                              className="text-xs text-emerald-605 hover:text-emerald-750 hover:bg-emerald-50 font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
                            >
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-400 text-sm font-bold">
                        No resources found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Batch Swapper Request Dialog Modal */}
      <AnimatePresence>
        {isSwapperOpen && selectedBatch && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[28px] shadow-2xl p-6 max-w-md w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5 text-blue-650" />
                  <h3 className="text-lg font-black text-slate-800 font-heading leading-none">
                    Schedule Batch Swap
                  </h3>
                </div>
                <button
                  onClick={() => setIsSwapperOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-550 leading-relaxed">
                  Request to switch your active cohort <strong>{selectedBatch.title}</strong> to an alternative timing option.
                </p>
                <div className="bg-slate-55 border border-slate-200/50 rounded-xl p-3.5 text-xs text-slate-600">
                  Current Schedule: <span className="text-slate-800 font-bold">{selectedBatch.schedule}</span>
                </div>
              </div>

              <form onSubmit={handleSwapSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase block">Select Target Cohort Schedule</label>
                  <select
                    required
                    value={swapTargetSchedule}
                    onChange={(e) => setSwapTargetSchedule(e.target.value)}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="">-- Choose New Timing Slots --</option>
                    <option value="TTS Morning • 10:00 AM - 12:00 PM">TTS Morning • 10:00 AM - 12:00 PM</option>
                    <option value="TTS Evening • 6:30 PM - 8:30 PM">TTS Evening • 6:30 PM - 8:30 PM</option>
                    <option value="Weekend Batch • Sat, Sun 10:00 AM - 1:00 PM">Weekend Batch • Sat, Sun 10:00 AM - 1:00 PM</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase block">Reason for Swapping</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="E.g., timing clash with college lectures, office working hours changed, etc."
                    value={swapReason}
                    onChange={(e) => setSwapReason(e.target.value)}
                    className="w-full bg-slate-55 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium resize-none"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSwapperOpen(false)}
                    className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold rounded-xl text-xs transition-all cursor-pointer select-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-blue-650 hover:bg-blue-705 text-white font-bold rounded-xl text-xs transition-all cursor-pointer select-none shadow-md shadow-blue-500/10"
                  >
                    Submit Swap Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-6 left-6 z-50 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-[20px] shadow-2xl p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">Cohort Alert</span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {toastMessage}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
