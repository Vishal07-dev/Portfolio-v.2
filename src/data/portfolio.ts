export const siteConfig = {
  name: "Vishal Rohera",
  role: "MEAN Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  email: "vishalrohera07@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishal-rohera-661038262/",
  github: "https://github.com/Vishal07-dev",
  resumeUrl: "/Vishal_Rohera_MEAN_Developer.pdf",
  /** Portrait in /public, decoded in the hero console on GET /me */
  photo: "/ME2.jpeg" as string | null,
  /** Focal point of the photo (fractions of width, height) for square crops */
  photoFocus: [0.64, 0.44] as [number, number],
  photoZoom: 2.1,
  tagline:
    "Building enterprise web applications with Angular, Node.js, and modern web technologies.",
  description:
    "Vishal Rohera, MEAN stack & Next.js web developer based in Ahmedabad, India. Building enterprise web apps with Angular, Node.js, Express & MongoDB.",
  keywords: [
    "Vishal Rohera",
    "MEAN Stack Developer",
    "Angular Developer",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "Web Developer",
    "TypeScript Developer",
    "Web Developer in Ahmedabad",
    "Next.js Developer Ahmedabad",
    "Frontend Developer Ahmedabad",
    "Ahmedabad",
    "Gujarat",
    "India",
  ],
};

export const aboutData = {
  paragraphs: [
    "I'm a MEAN Stack Developer building enterprise-grade web applications that serve real business needs. My work spans crafting scalable Angular frontends to designing RESTful APIs with Node.js and Express.",
    "I hold a BCA from Silver Oak University and have hands-on production experience with the complete MEAN stack. Beyond my primary stack, I also work with React.js and Next.js, which gives me flexibility across modern frontend ecosystems.",
    "I'm genuinely interested in AI-assisted development. I actively use tools like Google Gemini in my projects and apply prompt engineering to ship features faster and write better code.",
  ],
  highlights: [
    { label: "Role", value: "MEAN Stack Developer" },
    { label: "Education", value: "BCA, Silver Oak University" },
    { label: "Location", value: "Ahmedabad, Gujarat" },
  ],
  stats: [
    { number: "1+", label: "Year of experience" },
    { number: "3+", label: "Projects shipped" },
    { number: "2", label: "Tech Stacks" },
    { number: "1", label: "Published article" },
  ],
};

export const experienceData = {
  company: "BrainerHub Solutions",
  companyUrl: "https://brainerhub.com",
  role: "MEAN Stack Developer",
  type: "Full-time",
  duration: "Jan 2025 to Present",
  period: "1+ year",
  location: "Ahmedabad, Gujarat, India",
  description:
    "Working on enterprise web application development across the full MEAN stack within a collaborative agile team environment.",
  responsibilities: [
    "Build and maintain enterprise Angular applications with a focus on component reusability, performance, and clean architecture",
    "Integrate RESTful APIs using Angular services and RxJS observables, including error handling and loading state management",
    "Develop dashboards and reporting modules with data visualization components for business intelligence requirements",
    "Design and implement backend routes and middleware using Node.js and Express.js",
    "Write and optimize MongoDB queries, design data schemas aligned with application requirements",
    "Participate in agile sprints including code reviews, debugging sessions, and estimation meetings",
    "Manage version control workflows using Git and GitLab including feature branches and merge requests",
  ],
  technologies: [
    "Angular",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "RxJS",
    "Git",
    "GitLab",
  ],
};

export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "monitor",
    skills: [
      "Angular",
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: ["Node.js", "Express.js"],
  },
  {
    category: "Database",
    icon: "database",
    skills: ["MongoDB"],
  },
  {
    category: "Tools & DevOps",
    icon: "wrench",
    skills: ["Git", "GitHub", "GitLab", "Postman"],
  },
  {
    category: "Concepts",
    icon: "layers",
    skills: [
      "REST APIs",
      "JWT Authentication",
      "Agile Development",
      "Debugging",
      "Problem Solving",
    ],
  },
  {
    category: "AI & Emerging",
    icon: "sparkles",
    skills: ["AI-Assisted Development", "Prompt Engineering", "Gemini API"],
  },
];

