import React, { useState } from 'react';

const BrainNavigation = ({ onNavigate }) => {
    const [activeSection, setActiveSection] = useState(null);
    const [activeSectionContent, setActiveSectionContent] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const sections = [
        {
            id: 'home',
            name: 'Home',
            position: 'frontal-lobe',
            color: '#4F46E5', // Indigo
            description: 'Welcome to my digital portfolio! Explore the different regions of my brain to learn more about me.'
        },
        {
            id: 'about',
            name: 'About',
            position: 'parietal-lobe',
            color: '#059669', // Emerald
            description: 'Learn about my background, interests, and what drives me professionally and personally.'
        },
        {
            id: 'resume',
            name: 'Resume',
            position: 'temporal-lobe',
            color: '#7C3AED', // Violet
            description: 'View my professional experience, skills, and career highlights.'
        },
        {
            id: 'academics',
            name: 'Academics',
            position: 'occipital-lobe',
            color: '#DC2626', // Red
            description: 'Explore my educational background, research projects, and academic achievements.'
        },
        {
            id: 'projects',
            name: 'Projects',
            position: 'cerebellum',
            color: '#EA580C', // Orange
            description: 'Check out the various projects I\'ve worked on, highlighting my skills and interests.'
        }
    ];

    // More anatomically accurate brain regions
    const regionPaths = {
        'frontal-lobe': {
            path: "M200,180 C150,160 120,200 130,250 C140,300 160,350 200,380 C250,420 320,430 380,420 C420,410 450,390 470,360 C490,320 480,280 460,240 C430,200 380,170 320,160 C270,155 230,165 200,180 Z",
            textPosition: { x: 320, y: 280 },
            pulseCenter: { cx: 320, cy: 270 }
        },
        'parietal-lobe': {
            path: "M470,360 C490,320 520,290 560,280 C600,270 640,280 670,300 C700,330 720,370 730,410 C735,450 720,490 690,520 C660,540 620,545 580,540 C540,535 500,520 480,490 C460,460 465,420 470,360 Z",
            textPosition: { x: 600, y: 400 },
            pulseCenter: { cx: 600, cy: 390 }
        },
        'temporal-lobe': {
            path: "M200,380 C160,350 140,300 130,250 C120,300 110,350 120,400 C130,450 150,490 180,520 C220,550 270,565 320,560 C360,555 390,540 410,515 C430,490 440,460 430,430 C420,400 400,375 380,420 C350,440 280,440 240,420 C220,410 210,395 200,380 Z",
            textPosition: { x: 280, y: 480 },
            pulseCenter: { cx: 280, cy: 470 }
        },
        'occipital-lobe': {
            path: "M690,520 C720,490 735,450 730,410 C740,450 750,490 745,530 C740,570 725,605 700,630 C670,655 630,665 590,660 C550,655 520,635 500,605 C485,575 490,540 510,515 C530,490 560,480 590,485 C620,490 650,500 680,515 C685,517 687,518 690,520 Z",
            textPosition: { x: 620, y: 580 },
            pulseCenter: { cx: 620, cy: 570 }
        },
        'cerebellum': {
            path: "M380,560 C420,580 460,590 500,585 C540,580 580,570 610,550 C640,530 660,500 665,470 C670,500 675,530 670,560 C665,590 650,615 625,635 C600,655 570,665 535,665 C500,665 465,655 435,635 C405,615 385,585 380,560 Z",
            textPosition: { x: 525, y: 600 },
            pulseCenter: { cx: 525, cy: 590 }
        }
    };

    const handleSectionHover = (sectionId) => {
        setActiveSection(sectionId);
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            setActiveSectionContent(section.description);
        }
    };

    const handleSectionLeave = () => {
        setActiveSection(null);
        setActiveSectionContent(null);
    };

    const handleSectionClick = (sectionId) => {
        if (onNavigate) {
            onNavigate(sectionId);
        }
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height
        });
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-50 flex flex-col items-center justify-center relative overflow-hidden" onMouseMove={handleMouseMove}>
            {/* Geometric Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Mouse tracking effects only */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Floating circles that follow mouse */}
                    {Array.from({ length: 20 }).map((_, i) => {
                        const angle = (i / 20) * Math.PI * 2;
                        const radius = 100 + Math.sin(Date.now() / 1000 + i) * 20;
                        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
                        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
                        const x = mousePosition.x * screenWidth + Math.cos(angle) * radius;
                        const y = mousePosition.y * screenHeight + Math.sin(angle) * radius;

                        return (
                            <circle
                                key={`circle-${i}`}
                                cx={x}
                                cy={y}
                                r={3 + Math.sin(Date.now() / 500 + i) * 2}
                                fill="#a8a29e"
                                opacity={0.2 + Math.sin(Date.now() / 800 + i) * 0.1}
                                style={{
                                    transition: 'all 0.8s ease-out'
                                }}
                            />
                        );
                    })}

                    {/* Ripple effect from mouse position */}
                    <circle
                        cx={mousePosition.x * 100 + '%'}
                        cy={mousePosition.y * 100 + '%'}
                        r="150"
                        fill="none"
                        stroke="#78716c"
                        strokeWidth="1"
                        opacity="0.2"
                        style={{
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        <animate attributeName="r" values="50;200;50" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
                    </circle>

                    <circle
                        cx={mousePosition.x * 100 + '%'}
                        cy={mousePosition.y * 100 + '%'}
                        r="100"
                        fill="none"
                        stroke="#a8a29e"
                        strokeWidth="0.5"
                        opacity="0.3"
                        style={{
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        <animate attributeName="r" values="20;120;20" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>

            {/* Neural network background */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="#000" opacity="0.3">
                                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" />
                            </circle>
                            <line x1="50" y1="50" x2="100" y2="0" stroke="#000" strokeWidth="0.3" opacity="0.1" />
                            <line x1="50" y1="50" x2="100" y2="100" stroke="#000" strokeWidth="0.3" opacity="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
            </div>

            {/* Title */}
            <div className="absolute top-8 z-30 text-center">
                <h1 className="text-4xl md:text-6xl text-gray-800 font-serif drop-shadow-lg">
                    Dongkon Lee
                </h1>
                <p className="text-xl text-gray-600 font-light mt-2 tracking-wide">
                    Digital Portfolio
                </p>
            </div>

            {/* Brain SVG with interactive regions */}
            <div className="w-full max-w-4xl h-full flex items-center justify-center relative mt-16 z-20">
                <svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-full drop-shadow-2xl">
                    <defs>
                        {/* Gradients for brain regions */}
                        {sections.map((section) => (
                            <radialGradient key={`grad-${section.id}`} id={`gradient-${section.id}`} cx="50%" cy="30%" r="70%">
                                <stop offset="0%" style={{ stopColor: section.color, stopOpacity: 0.8 }} />
                                <stop offset="100%" style={{ stopColor: section.color, stopOpacity: 0.3 }} />
                            </radialGradient>
                        ))}

                        {/* Brain tissue gradient */}
                        <radialGradient id="brain-gradient" cx="40%" cy="30%" r="80%">
                            <stop offset="0%" style={{ stopColor: '#f5f5f4', stopOpacity: 0.9 }} />
                            <stop offset="50%" style={{ stopColor: '#e7e5e4', stopOpacity: 0.7 }} />
                            <stop offset="100%" style={{ stopColor: '#d6d3d1', stopOpacity: 0.5 }} />
                        </radialGradient>

                        {/* Glow filter */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Pulse animation */}
                        <filter id="pulse">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main brain outline with more realistic shape */}
                    <path d="M200,180 C150,160 120,200 130,250 C120,300 110,350 120,400 C130,450 150,490 180,520 C220,550 270,565 320,560 C360,555 380,560 420,580 C460,590 500,585 540,580 C580,570 610,550 640,530 C670,500 680,470 690,520 C720,490 735,450 730,410 C740,450 750,490 745,530 C740,570 725,605 700,630 C670,655 630,665 590,660 C550,655 535,665 500,665 C465,655 435,635 405,615 C385,585 380,560 380,560 C350,440 280,440 240,420 C220,410 210,395 200,380 C250,420 320,430 380,420 C420,410 450,390 470,360 C490,320 520,290 560,280 C600,270 640,280 670,300 C700,330 720,370 730,410 C720,370 700,330 670,300 C640,280 600,270 560,280 C520,290 490,320 470,360 C450,390 420,410 380,420 C320,430 250,420 200,380 C160,350 140,300 130,250 C140,300 160,350 200,380 Z"
                        fill="url(#brain-gradient)"
                        stroke="#78716c"
                        strokeWidth="2"
                        className="transition-all duration-300"
                    />

                    {/* Brain fissures and sulci - more realistic */}
                    <g className="opacity-40" stroke="#57534e" strokeWidth="1.5" fill="none">
                        {/* Central sulcus */}
                        <path d="M400,200 C420,250 440,300 460,350 C470,380 475,410 480,440" />

                        {/* Lateral sulcus */}
                        <path d="M180,320 C220,340 260,350 300,355 C340,360 380,365 420,370" />

                        {/* Parieto-occipital sulcus */}
                        <path d="M650,350 C660,380 665,410 665,440 C665,470 660,500 650,530" />

                        {/* Superior frontal sulcus */}
                        <path d="M250,220 C290,230 330,235 370,240 C400,245 430,250 450,260" />

                        {/* Intraparietal sulcus */}
                        <path d="M520,320 C550,340 580,360 600,385 C620,410 635,435 645,460" />

                        {/* Cerebellum folds */}
                        <path d="M420,580 C450,585 480,587 510,587 C540,587 570,585 595,580" />
                        <path d="M430,600 C460,605 490,607 520,607 C550,607 575,605 595,600" />
                        <path d="M440,620 C470,625 500,627 525,627 C550,627 570,625 585,620" />
                    </g>

                    {/* Interactive brain regions with enhanced styling */}
                    {sections.map((section) => (
                        <g key={section.id} className="cursor-pointer transition-all duration-500">
                            {/* Pulse effect for active section */}
                            {activeSection === section.id && (
                                <circle
                                    cx={regionPaths[section.position].pulseCenter.cx}
                                    cy={regionPaths[section.position].pulseCenter.cy}
                                    r="60"
                                    fill={section.color}
                                    opacity="0.2"
                                    filter="url(#pulse)"
                                >
                                    <animate attributeName="r" values="60;80;60" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.2;0.1;0.2" dur="2s" repeatCount="indefinite" />
                                </circle>
                            )}

                            <path
                                d={regionPaths[section.position].path}
                                fill={activeSection === section.id ? `url(#gradient-${section.id})` : 'rgba(120,113,108,0.1)'}
                                stroke={activeSection === section.id ? section.color : '#78716c'}
                                strokeWidth={activeSection === section.id ? "3" : "1"}
                                filter={activeSection === section.id ? "url(#glow)" : "none"}
                                className={`transition-all duration-500 ease-in-out cursor-pointer 
                                    ${activeSection === section.id ? 'opacity-90 drop-shadow-lg' : 'opacity-60 hover:opacity-80'}
                                    hover:drop-shadow-lg`}
                                onMouseEnter={() => handleSectionHover(section.id)}
                                onMouseLeave={handleSectionLeave}
                                onClick={() => handleSectionClick(section.id)}
                            />

                            <text
                                x={regionPaths[section.position].textPosition.x}
                                y={regionPaths[section.position].textPosition.y}
                                textAnchor="middle"
                                className={`pointer-events-none transition-all duration-300 font-sans select-none
                                    ${activeSection === section.id ? 'font-bold' : 'font-medium'}`}
                                fill={activeSection === section.id ? '#000000' : '#44403c'}
                                fontSize={activeSection === section.id ? "20" : "16"}
                                filter={activeSection === section.id ? "url(#glow)" : "none"}
                            >
                                {section.name}
                            </text>
                        </g>
                    ))}

                    {/* Neural connections - animated */}
                    <g className="opacity-20" stroke="#78716c" strokeWidth="1" fill="none">
                        <path d="M320,280 Q400,250 480,300">
                            <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
                        </path>
                        <path d="M600,400 Q550,350 480,300">
                            <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" begin="1s" />
                        </path>
                        <path d="M280,480 Q400,450 525,590">
                            <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" begin="2s" />
                        </path>
                        <path d="M620,570 Q580,520 600,400">
                            <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                        </path>
                    </g>
                </svg>
            </div>

            {/* Enhanced description box */}
            <div className={`absolute bottom-20 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-lg mx-auto border border-stone-300 transform transition-all duration-500 ease-in-out
                ${activeSectionContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/90 border-l border-t border-stone-300 rotate-45"></div>
                <p className="text-gray-800 font-light text-center leading-relaxed">
                    {activeSectionContent}
                </p>
            </div>

            {/* Interactive instruction */}
            <div className="absolute bottom-6 text-gray-600 font-light text-sm text-center px-4">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                    <span>Hover over brain regions to explore • Click to navigate</span>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default BrainNavigation;