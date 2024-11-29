import React from 'react'

const personalwork = () => {
    return (
        <div className="container mx-auto px-20 py-8 max-w-4xl mt-20">
            <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl py-6 text-center'>My music compositions are readily available on spotify:</h2>
            <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/artist/2k6zBIZvQzWKwEs7KU0eHk?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
            <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl py-6 text-center'>More projects coming soon:</h2>
            {/* <iframe
                    style={{ borderRadius: '12px' }}  // Changed from style="border-radius:12px"
                    src="https://open.spotify.com/embed/artist/2k6zBIZvQzWKwEs7KU0eHk?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"    // Changed from frameBorder
                    allowFullScreen=""  // Changed from allowfullscreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                /> */}
        </div>
    )
}

export default personalwork
