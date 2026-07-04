import React, { useState, useEffect } from 'react';
import { BOOKS_DATA } from '../data';
import { Book, BookOrder } from '../types';
import { storage } from '../lib/storage';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  Truck, 
  MapPin, 
  CreditCard, 
  X, 
  ArrowRight, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  ShoppingBag as CartIcon, 
  Sparkles,
  Info
} from 'lucide-react';

interface CartItem {
  book: Book;
  quantity: number;
}

export default function BookStore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Checkout Form State
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'UPI' | 'Card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });

  // Successful Order State
  const [placedOrder, setPlacedOrder] = useState<BookOrder | null>(null);

  // Load books catalog dynamically and cart from localStorage
  useEffect(() => {
    setBooks(storage.getBooks());

    const savedCart = localStorage.getItem('fluentspeak_book_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save cart
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('fluentspeak_book_cart', JSON.stringify(newCart));
  };

  // Add to cart
  const addToCart = (book: Book, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const existing = cart.find(item => item.book.id === book.id);
    let updated: CartItem[];
    
    if (existing) {
      updated = cart.map(item => 
        item.book.id === book.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updated = [...cart, { book, quantity: 1 }];
    }
    
    saveCart(updated);
    setIsCartOpen(true);
  };

  // Update quantity
  const updateQuantity = (bookId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.book.id === bookId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    saveCart(updated);
  };

  // Remove from cart
  const removeFromCart = (bookId: string) => {
    const updated = cart.filter(item => item.book.id !== bookId);
    saveCart(updated);
  };

  // Clear cart
  const clearCart = () => {
    saveCart([]);
  };

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const estimatedTax = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + estimatedTax;

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

  // Handle order submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.fullName || !checkoutForm.phone || !checkoutForm.address || !checkoutForm.city || !checkoutForm.postalCode) {
      alert('Please fill in all the required delivery details.');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Place an order for each item or consolidate. Let's place orders for each item or make a consolidated entry
    // Since our types.ts define single bookId per order, let's create orders for each cart item or record them.
    // For extreme cleanliness, let's place one BookOrder for the primary item or first item, 
    // or create a series of orders. Let's create an order for the first item and mention total package.
    // Better: let's loop over each item in the cart and submit them to localStorage!
    let lastOrder: BookOrder | null = null;
    
    cart.forEach(item => {
      const orderData = storage.addBookOrder({
        bookId: item.book.id,
        bookTitle: item.book.title,
        price: item.book.price,
        quantity: item.quantity,
        fullName: checkoutForm.fullName,
        phone: checkoutForm.phone,
        email: checkoutForm.email || 'not-provided@example.com',
        address: checkoutForm.address,
        city: checkoutForm.city,
        postalCode: checkoutForm.postalCode,
        paymentMethod: checkoutForm.paymentMethod
      });
      lastOrder = orderData;
    });

    if (lastOrder) {
      setPlacedOrder(lastOrder);
    }

    // Reset states
    clearCart();
    setIsCheckout(false);
  };

  return (
    <div className="py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-800 text-white p-8 md:p-12">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 mr-1" />
              <span>Official Academy Bookstore</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
              Master English with Our Handcrafted Books
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Curated and authored by Wordsmith Academy’s senior training experts. These guides provide proven speech formulas, structural cue card matrices, and standard corporate dialogues to fast-track your fluency.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-gray-400 font-semibold">
              <div className="flex items-center space-x-1">
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span>Premium Quality Paperback</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span>Fast Doorstep Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span>Includes Free Audio Exercises</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter & Shop Layout */}
        {placedOrder ? (
          /* Placed Order Success Screen */
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm animate-fade-in">
            <div className="bg-emerald-100 text-emerald-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">
              Thank You! Your Order is Placed.
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-widest font-semibold">
              Order ID: {placedOrder.id}
            </p>
            
            <div className="my-8 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left space-y-3 text-sm">
              <div className="flex justify-between font-bold text-gray-800 border-b border-gray-200 pb-2">
                <span>Customer Details</span>
                <span className="text-emerald-700 font-medium font-sans">Pre-paid / COD Pending</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-400 font-medium">Recipient:</span>
                <span className="col-span-2 text-gray-900 font-semibold">{placedOrder.fullName}</span>
                
                <span className="text-gray-400 font-medium">Phone:</span>
                <span className="col-span-2 text-gray-900 font-semibold">{placedOrder.phone}</span>
                
                <span className="text-gray-400 font-medium">Shipping Address:</span>
                <span className="col-span-2 text-gray-900 font-medium leading-relaxed">
                  {placedOrder.address}, {placedOrder.city} - {placedOrder.postalCode}
                </span>

                <span className="text-gray-400 font-medium">Payment Mode:</span>
                <span className="col-span-2 text-gray-900 font-bold font-mono text-xs">{placedOrder.paymentMethod}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              We have dispatched your order information to our shipping desk. You will receive a tracking link via SMS within 24 hours. Delivery takes 3 to 5 business days.
            </p>
            
            <button
              onClick={() => setPlacedOrder(null)}
              className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left sidebar filters */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Search Bar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Search Catalog</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title, author..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-3">
                  <Filter className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans">Categories</h3>
                </div>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-emerald-50 text-emerald-700 font-bold shadow-2xs'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action banner */}
              <div className="bg-emerald-950 text-white border border-emerald-900 rounded-2xl p-6 text-center space-y-4">
                <Award className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-extrabold tracking-tight">Need Classroom Materials?</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Students enrolled in our physical batches receive all official course books and custom speaking workbook modules for free!
                </p>
                <button
                  onClick={() => {
                    // Click demo
                    const demoTabBtn = document.getElementById('nav-demo-btn');
                    if (demoTabBtn) demoTabBtn.click();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 w-full rounded-xl block transition-all"
                >
                  Book a Free Demo Class
                </button>
              </div>

            </div>

            {/* Middle Main Books Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                  Showing {filteredBooks.length} of {books.length} Books
                </p>
                
                {cart.length > 0 && (
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="bg-rose-50 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-2xs hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <CartIcon className="h-4 w-4" />
                    <span>View Shopping Cart ({cart.reduce((s,i)=>s+i.quantity, 0)})</span>
                  </button>
                )}
              </div>

              {filteredBooks.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-xs">
                  <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold font-sans text-lg">No books found in this category.</p>
                  <p className="text-xs text-gray-400 mt-1">Try clearing your filters or search term to see more results.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    className="mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => {
                    const isInCart = cart.some(item => item.book.id === book.id);
                    return (
                      <div 
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all border-b-4 hover:border-b-emerald-600 cursor-pointer flex flex-col group h-[480px]"
                      >
                        {/* Image overlay */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden shrink-0">
                          <img
                            src={book.image}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            {book.tags?.map((tag) => (
                              <span 
                                key={tag} 
                                className="bg-gray-900/80 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider block"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">
                              {book.category}
                            </span>
                            <h3 className="text-sm font-extrabold text-gray-900 leading-tight line-clamp-2 font-sans group-hover:text-emerald-700 transition-colors">
                              {book.title}
                            </h3>
                            <p className="text-xs text-gray-400 font-semibold">
                              By {book.author}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed pt-1">
                              {book.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-gray-100/60 mt-4 space-y-3">
                            {/* Rating and Reviews */}
                            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-semibold">
                              <div className="flex text-amber-400">
                                <Star className="h-3.5 w-3.5 fill-current" />
                              </div>
                              <span className="text-gray-900 font-bold">{book.rating}</span>
                              <span>•</span>
                              <span>{book.reviewsCount} reviews</span>
                            </div>

                            {/* Price & Add to Cart */}
                            <div className="flex items-center justify-between pt-1">
                              <div>
                                <div className="flex items-baseline space-x-1.5">
                                  <span className="text-lg font-black text-gray-900">₹{book.price}</span>
                                  {book.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">₹{book.originalPrice}</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-emerald-600 font-extrabold">In Stock ({book.stock} left)</span>
                              </div>

                              <button
                                onClick={(e) => addToCart(book, e)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                                  isInCart 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                                }`}
                              >
                                <ShoppingBag className="h-3.5 w-3.5" />
                                <span>{isInCart ? 'Add More' : 'Add to Cart'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        )}

        {/* Book Detailed Description Modal */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full border border-gray-200 overflow-hidden shadow-2xl relative animate-scale-up">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left side cover art */}
                <div className="md:col-span-5 bg-gray-50 p-6 flex flex-col justify-center items-center border-r border-gray-100">
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover rounded-2xl shadow-md border border-gray-200 max-w-[200px]"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Format</p>
                    <p className="text-xs font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md mt-1 inline-block">
                      {selectedBook.format || 'Paperback'}
                    </p>
                  </div>
                </div>

                {/* Right side detailed metadata */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest">
                        {selectedBook.category}
                      </span>
                      <h3 className="text-xl font-extrabold text-gray-900 font-sans tracking-tight leading-snug mt-1">
                        {selectedBook.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-bold mt-1">By {selectedBook.author}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500">
                      <div className="flex items-center text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-current mr-1" />
                        <span className="text-gray-900 font-extrabold">{selectedBook.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedBook.reviewsCount} Reader Reviews</span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {selectedBook.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-center text-[11px] text-gray-500 font-medium">
                      <div>
                        <p className="text-gray-400 font-bold uppercase text-[9px] font-mono mb-0.5">Pages</p>
                        <p className="text-gray-900 font-bold">{selectedBook.pages || '250+'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-bold uppercase text-[9px] font-mono mb-0.5">Language</p>
                        <p className="text-gray-900 font-bold">{selectedBook.language || 'English'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-bold uppercase text-[9px] font-mono mb-0.5">Print Quality</p>
                        <p className="text-gray-900 font-bold">Standard</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-2xl font-black text-gray-900">₹{selectedBook.price}</span>
                        {selectedBook.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">₹{selectedBook.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-extrabold block">In Stock & Ready for Dispatch</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => { addToCart(selectedBook); setSelectedBook(null); }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm"
                      >
                        Add To Shopping Cart
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* Shopping Cart Slider panel Overlay */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
            <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl relative animate-slide-in-right overflow-hidden border-l border-gray-200">
              
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-rose-600" />
                  <h3 className="text-lg font-bold text-gray-900 font-sans">Shopping Cart</h3>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {cart.reduce((s,i)=>s+i.quantity, 0)} Books
                  </span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsCheckout(false); }}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {isCheckout ? (
                  /* CHECKOUT FORM VIEW */
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                      Delivery & Shipping Details
                    </h4>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={checkoutForm.fullName}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="e.g. Sanjay Dutt"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="e.g. +91 98888 77777"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="e.g. sanjay@example.com"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Shipping Address *</label>
                      <input
                        type="text"
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="e.g. Flat 12, MG Road Complex"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">City / Town *</label>
                        <input
                          type="text"
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="e.g. Pune"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Postal Code *</label>
                        <input
                          type="text"
                          value={checkoutForm.postalCode}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, postalCode: e.target.value }))}
                          placeholder="e.g. 411001"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Payment selection */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] font-bold text-gray-500 uppercase">Payment Mode</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Cash on Delivery', 'UPI', 'Card'].map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: mode as any }))}
                            className={`py-2 px-1 rounded-xl text-center text-xs font-bold border transition-colors cursor-pointer ${
                              checkoutForm.paymentMethod === mode
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>

                      {/* Payment Subfields (Simulated Interactive UI) */}
                      {checkoutForm.paymentMethod === 'UPI' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-center space-y-2">
                          <p className="text-xs font-semibold text-gray-600">Scan QR or enter UPI ID</p>
                          {/* QR Code Graphic */}
                          <div className="bg-white h-28 w-28 mx-auto border border-gray-200 flex items-center justify-center relative p-1.5 rounded-lg shadow-2xs">
                            <img
                              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=150"
                              alt="Mock QR Code"
                              className="h-full w-full opacity-60 grayscale filter contrast-125"
                            />
                            <div className="absolute bg-white px-2 py-0.5 rounded-sm border border-gray-200 text-[8px] font-bold text-emerald-700 font-mono">
                              Wordsmith UPI
                            </div>
                          </div>
                          <div className="text-left">
                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">UPI Handle ID</label>
                            <input
                              type="text"
                              value={checkoutForm.upiId}
                              onChange={(e) => setCheckoutForm(prev => ({ ...prev, upiId: e.target.value }))}
                              placeholder="e.g. yourname@okaxis"
                              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {checkoutForm.paymentMethod === 'Card' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2">
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Credit/Debit Card Number</label>
                            <input
                              type="text"
                              value={checkoutForm.cardNumber}
                              onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                              placeholder="4111 2222 3333 4444"
                              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Expiry Date</label>
                              <input
                                type="text"
                                value={checkoutForm.cardExpiry}
                                onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardExpiry: e.target.value }))}
                                placeholder="MM/YY"
                                className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">CVV Code</label>
                              <input
                                type="password"
                                value={checkoutForm.cardCvv}
                                onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardCvv: e.target.value }))}
                                placeholder="***"
                                maxLength={3}
                                className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsCheckout(false)}
                        className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold text-xs py-3 rounded-xl transition-all hover:bg-gray-50"
                      >
                        Back to Cart
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-all text-center"
                      >
                        Place COD Order
                      </button>
                    </div>
                  </form>
                ) : cart.length === 0 ? (
                  /* EMPTY CART VIEW */
                  <div className="text-center py-20 space-y-4">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto" />
                    <h4 className="text-base font-bold text-gray-900 font-sans">Your Shopping Cart is Empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Explore our book store tab and add certified English speaking handbooks to start practicing offline.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
                    >
                      Browse Books Catalog
                    </button>
                  </div>
                ) : (
                  /* CART ITEMS LIST */
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.book.id} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center space-x-4">
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          referrerPolicy="no-referrer"
                          className="h-20 w-16 object-cover rounded-xl border border-gray-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-extrabold text-gray-900 truncate font-sans">
                            {item.book.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-bold">By {item.book.author}</p>
                          <p className="text-xs font-black text-emerald-700 mt-1">₹{item.book.price}</p>
                          
                          {/* Qty controller */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.book.id, -1)}
                              className="bg-white border border-gray-200 hover:bg-gray-100 p-1 rounded-md transition-colors"
                            >
                              <Minus className="h-3 w-3 text-gray-600" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.book.id, 1)}
                              className="bg-white border border-gray-200 hover:bg-gray-100 p-1 rounded-md transition-colors"
                            >
                              <Plus className="h-3 w-3 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition-colors cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Cart Footer */}
              {!isCheckout && cart.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-100 p-6 space-y-4 shadow-inner">
                  <div className="space-y-2 text-xs font-semibold text-gray-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-gray-950 font-bold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="text-gray-950 font-bold">
                        {shipping === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST / Estimated Tax (5%)</span>
                      <span className="text-gray-950 font-bold">₹{estimatedTax.toFixed(2)}</span>
                    </div>
                    
                    {shipping > 0 && (
                      <p className="text-[10px] text-amber-600 font-bold text-center bg-amber-50 p-1.5 rounded-lg border border-amber-100 mt-1">
                        💡 Add ₹{(499.00 - subtotal).toFixed(2)} more to unlock FREE door-step shipping!
                      </p>
                    )}

                    <div className="flex justify-between border-t border-gray-200 pt-3 text-sm font-black text-gray-900">
                      <span>Total Invoice</span>
                      <span className="text-emerald-700 text-lg">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Proceed to Delivery & Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
