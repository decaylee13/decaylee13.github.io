import Nav from "./nav"
import About from "./about"
import Resume from "./resume"
import Academics from "./academics"
import PersonalWork from "./personalwork"
import Footer from "./footer"
import Home from "./home"
import { useState } from "react"

const main = () => {
    const [currPage, setCurrPage] = useState('home')
    const shouldShowNav = () => {
        return currPage !== 'home'
    }


    const renderPage = () => {
        switch (currPage) {
            case 'home':
                return <Home setCurrPage={setCurrPage} />
            case 'about':
                return <About />
            case 'resume':
                return <Resume />
            case 'academics':
                return <Academics />
            case 'personal-work':
                return <PersonalWork />
            default:
                return <Home setCurrPage={setCurrPage} />
        }
    }
    return (
        <div className="min-h-screen relative">
            {/* Noise overlay */}
            <div className="fixed inset-0 opacity-[0.15] pointer-events-none z-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        width: '200%',
                        height: '200%'
                    }}
                />
            </div>

            {/* Navigation */}
            {shouldShowNav() && <Nav setCurrPage={setCurrPage} currPage={currPage} />}

            {/* Main content area with explicit top margin to match navbar height */}
            <div className="relative z-20">
                {renderPage()}
            </div>
        </div>
    )
}

export default main