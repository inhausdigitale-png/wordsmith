import { Course, Trainer, Testimonial, VideoItem, BlogItem, CareerOpening, Book } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 'beginner-english',
    title: 'Beginner Spoken English Course',
    shortDescription: 'Learn English from the absolute basics. Perfect for beginners, students, and homemakers.',
    longDescription: 'Designed for learners who have little or no knowledge of English. This course will handhold you through letters, sounds, basic vocabulary, sentence formation, and everyday greetings.',
    duration: '6 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Speak confidently in everyday situations and establish a solid foundation.',
    whoCanJoin: ['Students', 'Homemakers', 'Adults', 'Beginners with zero experience'],
    whatYoullLearn: [
      'Alphabet & Sounds (Phonics basics)',
      'Basic Grammar (Nouns, Verbs, Pronouns, Tenses basics)',
      'Vocabulary Building (Common words, food, shopping, hobbies)',
      'Sentence Formation (Simple declarative & interrogative forms)',
      'Daily Conversations & Self-Introductions',
      'Greetings & Politeness markers (Please, Thank you, Excuse me)',
      'Basic Reading Practice & Listening Skills',
      'Primary Pronunciation drills'
    ],
    category: 'Spoken English',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'intermediate-english',
    title: 'Intermediate Spoken English',
    shortDescription: 'Improve fluency, grammar accuracy, and confidence through practical speaking exercises.',
    longDescription: 'Take your English communication to the next level. Ideal for learners who know basic English but struggle with fluency, hesitate while speaking, or make grammar mistakes.',
    duration: '8 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Communicate smoothly without pausing, express complex ideas, and lead social conversations.',
    whoCanJoin: ['Students', 'Job Seekers', 'Working Professionals', 'Intermediate speakers wishing to eliminate hesitation'],
    topics: [
      'Grammar Review & Common Errors',
      'Vocabulary Enhancement & Idioms',
      'Active Group Discussions (GD) & Debate Sessions',
      'Storytelling & Narrative skills',
      'Interactive Listening Activities',
      'Professional Email Writing basics',
      'Real-world Conversation Practice',
      'Pronunciation Improvement & Accent Neutralization'
    ],
    category: 'Fluency & Spoken English',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'advanced-english',
    title: 'Advanced Spoken English & Communication',
    shortDescription: 'Become a commanding, expressive, and confident speaker capable of handling professional discussions.',
    longDescription: 'Refine your English for high-level social, academic, and business interactions. Focuses on leadership communication, accent neutralization, and speech delivery.',
    duration: '8 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Influence people with your speeches, present ideas dynamically, and lead discussions effortlessly.',
    bestFor: 'Working professionals, team leads, managers, and advanced learners.',
    whatYoullLearn: [
      'Advanced Grammar & Sentence Patterns',
      'Public Speaking & Stage Confidence',
      'Professional Presentation Skills',
      'High-Level Business Vocabulary & Nuances',
      'Accent Neutralization & Speech Modulation',
      'Leadership & Persuasive Communication',
      'Formal Discussions & Corporate Debates',
      'Keynote Speech Delivery & Body Language'
    ],
    category: 'Professional Speaking',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'business-english',
    title: 'Business English Course',
    shortDescription: 'Communicate professionally. Build essential workplace skills for the corporate environment.',
    longDescription: 'Accelerate your career with customized corporate English skills. Learn to write powerful emails, handle international clients, and excel in board meetings.',
    duration: '6 Weeks',
    mode: 'Online | Classroom | On-site',
    outcome: 'Excel in workplace interactions, lead productive meetings, write executive emails, and negotiate confidently.',
    idealFor: ['Corporate Employees', 'Entrepreneurs', 'Sales Teams', 'Customer Support Specialists', 'Managers'],
    modules: [
      'Professional Business Emails & Correspondence',
      'Corporate Vocabulary & Idiomatic Expressions',
      'Leading & Participating in Meetings',
      'Managing Client Conversations & Client Facing Skills',
      'Interactive Pitching & Slide Presentations',
      'Professional Telephone Etiquette & Voice Calls',
      'Negotiation & Conflict Resolution strategies',
      'Internal Corporate Communication & Report Writing'
    ],
    category: 'Professional Speaking',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking Preparation',
    shortDescription: 'Achieve your target band score (Band 7.5+) with our proven speaking test strategies.',
    longDescription: 'A laser-focused course specifically targeting the IELTS Speaking sub-test. Learn from British Council & IDP certified mentors with mock tests and individual feedback.',
    duration: '4 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Handle all parts of the IELTS speaking exam without anxiety, securing a band 7.5 or higher.',
    courseIncludes: [
      'Part 1: Quick Response Speaking Practice',
      'Part 2: Cue Card Structuring & Storyboarding',
      'Part 3: In-Depth Discussion & Abstract Questions',
      'Advanced Pronunciation & Native Rhythm Drills',
      'High-scoring Band 8/9 Vocabulary & Collocations',
      'Grammatical Range & Accuracy Exercises',
      'Weekly Full Mock Interviews with Certified Examiners',
      'Detailed Individual Feedback & Band Score Analysis'
    ],
    category: 'Test Prep',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'interview-english',
    title: 'Interview Preparation Course',
    shortDescription: 'Prepare for job interviews with confidence. Master self-introductions and mock drills.',
    longDescription: 'Get hired in your dream company. This course covers everything from building an impactful resume to answering tough HR questions, managing body language, and salary negotiation.',
    duration: '3 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Walk into any job interview prepared, speak with absolute clarity, and land your offer letters.',
    topics: [
      'Mastering the Perfect Self-Introduction',
      'Answering Difficult HR & Behavioral Questions',
      'Technical Communication & Explaining Technical Terms Simply',
      'Resume Discussion & Explaining Career Gaps',
      'Strategic Salary Negotiation & Offer Evaluation',
      'Body Language, Eye Contact, & Professional Dress Code',
      'Simulated Mock Interviews with Video Feedback Sessions',
      'Developing Executive Presence'
    ],
    category: 'Career Development',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking & Presentation Skills',
    shortDescription: 'Learn to communicate powerfully and influence any audience size without stage fright.',
    longDescription: 'Transform from an anxious speaker into a captivating storyteller. Learn stage presence, vocal dynamics, audience engagement, and structures to hook your listeners.',
    duration: '4 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Deliver presentations with authority, command attention, and eliminate public speaking fear entirely.',
    modules: [
      'Overcoming Stage Fright & Building Stage Confidence',
      'Speech Writing, Hooks, & Logical Structuring',
      'Voice Modulation, Pace, Tonality, & Pausing',
      'The Art of Storytelling & Emotional Connection',
      'Designing & Delivering Impactful Visual Slides',
      'Audience Engagement, Q&A Handling, & Crowd Control',
      'Leadership Communication & Charismatic Body Language',
      'Impromptu Speaking (Table Topics) Training'
    ],
    category: 'Leadership & Speaking',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'kids-english',
    title: 'Kids English & Personality Development',
    shortDescription: 'Help your child build strong English communication, vocabulary, and active listening skills early.',
    longDescription: 'Designed for young learners (ages 6–14) to cultivate an intuitive love for the English language through creative writing, interactive speaking games, and fun vocabulary challenges.',
    duration: '12 Weeks',
    mode: 'Online | Classroom',
    outcome: 'Your child will speak English naturally and fearlessly in schools, debates, and social circles.',
    topics: [
      'Creative Vocabulary Building Games',
      'Interactive Storytelling & Show-and-Tell Activities',
      'Basic Grammar through Fun Worksheets',
      'Phonics, Accent, and Expressive Reading',
      'Conversational Etiquette for Young Learners',
      'Elocution, Small Debates, and Group Speeches',
      'Confidence and Leadership Building',
      'Weekly Interactive Assessment Activities'
    ],
    category: 'Kids English',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600'
  }
];

