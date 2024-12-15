import React, { useState } from 'react'

const Academics = () => {
    // Create state to track visibility for each course
    const [showStates, setShowStates] = useState({
        'ECE206': false,
        'ECE201': false,
        'ECE203': false,
        'COS324': false,
        'COS226': false,
        'COS126': false
    });

    // Function to toggle individual course dropdowns
    const toggleDropDown = (courseId) => {
        setShowStates(prevStates => ({
            ...prevStates,
            [courseId]: !prevStates[courseId]
        }));
    };

    return (
        // Main container with padding to account for fixed navbar
        <div className="min-h-[calc(100vh-5rem)] pt-24 px-20">
            {/* Main content container */}
            <div className="max-w-4xl mx-auto">
                {/* Page title */}
                <h1 className="text-4xl font-bold text-center mb-12">
                    Academics
                </h1>

                {/* Coursework section */}
                <div className="space-y-8">
                    {/* Coursework title */}
                    <h2 className="text-2xl font-semibold mb-6">
                        Relevant Coursework
                    </h2>

                    {/* Electrical and Computer Engineering courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Electrical and Computer Engineering
                        </h3>
                        <ul className="space-y-2 ml-6 list-disc">
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('ECE206')}>
                                <span className="font-medium">ECE 206:</span> Introduction to Logic Design
                                <i className={showStates['ECE206'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['ECE206'] && (
                                    <p className='italic mt-2'>The digital design course provides comprehensive coverage from Boolean algebra and logic gates through memory elements and finite-state machines to programmable logic implementation, culminating in practical laboratory experience building digital circuits and understanding basic computer organization.</p>
                                )}
                            </li>
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('ECE201')}>
                                <span className="font-medium">ECE 201:</span> Information Signals
                                <i className={showStates['ECE201'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['ECE201'] && (
                                    <p className='italic mt-2'>This foundational course explores how electrical systems process and handle information-carrying signals across their complete lifecycle - from acquisition through distribution, storage, and utilization - covering essential concepts like analog-digital conversion, modulation, coding for error correction, and feedback control systems, all reinforced through hands-on laboratory work with real-world applications like text, voice, image, and video processing.</p>
                                )}
                            </li>
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('ECE203')}>
                                <span className="font-medium">ECE 203:</span> Electronic Circuit Design Analysis and Implementation
                                <i className={showStates['ECE203'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['ECE203'] && (
                                    <p className='italic mt-2'>The electrical circuits course provides thorough coverage of circuit analysis and electronics fundamentals, progressing from passive components and operational amplifiers through complex topics like Kirchhoff's laws and frequency response to electromechanical energy conversion, all reinforced through hands-on laboratory experiments.</p>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Computer Science courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Computer Science
                        </h3>
                        <ul className="space-y-2 ml-6 list-disc">
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('COS324')}>
                                <span className="font-medium">COS 324:</span> Introduction to Machine Learning
                                <i className={showStates['COS324'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['COS324'] && (
                                    <p className='italic mt-2'>This comprehensive introduction to machine learning covers the theoretical foundations, mathematical computations, and practical implementations of key paradigms - from classical approaches like linear models and support vector machines through modern deep neural networks to advanced topics in reinforcement learning - while providing hands-on experience using Python to implement these techniques across various applications in data science.</p>
                                )}
                            </li>
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('COS226')}>
                                <span className="font-medium">COS 226:</span> Algorithms and Data Structures
                                <i className={showStates['COS226'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['COS226'] && (
                                    <p className='italic mt-2'>This advanced course provides an in-depth exploration of fundamental computer algorithms and data structures - with particular focus on sorting, searching, graph traversal, and string processing - teaching students how to implement these core computational tools while developing a deep understanding of their performance characteristics and practical applications.</p>
                                )}
                            </li>
                            <li className="text-lg cursor-pointer" onClick={() => toggleDropDown('COS126')}>
                                <span className="font-medium">COS 126:</span> Computer Science: An Interdisciplinary Approach
                                <i className={showStates['COS126'] ? "bi bi-caret-down-fill ml-2" : "bi bi-caret-right-fill ml-2"}></i>
                                {showStates['COS126'] && (
                                    <p className='italic mt-2'>Using the Java programming language as a foundation, this comprehensive introductory course teaches essential computer science principles and practical programming skills - including object-oriented programming, algorithms, data structures, and machine learning fundamentals - while emphasizing real-world applications across scientific, engineering, and commercial domains.</p>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Mathematics courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Mathematics
                        </h3>
                        <ul className="space-y-2 ml-6">
                            <li className="text-lg">
                                <span className="font-medium">MAT 202:</span> Linear Algebra with Applications
                            </li>
                            <li className="text-lg">
                                <span className="font-medium">MAT 201:</span> Multivariable Calculus
                            </li>
                        </ul>
                    </div>

                    {/* Physics courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Physics
                        </h3>
                        <ul className="space-y-2 ml-6">
                            <li className="text-lg">
                                <span className="font-medium">EGR 151:</span> Mechanics
                            </li>
                            <li className="text-lg">
                                <span className="font-medium">EGR 153:</span> Electricity and Magnetism
                            </li>
                        </ul>
                    </div>

                    {/* Neuroscience courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Neuroscience
                        </h3>
                        <ul className="space-y-2 ml-6">
                            <li className="text-lg">
                                <span className="font-medium">NEU 201:</span> Fundamentals of Neuroscience
                            </li>
                            <li className="text-lg">
                                <span className="font-medium">NEU 202:</span> Advanced Neuroscience
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Academics