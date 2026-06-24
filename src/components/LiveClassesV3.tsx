import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Play, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  GraduationCap, 
  Users, 
  FileDown, 
  Activity, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Trophy, 
  ArrowLeftRight, 
  CalendarDays,
  Sparkle
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
}

const mockBatches: Batch[] = [
  // Running Batches
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
      { rank: 4, name: 'Vikram Singh', xp: 1180, streak: 0 },
      { rank: 5, name: 'Nisha Gupta', xp: 950, streak: 3 }
    ]
  },

  // Upcoming Batches
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
    syllabus: [
      { week: 1, topic: 'React 19 Hooks, Actions & Server Features', status: 'upcoming' },
      { week: 2, topic: 'Vite Compilation, Bundling & Assets Pipelines', status: 'upcoming' },
      { week: 3, topic: 'Next.js App Router, SSR, SSG & ISR architectures', status: 'upcoming' },
      { week: 4, topic: 'React Server Components (RSCs) & Data Hydration', status: 'upcoming' },
      { week: 5, topic: 'Advanced State Orchestrations (Zustand & Context)', status: 'upcoming' },
      { week: 6, topic: 'Styling at Scale with Tailwind CSS v4 & CSS Tokens', status: 'upcoming' },
      { week: 7, topic: 'Next.js API Routes, Server Actions & Databases', status: 'upcoming' },
      { week: 8, topic: 'Core Web Vitals & Advanced Bundle Optimizations', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sanjay Kumar', xp: 0, streak: 12, isUser: true },
      { rank: 2, name: 'Rahul V.', xp: 0, streak: 0 },
      { rank: 3, name: 'Sneha M.', xp: 0, streak: 0 }
    ]
  },
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
    syllabus: [
      { week: 1, topic: 'Vertical vs Horizontal Scalability Architectures', status: 'upcoming' },
      { week: 2, topic: 'Load Balancers, Round-Robin & Consistent Hashing', status: 'upcoming' },
      { week: 3, topic: 'Caching Layers (Redis, Memcached) & Evictions', status: 'upcoming' },
      { week: 4, topic: 'Database Sharding, Replication & CAP Theorem', status: 'upcoming' },
      { week: 5, topic: 'Message Queues (Kafka, RabbitMQ) & Async Flows', status: 'upcoming' },
      { week: 6, topic: 'Microservices, API Gateways & gRPC Protocols', status: 'upcoming' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sanjay Kumar', xp: 0, streak: 12, isUser: true }
    ]
  },

  // Past Batches
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
    syllabus: [
      { week: 1, topic: 'Resume Building & ATS Optimization', status: 'completed' },
      { week: 2, topic: 'Aptitude Speed Hacks & Quantitative Math', status: 'completed' },
      { week: 3, topic: 'Behavioral Interviews & STAR Methodology', status: 'completed' },
      { week: 4, topic: 'DSA Mock Interviews (Arrays & Lists)', status: 'completed' },
      { week: 5, topic: 'System Design Mock Interviews (APIs)', status: 'completed' },
      { week: 6, topic: 'Salary Negotiation Hacks & Hiring Portals', status: 'completed' }
    ],
    leaderboard: [
      { rank: 1, name: 'Deepak Rao', xp: 3420, streak: 40 },
      { rank: 2, name: 'Sanjay Kumar', xp: 3290, streak: 12, isUser: true },
      { rank: 3, name: 'Aditi Sharma', xp: 3100, streak: 21 },
      { rank: 4, name: 'Priya Patel', xp: 2950, streak: 15 }
    ]
  }
];

interface LiveClassesV3Props {
  handleEnrollCourse: (courseId: string) => void;
  handleJoinClass: (courseId: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LiveClassesV3: React.FC<LiveClassesV3Props> = ({
  handleEnrollCourse,
  handleJoinClass,
  searchTerm,
  onSearchChange
}) => {
  const [activeTab, setActiveTab] = useState<'running' | 'upcoming' | 'past'>('running');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [isSwapperOpen, setIsSwapperOpen] = useState(false);
  const [swapTargetSchedule, setSwapTargetSchedule] = useState('');
  const [swapReason, setSwapReason] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchCategory, setSearchCategory] = useState<'all' | 'dsa' | 'ai' | 'frontend' | 'backend' | 'placement'>('all');

  // Filter batches by active tab, search term, and category
  const filteredBatches = mockBatches.filter(batch => {
    if (batch.status !== activeTab) return false;
    
    // Category match
    if (searchCategory !== 'all' && batch.category !== searchCategory) return false;
    
    // Search match
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const titleMatch = batch.title.toLowerCase().includes(query);
      const instructorMatch = batch.instructor.toLowerCase().includes(query);
      const tagMatch = batch.tags.some(tag => tag.toLowerCase().includes(query));
      return titleMatch || instructorMatch || tagMatch;
    }
    
    return true;
  });

  // Automatically open the first batch details as a default panel view on desktop if none selected
  useEffect(() => {
    const running = mockBatches.filter(b => b.status === activeTab);
    if (running.length > 0 && !selectedBatch) {
      setSelectedBatch(running[0]);
    }
  }, [activeTab, selectedBatch]);