export type Project = {
  id: number;
  title: string;
  problem: string;
  role: string;
  description: string;
  longDescription: string;
  tech: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  highlights: string[];
  /** Screenshot of the live site in /public/projects */
  image: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "KŌRA, a clothing store with an AI assistant",
    problem:
      "A full online clothing store with an AI shopping assistant and a private back office to run it.",
    role: "Solo Full-Stack Developer. Built the store, the Studio back office and the AI assistant end to end.",
    description:
      "Editorial clothing store with filters, saved pieces, a sized bag, Stripe checkout with PDF receipts, the Ask KŌRA AI assistant and the KŌRA Studio admin panel.",
    longDescription:
      "Shoppers browse editions, filter by category and size, save pieces, and pay by card through Stripe, with a PDF receipt for every order. Ask KŌRA, built on the Gemini API, answers questions from the live catalogue and recommends only real products as tappable cards. KŌRA Studio runs the business: sales overview with charts, order status from paid to delivered, product placements on the home page, low-stock alerts, and team access with Owner, Admin and Staff roles and 48-hour invite links.",
    tech: [
      "Angular",
      "NgRx",
      "GSAP",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Gemini API",
    ],
    liveUrl: "https://ecommerce-frontend-three-ruby.vercel.app/",
    githubUrl: "https://github.com/Vishal07-dev/ecommerce-frontend",
    featured: true,
    highlights: [
      "Ask KŌRA AI assistant",
      "Stripe checkout and PDF receipts",
      "Studio admin with team roles",
      "Accounts, addresses and saved pieces",
    ],
    image: "/projects/ecommerce.png",
  },
  {
    id: 2,
    title: "FigoCare Healthcare Website",
    problem:
      "Gives a healthcare business a fast, SEO-optimized web presence that turns visitors into enquiries.",
    role: "Solo Developer. Owned design, build, and production deployment of the full project lifecycle.",
    description:
      "Healthcare business website built with Next.js. Responsive design, email integration, SEO-optimized, and fully deployed. Managed the complete project lifecycle independently.",
    longDescription:
      "Designed and developed a healthcare business website from scratch using Next.js. Delivered responsive UI, email contact integration, on-page SEO optimization, and handled end-to-end deployment to production. Managed full project lifecycle as a solo developer.",
    tech: ["Next.js", "React.js", "JavaScript"],
    liveUrl: "https://figocare-limited.vercel.app/",
    githubUrl: null,
    featured: false,
    highlights: ["Solo delivery", "SEO optimized", "Email integration", "In production"],
    image: "/projects/figocare.png",
  },
  {
    id: 3,
    title: "Food Court Web Application",
    problem:
      "Lets a food court showcase its menu and take orders through a clean, responsive web experience.",
    role: "Frontend Developer. Built reusable React components and the responsive UI architecture.",
    description:
      "Responsive food-ordering website with reusable React components, menu browsing, and clean modern UI built with Tailwind CSS.",
    longDescription:
      "Built a performant, responsive food-ordering application using React.js and Tailwind CSS. Focused on component reusability, clean UI architecture, and a smooth browsing experience across devices.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://food-court-olive.vercel.app/",
    githubUrl: null,
    featured: false,
    highlights: ["Responsive design", "Reusable components", "Menu browsing"],
    image: "/projects/foodcourt.png",
  },
];

export const publicationsData = [
  {
    title: "A Beginner's Guide to Integrate APIs in Angular",
    subtitle: "Everything You Need to Know",
    description:
      "A comprehensive technical guide covering API integration in Angular, including HTTP requests, Angular services, RxJS observables, error handling, and best practices. Written for frontend developers building their first data-driven Angular applications.",
    platform: "Medium",
    url: "https://medium.com/@roheravishal567/a-beginners-guide-to-integrate-apis-in-angular-everything-you-need-to-know-c6ea4d0d5351",
    tags: ["Angular", "REST APIs", "TypeScript", "RxJS"],
  },
];

/* ─── Testimonials (placeholder, replace with real content) ─── */
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonialsData: Testimonial[] = [
  {
    name: "Client Name",
    role: "Role · Company",
    quote:
      "Placeholder testimonial. Replace this with a short quote about working with Vishal. A sentence or two on what was delivered and the impact works best.",
  },
  {
    name: "Client Name",
    role: "Role · Company",
    quote:
      "Placeholder testimonial. Replace this with a short quote highlighting reliability, communication, or technical quality.",
  },
  {
    name: "Client Name",
    role: "Role · Company",
    quote:
      "Placeholder testimonial. Replace this with a short quote from a colleague or client you've worked with.",
  },
];

/* ─── Writing / Notes (placeholder, replace with real articles) ─── */
export type WritingNote = {
  title: string;
  date: string;
};

export const writingData: WritingNote[] = [
  {
    title: "Structuring Scalable Angular Applications",
    date: "Coming soon",
  },
  {
    title: "Building REST APIs with Node.js and Express",
    date: "Coming soon",
  },
  {
    title: "Shipping Faster with AI-Assisted Development",
    date: "Coming soon",
  },
];
