import { useState } from 'react'

const CONTENT = {
  research: {
    tagline: 'Curiosity-driven exploration',
    description: 'Academic work and technical papers at the intersection of AI, chemistry, and enterprise intelligence.',
    items: [
      {
        title: 'Synthetic Biological Intelligence: Interfaces for In-Vitro Neuronal Learning',
        meta:  'ECE398 · Neuroscience / Engineering',
        pdf:   '/research/ECE398_DK_FINALPAPER.pdf',
      },
      {
        title: 'ChemRAG: Retrieval-Augmented Generation for Chemistry',
        meta:  'Aintropy · LLM / Chemistry',
        pdf:   '/research/AIntropyDKChemRAG.pdf',
      },
      {
        title: 'Universal Knowledge Perception for Enterprise Intelligence',
        meta:  'Preprint · AI / Knowledge Systems',
        pdf:   '/research/Universal_Knowledge_Perception_for_Enterprise_Intelligence.pdf',
      },
      {
        title: 'Synthetic Biological Intelligence Poster',
        meta:  'ECE398 · Neuroscience / Engineering',
        pdf:   '/research/ECE398_Poster_website.pdf',
      },
    ],
  },
  art: {
    tagline: 'Pen, ink & watercolor',
    description: 'Original drawings exploring architecture, surrealism, and the human experience — made with ink and watercolor.',
    images: [
      { src: '/art/japanese-shop.jpeg',        title: 'Japanese Shop',          medium: 'Ink & Watercolor' },
      { src: '/art/solitude.jpeg',             title: 'Solitude',               medium: 'Ink' },
      { src: '/art/astronaut-dissolution.png', title: 'Astronaut Dissolution',  medium: 'Ink' },
      { src: '/art/european-church.png',       title: 'European Church',        medium: 'Ink & Watercolor' },
      { src: '/art/asian-corner-building.png', title: 'Asian Corner Building',  medium: 'Ink' },
      { src: '/art/flute-cityscape.png',       title: 'Flute Cityscape',        medium: 'Ink' },
      { src: '/art/crumbling-building.png',    title: 'Crumbling Building',     medium: 'Ink' },
      { src: '/art/cliff-tower.png',           title: 'Cliff Tower',            medium: 'Ink' },
      { src: '/art/medieval-tower.png',        title: 'Medieval Tower',         medium: 'Ink' },
      { src: '/art/geometric-perspective.png', title: 'Geometric Perspective',  medium: 'Ink' },
      { src: '/art/city-skater.png',           title: 'City Skater',            medium: 'Ink' },
      { src: '/art/amsterdam.png',             title: 'Amsterdam',              medium: 'Ink' },
      { src: '/art/nautilus-eye.png',          title: 'Nautilus Eye',           medium: 'Ink' },
    ],
  },
  music: {
    tagline: 'Sound & rhythm',
    description: 'Original compositions and productions — stream them directly below.',
    tracks: [
      'https://open.spotify.com/embed/track/370v9eTUT5nDxLlnyXyeCL?utm_source=generator',
      'https://open.spotify.com/embed/track/2oJfh0LId3IBwhlMH15Hlj?utm_source=generator',
      'https://open.spotify.com/embed/track/0KFFFjyWwkkb7AzQyCVsjd?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/65pEH24gMglUglG37ECnCI?utm_source=generator',
    ],
  },
  experience: {
    tagline: 'Where I\'ve been',
    description: 'Software engineering roles across startups, deep tech, and industry leaders — building products from the ground up.',
    items: [
      { title: 'Software Engineer (Intern) — Tesla',                meta: 'Incoming 2026' },
      { title: 'Software Engineer (Intern) — Aintropy',             meta: 'Jan 2026 – Present' },
      { title: 'Software Engineer (Intern) — PlayMaker',            meta: 'Dec 2025 – Jan 2026' },
      { title: 'Software Engineer (Intern) — Perimind AI',          meta: 'Aug 2025 – Dec 2025' },
      { title: 'Software Engineer (Intern) — Kulite Semiconductors', meta: 'May 2025 – Aug 2025' },
    ],
  },
  projects: {
    tagline: 'Built from scratch',
    description: 'Software projects, tools, and engineering work — from proof-of-concepts to production systems.',
    items: [
      { title: 'Project One',   meta: '2024 · Web' },
      { title: 'Project Two',   meta: '2023 · ML' },
      { title: 'Project Three', meta: '2023 · Open source' },
      { title: 'Project Four',  meta: '2022 · Mobile' },
    ],
  },
  photos: {
    tagline: 'Moments captured',
    description: 'Photography and image collections documenting places, people, and the quiet beauty of everyday life.',
    items: [
      { title: 'Album One',   meta: '2024 · Street' },
      { title: 'Album Two',   meta: '2023 · Landscape' },
      { title: 'Album Three', meta: '2023 · Portrait' },
      { title: 'Album Four',  meta: '2022 · Travel' },
    ],
  },
}

function ArtGallery({ images, accentColor }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <ul className="art-grid">
        {images.map((img, i) => (
          <li
            key={i}
            className="art-card"
            style={{ '--accent': accentColor }}
            onClick={() => setLightbox(img)}
          >
            <div className="art-card-img-wrap">
              <img src={img.src} alt={img.title} loading="lazy" />
            </div>
            <div className="art-card-info">
              <span className="art-card-title">{img.title}</span>
              <span className="art-card-medium">{img.medium}</span>
            </div>
          </li>
        ))}
      </ul>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            onClick={e => e.stopPropagation()}
          />
          <p className="lightbox-caption">
            <strong>{lightbox.title}</strong> · {lightbox.medium}
          </p>
        </div>
      )}
    </>
  )
}

export default function DetailPage({ data, visible, onBack }) {
  const content = CONTENT[data?.key] ?? {}
  const isArt   = data?.key === 'art'
  const isMusic = data?.key === 'music'

  return (
    <div className={`detail-page ${visible ? 'detail-page--visible' : ''}`}>
      <button className="detail-back" onClick={onBack} aria-label="Back">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <div className={`detail-content ${isArt ? 'detail-content--art' : ''}`}>
        {/* Left column — header */}
        <div className="detail-header">
          <div className="detail-accent" style={{ background: data?.color }} />
          <p className="detail-tagline">{content.tagline}</p>
          <h1 className="detail-title" style={{ color: data?.color }}>
            {data?.category}
          </h1>
          <p className="detail-desc">{content.description}</p>
        </div>

        {/* Right column */}
        {isArt ? (
          <ArtGallery images={content.images} accentColor={data?.color} />
        ) : isMusic ? (
          <div className="detail-music-grid">
            {content.tracks?.map((trackUrl, i) => (
              <iframe
                key={i}
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src={trackUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify track ${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <ul className="detail-grid">
            {content.items?.map((item, i) => (
              <li
                key={i}
                className="detail-card"
                style={{ '--accent': data?.color, cursor: item.pdf ? 'pointer' : 'default' }}
                onClick={() => item.pdf && window.open(item.pdf, '_blank')}
                role={item.pdf ? 'button' : undefined}
              >
                <span className="detail-card-index">0{i + 1}</span>
                <h3 className="detail-card-title">{item.title}</h3>
                <p className="detail-card-meta">{item.meta}</p>
                <div className="detail-card-arrow">{item.pdf ? 'Open PDF →' : '→'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
