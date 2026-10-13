// ==============================================================================
// SMOOTH SCROLLING (LENIS) & CAPTIVATING REVEALS (GSAP + SCROLLTRIGGER)
// ==============================================================================
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 2. Header background transition on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        if (self.progress > 0) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  // 3. Hero Entrance Animations
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-telemetry-badge', { y: 20, opacity: 0, duration: 0.8, delay: 0.1 })
    .from('.hero-name', { y: 30, opacity: 0, duration: 0.9 }, '-=0.5')
    .from('.hero-role-title', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-description', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-metrics-bar', { y: 30, opacity: 0, duration: 0.9 }, '-=0.5');

  // 4. Section Heading Reveals
  const sectionHeaders = document.querySelectorAll('.section-title-group');
  sectionHeaders.forEach(sectionHead => {
    gsap.from(sectionHead, {
      scrollTrigger: {
        trigger: sectionHead,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });
  });

  // 5. Architecture Stage & Inspector Reveal
  const archSection = document.querySelector('.blueprint-container');
  if (archSection) {
    gsap.from(archSection, {
      scrollTrigger: {
        trigger: archSection,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 45,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }

  // 6. Project Cards Stagger
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    ScrollTrigger.batch('.project-card', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out'
        });
      },
      once: true
    });
  }

  // 7. Matrix Cards Stagger
  ScrollTrigger.batch('.matrix-card', {
    start: 'top 85%',
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out'
      });
    },
    once: true
  });

  // 8. ADR Cards Stagger
  ScrollTrigger.batch('.adr-card', {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out'
      });
    },
    once: true
  });

  // 9. Smooth Anchor Links via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -80 });
        }
      }
    });
  });

  return lenis;
}