export const TRAINERS_DATA: Trainer[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Lead Spoken English & Business communication Mentor',
    qualifications: 'MA in English Literature, Cambridge CELTA Certified',
    experience: '12+ Years Experience',
    bio: 'Sarah has coached over 5,000 corporate professionals and students in corporate communication, neutral accent, and public speaking. Her sessions are high-energy and focus heavily on practical role-plays.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Rajesh Kumar',
    role: 'IELTS Lead Trainer & Accent Expert',
    qualifications: 'British Council & IDP Certified IELTS Master Coach',
    experience: '10+ Years Experience',
    bio: 'Rajesh specializes in helping IELTS candidates leap from Band 6 to Band 8 in Speaking and Writing. He uses custom speech correction algorithms and detailed feedback rubrics.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Anya Sen',
    role: 'Public Speaking Coach & HR specialist',
    qualifications: 'MBA in Human Resources, Certified Soft Skills Trainer',
    experience: '8+ Years Experience',
    bio: 'Anya brings real-world corporate hiring insights to the classroom. She excels in conducting mock interviews, refining resume structures, and grooming candidates for leadership communication.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: 'Priya Sharma',
    course: 'Business English & Public Speaking',
    review: 'FluentSpeak Academy completely transformed my career! I used to freeze up during client presentations. Thanks to Anya’s speech structuring and Sarah’s confidence-building exercises, I just delivered a keynote pitch successfully and got promoted to Senior Manager.',
    beforeExperience: 'Anxious speaker, struggled with email vocabulary, hesitated during client calls.',
    afterExperience: 'Flawless business pitches, promoted to Lead Manager, delivers confident keynotes.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Amit Verma',
    course: 'IELTS Speaking Preparation',
    review: 'I needed a Band 7.5 in Speaking to apply for my Canadian Permanent Residency. I was stuck at Band 6 in my last two attempts. Rajesh’s strict feedback, band descriptor reviews, and cue card frameworks pushed me to Band 8 in just 4 weeks! Highly recommended.',
    beforeExperience: 'Stuck at Band 6.0 IELTS, struggled with cohesion and vocabulary range.',
    afterExperience: 'Scored Band 8.0 on Speaking! Relocated to Toronto with total confidence.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Sneha Patel',
    course: 'Beginner & Intermediate English',
    review: 'Being a homemaker, I felt left out in parent-teacher meetings and social circles because of my poor English. The small batch size at FluentSpeak and the friendly trainers made me feel safe. Today, I chat in English with my kids and speak confidently in school meetings!',
    beforeExperience: 'Zero speaking confidence, spoke broken English with translation errors.',
    afterExperience: 'Converses smoothly at school meetings, hosts neighborhood social events.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Vikram Aditya',
    course: 'Interview Preparation Course',
    review: 'I was rejected in three tech interviews purely due to communication issues and poor self-introduction. The mock interviews, HR simulation questions, and body language coaching here gave me clarity. I cleared my very next interview and landed an offer at a top MNC!',
    beforeExperience: 'Rejected in final HR rounds despite solid technical skills.',
    afterExperience: 'Cleared Tech & HR rounds at top tier product firm. Double salary package!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'How to introduce yourself professionally in job interviews',
    category: 'Interview Skills',
    youtubeId: '3GZ_DKe6pM8', // standard placeholder IDs or custom simulated values
    duration: '12:40'
  },
  {
    id: 'vid-2',
    title: 'Top 10 daily usage English sentences to eliminate translation',
    category: 'Daily Conversations',
    youtubeId: 'Z-XmI9N-L4I',
    duration: '08:15'
  },
  {
    id: 'vid-3',
    title: 'Speak English fluently: How to avoid "UH" and "UM" fillers',
    category: 'Pronunciation',
    youtubeId: '9G8pYy0BofE',
    duration: '10:32'
  },
  {
    id: 'vid-4',
    title: 'Active Voice vs Passive Voice: The ultimate grammar breakdown',
    category: 'Grammar',
    youtubeId: 'L8mC_A7f7-I',
    duration: '14:20'
  },
  {
    id: 'vid-5',
    title: 'Professional business email structure: Write effectively',
    category: 'Business English',
    youtubeId: 'U_5C0K6B08w',
    duration: '09:50'
  },
  {
    id: 'vid-6',
    title: 'IELTS Speaking Band 9: Mock interview with certified tips',
    category: 'IELTS Tips',
    youtubeId: 'N17T6l1_rQk',
    duration: '15:10'
  },
  {
    id: 'vid-7',
    title: 'Public speaking hacks: How to capture any stage instantly',
    category: 'Public Speaking',
    youtubeId: 'i5mK788Zt5s',
    duration: '11:45'
  },
  {
    id: 'vid-8',
    title: 'Student Success Story: Priya Sharma share her career transition',
    category: 'Student Success Stories',
    youtubeId: 'TzF_6T-5_iY',
    duration: '06:30'
  }
];

