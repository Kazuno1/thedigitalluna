// THE DIGITAL LUNA - Interactive Functions
// === PAGE TRANSITION HANDLER ===
window.addEventListener("DOMContentLoaded", () => {
  // Fade in when loaded
  document.body.classList.add("fade-in");

  // Fade out on link click (for internal links)
  document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");
    if (url && !url.startsWith("#") && !url.startsWith("javascript:")) {
      link.addEventListener("click", e => {
        // Only apply if navigating to same domain
        if (link.hostname === window.location.hostname) {
          e.preventDefault();
          document.body.classList.add("fade-out");
          setTimeout(() => (window.location = url), 400);
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Update Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile Drawer
  const toggle = document.getElementById("mobToggle");
  const drawer = document.getElementById("drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      drawer.style.display = drawer.style.display === "block" ? "none" : "block";
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id && id !== "#") {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
          if (drawer) drawer.style.display = "none";
        }
      }
    });
  });

  // Testimonials Carousel (fixed)
  const reviews = document.querySelectorAll(".review");
  const dotsWrap = document.getElementById("dots");
  if (reviews.length && dotsWrap) {
    let active = 0;

    // Define setActive FIRST
    const setActive = n => {
      reviews.forEach((r, i) => r.classList.toggle("active", i === n));
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle("active", i === n));
    };

    // Now create dots safely
    reviews.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => setActive(i));
      dotsWrap.appendChild(dot);
    });

    setActive(0);
    setInterval(() => {
      active = (active + 1) % reviews.length;
      setActive(active);
    }, 5000);
  }

  // Glowing Background Animation
  const canvas = document.getElementById("bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h;
    const particles = [];
    const count = 100;
    const maxSpeed = 0.3;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const rand = (min, max) => Math.random() * (max - min) + min;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(1, 2),
        vx: rand(-maxSpeed, maxSpeed),
        vy: rand(-maxSpeed, maxSpeed),
        a: rand(0.4, 0.9)
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        gradient.addColorStop(0, `rgba(0,229,255,${0.9 * p.a})`);
        gradient.addColorStop(1, "rgba(0,229,255,0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,229,255,${(1 - dist / 120) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
});
