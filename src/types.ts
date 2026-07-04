export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  duration: string;
  mode: string;
  outcome: string;
  whoCanJoin?: string[];
  whatYoullLearn?: string[];
  topics?: string[];
  modules?: string[];
  courseIncludes?: string[];
  idealFor?: string[];
  bestFor?: string;
  category: string;
  image?: string;
}

export interface Trainer {
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  name: string;
  course: string;
  review: string;
  beforeExperience: string;
  afterExperience: string;
  rating: number;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  duration: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  author: string;
  image: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  type: string; // Full-time / Part-time
  location: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface Enquiry {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  course: string;
  preferredBatch: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Enrolled';
}

export interface DemoBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  preferredDate: string;
  preferredTime: string;
  dateCreated: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
}

export interface JobApplication {
  id: string;
  openingId: string;
  position: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  resumeName: string;
  coverLetter?: string;
  dateApplied: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  tags?: string[];
  pages?: number;
  language?: string;
  format?: string;
  stock?: number;
}

export interface BookOrder {
  id: string;
  bookId: string;
  bookTitle: string;
  price: number;
  quantity: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  orderDate: string;
  paymentMethod: 'Cash on Delivery' | 'UPI' | 'Card';
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

