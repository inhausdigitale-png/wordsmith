import React, { useState } from 'react';
import { Menu, X, GraduationCap, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdminMode: boolean;
}

export default function Navbar({ activeTab, setActiveTab, onOpenAdmin, isAdminMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'courses', label: 'Courses' },
    { id: 'books', label: 'Book Store' },
    { id: 'corporate', label: 'Corporate Training' },
    { id: 'videos', label: 'Video Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md mr-3 transition-transform hover:scale-105">
              <GraduationCap className="h-6 w-6" id="nav-logo-icon" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-gray-900 block leading-none">
                Wordsmith
              </span>
              <span className="text-xs font-semibold text-emerald-600 tracking-widest uppercase block mt-1">
                Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !isAdminMode;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="nav-demo-btn"
              onClick={() => handleNavClick('demo')}
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Book Free Demo
            </button>
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              className={`p-2.5 rounded-xl text-sm font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                isAdminMode
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
              title="Admin Lead Manager CRM"
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden xl:inline">
                {isAdminMode ? 'CRM Open' : 'Admin CRM'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                isAdminMode ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>CRM</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-1.5"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !isAdminMode;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium block transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-gray-100 mt-2 px-4 space-y-2.5">
              <button
                onClick={() => handleNavClick('demo')}
                className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl text-base font-bold shadow-sm"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
