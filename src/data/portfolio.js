// Portfolio Data — All your info in one place
export const personalInfo = {
    name: "Anshul Oza",
    roles: ["Full Stack Developer", "Web Architect", "Mobile App Developer", "UI/UX Enthusiast"],
    bio: "A passionate developer who builds immersive web and mobile experiences. I combine creativity with code to craft applications that are both beautiful and functional — like catching the perfect Pokémon, every project needs the right balance of power and finesse.",
    location: "India",
    email: "anshuloza27@gmail.com",
    github: "https://github.com/Ansh-mick27",
    linkedin: "https://www.linkedin.com/in/anshul-oza-102611105/",
    trainerTitle: "Full Stack Pokémon Trainer",
    trainerLevel: 42,
};

export const stats = [
    { label: "Projects Built", value: 10, pokemon: "charizard" },
    { label: "Technologies", value: 15, pokemon: "mewtwo" },
    { label: "Cups of Coffee", value: 999, pokemon: "snorlax" },
    { label: "GitHub Repos", value: 5, pokemon: "porygon" },
];

export const skills = [
    {
        type: "fire",
        typeName: "Fire",
        color: "#F08030",
        title: "Frontend Blaze",
        pokemon: "charizard",
        skills: ["React", "Next.js", "HTML5", "CSS3", "Framer Motion"],
    },
    {
        type: "electric",
        typeName: "Electric",
        color: "#F8D030",
        title: "Lightning Tools",
        pokemon: "pikachu",
        skills: ["JavaScript", "TypeScript", "Vite", "Node.js"],
    },
    {
        type: "water",
        typeName: "Water",
        color: "#6890F0",
        title: "Data Flow",
        pokemon: "gyarados",
        skills: ["PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
        type: "psychic",
        typeName: "Psychic",
        color: "#F85888",
        title: "Mind Tools",
        pokemon: "mewtwo",
        skills: ["Git", "VS Code", "Vercel", "Figma"],
    },
    {
        type: "grass",
        typeName: "Grass",
        color: "#78C850",
        title: "Growing Stack",
        pokemon: "bulbasaur",
        skills: ["React Native", "Expo", "Supabase", "Firebase"],
    },
    {
        type: "dragon",
        typeName: "Dragon",
        color: "#7038F8",
        title: "Power Moves",
        pokemon: "dragonite",
        skills: ["GSAP", "Three.js", "Tailwind CSS", "SASS"],
    },
];

export const projects = [
    {
        id: 1,
        name: "AIIH E-Summit 2026",
        description: "A full-featured event management website for the AIIH Foundation's E-Summit. Features event listings, registration, speaker profiles, and dynamic content management with a premium dark-themed design.",
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
        description: "A modern cricket club website with team management, match schedules, player profiles, and an engaging UI. Built with vanilla JavaScript and deployed on Vercel.",
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
        description: "A cross-platform mobile application built with Expo and React Native for managing travel requests and approvals. Features PostgreSQL database integration and a clean mobile-first design.",
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
        description: "This very website! A Pokémon-themed portfolio with immersive animations, 3D effects, and a unique trading-card inspired design system.",
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
];

export const experience = [
    {
        id: 1,
        role: "Full Stack Developer",
        company: "Freelance / Personal Projects",
        period: "2024 — Present",
        description: "Building production-grade web and mobile applications. Delivered event management platforms, business websites, and mobile applications using modern tech stack.",
        badge: "boulder",
        pokemon: "lucario",
    },
    {
        id: 2,
        role: "Web Developer",
        company: "AIIH Foundation",
        period: "2025 — 2026",
        description: "Developed and maintained the E-Summit 2026 event website. Implemented dynamic content management, speaker profiles and event registration systems.",
        badge: "thunder",
        pokemon: "raichu",
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "Dev's Cricket Club",
        period: "2024 — 2025",
        description: "Built the official cricket club website with team management features, match scheduling, and player profiles.",
        badge: "rainbow",
        pokemon: "eevee",
    },
];

export const education = [
    {
        degree: "Bachelor's in Computer Science / Engineering",
        institution: "University",
        period: "2022 — 2026",
        pokemon: "alakazam",
    },
];

export const socialLinks = [
    { name: "GitHub", url: "https://github.com/Ansh-mick27", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/anshul-oza-102611105/", icon: "linkedin" },
    { name: "Email", url: "mailto:anshuloza27@gmail.com", icon: "email" },
];

// Pokémon that float across the site
export const floatingPokemon = [
    "charizard", "gengar", "mewtwo", "lucario", "eevee",
    "dragonite", "gyarados", "pikachu", "bulbasaur", "gardevoir",
    "rayquaza", "umbreon", "espeon", "snorlax", "alakazam"
];