export const BLOGS_DATA: BlogItem[] = [
  {
    id: 'blog-1',
    title: '5 Daily Habits to Speak English Fluently Without Hesitation',
    category: 'Spoken English Tips',
    date: 'June 28, 2026',
    readTime: '5 min read',
    summary: 'Struggling with sentence formation? Discover five practical, zero-cost daily habits that train your brain to think directly in English.',
    content: [
      'Thinking in English is the ultimate bridge to fluency. Most learners struggle because they translate sentences word-for-word from their native language. This creates natural delays, awkward pauses, and grammatical errors.',
      'Here are five small adjustments you can make to your schedule starting today:',
      '1. Name objects around you: Whenever you look around your room or desk, name the items in English (e.g., "desk", "charger", "folder") instead of your native tongue.',
      '2. Speak to yourself (Self-Talk): Narrate what you are doing in English (e.g., "Now I am preparing my breakfast. I will add some honey to my tea..."). This builds active vocabulary.',
      '3. Read aloud for 10 minutes: Reading aloud exercises your facial muscles, tongue, and throat to adjust to English phonetics, dramatically improving your pronunciation.',
      '4. Listen to active English media: Listen to podcasts or watch videos of native speakers. Pay attention to how they link words together, not just the vocabulary they use.',
      '5. Write a 3-sentence daily journal: Summarize your day in three simple English sentences before sleeping. It builds immediate sentence structure skills.'
    ],
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'blog-2',
    title: 'The Secret to Cracking "Tell Me About Yourself" in Interviews',
    category: 'Interview Skills',
    date: 'June 15, 2026',
    readTime: '6 min read',
    summary: 'The first impression is the lasting impression. Learn the simple Present-Past-Future framework to answer this crucial question effortlessly.',
    content: [
      'Almost every job interview starts with this single question: "Tell me about yourself." Although it seems casual, HR managers use this to assess your communication skills, executive presence, and professional relevance in under 90 seconds.',
      'Do not read out your entire resume. Instead, use our proven Present-Past-Future (PPF) formula to deliver a crisp response:',
      '1. Present (30 seconds): State your current role, key responsibilities, and one recent major accomplishment.',
      '2. Past (30 seconds): Briefly describe your educational background and previous professional milestones that prepared you for this role.',
      '3. Future (30 seconds): Explain why you are excited about this specific opportunity and how it matches your career objectives.',
      'Remember, practice this with a smile, maintain continuous eye contact, and keep your body language expressive and inviting.'
    ],
    author: 'Anya Sen',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'blog-3',
    title: '15 Business Collocations to Sound More Professional at Work',
    category: 'Business English',
    date: 'May 24, 2026',
    readTime: '4 min read',
    summary: 'Stop using repetitive verbs. Use these standard business collocations to upgrade your emails and meeting contributions instantly.',
    content: [
      'In a corporate environment, using standard collocations makes your communication sound precise, polite, and executive.',
      'Instead of saying "I am going to check this issue", say "I will look into this matter". Instead of "We need to do a meeting", say "We need to schedule/convene a meeting".',
      'Here are some high-frequency collocations to add to your daily emails:',
      '- "To touch base with someone": To make contact or reconnect briefly.',
      '- "To keep someone in the loop": To keep someone informed about a process or project.',
      '- "To reach a consensus": To come to a mutual agreement.',
      '- "To streamline operations": To make processes more efficient and faster.',
      '- "To bring to the table": To contribute something of value to a discussion.'
    ],
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'blog-4',
    title: 'Top IELTS Speaking Mistakes that Keep Candidates Stuck at Band 6',
    category: 'IELTS',
    date: 'May 08, 2026',
    readTime: '5 min read',
    summary: 'Are you stuck in IELTS Speaking despite continuous practice? Avoid these common pitfalls to boost your band score to Band 7.5 or higher.',
    content: [
      'Many IELTS students practice speaking but fail to see their score increase because they repeatedly commit small, unnoticed errors that drag down their scores on the official rubric.',
      'Here are the three most common mistakes you must avoid:',
      '1. Memorizing Answers: Examiners are trained to spot memorized answers instantly. If your voice lacks natural intonation or sounds robotic, your score will immediately drop to Band 5 in Fluency.',
      '2. Overusing Complex Words incorrectly: Using fancy vocabulary words in the wrong context does more harm than good. Precision and natural collocations are scored higher than obscure vocabulary.',
      '3. Short Part 3 Responses: In Part 3 of the exam, the examiner expects you to analyze and hypothesize. If your response is only 2-3 sentences, you do not demonstrate your grammatical range. Aim for 5-6 structured sentences with logical explanations.'
    ],
    author: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500'
  }
];

