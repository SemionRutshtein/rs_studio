import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MacbookScroll.css'

gsap.registerPlugin(ScrollTrigger)

export default function MacbookScroll() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let triggers = []

    // Fix mobile browser address-bar resize jank
    ScrollTrigger.normalizeScroll(true)

    function initVideoScroll() {
      // Scrub video currentTime to scroll progress
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (video.duration && isFinite(video.duration)) {
            video.currentTime = self.progress * video.duration
          }
        }
      })
      triggers.push(mainTrigger)

      // Label timeline helper — anchored to totalDuration=1 so positions 0–1
      // map 1:1 to scroll progress
      function labelTimeline(el, startP) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        })
        tl.set(el, { opacity: 0 }, 0)
        tl.to(el, { opacity: 1, duration: 0.06, ease: 'none' }, startP)
        tl.to(el, { opacity: 1, duration: 0.12, ease: 'none' }, startP + 0.06)
        tl.to(el, { opacity: 0, duration: 0.06, ease: 'none' }, startP + 0.18)
        tl.set(el, { opacity: 0 }, 1)
        triggers.push(tl.scrollTrigger)
      }

      const label1 = section.querySelector('#vid-label-1')
      const label2 = section.querySelector('#vid-label-2')
      const label3 = section.querySelector('#vid-label-3')
      const hint = section.querySelector('#vid-scroll-hint')

      if (label1) labelTimeline(label1, 0.15)
      if (label2) labelTimeline(label2, 0.40)
      if (label3) labelTimeline(label3, 0.65)

      if (hint) {
        const hintTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        })
        hintTl.set(hint, { opacity: 1 }, 0)
        hintTl.to(hint, { opacity: 0, duration: 0.08, ease: 'none' }, 0)
        hintTl.set(hint, { opacity: 0 }, 1)
        triggers.push(hintTl.scrollTrigger)
      }
    }

    function setupWhenReady() {
      if (video.readyState >= 1) {
        initVideoScroll()
      } else {
        video.addEventListener('loadedmetadata', initVideoScroll, { once: true })
      }
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    let unlocked = false

    function iosUnlock() {
      if (unlocked) return
      unlocked = true
      video.play()
        .then(() => {
          video.pause()
          video.currentTime = 0
        })
        .catch(() => {})
        .finally(setupWhenReady)
      document.removeEventListener('touchstart', iosUnlock)
    }

    if (isMobile) {
      document.addEventListener('touchstart', iosUnlock, { passive: true })
      // Also init without unlock in case metadata is already available
      setupWhenReady()
    } else {
      setupWhenReady()
    }

    return () => {
      document.removeEventListener('touchstart', iosUnlock)
      video.removeEventListener('loadedmetadata', initVideoScroll)
      triggers.forEach(t => t && t.kill && t.kill())
    }
  }, [])

  return (
    <section id="macbook-video-section" ref={sectionRef} className="macbook-video-section">
      <div id="macbook-pin" className="video-sticky">
        <video
          ref={videoRef}
          id="macbook-video"
          src="/videos/macbook-explode.mp4"
          muted
          playsInline
          preload="auto"
          className="macbook-video-el"
        />

        {/* Dark overlay for text readability */}
        <div className="vid-overlay vid-overlay-dark" />

        {/* Top fade — blends into hero above */}
        <div className="vid-overlay vid-overlay-top" />

        {/* Bottom fade — blends into section below */}
        <div className="vid-overlay vid-overlay-bottom" />

        {/* Side vignette */}
        <div className="vid-overlay vid-overlay-vignette" />

        {/* Overlay label 1: AI Automation */}
        <div className="vid-label" id="vid-label-1">
          <h2 className="vid-label-title">AI Automation</h2>
          <div className="vid-label-divider" />
          <p className="vid-label-text">Eliminate repetitive work with intelligent pipelines</p>
        </div>

        {/* Overlay label 2: Intelligent Bots */}
        <div className="vid-label" id="vid-label-2">
          <h2 className="vid-label-title">Intelligent Bots</h2>
          <div className="vid-label-divider" />
          <p className="vid-label-text">24/7 customer agents built on Claude AI &amp; OpenAI</p>
        </div>

        {/* Overlay label 3: Production-Grade Architecture */}
        <div className="vid-label" id="vid-label-3">
          <h2 className="vid-label-title vid-label-title--sm">Production-Grade Architecture</h2>
          <div className="vid-label-divider" />
          <p className="vid-label-text">Kafka &middot; PostgreSQL &middot; MongoDB &middot; Redis &mdash; built to scale</p>
        </div>

        {/* Scroll hint */}
        <div id="vid-scroll-hint" className="vid-scroll-hint">&#9660; SCROLL</div>
      </div>
    </section>
  )
}
