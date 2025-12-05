import Footer from "./footer"
const About = () => {
    return (
        <div className="flex flex-col h-screen mt-20">
            <div className="flex flex-col items-center container mx-auto px-20 py-8 max-w-4xl">
                <h2 className="text-center my-4">Welcome</h2>
                <div className="w-64 h-64 rounded-full overflow-hidden mb-8">
                    <img
                        src="/profile.jpg"
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h5 className="leading-relaxed text-lg space-y-4">
                    <p className="mb-4">
                        My name is Dongkon(DK)Lee and I am an Electrical and Computer Engineering student at Princeton University with a unique interdisciplinary vision at the intersection of neuroscience, artificial intelligence, and hardware engineering. My academic pursuit combines minors in Computer Science and Neuroscience, driven by a fascination with how biological neural systems can inform and revolutionize machine learning architectures.
                    </p>

                    <p className="mb-4">
                        I am particularly passionate about translating neurological principles into practical engineering applications, whether that's developing energy-efficient semiconductors through AI optimization or advancing computer vision systems for robotics.
                    </p>

                    <p>
                        Away from my academic pursuits, I maintain a deep connection to music through clarinet, guitar, and music production, believing that creativity in both arts and engineering drives innovation. As an emerging engineer, I aim to contribute to the next generation of intelligent systems that draw inspiration from nature's most sophisticated computer: the brain.
                    </p>
                </h5>
                <Footer />
            </div>

        </div>
    )
}

export default About


