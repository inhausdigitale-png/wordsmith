import { Enquiry, DemoBooking, JobApplication, BookOrder, Book } from '../types';
import { BOOKS_DATA } from '../data';

const ENQUIRIES_KEY = 'fluentspeak_enquiries';
const BOOKINGS_KEY = 'fluentspeak_bookings';
const APPLICATIONS_KEY = 'fluentspeak_applications';
const ORDERS_KEY = 'fluentspeak_book_orders';

const INITIAL_ORDERS: BookOrder[] = [
  {
    id: 'ord-1',
    bookId: 'book-spoken-english-mastery',
    bookTitle: 'Spoken English Mastery: From Beginner to Fluent',
    price: 24.99,
    quantity: 1,
    fullName: 'Sanjay Dutt',
    phone: '+91 98888 77777',
    email: 'sanjay.dutt@gmail.com',
    address: '12, MG Road, Near Landmark Mall',
    city: 'Pune',
    postalCode: '411001',
    orderDate: '2026-07-03T18:00:00Z',
    paymentMethod: 'Cash on Delivery',
    status: 'Pending'
  }
];


const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    fullName: 'Rahul Deshmukh',
    mobileNumber: '+91 98765 43210',
    email: 'rahul.desh@gmail.com',
    course: 'Business English Course',
    preferredBatch: 'Evening (7:30 PM - 9:00 PM)',
    message: 'I want to improve my communication skills for corporate meetings and email writing.',
    date: '2026-07-02T14:30:00Z',
    status: 'Contacted'
  },
  {
    id: 'enq-2',
    fullName: 'Meera Nair',
    mobileNumber: '+91 91234 56789',
    email: 'meera.nair@yahoo.com',
    course: 'Beginner Spoken English Course',
    preferredBatch: 'Morning (10:00 AM - 11:30 AM)',
    message: 'I am a homemaker and I want to start learning English from basic grammar.',
    date: '2026-07-03T09:15:00Z',
    status: 'New'
  }
];

const INITIAL_BOOKINGS: DemoBooking[] = [
  {
    id: 'bk-1',
    name: 'Karan Malhotra',
    phone: '+91 99887 76655',
    email: 'karan.m@gmail.com',
    course: 'IELTS Speaking Preparation',
    preferredDate: '2026-07-10',
    preferredTime: '11:00 AM',
    dateCreated: '2026-07-03T10:00:00Z',
    status: 'Pending'
  },
  {
    id: 'bk-2',
    name: 'Anjali Gupta',
    phone: '+91 95554 44332',
    email: 'anjali.g@gmail.com',
    course: 'Public Speaking & Presentation Skills',
    preferredDate: '2026-07-08',
    preferredTime: '06:00 PM',
    dateCreated: '2026-07-02T16:20:00Z',
    status: 'Confirmed'
  }
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    openingId: 'career-trainer-spoken',
    position: 'Spoken English Trainer',
    fullName: 'David Miller',
    email: 'david.miller.teach@gmail.com',
    phone: '+91 88776 65544',
    experience: '4 years of Spoken English coaching',
    resumeName: 'David_Miller_CV.pdf',
    coverLetter: 'I love helping students overcome stage fright and speak fluently. I am TESOL certified.',
    dateApplied: '2026-07-01T11:00:00Z',
    status: 'Shortlisted'
  }
];

export const storage = {
  getEnquiries(): Enquiry[] {
    const data = localStorage.getItem(ENQUIRIES_KEY);
    if (!data) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(data);
  },

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>): Enquiry {
    const list = this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'New'
    };
    list.unshift(newEnquiry);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(list));
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: Enquiry['status']): void {
    const list = this.getEnquiries();
    const index = list.findIndex(e => e.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(list));
    }
  },

  deleteEnquiry(id: string): void {
    const list = this.getEnquiries();
    const filtered = list.filter(e => e.id !== id);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(filtered));
  },

  getBookings(): DemoBooking[] {
    const data = localStorage.getItem(BOOKINGS_KEY);
    if (!data) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  },

  addBooking(booking: Omit<DemoBooking, 'id' | 'dateCreated' | 'status'>): DemoBooking {
    const list = this.getBookings();
    const newBooking: DemoBooking = {
      ...booking,
      id: `bk-${Date.now()}`,
      dateCreated: new Date().toISOString(),
      status: 'Pending'
    };
    list.unshift(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    return newBooking;
  },

  updateBookingStatus(id: string, status: DemoBooking['status']): void {
    const list = this.getBookings();
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    }
  },

  deleteBooking(id: string): void {
    const list = this.getBookings();
    const filtered = list.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
  },

  getApplications(): JobApplication[] {
    const data = localStorage.getItem(APPLICATIONS_KEY);
    if (!data) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(data);
  },

  addApplication(application: Omit<JobApplication, 'id' | 'dateApplied' | 'status'>): JobApplication {
    const list = this.getApplications();
    const newApp: JobApplication = {
      ...application,
      id: `app-${Date.now()}`,
      dateApplied: new Date().toISOString(),
      status: 'Pending'
    };
    list.unshift(newApp);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
    return newApp;
  },

  updateApplicationStatus(id: string, status: JobApplication['status']): void {
    const list = this.getApplications();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
    }
  },

  deleteApplication(id: string): void {
    const list = this.getApplications();
    const filtered = list.filter(a => a.id !== id);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filtered));
  },

  getBookOrders(): BookOrder[] {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  },

  addBookOrder(order: Omit<BookOrder, 'id' | 'orderDate' | 'status'>): BookOrder {
    const list = this.getBookOrders();
    const newOrder: BookOrder = {
      ...order,
      id: `ord-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'Pending'
    };
    list.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    return newOrder;
  },

  updateBookOrderStatus(id: string, status: BookOrder['status']): void {
    const list = this.getBookOrders();
    const index = list.findIndex(o => o.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    }
  },

  deleteBookOrder(id: string): void {
    const list = this.getBookOrders();
    const filtered = list.filter(o => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
  },

  getBooks(): Book[] {
    const data = localStorage.getItem('fluentspeak_books_catalog');
    if (!data) {
      localStorage.setItem('fluentspeak_books_catalog', JSON.stringify(BOOKS_DATA));
      return BOOKS_DATA;
    }
    return JSON.parse(data);
  },

  saveBooks(books: Book[]): void {
    localStorage.setItem('fluentspeak_books_catalog', JSON.stringify(books));
  },

  addBook(book: Omit<Book, 'id'>): Book {
    const list = this.getBooks();
    const newBook: Book = {
      ...book,
      id: `book-${Date.now()}`
    };
    list.push(newBook);
    this.saveBooks(list);
    return newBook;
  },

  updateBook(id: string, updatedBook: Partial<Book>): void {
    const list = this.getBooks();
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedBook };
      this.saveBooks(list);
    }
  },

  deleteBook(id: string): void {
    const list = this.getBooks();
    const filtered = list.filter(b => b.id !== id);
    this.saveBooks(filtered);
  }
};