  // Dynamic status tab counts
  const runningCount = mockBatches.filter(b => b.status === 'running').length;
  const upcomingCount = mockBatches.filter(b => b.status === 'upcoming').length;
  const pastCount = mockBatches.filter(b => b.status === 'past').length;

  // Handle schedule swap request submission
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

  // Get color for attendance health indicator
  const getAttendanceHealth = (attendance: number) => {
    if (attendance >= 90) return { label: 'Excellent', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' };
    if (attendance >= 80) return { label: 'Good Standing', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' };
    return { label: 'Attendance Warning', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-100' };
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-12">
      
      {/* 1. Header Hero Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 leading-none shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>COHORT BATCHES v3</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Your Learning Cohort Hub
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-xl">
            Manage your active learning batches, pre-register for upcoming specializations, and download verified credentials from your completed cohorts.
          </p>
        </div>

        {/* Dynamic global metrics bar */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 p-2.5 rounded-[20px] shrink-0">
          <div className="px-3 py-1.5 bg-white border border-slate-150 rounded-xl text-center shadow-sm">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Active Batches</span>
            <span className="text-base font-extrabold text-slate-800 leading-none">{runningCount}</span>
          </div>
          <div className="px-3 py-1.5 bg-white border border-slate-150 rounded-xl text-center shadow-sm">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Average Attendance</span>
            <span className="text-base font-extrabold text-emerald-600 leading-none">91%</span>
          </div>
          <div className="px-3 py-1.5 bg-white border border-slate-150 rounded-xl text-center shadow-sm">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Certificates Earned</span>
            <span className="text-base font-extrabold text-blue-600 leading-none">{pastCount}</span>
          </div>
        </div>
      </div>

      {/* 2. Unified Side-Tabbed Batch Cohort Hub */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left Side: Navigation Tab Sidebar & Grid Display */}
        <div className="flex-1 w-full min-w-0 space-y-6">
          
          {/* Category Quick Chips Filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSearchCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                searchCategory === 'all'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Categories
            </button>
            {['dsa', 'ai', 'frontend', 'backend', 'placement'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border uppercase ${
                  searchCategory === cat
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat === 'dsa' ? 'DSA' : cat === 'ai' ? 'Generative AI' : cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            {/* Tabs Sidebar Selector (Vertical on desktop, Horizontal on mobile) */}
            <div className="w-full md:w-[240px] shrink-0 bg-white border border-slate-200/60 rounded-[24px] shadow-sm overflow-hidden flex flex-row md:flex-col">
              
              {/* Running Batches Tab */}
              <button
                onClick={() => { setActiveTab('running'); setSelectedBatch(null); }}
                className={`flex-1 md:flex-initial flex items-center justify-between px-5 py-4 text-left transition-all cursor-pointer relative select-none border-b md:border-b-0 md:border-l-4 ${
                  activeTab === 'running'
                    ? 'bg-emerald-50/45 text-emerald-700 md:border-l-emerald-500 font-bold'
                    : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-semibold'
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
                    ? 'bg-blue-50/45 text-blue-700 md:border-l-blue-500 font-bold'
                    : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className={`w-4 h-4 shrink-0 ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-slate-400'}`} />
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
                    ? 'bg-purple-50/45 text-purple-700 md:border-l-purple-500 font-bold'
                    : 'text-slate-500 hover:bg-slate-50/60 md:border-l-transparent font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'past' ? 'text-purple-600' : 'text-slate-400'}`} />
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
                  key={activeTab + '-' + searchCategory + '-' + searchTerm}
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
                        className={`bg-white border rounded-[24px] p-5 cursor-pointer flex flex-col justify-between h-[340px] transition-all duration-300 relative group select-none ${
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
                              <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                              <span>FAST FILLING</span>
                            </span>
                          ) : (
                            <span className="bg-purple-50 text-purple-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                              <UserCheck className="w-3 h-3" />
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
                            <span className="text-[10px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-semibold border border-slate-200/40">
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
                                <span className="text-slate-500 font-semibold flex items-center gap-1">
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
                                <span className="text-slate-400 font-medium">Cohort Attendance:</span>
                                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${health.bg} ${health.text} ${health.border}`}>
                                  {batch.attendance}% • {health.label}
                                </span>
                              </div>
                            </div>
                          ) : batch.status === 'upcoming' ? (
                            <div className="space-y-2">
                              {/* Seat progress bar */}
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-semibold flex items-center gap-1">
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
                                <Clock className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                                <span>Schedule: <span className="text-slate-700 font-semibold">{batch.schedule}</span></span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {/* Past batch overview */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                                  <span>Total Classes Attended:</span>
                                </span>
                                <span className="text-slate-800 font-black">{batch.completedClasses} of {batch.totalClasses}</span>
                              </div>
                              <div className="w-full bg-emerald-500 h-[6px] rounded-full" />
                              
                              {/* Performance scorecard */}
                              <div className="flex justify-between items-center text-[11px] pt-1">
                                <span className="text-slate-400 font-medium">Mock Coding Rounds:</span>
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
                            <Calendar className="w-4 h-4 text-slate-400" />
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
                    <div className="col-span-2 bg-white border border-slate-200/60 rounded-[24px] p-12 text-center text-slate-400 font-bold text-xs shadow-sm space-y-2">
                      <div className="text-2xl">📭</div>
                      <p>No cohort batches match your active search and filters.</p>
                      <button 
                        onClick={() => { onSearchChange(''); setSearchCategory('all'); }}
                        className="text-xs text-blue-600 hover:underline font-extrabold mt-1"
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
                    {selectedBatch.id === 'b-run-1' && (
                      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-[20px] p-4 text-white flex items-center justify-between shadow-lg shadow-red-500/10 mb-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black bg-white/25 px-2 py-0.5 rounded uppercase tracking-wider block w-max">
                            LIVE NOW
                          </span>
                          <h4 className="text-xs font-bold leading-tight">
                            Week 9 Lecture is Active
                          </h4>
                        </div>
                        <button
                          onClick={() => handleJoinClass('d1')}
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
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : mile.status === 'active' 
                                ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                                : 'bg-white border-slate-300'
                            }`}>
                              {mile.status === 'completed' && <span className="text-[9px] font-bold">✓</span>}
                              {mile.status === 'active' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`text-[11.5px] font-bold ${
                                mile.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'
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
                                ? 'bg-blue-100 border border-blue-200/50' 
                                : 'hover:bg-white/40'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-5 h-5 rounded-md font-black flex items-center justify-center text-[10px] ${
                                peer.rank === 1 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : peer.rank === 2 
                                  ? 'bg-slate-200 text-slate-800'
                                  : 'text-slate-500'
                              }`}>
                                {peer.rank}
                              </span>
                              <span className={`font-bold truncate ${peer.isUser ? 'text-blue-700 font-extrabold' : 'text-slate-700'}`}>
                                {peer.name} {peer.isUser && '(You)'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[10px] text-slate-500 font-semibold">{peer.xp} XP</span>
                              <span className="text-[10px] bg-orange-50 text-orange-600 font-bold px-1.5 py-0.5 rounded border border-orange-100 flex items-center gap-0.5">
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
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        To guarantee a solid foundation, this cohort includes a free **Javascript ES6 Foundation Module** which you can start reading immediately.
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
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Available Lecture Slots</span>
                      </h3>
                      <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-4 space-y-3.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium">Standard slot:</span>
                          <span className="text-slate-800 font-bold">{selectedBatch.schedule}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium">First session:</span>
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
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>Seat Limit Reaching Soon</span>
                      </h3>
                      <p className="text-[11px] text-amber-700 leading-relaxed">
                        This high-demand cohort is already **{Math.round(((selectedBatch.seatCount || 0) / (selectedBatch.totalSeats || 1)) * 100)}% full**. We recommend securing your seat now to lock in your morning timings.
                      </p>
                      <button
                        onClick={() => handleEnrollCourse(selectedBatch.id)}
                        className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg text-[10.5px] transition-all cursor-pointer select-none shadow-sm"
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
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">PASSED</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Your scores in problem solving, code formatting, and complexity analyses qualified you for our premier FAANG referral pipeline.
                      </p>
                    </div>

                    {/* Past Cohort Archives & Credentials downloads */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        <span>Credentials & Archives</span>
                      </h3>

                      <div className="bg-slate-50 border border-slate-200/50 rounded-[20px] p-3.5 space-y-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                        <button
                          onClick={() => alert("Downloading verified course certificate... 🎓")}
                          className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                        >
                          <FileDown className="w-4 h-4 text-slate-400" />
                          <span>Download Certificate</span>
                        </button>

                        <button
                          onClick={() => alert("Downloading full performance report card... 📊")}
                          className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
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
                <p>Select a cohort batch card to manage attendance, roadmaps, peer standings, and credentials.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 3. Styled Visual Separator */}
      <div className="relative py-6 flex items-center justify-center">
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
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-950 p-8 sm:p-10 text-white shadow-xl border border-neutral-800">
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
              Accelerate your journey by upgrading your active batches. Get mentored directly in small, closed 1-on-1 groups by engineering managers and staff developers from top-tier tech companies. Includes weekly dedicated code reviews, resume overhauls, and priority career referrals.
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-neutral-300 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                <span>1-on-1 Weekly Code Debugging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                <span>FAANG Priority Referrals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10" />
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
              <span className="text-[9px] text-amber-500 font-bold block mt-1">⚠️ 3 Slots left in May Cohort</span>
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

      {/* 5. Batch Swapper Request Dialog Modal */}
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
                  <ArrowLeftRight className="w-5 h-5 text-blue-600" />
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
                <p className="text-xs text-slate-500 leading-relaxed">
                  Request to switch your active cohort **{selectedBatch.title}** to an alternative timing option.
                </p>
                <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 text-xs text-slate-600">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium resize-none"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSwapperOpen(false)}
                    className="w-1/2 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer select-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer select-none shadow-md shadow-blue-500/10"
                  >
                    Submit Swap Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Feedback Toast Notification */}
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
