import { useEffect, useRef } from 'react'
import simpleParallax from 'simple-parallax-js'

export default function App() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const instance = new simpleParallax(imgRef.current, {
      scale: 1.5,
      delay: 0.6,
      orientation: 'down',
    })
    return () => instance.destroy()
  }, [])

  return (
    <div style={{ minHeight: '200vh', overflow: 'hidden' }}>
      <section style={{ height: '100vh', position: 'relative' }}>
        <img
          ref={imgRef}
          src="https://picsum.photos/1920/1080"
          alt="parallax background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.4)',
        }}>
          <h1 style={{ fontSize: '3rem', letterSpacing: '0.1em' }}>
            Parallax 3D Library
          </h1>
        </div>
      </section>
    </div>
  )
}
