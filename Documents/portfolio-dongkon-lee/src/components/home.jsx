const home = ({ setCurrPage }) => {
    return (
        <div className="h-screen flex flex-col">
            {/* Optional logo in top left */}
            <div className="w-full bg-[#E9E7E4] min-h-20 fixed top-0 left-0 right-0 z-30">
                <div className="flex items-center h-full px-20">
                    <div className="w-20 h-20">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Header section */}
            <div className="max-w-6xl mx-auto px-20 mt-20 py-20 flex justify-center">
                <div className="flex flex-col space-y-6 items-center">
                    <button
                        onClick={() => setCurrPage('home')}
                        className="group text-center"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-gray-600 animate-pulse-soft">
                            Home
                        </h1>
                    </button>

                    <button
                        onClick={() => setCurrPage('about')}
                        className="group text-center"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-gray-600 animate-pulse-soft [animation-delay:0.6s]">
                            About
                        </h1>
                    </button>

                    <button
                        onClick={() => setCurrPage('resume')}
                        className="group text-center"
                    >
                        <h1 className=" text-4xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-gray-600 animate-pulse-soft [animation-delay:1.2s]">
                            Resume
                        </h1>
                    </button>

                    <button
                        onClick={() => setCurrPage('academics')}
                        className="group text-center"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-gray-600 animate-pulse-soft [animation-delay:1.8s]">
                            Academics
                        </h1>
                    </button>

                    <button
                        onClick={() => setCurrPage('personal-work')}
                        className="group text-center"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 group-hover:text-gray-600 animate-pulse-soft [animation-delay:2.4s]">
                            Projects
                        </h1>
                    </button>
                </div>
            </div>
            <div className="max-w-6xl mx-auto pt-10">
                {/* Flex container to space items evenly */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 md:space-x-12 px-4 sm:px-8 md:px-20">
                    {/* LinkedIn link with icon */}
                    <a
                        href="https://www.linkedin.com/in/dongkon-lee/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-linkedin text-lg sm:text-xl"></i>
                        <h6 className="text-sm sm:text-base">LinkedIn</h6>
                    </a>

                    {/* GitHub link with icon */}
                    <a
                        href="https://github.com/decaylee13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-github text-lg sm:text-xl"></i>
                        <h6 className="text-sm sm:text-base">Github</h6>
                    </a>

                    {/* Email link with icon */}
                    <a
                        href="mailto:dl2635@princeton.edu"
                        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                        <i className="bi bi-envelope text-lg sm:text-xl"></i>
                        <h6 className="text-sm sm:text-base">Email</h6>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default home