export const CAREER_OPENINGS_DATA: CareerOpening[] = [
  {
    id: 'career-trainer-spoken',
    title: 'Spoken English Trainer',
    type: 'Full-time / Part-time',
    location: 'Hybrid (Online & Classroom)',
    experience: '2+ Years in Spoken English Training',
    description: 'We are looking for an energetic and passionate Spoken English Trainer to conduct interactive sessions for college students, job seekers, and homemakers. You will facilitate group discussions, roll-plays, and speech drills.',
    requirements: [
      'Excellent spoken and written English command with natural neutrality.',
      'Strong empathy, classroom engagement skills, and patience.',
      'Ability to design speaking activities and evaluate student speech patterns.',
      'Prior experience with adult learners is highly preferred.'
    ]
  },
  {
    id: 'career-trainer-ielts',
    title: 'IELTS Trainer',
    type: 'Full-time',
    location: 'Classroom - Head Center',
    experience: '3+ Years with certified band history',
    description: 'Are you an expert in the IELTS rubrics? Join our test preparation division! You will lead intensive IELTS prep modules, administer mock assessments, and deliver meticulous feedback to help candidates reach Band 7.5+.',
    requirements: [
      'British Council / IDP Certification is mandatory.',
      'Deep understanding of the IELTS Speaking and Writing evaluation criteria.',
      'Excellent analytical skills to identify specific scoring blockers.',
      'Proven track record of students achieving Band 7.5+.'
    ]
  },
  {
    id: 'career-student-counselor',
    title: 'Student Counselor',
    type: 'Full-time',
    location: 'On-site Center Office',
    experience: '1+ Years in Education Sales / Counseling',
    description: 'You will act as the face of FluentSpeak Academy for incoming learners. Guide students in choosing the perfect course for their personal or career goals, handle walk-in admissions, and manage batch allocations.',
    requirements: [
      'Strong interpersonal, communication, and phone etiquette skills.',
      'Warm, welcoming, empathetic personality that excels in problem-solving.',
      'Basic CRM usage and computer competency (Excel, Docs).',
      'Fluency in English and local languages.'
    ]
  },
  {
    id: 'career-academic-coordinator',
    title: 'Academic Coordinator',
    type: 'Full-time',
    location: 'Head Center',
    experience: '4+ Years in Institute Administration',
    description: 'Manage curriculum alignment, batch scheduling, trainer assignments, and quality assurance audits across online and offline classroom cohorts to ensure high satisfaction ratings.',
    requirements: [
      'Proven leadership skills in administrative roles in training schools.',
      'Exceptional coordination, scheduling, and multi-tasking abilities.',
      'Ability to design custom course timelines and train junior faculty.',
      'Strict commitment to educational outcomes.'
    ]
  },
  {
    id: 'career-marketing-executive',
    title: 'Marketing Executive (Social Media & Growth)',
    type: 'Full-time',
    location: 'Hybrid',
    experience: '2+ Years in Digital Marketing',
    description: 'Help us reach and inspire thousands of learners! You will manage FluentSpeak Academy’s social channels, run local outreach events, collaborate with video designers for YouTube content, and track inquiry leads.',
    requirements: [
      'Hands-on experience with social platforms (Instagram, YouTube, LinkedIn).',
      'Excellent copywriting and graphic outline coordination.',
      'Basic analytics knowledge (Google Ads, Meta Ads) is a big plus.',
      'Creative mindset with a drive for brand building.'
    ]
  }
];

