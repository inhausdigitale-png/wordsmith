import React, { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { Enquiry, DemoBooking, JobApplication, BookOrder, Book } from '../types';
import { Mail, Phone, Calendar, Clock, Briefcase, FileText, CheckCircle2, User, RefreshCw, Trash2, ListFilter, ShoppingBag, MapPin, CreditCard, Plus, BookOpen, Edit } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [bookOrders, setBookOrders] = useState<BookOrder[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  
  const [activeSubTab, setActiveSubTab] = useState<'enquiries' | 'bookings' | 'applications' | 'orders' | 'books'>('enquiries');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Book manager form state
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    category: 'Spoken English',
    price: 19.99,
    originalPrice: 29.99,
    description: '',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    tags: 'Grammar, Spoken',
    stock: 100,
    pages: '220',
    language: 'English',
    format: 'Paperback',
    rating: 4.8,
    reviewsCount: 24
  });

  // Load data
  const loadAllData = () => {
    setEnquiries(storage.getEnquiries());
    setBookings(storage.getBookings());
    setApplications(storage.getApplications());
    setBookOrders(storage.getBookOrders());
    setBooks(storage.getBooks());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = bookForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const bookData: Omit<Book, 'id'> = {
      title: bookForm.title,
      author: bookForm.author,
      category: bookForm.category,
      price: Number(bookForm.price),
      originalPrice: bookForm.originalPrice ? Number(bookForm.originalPrice) : undefined,
      description: bookForm.description,
      image: bookForm.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      tags: parsedTags,
      stock: Number(bookForm.stock),
      pages: bookForm.pages,
      language: bookForm.language,
      format: bookForm.format,
      rating: Number(bookForm.rating),
      reviewsCount: Number(bookForm.reviewsCount)
    };

    if (editingBookId) {
      storage.updateBook(editingBookId, bookData);
      setEditingBookId(null);
    } else {
      storage.addBook(bookData);
    }

    setIsAddingBook(false);
    resetBookForm();
    loadAllData();
  };

  const resetBookForm = () => {
    setBookForm({
      title: '',
      author: '',
      category: 'Spoken English',
      price: 19.99,
      originalPrice: 29.99,
      description: '',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      tags: 'Grammar, Spoken',
      stock: 100,
      pages: '220',
      language: 'English',
      format: 'Paperback',
      rating: 4.8,
      reviewsCount: 24
    });
  };

  const handleEditBookClick = (book: Book) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      originalPrice: book.originalPrice || 0,
      description: book.description,
      image: book.image,
      tags: book.tags.join(', '),
      stock: book.stock,
      pages: book.pages || '200',
      language: book.language || 'English',
      format: book.format || 'Paperback',
      rating: book.rating || 4.5,
      reviewsCount: book.reviewsCount || 10
    });
    setIsAddingBook(true);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book from the store catalog?')) {
      storage.deleteBook(id);
      loadAllData();
    }
  };

  // Update actions
  const handleUpdateEnquiry = (id: string, status: Enquiry['status']) => {
    storage.updateEnquiryStatus(id, status);
    loadAllData();
  };

  const handleUpdateBooking = (id: string, status: DemoBooking['status']) => {
    storage.updateBookingStatus(id, status);
    loadAllData();
  };

  const handleUpdateApplication = (id: string, status: JobApplication['status']) => {
    storage.updateApplicationStatus(id, status);
    loadAllData();
  };

  const handleUpdateBookOrder = (id: string, status: BookOrder['status']) => {
    storage.updateBookOrderStatus(id, status);
    loadAllData();
  };

  // Delete actions
  const handleDeleteEnquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      storage.deleteEnquiry(id);
      loadAllData();
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel and delete this demo booking?')) {
      storage.deleteBooking(id);
      loadAllData();
    }
  };

  const handleDeleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this applicant file?')) {
      storage.deleteApplication(id);
      loadAllData();
    }
  };

  const handleDeleteBookOrder = (id: string) => {
    if (confirm('Are you sure you want to delete this book order record?')) {
      storage.deleteBookOrder(id);
      loadAllData();
    }
  };

  // Format Dates
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CRM Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-gray-200 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-md">
                Admin Panel Mode
              </span>
              <span className="text-xs text-gray-500">• Persistent Lead Tracker</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 font-sans tracking-tight">
              Wordsmith Academy CRM
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Monitor course inquiries, coordinate demo schedules, and manage instructor applications.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={loadAllData}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-xs cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </button>
            <button
              onClick={onClose}
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-xs cursor-pointer"
            >
              Back to Main Site
            </button>
          </div>
        </div>

        {/* Dashboard Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center space-x-5">
            <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Enquiries</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{enquiries.length}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                {enquiries.filter(e => e.status === 'New').length} unaddressed leads
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center space-x-5">
            <div className="bg-indigo-100 text-indigo-800 p-4 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Demo Bookings</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{bookings.length}</p>
              <p className="text-xs text-indigo-600 mt-1 font-medium">
                {bookings.filter(b => b.status === 'Pending').length} pending confirmation
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center space-x-5">
            <div className="bg-amber-100 text-amber-800 p-4 rounded-xl">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Job Applicants</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{applications.length}</p>
              <p className="text-xs text-amber-600 mt-1 font-medium">
                {applications.filter(a => a.status === 'Pending').length} fresh profiles
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center space-x-5">
            <div className="bg-rose-100 text-rose-800 p-4 rounded-xl">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Book Orders</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{bookOrders.length}</p>
              <p className="text-xs text-rose-600 mt-1 font-medium">
                {bookOrders.filter(o => o.status === 'Pending').length} pending shipment
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => { setActiveSubTab('enquiries'); setFilterStatus('All'); }}
              className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'enquiries'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
              }`}
            >
              Course Enquiries ({enquiries.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('bookings'); setFilterStatus('All'); }}
              className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'bookings'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
              }`}
            >
              Free Demo Bookings ({bookings.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('applications'); setFilterStatus('All'); }}
              className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'applications'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
              }`}
            >
              Career Applications ({applications.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('orders'); setFilterStatus('All'); }}
              className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'orders'
                  ? 'border-rose-600 text-rose-700 bg-rose-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
              }`}
            >
              Book Orders ({bookOrders.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('books'); setFilterStatus('All'); }}
              className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'books'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
              }`}
            >
              Manage Bookstore ({books.length})
            </button>
          </div>

          {/* Filtering Controls */}
          <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <ListFilter className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Status Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterStatus === 'All'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Show All
              </button>

              {activeSubTab === 'enquiries' && (
                <>
                  {['New', 'Contacted', 'Enrolled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </>
              )}

              {activeSubTab === 'bookings' && (
                <>
                  {['Pending', 'Confirmed', 'Completed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </>
              )}

              {activeSubTab === 'applications' && (
                <>
                  {['Pending', 'Reviewed', 'Shortlisted', 'Rejected'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </>
              )}

              {activeSubTab === 'orders' && (
                <>
                  {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-rose-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </>
              )}

              {activeSubTab === 'books' && (
                <>
                  {['Spoken English', 'Corporate English', 'Grammar Guides', 'Vocabulary Builders'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        filterStatus === st
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic List Rendering */}
        <div className="space-y-6">
          {/* Sub-Tab 1: ENQUIRIES */}
          {activeSubTab === 'enquiries' && (
            <>
              {enquiries.filter(e => filterStatus === 'All' || e.status === filterStatus).length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                  <p className="text-gray-500 font-medium">No inquiries match the active filter.</p>
                </div>
              ) : (
                enquiries
                  .filter(e => filterStatus === 'All' || e.status === filterStatus)
                  .map(enq => (
                    <div key={enq.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative overflow-hidden transition-all hover:border-gray-300">
                      {/* Left color bar based on status */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        enq.status === 'New' ? 'bg-amber-500' : enq.status === 'Contacted' ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`} />

                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pl-2">
                        <div className="space-y-3.5 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">{enq.fullName}</span>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                              enq.status === 'New' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              enq.status === 'Contacted' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' :
                              'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              ● {enq.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">ID: {enq.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="font-semibold">{enq.mobileNumber}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="underline">{enq.email}</span>
                            </div>
                            <div className="flex items-center col-span-1 md:col-span-2 lg:col-span-1">
                              <Clock className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span>{formatDate(enq.date)}</span>
                            </div>
                          </div>

                          <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 text-sm">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                              Course & Preferred Batch:
                            </p>
                            <p className="text-gray-900 font-semibold">
                              {enq.course} — <span className="text-emerald-700 font-medium">{enq.preferredBatch}</span>
                            </p>
                          </div>

                          {enq.message && (
                            <div className="text-sm bg-emerald-50/20 p-3 rounded-xl border border-emerald-100/30">
                              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Message:</p>
                              <p className="text-gray-700 italic">"{enq.message}"</p>
                            </div>
                          )}
                        </div>

                        {/* CRM Pipeline Controls */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                          <div className="text-left lg:text-right">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pipeline Action</label>
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateEnquiry(enq.id, e.target.value as Enquiry['status'])}
                              className="bg-white border border-gray-300 rounded-lg text-xs font-semibold px-2.5 py-1.5 shadow-xs focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="New">Mark New</option>
                              <option value="Contacted">Mark Contacted</option>
                              <option value="Enrolled">Mark Enrolled</option>
                            </select>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}

          {/* Sub-Tab 2: DEMO BOOKINGS */}
          {activeSubTab === 'bookings' && (
            <>
              {bookings.filter(b => filterStatus === 'All' || b.status === filterStatus).length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                  <p className="text-gray-500 font-medium">No demo class bookings match the active filter.</p>
                </div>
              ) : (
                bookings
                  .filter(b => filterStatus === 'All' || b.status === filterStatus)
                  .map(bk => (
                    <div key={bk.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative overflow-hidden transition-all hover:border-gray-300">
                      {/* Left color bar based on status */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        bk.status === 'Pending' ? 'bg-amber-500' : bk.status === 'Confirmed' ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`} />

                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pl-2">
                        <div className="space-y-3.5 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">{bk.name}</span>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                              bk.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              bk.status === 'Confirmed' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' :
                              'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              ● {bk.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">ID: {bk.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="font-semibold">{bk.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="underline">{bk.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="text-xs font-semibold text-emerald-700">Requested: {formatDate(bk.dateCreated)}</span>
                            </div>
                          </div>

                          <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Target Course</p>
                              <p className="text-gray-900 font-bold">{bk.course}</p>
                            </div>
                            <div className="flex items-center space-x-4 border-t md:border-t-0 pt-2.5 md:pt-0 border-gray-200">
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Preferred Date</p>
                                <p className="text-gray-900 font-semibold flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                                  {bk.preferredDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Preferred Time</p>
                                <p className="text-gray-900 font-semibold flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                                  {bk.preferredTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CRM Pipeline Controls */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                          <div className="text-left lg:text-right">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Booking Status</label>
                            <select
                              value={bk.status}
                              onChange={(e) => handleUpdateBooking(bk.id, e.target.value as DemoBooking['status'])}
                              className="bg-white border border-gray-300 rounded-lg text-xs font-semibold px-2.5 py-1.5 shadow-xs focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="Pending">Pending Audit</option>
                              <option value="Confirmed">Confirm Class</option>
                              <option value="Completed">Completed Class</option>
                            </select>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteBooking(bk.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Cancel Booking"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}

          {/* Sub-Tab 3: CAREER APPLICATIONS */}
          {activeSubTab === 'applications' && (
            <>
              {applications.filter(a => filterStatus === 'All' || a.status === filterStatus).length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                  <p className="text-gray-500 font-medium">No job application records match the active filter.</p>
                </div>
              ) : (
                applications
                  .filter(a => filterStatus === 'All' || a.status === filterStatus)
                  .map(app => (
                    <div key={app.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative overflow-hidden transition-all hover:border-gray-300">
                      {/* Left color bar based on status */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        app.status === 'Pending' ? 'bg-amber-500' :
                        app.status === 'Reviewed' ? 'bg-indigo-500' :
                        app.status === 'Shortlisted' ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />

                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pl-2">
                        <div className="space-y-3.5 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">{app.fullName}</span>
                            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 px-2 py-0.5 rounded-sm">
                              {app.position}
                            </span>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                              app.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              app.status === 'Reviewed' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' :
                              app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                              'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                              ● {app.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">ID: {app.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="font-semibold">{app.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="underline">{app.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="text-xs text-gray-400">Applied: {formatDate(app.dateApplied)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Trainer Experience</p>
                              <p className="text-gray-900 font-semibold">{app.experience}</p>
                            </div>
                            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Attached Resume</p>
                                <p className="text-emerald-700 font-bold flex items-center text-xs">
                                  <FileText className="h-3.5 w-3.5 mr-1" />
                                  {app.resumeName}
                                </p>
                              </div>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                Verified Upload
                              </span>
                            </div>
                          </div>

                          {app.coverLetter && (
                            <div className="text-sm bg-indigo-50/20 p-3 rounded-xl border border-indigo-100/30">
                              <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Cover Letter notes:</p>
                              <p className="text-gray-700 italic">"{app.coverLetter}"</p>
                            </div>
                          )}
                        </div>

                        {/* CRM Pipeline Controls */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                          <div className="text-left lg:text-right">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Application State</label>
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateApplication(app.id, e.target.value as JobApplication['status'])}
                              className="bg-white border border-gray-300 rounded-lg text-xs font-semibold px-2.5 py-1.5 shadow-xs focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="Pending">Pending Audit</option>
                              <option value="Reviewed">Reviewed Portfolio</option>
                              <option value="Shortlisted">Shortlist Candidate</option>
                              <option value="Rejected">Decline Candidate</option>
                            </select>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Delete Application"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}

          {/* Sub-Tab 4: BOOK ORDERS */}
          {activeSubTab === 'orders' && (
            <>
              {bookOrders.filter(o => filterStatus === 'All' || o.status === filterStatus).length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                  <p className="text-gray-500 font-medium">No book orders match the active filter.</p>
                </div>
              ) : (
                bookOrders
                  .filter(o => filterStatus === 'All' || o.status === filterStatus)
                  .map(order => (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative overflow-hidden transition-all hover:border-gray-300">
                      {/* Left color bar based on status */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        order.status === 'Pending' ? 'bg-amber-500' :
                        order.status === 'Shipped' ? 'bg-indigo-500' :
                        order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />

                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pl-2">
                        <div className="space-y-3.5 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-gray-900">{order.fullName}</span>
                            <span className="text-xs bg-rose-50 text-rose-800 font-bold border border-rose-200 px-2 py-0.5 rounded-sm">
                              Order for: {order.bookTitle}
                            </span>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                              order.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              order.status === 'Shipped' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' :
                              order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                              'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                              ● {order.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">ID: {order.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="font-semibold">{order.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="underline">{order.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                              <span className="text-xs text-gray-400">Ordered: {formatDate(order.orderDate)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pricing & Qty</p>
                              <p className="text-gray-900 font-semibold">₹{order.price} × {order.quantity} = <span className="font-bold text-emerald-700">₹{(order.price * order.quantity).toFixed(2)}</span></p>
                            </div>
                            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 col-span-1 md:col-span-2 flex items-start">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Shipping Address</p>
                                <p className="text-gray-900 font-semibold text-xs">{order.address}, {order.city} - {order.postalCode}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span>Payment Mode:</span>
                            <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md font-semibold font-mono">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>

                        {/* CRM Pipeline Controls */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                          <div className="text-left lg:text-right">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Order Status</label>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateBookOrder(order.id, e.target.value as BookOrder['status'])}
                              className="bg-white border border-gray-300 rounded-lg text-xs font-semibold px-2.5 py-1.5 shadow-xs focus:ring-1 focus:ring-rose-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteBookOrder(order.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Delete Order Record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}

          {/* Sub-Tab 5: BOOK INVENTORY MANAGER */}
          {activeSubTab === 'books' && (
            <div className="space-y-6">
              
              {/* Header with toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-2xl border border-gray-200 p-6 shadow-xs gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-sans tracking-tight flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                    <span>Catalog Book Inventory & Pricing Manager</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload new books, set cover images, adjust prices, and control active stock levels in real time.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (isAddingBook) {
                      setEditingBookId(null);
                      resetBookForm();
                      setIsAddingBook(false);
                    } else {
                      resetBookForm();
                      setIsAddingBook(true);
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer animate-pulse"
                >
                  {isAddingBook ? (
                    <span>Cancel Form</span>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Upload New Book</span>
                    </>
                  )}
                </button>
              </div>

              {/* Add / Edit Form Drawer */}
              {isAddingBook && (
                <form onSubmit={handleSaveBook} className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-md space-y-4 animate-scale-up">
                  <h4 className="text-sm font-extrabold text-emerald-800 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {editingBookId ? '📝 Edit Book Records & Pricing' : '📚 Upload New Book Details'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Book Title *</label>
                      <input
                        type="text"
                        value={bookForm.title}
                        onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                        placeholder="e.g. Master IELTS Writing in 15 Days"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Author / Publisher *</label>
                      <input
                        type="text"
                        value={bookForm.author}
                        onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                        placeholder="e.g. Anya Roy & Sarah Parker"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category *</label>
                      <select
                        value={bookForm.category}
                        onChange={(e) => setBookForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="Spoken English">Spoken English</option>
                        <option value="Corporate English">Corporate English</option>
                        <option value="Grammar Guides">Grammar Guides</option>
                        <option value="Vocabulary Builders">Vocabulary Builders</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={bookForm.price}
                        onChange={(e) => setBookForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Original Price (₹) (Optional)</label>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={bookForm.originalPrice}
                        onChange={(e) => setBookForm(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none text-gray-400 line-through"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">In-Stock Quantity *</label>
                      <input
                        type="number"
                        min="0"
                        value={bookForm.stock}
                        onChange={(e) => setBookForm(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={bookForm.image}
                        onChange={(e) => setBookForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        placeholder="Paste image address or leave default"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={bookForm.tags}
                        onChange={(e) => setBookForm(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        placeholder="e.g. Grammar, Speak, IELTS"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Page Count</label>
                      <input
                        type="text"
                        value={bookForm.pages}
                        onChange={(e) => setBookForm(prev => ({ ...prev, pages: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Language</label>
                      <input
                        type="text"
                        value={bookForm.language}
                        onChange={(e) => setBookForm(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Format Type</label>
                      <input
                        type="text"
                        value={bookForm.format}
                        onChange={(e) => setBookForm(prev => ({ ...prev, format: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Detailed Description *</label>
                    <textarea
                      value={bookForm.description}
                      onChange={(e) => setBookForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs h-24 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      required
                      placeholder="Add an intriguing back-cover style blurb about this specific textbook and how it aids fluency..."
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBookId(null);
                        resetBookForm();
                        setIsAddingBook(false);
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
                    >
                      {editingBookId ? 'Apply Changes' : 'Publish Book to Catalog'}
                    </button>
                  </div>
                </form>
              )}

              {/* Books Grid */}
              {books.filter(b => filterStatus === 'All' || b.category === filterStatus).length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
                  <p className="text-gray-500 font-medium">No books match the active filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books
                    .filter(b => filterStatus === 'All' || b.category === filterStatus)
                    .map(book => (
                      <div key={book.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-gray-300 relative overflow-hidden">
                        
                        <div className="absolute top-3 right-3 flex space-x-1.5 z-10">
                          <button
                            onClick={() => handleEditBookClick(book)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg border border-emerald-100 transition-colors cursor-pointer"
                            title="Edit Book Details"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg border border-red-100 transition-colors cursor-pointer"
                            title="Delete Book"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex space-x-4">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-28 w-20 object-cover rounded-xl border border-gray-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider">
                              {book.category}
                            </span>
                            <h4 className="text-sm font-extrabold text-gray-900 leading-tight font-sans mt-0.5 line-clamp-2 pr-12">
                              {book.title}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-bold">By {book.author}</p>
                            
                            <div className="mt-2.5 flex items-baseline space-x-2">
                              <span className="text-sm font-black text-emerald-700">₹{book.price}</span>
                              {book.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">₹{book.originalPrice}</span>
                              )}
                            </div>
                            
                            <div className="mt-1 flex items-center space-x-2 text-[10px] font-semibold text-gray-500">
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded-md">Stock: {book.stock}</span>
                              <span>•</span>
                              <span>{book.format || 'Paperback'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 mt-4">
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {book.description}
                          </p>
                        </div>

                      </div>
                    ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
