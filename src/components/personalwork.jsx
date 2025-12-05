import React from 'react'

const personalwork = () => {
    return (
        <div className="flex flex-col container mx-auto px-15 py-8 max-w-4xl mt-20">
            <h2 className="text-center">Academic Projects</h2>
            <div className='flex flex-col'>
                <div className='flex flex-row py-4 group hover:cursor-pointer'>
                    <h4 className=''>Punc-Processor</h4>
                    <i className="bi bi-cpu text-2xl group-hover:animate-bounce m-0 px-2"></i>
                </div>
                <ul>
                    <li><p className='text-lg'>Overview: A comprehensive implementation of a 16-bit processor based on the LC3 (Little Computer 3) instruction set architecture, designed for FPGA deployment. This project was developed to create a fully functional stored-program computer capable of executing complex programs.</p></li>
                </ul>
                <a href="https://github.com/decaylee13/verilog-punc-processor.git" className="text-blue-500 hover:text-blue-700 underline">Punc</a>
                <div className='flex flex-row py-4 group hover:cursor-pointer'>
                    <h4 className=''>Epigenemusic</h4>
                    <i className="bi bi-music-note-beamed text-2xl group-hover:animate-bounce m-0 px-2"></i>
                </div>
                <ul>
                    <li><p className='text-lg'>Overview: A data analysis project examining the evolution of musical diversity in the Billboard Top 100 charts from 2015-2023, with a focus on the impact of social media platforms like TikTok on music consumption patterns. This project implements machine learning techniques to analyze song features and track the changing landscape of popular music.</p></li>
                </ul>
                <a href="https://github.com/decaylee13/billboard-music-epigenetics.git" className="text-blue-500 hover:text-blue-700 underline">Epigenemusic</a>

                <div className='flex flex-row py-4 group hover:cursor-pointer'>
                    <h4 className=''>RIS Neuron analysis pipeline</h4>
                    <i className="bi bi-bezier2 text-2xl group-hover:animate-bounce m-0 px-2"></i>
                </div>
                <ul>
                    <li>This image processing pipeline performs automated analysis of C. elegans microscopy data to investigate the relationship between RIS neuron activity and sleep behavior. The project implements a multi-stage computational approach for precise neuron identification and activity measurement.</li>
                </ul>
                <a href="https://github.com/decaylee13/RIS-neuron-analysis.git" className="text-blue-500 hover:text-blue-700 underline">RIS Neuron Analysis</a>
            </div>

            <h2 className="text-center">Musical Projects</h2>
            <div className='flex flex-col'>
                <h4 className='py-4'>Music Performance</h4>
                <ul>
                    <li><p>Having been a classical musician for over a decade, this performance of the Brahms Clarinet Sonata showcases my deep connection with the Romantic repertoire. The piece, composed in 1894 during Brahms' late period, demands both technical precision and profound emotional expression through its lyrical passages and rich harmonies. The interplay between clarinet and piano demonstrates my ability to balance solo expression with collaborative musicianship, representing not just technical accomplishment but the emotional maturity I've developed throughout my musical journey.</p></li>
                    <li className='flex justify-center items-center py-4'>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/SzuuBh3kvU8?si=Cz_Mv67dDWPpxPUX"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </li>
                </ul>

                <h4 className='py-4'>Music Compositions</h4>
                <ul>
                    <li className='py-2'><p>My journey into music composition began with classical training, which evolved into exploring the nuanced world of lo-fi production, where I blend traditional musical elements with modern electronic textures. Through my lo-fi compositions available on Spotify, I experiment with atmospheric soundscapes while drawing from my classical background to create emotionally resonant melodies and harmonies. These tracks represent my exploration of the intersection between classical music theory and contemporary production techniques, resulting in a unique sonic palette that bridges multiple musical worlds.</p></li>
                    <li><iframe style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/artist/2k6zBIZvQzWKwEs7KU0eHk?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></li>
                </ul>

            </div>
        </div>
    )
}

export default personalwork
