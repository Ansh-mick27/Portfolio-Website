// Portfolio Data — All your info in one place (Pokémon Trainer Edition)
export const personalInfo = {
    name: "Anshul Oza",
    roles: [
        "Sr. Technical Trainer",
        "Assistant Professor",
        "Software Developer",
        "Research Scholar",
        "Full Stack Developer",
    ],
    bio: "A seasoned Technical Trainer & Assistant Professor with 10+ years of experience in academia and software development. I combine deep knowledge of Computer Science with a passion for teaching and building real-world applications — like a true Pokémon Master, I've trained across multiple gyms, published research papers, filed patents, and built production-grade systems.",
    location: "Indore, Madhya Pradesh, India",
    email: "anshuloza27@gmail.com",
    github: "https://github.com/Ansh-mick27",
    linkedin: "https://www.linkedin.com/in/anshul-oza-102611105/",
    trainerTitle: "Elite Four — Technical Trainer",
    trainerLevel: 99,
    currentOrg: "Acropolis Institutions",
};

export const stats = [
    { label: "Years Experience", value: 10, pokemon: "charizard" },
    { label: "Research Papers", value: 4, pokemon: "mewtwo" },
    { label: "Certifications", value: 85, pokemon: "porygon" },
    { label: "Guided Projects", value: 100, pokemon: "snorlax" },
];

export const skills = [
    {
        type: "fire",
        typeName: "Fire",
        color: "#F08030",
        title: "Programming Languages",
        pokemon: "charizard",
        skills: ["C", "C++", "Java", "Python", "PHP", "JavaScript"],
    },
    {
        type: "electric",
        typeName: "Electric",
        color: "#F8D030",
        title: "Web & Mobile",
        pokemon: "pikachu",
        skills: ["HTML", "CSS", "React", "Next.js", "React Native", "Expo", "IONIC", "CodeIgniter"],
    },
    {
        type: "water",
        typeName: "Water",
        color: "#6890F0",
        title: "Databases & Cloud",
        pokemon: "gyarados",
        skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "AWS Cloud"],
    },
    {
        type: "psychic",
        typeName: "Psychic",
        color: "#F85888",
        title: "AI / ML / Data Science",
        pokemon: "mewtwo",
        skills: ["Machine Learning", "Deep Learning", "NLP", "Data Science", "SAS"],
    },
    {
        type: "dragon",
        typeName: "Dragon",
        color: "#7038F8",
        title: "Cyber & Blockchain",
        pokemon: "dragonite",
        skills: ["Cyber Security", "Blockchain", "Cryptography", "MANET Security"],
    },
    {
        type: "grass",
        typeName: "Grass",
        color: "#78C850",
        title: "CS Fundamentals & Tools",
        pokemon: "bulbasaur",
        skills: ["Data Structures", "OOP", "OS", "SEO", "Git", "Android", "ArcGIS", "ERDAS Imagine"],
    },
];

export const projects = [
    {
        id: 1,
        name: "AIIH E-Summit 2026",
        description:
            "A full-featured event management website for the AIIH Foundation's E-Summit. Features event listings, registration, speaker profiles, and dynamic content management with a premium dark-themed design.",
        tech: ["Next.js", "TypeScript", "CSS", "Vercel"],
        github: "https://github.com/Ansh-mick27/AIIHFound_E_summit",
        live: "https://aiihesummit2026.vercel.app",
        hp: 95,
        type: "fire",
        attacks: [
            { name: "Server Render", damage: 80 },
            { name: "Dynamic Routes", damage: 60 },
        ],
        pokemon: "charizard",
    },
    {
        id: 2,
        name: "Dev's Cricket Club",
        description:
            "A modern cricket club website with team management, match schedules, player profiles, and an engaging UI. Built with vanilla JavaScript and deployed on Vercel.",
        tech: ["JavaScript", "HTML", "CSS", "Vercel"],
        github: "https://github.com/Ansh-mick27/DevsCricketClub",
        live: "https://devs-cricket-club.vercel.app",
        hp: 85,
        type: "grass",
        attacks: [
            { name: "DOM Manipulation", damage: 70 },
            { name: "Responsive Layout", damage: 55 },
        ],
        pokemon: "bulbasaur",
    },
    {
        id: 3,
        name: "Travel Requisition",
        description:
            "A cross-platform mobile application built with Expo and React Native for managing travel requests and approvals. Features PostgreSQL database integration and a clean mobile-first design.",
        tech: ["TypeScript", "React Native", "Expo", "PostgreSQL"],
        github: "https://github.com/Ansh-mick27/Travel_Requisition",
        live: null,
        hp: 90,
        type: "water",
        attacks: [
            { name: "Cross Platform", damage: 75 },
            { name: "DB Query", damage: 65 },
        ],
        pokemon: "gyarados",
    },
    {
        id: 4,
        name: "Portfolio Website",
        description:
            "This very website! A Pokémon-themed portfolio with immersive animations, 3D effects, and a unique trading-card inspired design system.",
        tech: ["React", "Vite", "Framer Motion", "GSAP"],
        github: "https://github.com/Ansh-mick27/Portfolio-Website",
        live: null,
        hp: 100,
        type: "dragon",
        attacks: [
            { name: "Animation Storm", damage: 90 },
            { name: "Theme Power", damage: 85 },
        ],
        pokemon: "dragonite",
    },
    {
        id: 5,
        name: "InTouch — Social Network",
        description:
            "A social networking site with E-mail facility. A BE project that featured user profiles, messaging, and community features.",
        tech: ["PHP", "MySQL", "HTML", "CSS"],
        github: null,
        live: null,
        hp: 75,
        type: "psychic",
        attacks: [
            { name: "Social Connect", damage: 60 },
            { name: "Mail Blast", damage: 50 },
        ],
        pokemon: "mewtwo",
    },
    {
        id: 6,
        name: "Automatic Banking System",
        description:
            "A BE project providing all banking facility through an ATM machine simulation. Features account management, transactions, and balance tracking.",
        tech: ["Java", "MySQL", "Swing"],
        github: null,
        live: null,
        hp: 70,
        type: "electric",
        attacks: [
            { name: "Transaction Speed", damage: 55 },
            { name: "Secure Auth", damage: 65 },
        ],
        pokemon: "pikachu",
    },
];

