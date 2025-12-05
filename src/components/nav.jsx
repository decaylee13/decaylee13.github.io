import { useState } from 'react'

const Nav = ({ setCurrPage, currPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="fixed top-0 left-0 right-0 bg-[#E9E7E4] h-20 z-30">
            <div className="max-w-6xl mx-auto h-full">
                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-row justify-between items-center px-4 md:px-20 h-full">
                    <button
                        onClick={() => setCurrPage('about')}
                        className={`${currPage === 'about' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-16 md:w-24`}
                    >
                        <h5 className="text-sm md:text-base">About</h5>
                    </button>
                    <button
                        onClick={() => setCurrPage('resume')}
                        className={`${currPage === 'resume' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-16 md:w-24`}
                    >
                        <h5 className="text-sm md:text-base">Resume</h5>
                    </button>

                    <button
                        onClick={() => setCurrPage('home')}
                        className={`${currPage === 'home' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-16 md:w-24`}
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                        />
                    </button>

                    <button
                        onClick={() => setCurrPage('academics')}
                        className={`${currPage === 'academics' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-16 md:w-24`}
                    >
                        <h5 className="text-sm md:text-base">Academics</h5>
                    </button>
                    <button
                        onClick={() => setCurrPage('personal-work')}
                        className={`${currPage === 'personal-work' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-16 md:w-24`}
                    >
                        <h5 className="text-sm md:text-base">Projects</h5>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex justify-between items-center px-4 h-full">
                    <button
                        onClick={() => setCurrPage('home')}
                        className="w-16 h-16"
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-2xl p-2"
                    >
                        <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-[#E9E7E4] border-t border-gray-200">
                        <div className="flex flex-col space-y-4 p-4">
                            <button
                                onClick={() => {
                                    setCurrPage('about')
                                    setIsMenuOpen(false)
                                }}
                                className={`${currPage === 'about' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors py-2`}
                            >
                                <h5>About</h5>
                            </button>
                            <button
                                onClick={() => {
                                    setCurrPage('resume')
                                    setIsMenuOpen(false)
                                }}
                                className={`${currPage === 'resume' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors py-2`}
                            >
                                <h5>Resume</h5>
                            </button>
                            <button
                                onClick={() => {
                                    setCurrPage('academics')
                                    setIsMenuOpen(false)
                                }}
                                className={`${currPage === 'academics' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors py-2`}
                            >
                                <h5>Academics</h5>
                            </button>
                            <button
                                onClick={() => {
                                    setCurrPage('personal-work')
                                    setIsMenuOpen(false)
                                }}
                                className={`${currPage === 'personal-work' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors py-2`}
                            >
                                <h5>Projects</h5>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Nav