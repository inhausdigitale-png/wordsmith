import React from 'react';
import { Course } from '../types';
import { X, Calendar, BookOpen, GraduationCap, MapPin, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onClose: () => void;
  onBookDemo: (courseTitle: string) => void;
}

export default function CourseDetail({ course, onClose, onBookDemo }: CourseDetailProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl max-w-4xl mx-auto my-6 animate-fade-in">
      {/* Course Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gray-900">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-black/50 text-white hover:bg-black/80 p-2.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Floating Category Badge */}
        <div className="absolute bottom-6 left-6 sm:left-8">
          <span className="bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md">
            {course.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            {course.title}
          </h1>
        </div>
      </div>

      {/* Main Layout Details */}
      <div className="p-6 sm:p-8 md:p-10">
        {/* Quick Parameters Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/50 border border-emerald-100/30 p-5 rounded-2xl mb-8">
          <div className="flex items-center space-x-3.5">
            <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-xl">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider leading-none">Duration</p>
              <p className="text-sm font-extrabold text-gray-900 mt-1">{course.duration}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 border-t sm:border-t-0 sm:border-l border-gray-200/60 pt-3 sm:pt-0 sm:pl-4">
            <div className="bg-indigo-100 text-indigo-800 p-2.5 rounded-xl">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider leading-none">Learning Mode</p>
              <p className="text-sm font-extrabold text-gray-900 mt-1">{course.mode}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 border-t sm:border-t-0 sm:border-l border-gray-200/60 pt-3 sm:pt-0 sm:pl-4">
            <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider leading-none">Target Outcome</p>
              <p className="text-sm font-extrabold text-gray-900 mt-1">Confidential Fluency</p>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">About This Course</h3>
            <p className="text-gray-600 text-base leading-relaxed">{course.longDescription}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2" />
                  What You'll Learn & Practice
                </h3>
                
                {/* Dynamically checking topics, modules, whatYoullLearn or courseIncludes */}
                <ul className="space-y-2.5">
                  {(course.whatYoullLearn || course.topics || course.modules || course.courseIncludes || []).map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-emerald-600 font-bold mr-2 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Details */}
              <div className="space-y-6">
                {course.whoCanJoin && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3.5 flex items-center">
                      <UserCheck className="h-5 w-5 text-indigo-600 mr-2" />
                      Who Can Join?
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.whoCanJoin.map((person, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-gray-200"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {course.idealFor && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3.5 flex items-center">
                      <UserCheck className="h-5 w-5 text-indigo-600 mr-2" />
                      Ideal For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.idealFor.map((person, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-gray-200"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {course.bestFor && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2.5">Target Audience</h3>
                    <p className="text-sm text-gray-600 bg-amber-50 border border-amber-100/60 p-3.5 rounded-xl font-medium">
                      ⭐ <span className="font-bold text-amber-900">Best For:</span> {course.bestFor}
                    </p>
                  </div>
                )}

                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                  <h4 className="text-sm font-bold text-emerald-950 mb-1.5">Measurable Course Outcome:</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    {course.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Risk-Free Trial</p>
            <p className="text-sm font-bold text-gray-800 mt-1">Book a free live trial session to experience our teaching approach.</p>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial text-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => onBookDemo(course.title)}
              className="flex-1 sm:flex-initial text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-1.5 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <span>Book Free Demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
