import React, { useState } from 'react';

const BrainNavigation = ({ onNavigate }) => {
    const [activeSection, setActiveSection] = useState(null);
    const [activeSectionContent, setActiveSectionContent] = useState(null);

    const sections = [
        {
            id: 'home',
            name: 'Home',
            position: 'frontal-lobe',
            color: 'bg-blue-500',
            description: 'Welcome to my digital portfolio! Explore the different regions of my brain to learn more about me.'
        },
        {
            id: 'about',
            name: 'About',
            position: 'parietal-lobe',
            color: 'bg-green-500',
            description: 'Learn about my background, interests, and what drives me professionally and personally.'
        },
        {
            id: 'resume',
            name: 'Resume',
            position: 'temporal-lobe',
            color: 'bg-purple-500',
            description: 'View my professional experience, skills, and career highlights.'
        },
        {
            id: 'academics',
            name: 'Academics',
            position: 'occipital-lobe',
            color: 'bg-yellow-500',
            description: 'Explore my educational background, research projects, and academic achievements.'
        },
        {
            id: 'projects',
            name: 'Projects',
            position: 'cerebellum',
            color: 'bg-red-500',
            description: 'Check out the various projects I\'ve worked on, highlighting my skills and interests.'
        }
    ];

    // Map brain regions to specific positions on the SVG
    const regionPaths = {
        'frontal-lobe': {
            path: "M380,200 C420,180 480,180 520,200 C600,240 620,300 620,380 C620,420 600,460 560,480 C540,490 500,490 460,480 C420,470 380,440 380,380 C380,320 360,240 380,200 Z",
            textPosition: { x: 500, y: 280 }
        },
        'parietal-lobe': {
            path: "M620,380 C620,300 600,240 520,200 C600,180 680,200 720,240 C760,280 780,340 780,380 C780,420 760,480 720,520 C700,540 660,550 620,520 C600,500 620,420 620,380 Z",
            textPosition: { x: 680, y: 350 }
        },
        'temporal-lobe': {
            path: "M380,380 C380,440 420,470 460,480 C440,520 400,540 360,540 C320,540 280,520 240,480 C220,460 220,420 240,380 C260,340 300,320 340,320 C360,320 380,340 380,380 Z",
            textPosition: { x: 300, y: 450 }
        },
        'occipital-lobe': {
            path: "M720,520 C760,480 780,420 780,380 C780,460 800,520 780,580 C760,640 700,680 640,700 C580,720 520,700 480,660 C450,630 460,580 480,550 C510,520 550,520 580,520 C620,520 670,550 720,520 Z",
            textPosition: { x: 660, y: 600 }
        },
        'cerebellum': {
            path: "M240,480 C280,520 320,540 360,540 C400,540 440,520 460,480 C500,490 540,490 560,480 C600,460 620,460 620,520 C660,550 620,620 580,660 C520,700 460,720 400,700 C340,680 280,640 260,580 C240,520 220,500 240,480 Z",
            textPosition: { x: 400, y: 600 }
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

    return (
        <div className="w-full h-screen bg-[#E9E7E4] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Title */}
            <div className="absolute top-8 z-30 text-center">
                <h1 className="text-4xl md:text-6xl text-gray-800 font-playfair">Dongkon Lee</h1>
                <p className="text-xl text-gray-600 font-montserrat mt-2">Portfolio</p>
            </div>

            {/* Brain SVG with interactive regions */}
            <div className="w-full max-w-4xl h-full flex items-center justify-center relative mt-16">
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-full">
                    {/* Base brain outline */}
                    <path d="M380,200 C300,220 220,300 220,400 C220,500 240,580 320,680 C400,780 500,780 580,780 C660,780 760,740 820,640 C880,540 840,380 780,300 C720,220 620,180 520,200 C480,180 420,180 380,200 Z"
                        fill="#e0e0e0" stroke="#aaa" strokeWidth="2" className="transition-all duration-300" />

                    {/* Brain connection */}
                    <path d="M500,200 C500,300 500,600 500,780" fill="none" stroke="#aaa" strokeWidth="1" />

                    {/* Interactive brain regions */}
                    {sections.map((section) => (
                        <g key={section.id} className="cursor-pointer transition-all duration-300">
                            <path
                                d={regionPaths[section.position].path}
                                fill={activeSection === section.id ? section.color.replace('bg-', 'fill-').replace('500', '300') : '#f0f0f0'}
                                stroke={activeSection === section.id ? section.color.replace('bg-', 'stroke-').replace('500', '600') : '#ccc'}
                                strokeWidth={activeSection === section.id ? "3" : "1"}
                                className={`transition-all duration-500 ease-in-out cursor-pointer 
                  ${activeSection === section.id ? 'opacity-80 transform scale-105' : 'opacity-60 hover:opacity-70'}
                  hover:transform hover:scale-105`}
                                onMouseEnter={() => handleSectionHover(section.id)}
                                onMouseLeave={handleSectionLeave}
                                onClick={() => handleSectionClick(section.id)}
                            />
                            <text
                                x={regionPaths[section.position].textPosition.x}
                                y={regionPaths[section.position].textPosition.y}
                                textAnchor="middle"
                                className={`pointer-events-none transition-all duration-300 font-montserrat
                  ${activeSection === section.id ? 'font-bold' : 'font-normal'}`}
                                fill={activeSection === section.id ? '#333' : '#666'}
                                fontSize={activeSection === section.id ? "24" : "18"}
                                onMouseEnter={() => handleSectionHover(section.id)}
                                onMouseLeave={handleSectionLeave}
                            >
                                {section.name}
                            </text>
                        </g>
                    ))}

                    {/* Brain details - gyri and sulci */}
                    <g className="opacity-40">
                        <path d="M380,260 C420,240 460,240 500,250 C540,240 580,240 620,260" fill="none" stroke="#888" strokeWidth="1" />
                        <path d="M320,340 C380,320 420,320 460,330 C500,320 540,320 600,340" fill="none" stroke="#888" strokeWidth="1" />
                        <path d="M300,440 C360,420 420,420 500,430 C580,420 640,420 700,440" fill="none" stroke="#888" strokeWidth="1" />
                        <path d="M300,540 C360,520 420,520 500,530 C580,520 640,520 700,540" fill="none" stroke="#888" strokeWidth="1" />
                        <path d="M340,640 C400,620 460,620 500,630 C540,620 600,620 660,640" fill="none" stroke="#888" strokeWidth="1" />
                    </g>
                </svg>
            </div>

            {/* Description box that appears when hovering */}
            <div className={`absolute bottom-16 bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto transform transition-all duration-500 ease-in-out
        ${activeSectionContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <p className="font-montserrat text-gray-700 text-center">
                    {activeSectionContent}
                </p>
            </div>

            <div className="absolute bottom-6 text-gray-500 font-montserrat text-sm animate-pulse-soft">
                Hover over brain regions to explore • Click to navigate
            </div>
        </div>
    );
};

export default BrainNavigation;