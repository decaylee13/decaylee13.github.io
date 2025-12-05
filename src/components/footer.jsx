import React from 'react'

const footer = () => {
    return (
        <footer className="w-full bg-[#E9E7E4] py-6 mt-auto">
            {/* Inner container for content with same max-width as navbar */}
            <div className="max-w-6xl mx-auto">
                {/* Flex container to space items evenly */}
                <div className="flex justify-center items-center space-x-12 px-20">
                    {/* LinkedIn link with icon */}
                    <a
                        href="https://www.linkedin.com/in/dongkon-lee/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>

                    {/* GitHub link with icon */}
                    <a
                        href="https://github.com/decaylee13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-github"></i>
                        <span>Github</span>
                    </a>

                    {/* Email link with icon */}
                    <a
                        href="mailto:dl2635@princeton.edu"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-envelope"></i>
                        <span>Email</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default footer
