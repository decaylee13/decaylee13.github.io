import { useState, useRef, useCallback } from 'react'
import BrainViewer from './BrainViewer'
import DetailPage from './DetailPage'
import './App.css'

const CATEGORIES = {
  research:   { title: 'Research',   color: '#6366f1' },
  art:        { title: 'Art',        color: '#ec4899' },
  music:      { title: 'Music',      color: '#10b981' },
  experience: { title: 'Experience', color: '#f59e0b' },
  projects:   { title: 'Projects',   color: '#8b5cf6' },
  photos:     { title: 'Photos',     color: '#06b6d4' },
}

export default function App() {
  const [progress,    setProgress]    = useState(0)
  const [ready,       setReady]       = useState(false)
  const [hoverData,   setHoverData]   = useState(null)
  const [activePage,  setActivePage]  = useState(null)  // category data while on detail view
  const [pageVisible, setPageVisible] = useState(false) // drives CSS fade-in
  const [isTransitioning, setIsTransitioning] = useState(false)

  const brainRef = useRef()

  // Called by BrainViewer once zoom-in animation completes
  const handleEnterSection = useCallback((data) => {
    setActivePage(data)
    setIsTransitioning(false)
    // Tiny rAF delay so React renders the page node before we trigger the fade-in
    requestAnimationFrame(() => setPageVisible(true))
  }, [])

  // Called by back button
  const handleBack = useCallback(() => {
    setPageVisible(false)          // fade out page
    setIsTransitioning(true)
    setTimeout(() => {
      brainRef.current?.zoomOut()  // start zoom-out after page fades
    }, 320)
  }, [])

  // Called by BrainViewer once zoom-out animation completes
  const handleExitSection = useCallback(() => {
    setActivePage(null)
    setIsTransitioning(false)
    setHoverData(null)
  }, [])

  const onDetailPage = activePage !== null

  return (
    <div className="page">
      {/* ── Full-screen 3-D viewer (always mounted) ── */}
      <div className="viewer-wrap">
        <BrainViewer
          ref={brainRef}
          onProgress={setProgress}
          onReady={() => setReady(true)}
          onHover={setHoverData}
          onEnterSection={handleEnterSection}
          onExitSection={handleExitSection}
          interactive={!onDetailPage && !isTransitioning}
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

      {/* ── Hero text ── */}
      <header className="hero-text" style={{ opacity: (onDetailPage || isTransitioning) ? 0 : 1 }}>
        <p className="eyebrow">Dongkon (DK) Lee</p>
        <h1>Explore<br />DK's mind.</h1>
        <p className="sub">Each region of the brain maps<br />to a chapter of his world.</p>
      </header>

      {/* ── Side-panel on hover (hidden on detail page) ── */}
      <aside
        className={`side-panel ${hoverData && !onDetailPage && !isTransitioning ? 'side-panel--open' : ''}`}
      >
        {hoverData && (
          <>
            <div className="panel-accent" style={{ background: hoverData.color }} />
            <p className="panel-tagline">Click to explore</p>
            <h2 className="panel-title">{hoverData.category}</h2>
          </>
        )}
      </aside>

      {/* ── Legend ── */}
      <footer className={`legend ${(hoverData || onDetailPage || isTransitioning) ? 'legend--hidden' : ''}`}>
        {Object.entries(CATEGORIES).map(([key, { title, color }]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {title}
          </div>
        ))}
      </footer>

      {/* ── Detail page overlay (mounted while activePage is set) ── */}
      {activePage && (
        <DetailPage
          data={activePage}
          visible={pageVisible}
          onBack={handleBack}
        />
      )}
    </div>
  )
}