export const experience = [
    {
        id: 1,
        role: "Sr. Technical Trainer",
        company: "Acropolis Institutions",
        type: "Full-time",
        period: "May 2022 — Present",
        description:
            "Leading technical training initiatives in Computer Science. Teaching advanced subjects including Machine Learning, Data Science, Blockchain, and Cyber Security. Mentoring students and conducting research.",
        badge: "boulder",
        pokemon: "lucario",
    },
    {
        id: 2,
        role: "Assistant Professor",
        company: "IPS Academy, Indore",
        type: "Full-time",
        period: "Aug 2018 — May 2022",
        description:
            "Served as Assistant Professor in CS department. Published 1 Patent and multiple research papers (National & International). Authored chapters in edited books. Led curriculum development for emerging technologies.",
        badge: "thunder",
        pokemon: "raichu",
    },
    {
        id: 3,
        role: "Assistant Professor",
        company: "Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore",
        type: "Full-time",
        period: "Feb 2016 — May 2018",
        description:
            "Managed departmental time-table coordination. Organized International Conference SANMANTRANA-18 (Purchase Committee). Organized International Conclave on Cybersecurity SAJAG-18 (Purchase Committee).",
        badge: "rainbow",
        pokemon: "eevee",
    },
    {
        id: 4,
        role: "Software Developer",
        company: "MPCST (MP Council of Science & Technology)",
        type: "Full-time",
        period: "Aug 2015 — Feb 2016",
        description:
            "Developed software solutions using GIS technologies including ArcGIS 10 and ERDAS Imagine 11. Built data processing and visualization tools for scientific research projects.",
        badge: "marsh",
        pokemon: "alakazam",
    },
];

export const education = [
    {
        degree: "PhD Coursework",
        institution: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
        period: "Completed",
        score: "81.3%",
        pokemon: "mewtwo",
    },
    {
        degree: "Master of Engineering (M.E.) — Computer Science",
        institution: "Medicaps Institute of Technology and Management",
        period: "2012 — 2015",
        score: "74% aggregate",
        pokemon: "alakazam",
        dissertation: "A XTC based Authentication Scheme in MANET — Extended threshold cryptography providing authentication with multiple authenticators using trusted graph technique.",
    },
    {
        degree: "Bachelor of Engineering (B.E.) — Computer Science",
        institution: "Royal College of Technology, Indore",
        period: "2008 — 2012",
        score: "70% aggregate",
        pokemon: "lucario",
    },
    {
        degree: "12th (CBSE) — Computer Science",
        institution: "Jawahar Navodaya Vidyalaya, Manpur",
        period: "2007 — 2008",
        score: "",
        pokemon: "pikachu",
    },
    {
        degree: "10th (CBSE)",
        institution: "Jawahar Navodaya Vidyalaya, Manpur",
        period: "2005 — 2006",
        score: "",
        pokemon: "eevee",
    },
];

