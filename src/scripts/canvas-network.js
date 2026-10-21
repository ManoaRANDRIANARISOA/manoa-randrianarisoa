// ==============================================================================
// HERO CONSTELLATION CANVAS
// A drafting mesh: ink dots, hairline links, a few gateway nodes and the odd
// travelling packet. Colours are read live from the design tokens so the mesh
// follows the accent theme. The loop stops when the hero leaves the viewport.
// ==============================================================================

function parseColor(value, fallback) {
  const raw = (value || '').trim();
  if (!raw) return fallback;

  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  const rgb = raw.match(/rgba?\(([^)]+)\)/i);
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
    if (parts.length >= 3) return parts.slice(0, 3);
  }

  return fallback;
}

const rgba = ([r, g, b], a) => `rgba(${r}, ${g}, ${b}, ${a})`;

export function initNetworkCanvas(canvasId = 'hero-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const stage = canvas.parentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');

  const compact = innerWidth < 768;
  const NODE_COUNT = compact ? 22 : 44;
  const LINK_DISTANCE = compact ? 118 : 164;
  const POINTER_DISTANCE = 170;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let frameId = null;
  let running = false;

  const palette = {
    ink: [19, 23, 32],
    accent: [14, 124, 107]
  };

  function readTokens() {
    const style = getComputedStyle(document.documentElement);
    palette.accent = parseColor(style.getPropertyValue('--accent'), palette.accent);
    palette.ink = parseColor(style.getPropertyValue('--text'), palette.ink);
  }

  const mouse = { x: -1000, y: -1000, active: false };
  const pings = [];
  const nodes = [];
  const packets = [];

  class Node {
    constructor() {
      this.seed();
    }

    seed() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.gateway = Math.random() > 0.84;
      this.radius = this.gateway ? 2.4 : Math.random() * 0.9 + 0.9;
      this.phase = Math.random() * Math.PI * 2;
    }

    step(time) {
      if (!reduced.matches) {
        this.x += this.vx;
        this.y += this.vy;
      }
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.5 && dist < POINTER_DISTANCE) {
          const force = ((POINTER_DISTANCE - dist) / POINTER_DISTANCE) * 1.1;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
        }
      }

      // Breathing opacity keeps the mesh alive without any glow.
      this.alpha = this.gateway
        ? 0.55 + Math.sin(time / 900 + this.phase) * 0.18
        : 0.3 + Math.sin(time / 1400 + this.phase) * 0.1;
    }

    draw() {
      if (this.gateway) {
        // Gateway nodes are drawn as drafting squares, not glowing orbs.
        const s = this.radius * 2;
        ctx.beginPath();
        ctx.rect(this.x - this.radius, this.y - this.radius, s, s);
        ctx.strokeStyle = rgba(palette.accent, Math.max(0.2, this.alpha));
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = rgba(palette.accent, Math.max(0.3, this.alpha));
        ctx.fill();
        return;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = rgba(palette.ink, Math.max(0.08, this.alpha * 0.6));
      ctx.fill();
    }
  }

  class Packet {
    constructor(a, b) {
      this.a = a;
      this.b = b;
      this.progress = 0;
      this.speed = 0.006 + Math.random() * 0.008;
      this.alive = true;
    }

    step() {
      this.progress += this.speed;
      if (this.progress >= 1) this.alive = false;
    }

    draw() {
      const x = this.a.x + (this.b.x - this.a.x) * this.progress;
      const y = this.a.y + (this.b.y - this.a.y) * this.progress;
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = rgba(palette.accent, 0.75);
      ctx.fill();
    }
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = stage.clientWidth;
    height = stage.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
  }

  function render(time = 0) {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.step(time);

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist >= LINK_DISTANCE) continue;

        const fade = 1 - dist / LINK_DISTANCE;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(palette.ink, fade * (compact ? 0.07 : 0.1));
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!reduced.matches && Math.random() < 0.0012 && packets.length < 6) {
          packets.push(new Packet(a, b));
        }
      }

      a.draw();
    }

    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].step();
      packets[i].draw();
      if (!packets[i].alive) packets.splice(i, 1);
    }

    for (let i = pings.length - 1; i >= 0; i--) {
      const ping = pings[i];
      ping.radius += 3;
      ping.opacity -= 0.018;
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(palette.accent, Math.max(0, ping.opacity));
      ctx.lineWidth = 1;
      ctx.stroke();
      if (ping.opacity <= 0) pings.splice(i, 1);
    }
  }

  function loop(time) {
    render(time);
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || frameId !== null) return;
    running = true;
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  }

  function still() {
    stop();
    render(0);
  }

  if (fine.matches) {
    stage.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    stage.addEventListener('pointerleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    pings.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0, opacity: 0.55 });
    if (!running) render(performance.now());
  });

  const onResize = () => {
    resize();
    seedNodes();
    running ? render(performance.now()) : still();
  };
  addEventListener('resize', onResize);

  readTokens();
  new MutationObserver(readTokens).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
  });

  resize();
  seedNodes();

  if (reduced.matches) {
    still();
    reduced.addEventListener('change', (e) => (e.matches ? still() : start()));
  } else {
    // Only burn frames while the hero is actually on screen.
    let inView = true;
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        inView ? start() : stop();
      },
      { rootMargin: '120px' }
    );
    heroObserver.observe(stage);
    start();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden || !inView) stop();
      else start();
    });
  }

  return () => {
    stop();
    removeEventListener('resize', onResize);
  };
}
