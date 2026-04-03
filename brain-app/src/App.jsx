import { useState } from 'react'
import BrainViewer from './BrainViewer'
import './App.css'

const CATEGORIES = {
  research: {
    title: 'Research',
    tagline: 'Curiosity-driven exploration',
    description:
      'Academic work, papers, and technical investigations at the intersection of neuroscience, machine learning, and data.',
    items: ['Paper 01', 'Paper 02', 'Paper 03'],
    color: '#6366f1',
  },
  art: {
    title: 'Art',
    tagline: 'Visual expression',
    description:
      'Digital art, illustration, and generative works exploring form, abstraction, and the human condition.',
    items: ['Series 01', 'Series 02', 'Series 03'],
    color: '#ec4899',
  },
  music: {
    title: 'Music',
    tagline: 'Sound & rhythm',
    description:
      'Original compositions, productions, and sonic experiments across genres and moods.',
    items: ['Track 01', 'Track 02', 'Track 03'],
    color: '#10b981',
  },
  experience: {
    title: 'Experience',
    tagline: 'Where I\'ve been',
    description:
      'Professional history, roles, and milestones that have shaped my perspective and craft.',
    items: ['Role 01', 'Role 02', 'Role 03'],
    color: '#f59e0b',
  },
  projects: {
    title: 'Projects',
    tagline: 'Built from scratch',
    description:
      'Software projects, tools, and engineering work — from proof-of-concepts to production systems.',
    items: ['Project 01', 'Project 02', 'Project 03'],
    color: '#8b5cf6',
  },
  photos: {
    title: 'Photos',
    tagline: 'Moments captured',
    description:
      'Photography and image collections documenting places, people, and the quiet beauty of everyday life.',
    items: ['Album 01', 'Album 02', 'Album 03'],
    color: '#06b6d4',
  },
}

export default function App() {
  const [progress,  setProgress]  = useState(0)
  const [ready,     setReady]     = useState(false)
  const [hoverData, setHoverData] = useState(null)

  const cat = hoverData ? CATEGORIES[hoverData.key] : null

  return (
    <div className="page">
      {/* ── Full-screen 3-D viewer ── */}
      <div className="viewer-wrap">
        <BrainViewer
          onProgress={setProgress}
          onReady={() => setReady(true)}
          onHover={setHoverData}
        />

        {!ready && (
          <div className="loader">
            <div className="loader-track">
              <div className="loader-bar" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress > 0 ? `${progress}%` : 'Loading…'}</span>
          </div>
        )}
      </div>

      {/* ── Hero text (top-left) ── */}
      <header className="hero-text" style={{ opacity: hoverData ? 0 : 1 }}>
        <p className="eyebrow">Portfolio</p>
        <h1>Hover a region<br />to explore</h1>
        <p className="sub">Each section of the brain maps<br />to a chapter of my work.</p>
      </header>

      {/* ── Side panel ── */}
      <aside className={`side-panel ${cat ? 'side-panel--open' : ''}`}>
        {cat && (
          <>
            <div className="panel-accent" style={{ background: cat.color }} />
            <p className="panel-tagline">{cat.tagline}</p>
            <h2 className="panel-title">{cat.title}</h2>
            <p className="panel-desc">{cat.description}</p>
            <ul className="panel-items">
              {cat.items.map((item) => (
                <li key={item}>
                  <span className="panel-item-dot" style={{ background: cat.color }} />
                  {item}
                </li>
              ))}
            </ul>
            <a className="panel-cta" style={{ color: cat.color }}>
              View all →
            </a>
          </>
        )}
      </aside>

      {/* ── Bottom section legend ── */}
      <footer className={`legend ${hoverData ? 'legend--hidden' : ''}`}>
        {Object.entries(CATEGORIES).map(([key, { title, color }]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {title}
          </div>
        ))}
      </footer>
    </div>
  )
}
