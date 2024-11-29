const Nav = ({ setCurrPage, currPage }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-[#E9E7E4] h-20 z-30">  {/* Added explicit height */}
            <div className="max-w-6xl mx-auto h-full">
                <div className="flex flex-row justify-between items-center px-20 h-full">
                    <button
                        onClick={() => setCurrPage('about')}
                        className={`${currPage === 'about' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-24 `}
                    >
                        <h5>About        </h5>
                    </button>
                    <button
                        onClick={() => setCurrPage('resume')}
                        className={`${currPage === 'resume' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-24 `}
                    >
                        <h5>Resume</h5>
                    </button>

                    <button
                        onClick={() => setCurrPage('home')}
                        className={`${currPage === 'home' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-24 `}
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className=" object-contain w-20 h-20"
                        />
                    </button>
                    {/* <h2 className="">
                        DONGKON LEE
                    </h2> */}
                    <button
                        onClick={() => setCurrPage('academics')}
                        className={`${currPage === 'academics' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-24 `}
                    >
                        <h5>Academics</h5>
                    </button>
                    <button
                        onClick={() => setCurrPage('personal-work')}
                        className={`${currPage === 'personal-work' ? 'text-gray-600' : ''} hover:text-gray-600 transition-colors w-24 `}
                    >
                        <h5>Projects</h5>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Nav