export const certifications = [
    {
        name: "Wipro Certified Faculty (WCF)",
        issuer: "Wipro",
        date: "Nov 2022",
        skills: ["Java", "Android"],
        type: "electric",
    },
    {
        name: "WATP (Wipro Advance Training Program)",
        issuer: "Wipro",
        date: "",
        skills: [],
        type: "electric",
    },
    {
        name: "Deep Learning Specialization",
        issuer: "Coursera",
        date: "",
        skills: ["Deep Learning", "Neural Networks"],
        type: "psychic",
    },
    {
        name: "AWS Fundamentals",
        issuer: "AWS",
        date: "",
        skills: ["Cloud Computing"],
        type: "water",
    },
    {
        name: "AWS Solution Architect",
        issuer: "AWS",
        date: "",
        skills: ["Cloud Architecture"],
        type: "water",
    },
    {
        name: "SEO Certification",
        issuer: "Online",
        date: "",
        skills: ["SEO"],
        type: "grass",
    },
    {
        name: "SAS Programmer",
        issuer: "SAS Institute",
        date: "",
        skills: ["SAS", "Analytics"],
        type: "fire",
    },
    {
        name: "Blockchain Certification",
        issuer: "Online",
        date: "",
        skills: ["Blockchain"],
        type: "dragon",
    },
    {
        name: "Machine Learning Certification",
        issuer: "Coursera",
        date: "",
        skills: ["Machine Learning"],
        type: "psychic",
    },
    {
        name: "NLP Certification",
        issuer: "Coursera",
        date: "",
        skills: ["NLP"],
        type: "psychic",
    },
    {
        name: "OOP in Java Certification",
        issuer: "Online",
        date: "",
        skills: ["Java", "OOP"],
        type: "fire",
    },
    {
        name: "Java Certification",
        issuer: "Oracle",
        date: "",
        skills: ["Java"],
        type: "fire",
    },
    {
        name: "Diploma in Computer Accounting",
        issuer: "Institute",
        date: "",
        skills: ["Accounting"],
        type: "normal",
    },
];

export const publications = [
    {
        title: "Blockchain-based multi-organization taxonomy for smart cities",
        authors: "E. Kaur, A. Oza",
        journal: "SN Applied Sciences (ESCI index)",
        date: "Aug 2020",
        type: "international",
        pokemon: "dragonite",
    },
    {
        title: "A Survey on Cryptography based on secure MANETs",
        authors: "A. Oza",
        journal: "VSRD International Journal of Computer Science and Information Technology, Vol(IV), ISSUE(X)",
        date: "Oct 2014",
        pages: "pp. 207-212",
        type: "international",
        pokemon: "mewtwo",
    },
    {
        title: "A XTC Based Authentication Scheme for MANET",
        authors: "A. Oza et al",
        journal: "IJCA, Volume 172, No. 5",
        date: "Aug 2017",
        pages: "pp. 12-16",
        type: "international",
        pokemon: "alakazam",
    },
    {
        title: "Software Testing: A Review",
        authors: "A. Oza",
        journal: "Diverse, Divergent and Innovative Research: Contemporary Issues, Vol. 1, Excel India Publishers",
        date: "Mar 2018",
        pages: "pp. 7-20",
        isbn: "978-93-86724-67-0",
        type: "book_chapter",
        pokemon: "lucario",
    },
];

export const achievements = [
    { text: "Filed Patent: Extreme Learning Machine (ELM) Based Deep Learning Model for Diabetes Prediction", icon: "🏆", type: "patent" },
    { text: "Completed 85+ courses with certificates in ML, Data Science, Cyber Security, Python, etc.", icon: "📜", type: "course" },
    { text: "Worked on 100+ guided projects with certificates on Coursera", icon: "🎯", type: "project" },
    { text: "Qualified GATE 2012 with 86 percentile marks", icon: "⚡", type: "exam" },
    { text: "Attended Faculty Development Program conducted by TCS", icon: "🎓", type: "training" },
    { text: "Participated in seminar by Microsoft with Certificate", icon: "💻", type: "seminar" },
    { text: "Training in Android at IBM ACE", icon: "📱", type: "training" },
    { text: "Cluster Level Computer Program Challenge in JNV", icon: "🏅", type: "competition" },
    { text: "Organized International Conference SANMANTRANA-18", icon: "🌏", type: "conference" },
    { text: "Organized International Conclave on Cybersecurity SAJAG-18", icon: "🛡️", type: "conference" },
];

export const socialLinks = [
    { name: "GitHub", url: "https://github.com/Ansh-mick27", icon: "github" },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anshul-oza-102611105/",
        icon: "linkedin",
    },
    { name: "Email", url: "mailto:anshuloza27@gmail.com", icon: "email" },
];

// Pokémon that float across the site
export const floatingPokemon = [
    "charizard", "gengar", "mewtwo", "lucario", "eevee",
    "dragonite", "gyarados", "pikachu", "bulbasaur", "gardevoir",
    "rayquaza", "umbreon", "espeon", "snorlax", "alakazam",
];