export const FREQUENT_QUESTIONS: { question: string; answer: string }[] = [
  {
    question: 'Do I need prior English knowledge to join?',
    answer: 'Absolutely not! Our Beginner Spoken English course starts right from the basics (alphabet sounds, sentence framing, and basic daily vocabulary). It is designed to make you feel completely safe and supported, regardless of your starting point.'
  },
  {
    question: 'Are classes online or offline?',
    answer: 'We offer both options! You can choose interactive Live Online Classes (via zoom with real-time trainers) or join our premium physical Classroom cohorts at our state-of-the-art head center. The choice is yours based on your convenience.'
  },
  {
    question: 'Will I receive a course completion certificate?',
    answer: 'Yes! Upon successfully completing your course modules and final review assessments, FluentSpeak Academy awards you a certified Course Completion Certificate recognizing your accomplishment.'
  },
  {
    question: 'What are the class timings? Can I shift batches?',
    answer: 'We offer highly flexible timings to suit everyone: Morning, Afternoon, Evening, Weekend, and Fast-track batches. If you face sudden work schedule changes, we support shifting you to a different batch with prior academic notice.'
  },
  {
    question: 'How long is each classroom session?',
    answer: 'Sessions are highly interactive and typically last between 60 to 90 minutes depending on the selected course structure. This ensures adequate individual speaking time for every learner.'
  },
  {
    question: 'What is the maximum batch size?',
    answer: 'We believe in personalized attention. To ensure every student gets ample time to speak, role-play, and receive constructive feedback, we strictly cap our batches at 10 to 12 students.'
  }
];

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-spoken-english-mastery',
    title: 'Spoken English Mastery: From Beginner to Fluent',
    author: 'Sarah Jenkins',
    description: 'The ultimate self-study guide to speak English with natural confidence. Packed with step-by-step grammatical hacks, real-world conversational dialogues, common phrase glossaries, and practice exercises designed to eliminate hesitation.',
    price: 299,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    category: 'Speaking & Fluency',
    tags: ['Best Seller', 'Self-Study', 'Grammar hacks'],
    pages: 280,
    language: 'English',
    format: 'Paperback',
    stock: 45
  },
  {
    id: 'book-ielts-speaking-handbook',
    title: 'The Ultimate IELTS Speaking Band 8+ Playbook',
    author: 'Rajesh Kumar',
    description: 'Unlock your dream band score with this target playbook. Learn certified cue card templates, strategic outline grids for Part 3, lexical resource vocabulary lists, and common pronunciation fixes used by examiners.',
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    category: 'Test Preparation',
    tags: ['IELTS 8+', 'Mock Exercises', 'Cue Cards'],
    pages: 320,
    language: 'English',
    format: 'Paperback',
    stock: 28
  },
  {
    id: 'book-business-english-excellence',
    title: 'Business English Excellence: Corporate Guide',
    author: 'Sarah Jenkins',
    description: 'Upgrade your corporate communication instantly. Learn to write persuasive executive emails, handle international client calls, present data slides, lead board discussions, and resolve office conflicts gracefully.',
    price: 399,
    originalPrice: 599,
    rating: 4.7,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    category: 'Business English',
    tags: ['Corporate', 'Email Writing', 'Client Facing'],
    pages: 240,
    language: 'English',
    format: 'Hardcover',
    stock: 32
  },
  {
    id: 'book-public-speaking-bible',
    title: 'The Stage is Yours: Overcoming Public Speaking Fear',
    author: 'Anya Sen',
    description: 'Transform from an anxious speaker to an inspiring leader. This book delivers step-by-step guidance on speech hooks, voice modulation, eye contact secrets, dynamic body gestures, and table-topic impromptu hacks.',
    price: 249,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600',
    category: 'Leadership & Speaking',
    tags: ['Stage Presence', 'Confidence', 'Public Speaking'],
    pages: 210,
    language: 'English',
    format: 'Paperback',
    stock: 50
  },
  {
    id: 'book-ace-your-interview',
    title: 'Ace Your Interview: English and HR Strategies',
    author: 'Anya Sen',
    description: 'Learn to leverage the Present-Past-Future (PPF) formula for the perfect self-introduction. Covers high-impact answers to 50 tough HR questions, behavioral scenarios, and salary negotiation strategies.',
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600',
    category: 'Career Development',
    tags: ['Job Seekers', 'HR Questions', 'Resume Hacks'],
    pages: 190,
    language: 'English',
    format: 'eBook / Paperback',
    stock: 60
  }
];

