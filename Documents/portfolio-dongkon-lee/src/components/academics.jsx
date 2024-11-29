import React from 'react'

const Academics = () => {
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

                    {/* Computer Science courses */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-800">
                            Computer Science
                        </h3>
                        <ul className="space-y-2 ml-6">
                            <li className="text-lg">
                                <span className="font-medium">COS 324:</span> Introduction to Machine Learning
                            </li>
                            <li className="text-lg">
                                <span className="font-medium">COS 226:</span> Algorithms and Data Structures
                            </li>
                            <li className="text-lg">
                                <span className="font-medium">COS 126:</span> Computer Science: An Interdisciplinary Approach
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