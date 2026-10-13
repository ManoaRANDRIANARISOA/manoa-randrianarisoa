// ==============================================================================
// ARCHITECTURAL NETWORK MESH CANVAS (HERO BACKGROUND)
// ==============================================================================

export function initNetworkCanvas(canvasId = 'hero-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Configuration
  const isMobile = window.innerWidth < 768;
  const nodeCount = isMobile ? 24 : 48;
  const maxDistance = isMobile ? 120 : 170;
  const mouseDistance = 180;

  const mouse = { x: -1000, y: -1000, active: false };
  const pings = [];

  // Color helper from CSS vars
  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      accent: style.getPropertyValue('--accent-primary').trim() || '#00f2fe',
      subtle: style.getPropertyValue('--accent-subtle').trim() || 'rgba(0, 242, 254, 0.1)',
      line: 'rgba(255, 255, 255, 0.05)'
    };
  }

  let theme = getThemeColors();

  // Nodes class
  class Node {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1.5;
      this.isGateway = Math.random() > 0.85; // 15% nodes are larger "gateways"
      if (this.isGateway) this.radius = 3.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse influence
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
          const force = (mouseDistance - dist) / mouseDistance;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isGateway ? theme.accent : 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      if (this.isGateway) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = theme.subtle;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // Packets traveling along links
  class Packet {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = 0.008 + Math.random() * 0.01;
      this.alive = true;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.alive = false;
      }
    }

    draw() {
      const x = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
      const y = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = theme.accent;
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const nodes = [];
  const packets = [];

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }
  }

  // Mouse listeners
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Clicking canvas emits an architectural ping wave
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    pings.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 160,
      opacity: 0.8
    });
  });

  // Render loop
  function loop() {
    ctx.clearRect(0, 0, width, height);
    theme = getThemeColors();

    // Draw links between close nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Occasionally spawn a data packet
          if (Math.random() < 0.0015 && packets.length < 8) {
            packets.push(new Packet(nodes[i], nodes[j]));
          }
        }
      }
    }

    // Update & draw packets
    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].update();
      packets[i].draw();
      if (!packets[i].alive) {
        packets.splice(i, 1);
      }
    }

    // Update & draw pings
    for (let i = pings.length - 1; i >= 0; i--) {
      const ping = pings[i];
      ping.radius += 3.5;
      ping.opacity -= 0.02;

      ctx.beginPath();
      ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 242, 254, ${Math.max(0, ping.opacity)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (ping.opacity <= 0) {
        pings.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    initNodes();
  });

  resize();
  initNodes();
  loop();

  return () => cancelAnimationFrame(animationFrameId);
}
