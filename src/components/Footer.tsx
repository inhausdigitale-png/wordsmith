import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ setActiveTab, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md mr-3">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold font-sans tracking-tight text-white block leading-none">
                  Wordsmith
                </span>
                <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase block mt-1">
                  Academy
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We believe English is a life skill—not just a subject. Our practical learning approach helps students, job seekers, and working professionals communicate with absolute confidence.
            </p>
            <div className="flex space-x-3">
              <span className="text-xs bg-gray-800 text-emerald-400 px-3 py-1.5 rounded-md font-semibold">
                ★ Certified Trainers
              </span>
              <span className="text-xs bg-gray-800 text-emerald-400 px-3 py-1.5 rounded-md font-semibold">
                ★ Small Batch Sizes
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-6 tracking-wide">Explore Courses</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Beginner Spoken English
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Intermediate English Fluency
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Business Spoken English
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  IELTS Prep Intensive
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Public Speaking & Stage Presence
                </button>
              </li>
            </ul>
          </div>

          {/* Institute Info */}
          <div>
            <h3 className="text-white text-base font-bold mb-6 tracking-wide">Academy Head Center</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mr-3 shrink-0 mt-0.5" />
                <span>
                  404 Excellence Tower, Knowledge Park, Sector 62, Noida, UP - 201301
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
                <span>info@wordsmithacademy.com</span>
              </li>
            </ul>
          </div>

          {/* Office Hours & Actions */}
          <div>
            <h3 className="text-white text-base font-bold mb-6 tracking-wide">Office Hours</h3>
            <ul className="space-y-4 text-sm mb-6">
              <li className="flex items-start text-gray-400">
                <Clock className="h-5 w-5 text-emerald-400 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300">Monday – Saturday</p>
                  <p className="text-xs">9:00 AM – 8:00 PM</p>
                  <p className="text-xs text-amber-400 mt-1">Sundays Closed</p>
                </div>
              </li>
            </ul>
            <div className="space-y-2">
              <button
                onClick={onOpenAdmin}
                className="w-full text-center bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/40 text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Admin Workspace / Leads CRM
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Wordsmith Academy. All rights reserved. English is a life skill.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400">About Us</button>
            <button onClick={() => setActiveTab('corporate')} className="hover:text-emerald-400">Corporate Solutions</button>
            <button onClick={() => setActiveTab('videos')} className="hover:text-emerald-400">Free Video Lessons</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-emerald-400">Enquire Now</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
