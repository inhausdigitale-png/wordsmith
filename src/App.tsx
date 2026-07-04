import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import CourseDetail from './components/CourseDetail';
import BookStore from './components/BookStore';
import { 
  COURSES_DATA, 
  TRAINERS_DATA, 
  TESTIMONIALS_DATA, 
  VIDEOS_DATA, 
  BLOGS_DATA, 
  CAREER_OPENINGS_DATA, 
  FREQUENT_QUESTIONS,
  BOOKS_DATA
} from './data';
import { Course, BlogItem, VideoItem, CareerOpening, Book } from './types';
import { storage } from './lib/storage';
import { 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Play, 
  FileText, 
  Award, 
  Star, 
  MessageSquare, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  Upload, 
  Check, 
  Calendar, 
  Briefcase, 
  Search,
  Filter
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  
  // Detail views state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Filter state for Videos & Blogs
  const [videoFilter, setVideoFilter] = useState<string>('All');
  const [blogFilter, setBlogFilter] = useState<string>('All');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Notification Banner State
  const [successToast, setSuccessToast] = useState<{ message: string; subText?: string } | null>(null);

  // Form States
  // 1. Enquiry Form (Contact page)
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    course: 'Beginner Spoken English Course',
    preferredBatch: 'Evening (7:30 PM - 9:00 PM)',
    message: ''
  });

  // 2. Demo Booking Form (Demo page)
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Beginner Spoken English Course',
    preferredDate: '',
    preferredTime: '10:00 AM'
  });

  // 3. Career Application Form (Careers page)
  const [careerForm, setCareerForm] = useState({
    position: 'Spoken English Trainer',
    openingId: 'career-trainer-spoken',
    fullName: '',
    email: '',
    phone: '',
    experience: '2 years',
    resumeName: '',
    coverLetter: ''
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Auto scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Toast auto-dismissal
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => {
        setSuccessToast(null);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Handle Form Submissions
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.fullName || !enquiryForm.mobileNumber) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    storage.addEnquiry({
      fullName: enquiryForm.fullName,
      mobileNumber: enquiryForm.mobileNumber,
      email: enquiryForm.email || 'not-provided@example.com',
      course: enquiryForm.course,
      preferredBatch: enquiryForm.preferredBatch,
      message: enquiryForm.message
    });

    setSuccessToast({
      message: 'Enquiry Received Successfully!',
      subText: 'Our academic counselors will touch base with you within 2 hours.'
    });

    // Reset Form
    setEnquiryForm({
      fullName: '',
      mobileNumber: '',
      email: '',
      course: 'Beginner Spoken English Course',
      preferredBatch: 'Evening (7:30 PM - 9:00 PM)',
      message: ''
    });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.phone || !demoForm.preferredDate) {
      alert('Please fill in your name, phone number, and preferred date.');
      return;
    }

    storage.addBooking({
      name: demoForm.name,
      phone: demoForm.phone,
      email: demoForm.email || 'not-provided@example.com',
      course: demoForm.course,
      preferredDate: demoForm.preferredDate,
      preferredTime: demoForm.preferredTime
    });

    setSuccessToast({
      message: 'Free Live Demo Class Booked!',
      subText: `Your slot on ${demoForm.preferredDate} at ${demoForm.preferredTime} is pre-confirmed. A calendar invitation has been sent.`
    });

    // Reset Form
    setDemoForm({
      name: '',
      phone: '',
      email: '',
      course: 'Beginner Spoken English Course',
      preferredDate: '',
      preferredTime: '10:00 AM'
    });
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.fullName || !careerForm.email || !careerForm.phone) {
      alert('Please provide your name, email, and phone number.');
      return;
    }

    storage.addApplication({
      openingId: careerForm.openingId,
      position: careerForm.position,
      fullName: careerForm.fullName,
      email: careerForm.email,
      phone: careerForm.phone,
      experience: careerForm.experience,
      resumeName: careerForm.resumeName || 'Applicant_Resume_CV.pdf',
      coverLetter: careerForm.coverLetter
    });

    setSuccessToast({
      message: 'Application Submitted Successfully!',
      subText: `Thank you for applying for the ${careerForm.position} role. Our academic team is reviewing your profile.`
    });

    // Reset Form
    setCareerForm({
      position: 'Spoken English Trainer',
      openingId: 'career-trainer-spoken',
      fullName: '',
      email: '',
      phone: '',
      experience: '2 years',
      resumeName: '',
      coverLetter: ''
    });
  };

  const simulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const fileName = e.target.files[0].name;
      setTimeout(() => {
        setCareerForm(prev => ({ ...prev, resumeName: fileName }));
        setIsUploading(false);
      }, 1200);
    }
  };

  // Helper to open course detail & route
  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to route to demo and pre-populate course selection
  const handleBookDemoWithCourse = (courseTitle: string) => {
    setDemoForm(prev => ({ ...prev, course: courseTitle }));
    setActiveTab('demo');
    setSelectedCourse(null);
    setSelectedBlog(null);
  };

  // Categories list extraction
  const videoCategories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Daily Conversations', 'Business English', 'IELTS Tips', 'Student Success Stories', 'Public Speaking'];
  const blogCategories = ['All', 'Spoken English Tips', 'Grammar', 'Vocabulary', 'Interview Skills', 'Business English', 'IELTS', 'Pronunciation', 'Career Development'];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 antialiased font-sans">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-gray-950 text-white border border-emerald-500 p-5 rounded-2xl shadow-2xl flex items-start space-x-4 animate-slide-in">
          <div className="bg-emerald-600 p-2.5 rounded-xl text-white shrink-0">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <p className="font-extrabold text-sm tracking-tight text-white">{successToast.message}</p>
            {successToast.subText && (
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">{successToast.subText}</p>
            )}
            <p className="text-[10px] text-emerald-400 font-mono mt-2 uppercase tracking-widest font-bold">● Active Lead Saved</p>
          </div>
        </div>
      )}

      {/* Admin CRM Overlay View */}
      {isAdminMode ? (
        <AdminPanel onClose={() => setIsAdminMode(false)} />
      ) : (
        <>
          {/* Default Header/Navbar */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedCourse(null);
              setSelectedBlog(null);
            }} 
            onOpenAdmin={() => setIsAdminMode(true)}
            isAdminMode={isAdminMode}
          />

          {/* Breadcrumb row if viewing details */}
          {selectedCourse && (
            <div className="bg-gray-50 border-b border-gray-100 py-3">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs font-semibold text-gray-500">
                <button onClick={() => { setSelectedCourse(null); }} className="hover:text-emerald-600">Home</button>
                <ChevronRight className="h-3.5 w-3.5" />
                {selectedCourse && (
                  <>
                    <button onClick={() => { setSelectedCourse(null); setActiveTab('courses'); }} className="hover:text-emerald-600">Courses</button>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-gray-900 font-bold truncate">{selectedCourse.title}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Render Course Detail explicitly if selected */}
          {selectedCourse ? (
            <div className="py-10 bg-gray-50/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CourseDetail 
                  course={selectedCourse} 
                  onClose={() => setSelectedCourse(null)} 
                  onBookDemo={handleBookDemoWithCourse}
                />
              </div>
            </div>
          ) : (
            /* Render Main Tabs Section */
            <main className="flex-1">

              {/* TAB 1: HOME */}
              {activeTab === 'home' && (
                <>
                  {/* Hero Banner Section */}
                  <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden border-b border-slate-900">
                    {/* Background abstract texture */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-800/40 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
                            <span>★</span>
                            <span>Most Trusted Spoken English Institute</span>
                          </div>
                          
                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-sans tracking-tight leading-none">
                            Speak English with Confidence. <span className="text-emerald-500 block sm:inline">Unlock Global Opportunities.</span>
                          </h1>

                          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal">
                            Whether you're a beginner, student, job seeker, or working professional, our practical English courses help you communicate confidently in every situation.
                          </p>

                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                              onClick={() => setActiveTab('demo')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-emerald-900/30 text-center cursor-pointer"
                            >
                              Book Free Demo
                            </button>
                            <button
                              onClick={() => setActiveTab('courses')}
                              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl text-base font-bold transition-all text-center cursor-pointer"
                            >
                              Explore Courses
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 max-w-xl">
                            <div>
                              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">10,000+</p>
                              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Learners Trained</p>
                            </div>
                            <div>
                              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">10-12</p>
                              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Max Batch Size</p>
                            </div>
                            <div>
                              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9/5</p>
                              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Google Rating</p>
                            </div>
                          </div>
                        </div>

                        {/* Banner Image / Vector box */}
                        <div className="lg:col-span-5 relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-3xl blur-md opacity-20 pointer-events-none" />
                          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
                              alt="English Academy Group"
                              referrerPolicy="no-referrer"
                              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md border border-slate-700"
                            />
                            <div className="space-y-3.5">
                              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">⭐ Daily Interactive Cohort</p>
                              <p className="text-sm font-bold text-white">"I learned to present ideas without translating in my mind first!"</p>
                              <p className="text-xs text-gray-400">— Priya S., Business English Alumna</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Welcome Section */}
                  <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Our Core Philosophy</p>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                            Welcome to Wordsmith Academy
                          </h2>
                          <div className="h-1 w-20 bg-emerald-600 mt-4 rounded-full" />
                          
                          <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                            At Wordsmith Academy, we believe English is a life skill—not just a subject. Our practical learning approach focuses on speaking, listening, vocabulary, pronunciation, and confidence through interactive classroom sessions and real-world conversations.
                          </p>
                          <p className="text-gray-600 text-base mt-4 leading-relaxed">
                            We do not expect you to memorize grammar formulas. We teach language structure intuitively through everyday exercises, situational dialogues, public speaking training, and individual performance mentoring.
                          </p>

                          <div className="flex flex-wrap gap-4 pt-6">
                            <span className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200">
                              ✓ Speaking First Approach
                            </span>
                            <span className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200">
                              ✓ Native Assessment Metrics
                            </span>
                            <span className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200">
                              ✓ Certified Master Facilitators
                            </span>
                          </div>
                        </div>

                        {/* Interactive Feature Bento Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl">
                            <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl inline-block">
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900 mt-4">Structured Curriculum</h4>
                            <p className="text-xs text-gray-500 mt-2">Mapped from Cambridge CEFR levels to ensure standardized progress outcomes.</p>
                          </div>

                          <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl">
                            <div className="bg-indigo-100 text-indigo-800 p-3 rounded-xl inline-block">
                              <Users className="h-6 w-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900 mt-4">Interactive Sessions</h4>
                            <p className="text-xs text-gray-500 mt-2">80% of class time is allocated purely for speaking drills and conversations.</p>
                          </div>

                          <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl">
                            <div className="bg-amber-100 text-amber-800 p-3 rounded-xl inline-block">
                              <Award className="h-6 w-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900 mt-4">Certified Badges</h4>
                            <p className="text-xs text-gray-500 mt-2">Showcase your verified Wordsmith completion badge on resume & LinkedIn.</p>
                          </div>

                          <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl">
                            <div className="bg-rose-100 text-rose-800 p-3 rounded-xl inline-block">
                              <MessageSquare className="h-6 w-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900 mt-4">One-on-One Mentoring</h4>
                            <p className="text-xs text-gray-500 mt-2">Get personalized daily voice-note corrections from your assigned trainer.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Featured Courses Section */}
                  <section className="py-20 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Top Professional Tracks</p>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                            Our Featured Programs
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">High-impact programs explicitly crafted for target communicative needs.</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('courses')}
                          className="mt-4 md:mt-0 text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Explore All Courses ({COURSES_DATA.length})</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Displaying 4 Top Featured Courses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COURSES_DATA.slice(0, 4).map((course) => (
                          <div 
                            key={course.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                            onClick={() => handleOpenCourse(course)}
                          >
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                              <img
                                src={course.image}
                                alt={course.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                                  {course.category}
                                </span>
                                <h4 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                  {course.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                                  {course.shortDescription}
                                </p>
                              </div>
                              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-600">
                                <span>{course.mode}</span>
                                <span className="text-emerald-600 group-hover:underline">Study Details →</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Why Students Choose Us */}
                  <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Engineered for Success</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                          Why Students Choose Wordsmith Academy
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">Our practical design values outcomes over typical textbook study methods.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                          {
                            title: 'Certified Trainers',
                            desc: 'All lessons are curated and conducted by CELTA, IDP, and British Council certified communication experts with decades of aggregate experience.',
                            icon: Award,
                            color: 'emerald'
                          },
                          {
                            title: 'Practical Speaking Sessions',
                            desc: 'We allocate 80% of our session timings for interactive speech modeling, real-world case simulation, storytelling, and instant correction loops.',
                            icon: MessageSquare,
                            color: 'indigo'
                          },
                          {
                            title: 'Small Batch Sizes',
                            desc: 'We limit class capacity strictly to 10-12 learners to ensure every student has ample opportunities to speak and receive tailored evaluations.',
                            icon: Users,
                            color: 'amber'
                          },
                          {
                            title: 'Online & Offline Classes',
                            desc: 'Switch fluidly between interactive live Zoom classes or immersive physical classrooms at our premium high-end head center facilities.',
                            icon: MapPin,
                            color: 'rose'
                          },
                          {
                            title: 'Flexible Timings',
                            desc: 'Accommodating batches across early morning, late evening, weekend fast-tracks, and customized corporate scheduling to suit busy lives.',
                            icon: Clock,
                            color: 'sky'
                          },
                          {
                            title: 'Course Completion Certificate',
                            desc: 'Stand out in job interviews. Receive our verified completion credential highlighting your communicative capability and assessment grades.',
                            icon: CheckCircle2,
                            color: 'emerald'
                          }
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="bg-gray-50 border border-gray-200/60 p-7 rounded-2xl relative transition-transform hover:-translate-y-1">
                              <div className="bg-emerald-100 text-emerald-800 p-3.5 rounded-xl inline-block">
                                <Icon className="h-6 w-6" />
                              </div>
                              <h4 className="text-lg font-bold text-gray-900 mt-5">{item.title}</h4>
                              <p className="text-sm text-gray-500 mt-2.5 leading-relaxed">{item.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Testimonials Review Slider Section */}
                  <section className="py-20 bg-slate-950 text-white border-y border-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                        <div>
                          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Real Student Journeys</p>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-sans tracking-tight">
                            Testimonials & Success Stories
                          </h2>
                          <p className="text-sm text-gray-400 mt-1">Review verified testimonials from graduates who found confidence at our academy.</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('about')}
                          className="mt-4 md:mt-0 text-emerald-400 hover:text-emerald-300 text-sm font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Meet Our Mentors →</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TESTIMONIALS_DATA.map((t, idx) => (
                          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between">
                            <div>
                              <div className="flex items-center space-x-4 mb-6">
                                <img
                                  src={t.image}
                                  alt={t.name}
                                  referrerPolicy="no-referrer"
                                  className="h-14 w-14 rounded-full object-cover border-2 border-emerald-500"
                                />
                                <div>
                                  <h4 className="text-base font-bold text-white">{t.name}</h4>
                                  <p className="text-xs text-emerald-400 font-semibold">{t.course} Alumnus</p>
                                </div>
                              </div>
                              <div className="flex space-x-1 mb-4 text-amber-400">
                                {[...Array(t.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                                ))}
                              </div>
                              <p className="text-gray-300 text-sm italic leading-relaxed mb-6">
                                "{t.review}"
                              </p>
                            </div>
                            
                            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-red-400 font-bold block mb-1">Before Wordsmith:</span>
                                  <span className="text-gray-400">{t.beforeExperience}</span>
                                </div>
                                <div className="border-l border-slate-800 pl-4">
                                  <span className="text-emerald-400 font-bold block mb-1">After Wordsmith:</span>
                                  <span className="text-white font-medium">{t.afterExperience}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Latest Videos Section */}
                  <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Learn On the Go</p>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                            Latest Free Video Lessons
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">Unlock expert-led micro lessons on grammar, interviews, and fluency.</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('videos')}
                          className="mt-4 md:mt-0 text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Open Free Video Gallery ({VIDEOS_DATA.length})</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {VIDEOS_DATA.slice(0, 3).map((vid) => (
                          <div 
                            key={vid.id} 
                            onClick={() => { setSelectedVideo(vid); setActiveTab('videos'); }}
                            className="bg-gray-50 border border-gray-200/60 rounded-2xl overflow-hidden group cursor-pointer hover:border-gray-300"
                          >
                            <div className="relative h-44 bg-gray-900 flex items-center justify-center">
                              <img
                                src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400`}
                                alt={vid.title}
                                referrerPolicy="no-referrer"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-300"
                              />
                              <div className="bg-emerald-600 text-white p-3.5 rounded-full shadow-lg relative z-10 transition-transform group-hover:scale-110">
                                <Play className="h-5 w-5 fill-white ml-0.5" />
                              </div>
                              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                                {vid.duration}
                              </span>
                            </div>
                            <div className="p-4">
                              <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">
                                {vid.category}
                              </span>
                              <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                {vid.title}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">Free Lesson • Stream On YouTube</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Contact CTA Section */}
                  <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-t border-emerald-900">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                      <p className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest">Ignite Your Potential</p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight font-sans">
                        Ready to speak English confidently?
                      </h2>
                      <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto font-normal">
                        Book your FREE Demo Class today and experience our unique learning method firsthand.
                      </p>
                      <div className="flex justify-center space-x-4 pt-2">
                        <button
                          onClick={() => setActiveTab('demo')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 text-sm cursor-pointer transition-colors"
                        >
                          Book FREE Demo Now
                        </button>
                        <button
                          onClick={() => setActiveTab('contact')}
                          className="bg-emerald-900 hover:bg-emerald-850 text-white border border-emerald-700/60 font-bold px-8 py-3.5 rounded-xl text-sm cursor-pointer transition-colors"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {/* TAB 2: ABOUT US */}
              {activeTab === 'about' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Who We Are</p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        About Wordsmith Academy
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-base text-gray-500 mt-4 leading-relaxed">
                        Founded with a passion for transforming communication skills, Wordsmith Academy has helped thousands of learners become confident English speakers.
                      </p>
                    </div>

                    {/* Story Block */}
                    <div className="bg-gray-50 border border-gray-200/60 p-8 sm:p-12 rounded-3xl mb-16">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
                            Our Methodology & Design
                          </h2>
                          <p className="text-gray-600 text-base leading-relaxed">
                            We focus on practical communication instead of rote memorization. Every class is designed to build confidence through speaking activities, role plays, discussions, presentations, and personalized mentoring.
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Our research shows that confidence is 80% psychological and 20% technical. By removing grammatical anxiety in the first few weeks, we help students open their voices freely.
                          </p>
                          <div className="pt-4 flex items-center space-x-6 text-sm">
                            <div>
                              <p className="text-2xl font-black text-emerald-600">5,000+</p>
                              <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">Lives Changed</p>
                            </div>
                            <div className="border-l border-gray-300 pl-6">
                              <p className="text-2xl font-black text-indigo-600">100%</p>
                              <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">Outcome Focused</p>
                            </div>
                          </div>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600" 
                          alt="Classroom Discussions" 
                          referrerPolicy="no-referrer"
                          className="w-full h-64 object-cover rounded-2xl border border-gray-200"
                        />
                      </div>
                    </div>

                    {/* Mission & Vision Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                      <div className="bg-emerald-950 text-white p-8 rounded-3xl border border-emerald-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-800/10 rounded-bl-full pointer-events-none" />
                        <h3 className="text-xl font-bold text-emerald-400 mb-4">Our Mission</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          To empower individuals with practical English communication skills that help them succeed in education, careers, and everyday life. We seek to break boundaries of speech hesitation universally.
                        </p>
                      </div>

                      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-24 w-24 bg-slate-800/20 rounded-bl-full pointer-events-none" />
                        <h3 className="text-xl font-bold text-emerald-400 mb-4">Our Vision</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          To become one of the leading English communication institutes by delivering world-class training with measurable outcomes and customized technology.
                        </p>
                      </div>
                    </div>

                    {/* Values Grid */}
                    <div className="mb-20">
                      <h3 className="text-2xl font-extrabold text-gray-950 mb-8 text-center font-sans">Our Core Values</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                          { title: 'Student First', desc: 'Every milestone assessment is customized to the student’s unique pace.' },
                          { title: 'Excellence in Teaching', desc: 'No shortcuts. We use strict standard lesson rubrics.' },
                          { title: 'Continuous Learning', desc: 'Our syllabus is updated regularly with latest professional vocabulary.' },
                          { title: 'Practical Communication', desc: 'No boring writing worksheets. We focus on speaking.' },
                          { title: 'Confidence Building', desc: 'We coach stage presence, posture, body language, and speech tone.' }
                        ].map((v, idx) => (
                          <div key={idx} className="bg-gray-50 border border-gray-200/60 p-5 rounded-2xl">
                            <span className="text-emerald-600 font-bold text-sm block mb-1">0{idx+1}.</span>
                            <h4 className="text-sm font-bold text-gray-900">{v.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trainers Section */}
                    <section className="border-t border-gray-200 pt-16">
                      <div className="text-center max-w-2xl mx-auto mb-12">
                        <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Meet Our Faculty</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1 font-sans">
                          Experienced Trainers
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Certified mentors who have guided thousands of learners towards corporate readiness.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TRAINERS_DATA.map((trainer, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
                            <div className="p-6">
                              <img
                                src={trainer.image}
                                alt={trainer.name}
                                referrerPolicy="no-referrer"
                                className="h-44 w-full object-cover rounded-xl mb-4 border border-gray-100"
                              />
                              <h4 className="text-base font-bold text-gray-900">{trainer.name}</h4>
                              <p className="text-xs font-bold text-emerald-600 uppercase mt-0.5">{trainer.role}</p>
                              
                              <div className="mt-3 space-y-1 text-xs text-gray-500 font-semibold">
                                <p className="text-gray-700">★ {trainer.qualifications}</p>
                                <p className="text-emerald-700">✓ {trainer.experience}</p>
                              </div>

                              <p className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                                "{trainer.bio}"
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                              <button
                                onClick={() => setActiveTab('demo')}
                                className="text-emerald-600 hover:text-emerald-700 text-xs font-bold cursor-pointer"
                              >
                                Book demo with {trainer.name.split(' ')[0]} →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                  </div>
                </div>
              )}

              {/* TAB 3: COURSES PAGE */}
              {activeTab === 'courses' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Educational Catalog</p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        Find the Right English Course for You
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-base text-gray-500 mt-4 leading-relaxed">
                        Whether you're starting from scratch or preparing for international opportunities, we have a course designed specifically for your goals.
                      </p>
                    </div>

                    {/* Complete Grid of 8 courses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {COURSES_DATA.map((course) => (
                        <div 
                          key={course.id}
                          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer justify-between"
                          onClick={() => handleOpenCourse(course)}
                        >
                          <div>
                            <div className="relative h-44 bg-gray-100 overflow-hidden">
                              <img
                                src={course.image}
                                alt={course.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                                {course.duration}
                              </div>
                            </div>
                            <div className="p-5">
                              <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">
                                {course.category}
                              </span>
                              <h4 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                {course.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                                {course.shortDescription}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-600">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold text-gray-500">
                              {course.mode.split('|')[0].trim()}
                            </span>
                            <span className="text-emerald-600 font-bold group-hover:underline">Study Modules →</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Risk Free Guarantee Card */}
                    <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl mt-16 text-center max-w-4xl mx-auto">
                      <h4 className="text-lg font-bold text-emerald-950">Not sure which level is appropriate for you?</h4>
                      <p className="text-sm text-emerald-800 mt-1 max-w-2xl mx-auto leading-relaxed">
                        Register for a free demo class. Our expert evaluators will conduct a 5-minute speaking assessment to suggest the ideal starting level based on CEFR benchmarks.
                      </p>
                      <button
                        onClick={() => setActiveTab('demo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl mt-5 shadow-sm transition-all cursor-pointer"
                      >
                        Book Free Speaking Assessment Now
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: CORPORATE TRAINING */}
              {activeTab === 'corporate' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Enterprise Solutions</p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        Corporate English Training
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-base text-gray-500 mt-4 leading-relaxed">
                        Enhance workplace communication and build executive presence with customized English training programs for businesses.
                      </p>
                    </div>

                    {/* Main Features split block */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 font-sans">
                          Empower Your Teams to Speak Professionally
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                          Whether managing international clients, pitching slides to the executive board, or drafting critical daily documentation, clear communication is crucial for business outcomes.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 border border-gray-200/60 rounded-2xl italic">
                          "Wordsmith’s custom curriculum for our sales team resulted in a 40% increase in lead conversion within 2 months!" <br />
                          <span className="font-bold text-xs text-gray-400">— Techcorp Solutions Ltd.</span>
                        </p>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600"
                        alt="Corporate Pitch Meeting"
                        referrerPolicy="no-referrer"
                        className="w-full h-64 object-cover rounded-2xl border border-gray-200"
                      />
                    </div>

                    {/* Areas and Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                      
                      {/* Training Areas */}
                      <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2" />
                          Training Focus Areas
                        </h3>
                        <ul className="space-y-3">
                          {[
                            { name: 'Business Communication', desc: 'Refine professional vocabulary and tone appropriateness.' },
                            { name: 'Email Writing & Drafting', desc: 'Learn formal structures, executive reporting, and summaries.' },
                            { name: 'Presentation & Speaking Skills', desc: 'Excel during slide pitches, public speaking, and stage delivery.' },
                            { name: 'Customer Service Communication', desc: 'Empathetic listening and handling client conflicts.' },
                            { name: 'Team Collaboration & Dialog', desc: 'Promote fluid, clear communication during internal stand-ups.' },
                            { name: 'Cross-Cultural Communication', desc: 'Manage communication gaps with global offshore teams.' },
                            { name: 'Leadership & Executive Presence', desc: 'Persuasive communication for team leaders & managers.' }
                          ].map((area, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="text-emerald-600 font-bold mr-2 mt-0.5">•</span>
                              <div>
                                <span className="font-bold text-gray-950">{area.name}:</span> {area.desc}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="bg-emerald-950 text-white p-8 rounded-3xl border border-emerald-900 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-2" />
                            Business Benefits
                          </h3>
                          <ul className="space-y-4">
                            {[
                              { label: 'Customized Curriculum', desc: 'Modules designed specifically for your industry terminology.' },
                              { label: 'On-site & Virtual Training', desc: 'Flexible delivery modes designed around work schedules.' },
                              { label: 'Scheduling Flexibility', desc: 'Run early morning, lunch, or post-shift cohorts.' },
                              { label: 'Individual Progress Reports', desc: 'Weekly attendance and speaking assessment scores shared with HR.' },
                              { label: 'Post-Training Assessments', desc: 'Standardized outcomes measuring actual speaking fluency improvements.' }
                            ].map((ben, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <span className="text-emerald-400 font-bold mr-2 mt-0.5">✓</span>
                                <div>
                                  <span className="font-bold text-white block">{ben.label}</span>
                                  <span className="text-gray-300 text-xs">{ben.desc}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Corporate specific click */}
                        <div className="pt-8 border-t border-emerald-800 mt-6">
                          <button
                            onClick={() => {
                              setEnquiryForm(prev => ({
                                ...prev,
                                course: 'Business English Course',
                                message: 'We are looking for customized English training solutions for our corporate team.'
                              }));
                              setActiveTab('contact');
                            }}
                            className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm cursor-pointer"
                          >
                            Get Customized Training Quote
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: VIDEO GALLERY */}
              {activeTab === 'videos' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Interactive Materials</p>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        Learn Through Free Videos
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-sm text-gray-500 mt-4">
                        Watch high-quality micro-lessons, speaking assessments, grammar hacks, and pronunciation training prepared by our master trainers.
                      </p>
                    </div>

                    {/* Filter Category selection */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                      {videoCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setVideoFilter(cat)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                            videoFilter === cat
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {VIDEOS_DATA
                        .filter(vid => videoFilter === 'All' || vid.category === videoFilter)
                        .map((vid) => (
                          <div 
                            key={vid.id}
                            onClick={() => setSelectedVideo(vid)}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                          >
                            <div className="relative h-44 bg-gray-950 flex items-center justify-center">
                              <img
                                src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400`}
                                alt={vid.title}
                                referrerPolicy="no-referrer"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-300"
                              />
                              <div className="bg-emerald-600 text-white p-3.5 rounded-full shadow-lg relative z-10 transition-transform group-hover:scale-110">
                                <Play className="h-5 w-5 fill-white ml-0.5" />
                              </div>
                              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                                {vid.duration}
                              </span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">
                                  {vid.category}
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                                  {vid.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-gray-400 mt-3 font-semibold">
                                ★ Hosted on Wordsmith TV YouTube channel
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Simulated YouTube Modal Layer */}
                    {selectedVideo && (
                      <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                        <div className="bg-slate-900 text-white max-w-2xl w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
                          
                          {/* Close */}
                          <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 z-10 bg-black/40 text-white hover:bg-black p-2 rounded-full cursor-pointer"
                          >
                            ✕
                          </button>

                          <div className="bg-black aspect-video relative flex flex-col items-center justify-center border-b border-slate-800">
                            {/* Simulated screen */}
                            <img
                              src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600`}
                              alt="Thumbnail"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover opacity-35"
                            />
                            
                            <div className="relative z-10 text-center px-6">
                              <div className="bg-red-600 text-white p-4 rounded-full shadow-lg inline-block mb-3 animate-pulse">
                                <Play className="h-6 w-6 fill-white ml-0.5" />
                              </div>
                              <p className="text-xs font-bold text-gray-300">Simulating Youtube Stream Embed...</p>
                              <p className="text-xs text-emerald-400 mt-1 font-mono font-bold">Video ID: {selectedVideo.youtubeId}</p>
                            </div>

                            {/* Simulated Controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between text-xs text-gray-300">
                              <div className="flex items-center space-x-3">
                                <span>▶</span>
                                <span>🔊 100%</span>
                                <span>00:15 / {selectedVideo.duration}</span>
                              </div>
                              <span>HD Quality</span>
                            </div>
                          </div>

                          <div className="p-6">
                            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              {selectedVideo.category}
                            </span>
                            <h3 className="text-base font-bold text-white mt-2.5">{selectedVideo.title}</h3>
                            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                              This free tutorial highlights practical speech modification tips formulated by Wordsmith experts. To implement these rules with certified mentoring feedback, register for a trial batch.
                            </p>
                            <div className="mt-5 flex justify-end space-x-3">
                              <button
                                onClick={() => setSelectedVideo(null)}
                                className="bg-slate-800 hover:bg-slate-750 text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                              >
                                Close Video
                              </button>
                              <button
                                onClick={() => {
                                  handleBookDemoWithCourse(selectedVideo.category);
                                  setSelectedVideo(null);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold cursor-pointer"
                              >
                                Book Free Live Demo
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* TAB 8: FREE DEMO */}
              {activeTab === 'demo' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Risk-Free Evaluation</p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        Book Your FREE Demo Class
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-base text-gray-500 mt-4 leading-relaxed">
                        Experience our interactive teaching methodology firsthand before enrolling in any program.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
                      {/* Why Attend details */}
                      <div className="lg:col-span-5 bg-gray-50 border border-gray-200 p-8 rounded-3xl space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 font-sans">Why Attend a Free Demo?</h3>
                        
                        <div className="space-y-5">
                          {[
                            { title: 'Meet the Trainer', desc: 'Interact with your potential trainer and experience their communication style.' },
                            { title: 'Experience Live Teaching', desc: 'Engage in a live situational role-play class with real other students.' },
                            { title: 'Assess Your English Level', desc: 'Get an immediate, constructive suggestions score mapped to CEFR levels.' },
                            { title: 'Get Personalized Guidance', desc: 'A 5-minute custom roadmap discussing your career or study constraints.' },
                            { title: 'Choose the Right Course', desc: 'Find out whether Beginner, Intermediate, or Advanced fits your career goals.' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mr-3.5 mt-0.5">
                                {idx+1}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-gray-950">{item.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Registration Form */}
                      <div className="lg:col-span-7 bg-white border border-gray-200 p-8 rounded-3xl shadow-xs">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3.5">
                          Demo Slot Booking Form
                        </h3>

                        <form onSubmit={handleDemoSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                            <input
                              type="text"
                              value={demoForm.name}
                              onChange={(e) => setDemoForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="e.g. Priya Sharma"
                              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                              <input
                                type="tel"
                                value={demoForm.phone}
                                onChange={(e) => setDemoForm(prev => ({ ...prev, phone: e.target.value }))}
                                placeholder="e.g. +91 98765 XXXXX"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                              <input
                                type="email"
                                value={demoForm.email}
                                onChange={(e) => setDemoForm(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="e.g. priya@example.com"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Course Interested In</label>
                            <select
                              value={demoForm.course}
                              onChange={(e) => setDemoForm(prev => ({ ...prev, course: e.target.value }))}
                              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                            >
                              {COURSES_DATA.map(c => (
                                <option key={c.id} value={c.title}>{c.title}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Preferred Date</label>
                              <input
                                type="date"
                                value={demoForm.preferredDate}
                                onChange={(e) => setDemoForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Preferred Time Slot</label>
                              <select
                                value={demoForm.preferredTime}
                                onChange={(e) => setDemoForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                              >
                                <option value="10:00 AM">Morning - 10:00 AM</option>
                                <option value="11:30 AM">Morning - 11:30 AM</option>
                                <option value="03:00 PM">Afternoon - 03:00 PM</option>
                                <option value="06:00 PM">Evening - 06:00 PM</option>
                                <option value="07:30 PM">Evening - 07:30 PM</option>
                              </select>
                            </div>
                          </div>

                          <div className="pt-4">
                            <button
                              type="submit"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                            >
                              Book My Free Demo Class
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-2.5">
                              *No credit card required. Shipped instantly to Wordsmith Academy CRM lead table.
                            </p>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: CONTACT US & ENQUIRIES */}
              {activeTab === 'contact' && (
                <div className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Get In Touch</p>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 mt-2 font-sans tracking-tight">
                        We'd Love to Hear From You
                      </h1>
                      <div className="h-1 w-20 bg-emerald-600 mt-4 mx-auto rounded-full" />
                      <p className="text-base text-gray-500 mt-4 leading-relaxed">
                        Ready to improve your English? Contact us today to schedule your consultation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
                      
                      {/* Contact Info blocks */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl space-y-5">
                          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 font-sans">
                            Academy Head Office
                          </h3>
                          
                          <div className="flex items-start text-sm text-gray-600">
                            <MapPin className="h-5 w-5 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-gray-900 mb-0.5">Physical Address</p>
                              <p>404 Excellence Tower, Knowledge Park, Sector 62, Noida, Uttar Pradesh, India - 201301</p>
                            </div>
                          </div>

                          <div className="flex items-start text-sm text-gray-600">
                            <Phone className="h-5 w-5 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-gray-900 mb-0.5">Phone Call / WhatsApp</p>
                              <p className="font-semibold text-emerald-700">+91 98765 43210</p>
                              <p className="text-xs text-gray-400">Direct academic lead counselors</p>
                            </div>
                          </div>

                          <div className="flex items-start text-sm text-gray-600">
                            <Mail className="h-5 w-5 text-emerald-600 mr-3 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-gray-900 mb-0.5">Support Email</p>
                              <p className="underline font-semibold text-emerald-700">info@wordsmithacademy.com</p>
                            </div>
                          </div>
                        </div>

                        {/* Office Hours */}
                        <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-900">
                          <h4 className="text-base font-bold text-emerald-400 mb-3 flex items-center">
                            <Clock className="h-4.5 w-4.5 mr-2" />
                            Academy Office Hours
                          </h4>
                          <div className="text-sm space-y-2 text-gray-300">
                            <div className="flex justify-between border-b border-emerald-900/60 pb-1.5">
                              <span>Monday – Saturday</span>
                              <span className="font-semibold text-white">9:00 AM – 8:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sunday</span>
                              <span className="text-amber-400 font-bold uppercase text-xs">Closed / Batches Off</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Enquiry Form */}
                      <div className="lg:col-span-7 bg-white border border-gray-200 p-8 rounded-3xl shadow-xs">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3">
                          Send An Admission Enquiry
                        </h3>

                        <form onSubmit={handleEnquirySubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                              <input
                                type="text"
                                value={enquiryForm.fullName}
                                onChange={(e) => setEnquiryForm(prev => ({ ...prev, fullName: e.target.value }))}
                                placeholder="e.g. Karan Malhotra"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mobile Number</label>
                              <input
                                type="tel"
                                value={enquiryForm.mobileNumber}
                                onChange={(e) => setEnquiryForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                                placeholder="e.g. +91 91234 XXXXX"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email ID</label>
                              <input
                                type="email"
                                value={enquiryForm.email}
                                onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="e.g. karan.m@example.com"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Select Course</label>
                              <select
                                value={enquiryForm.course}
                                onChange={(e) => setEnquiryForm(prev => ({ ...prev, course: e.target.value }))}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                              >
                                {COURSES_DATA.map(c => (
                                  <option key={c.id} value={c.title}>{c.title}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Preferred Batch Timing</label>
                            <select
                              value={enquiryForm.preferredBatch}
                              onChange={(e) => setEnquiryForm(prev => ({ ...prev, preferredBatch: e.target.value }))}
                              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                            >
                              <option value="Morning (10:00 AM - 11:30 AM)">Morning (10:00 AM - 11:30 AM)</option>
                              <option value="Afternoon (3:00 PM - 4:30 PM)">Afternoon (3:00 PM - 4:30 PM)</option>
                              <option value="Evening (7:30 PM - 9:00 PM)">Evening (7:30 PM - 9:00 PM)</option>
                              <option value="Weekend Fast-track (Saturday-Sunday)">Weekend Fast-track (Saturday-Sunday)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Message / Query details</label>
                            <textarea
                              rows={3}
                              value={enquiryForm.message}
                              onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                              placeholder="Describe your current English difficulty or speaking goals..."
                              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                            />
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-xs hover:shadow-md cursor-pointer text-center"
                            >
                              Enroll Now / Send Enquiry
                            </button>
                          </div>
                        </form>
                      </div>

                    </div>

                    {/* FAQ Mini section on Contact Page */}
                    <section className="mt-24 border-t border-gray-200 pt-16 max-w-4xl mx-auto">
                      <div className="text-center mb-10">
                        <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Answers to Queries</p>
                        <h3 className="text-2xl font-bold font-sans mt-1">Frequently Asked Questions</h3>
                      </div>

                      <div className="space-y-4">
                        {FREQUENT_QUESTIONS.map((faq, index) => {
                          const isOpen = openFaqIndex === index;
                          return (
                            <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all">
                              <button
                                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-gray-50/50 cursor-pointer text-sm"
                              >
                                <span className="flex items-center">
                                  <HelpCircle className="h-4.5 w-4.5 mr-2 text-emerald-600 shrink-0" />
                                  {faq.question}
                                </span>
                                <ChevronDown className={`h-4.5 w-4.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                              </button>
                              
                              {isOpen && (
                                <div className="p-5 border-t border-gray-100 bg-gray-50/40 text-xs text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>

                  </div>
                </div>
              )}

              {/* TAB 10: BOOK STORE */}
              {activeTab === 'books' && (
                <BookStore />
              )}

            </main>
          )}

          {/* Footer view */}
          <Footer 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedCourse(null);
              setSelectedBlog(null);
            }} 
            onOpenAdmin={() => setIsAdminMode(true)}
          />
        </>
      )}

    </div>
  );
}
