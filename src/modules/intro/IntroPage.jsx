// ============================================================
// NEXORA — Cinematic Intro / Landing Page
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5
          ? `rgba(79, 142, 247, ${Math.random() * 0.5 + 0.1})`
          : `rgba(0, 212, 255, ${Math.random() * 0.4 + 0.1})`,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

export default function IntroPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0=logo, 1=tagline, 2=cta
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function handleMouseMove(e) {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }

  function enter() { navigate('/home'); }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, #0d1533 0%, #070810 50%, #100818 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 9000,
      }}
      onMouseMove={handleMouseMove}
    >
      <ParticleCanvas />

      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '15%', left: '20%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 3D Identity Card */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          transform: `perspective(800px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
          transition: 'transform 0.1s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: phase >= 0 ? 1 : 0,
            transform: phase >= 0 ? 'translateY(0) scale(1)' : 'translateY(-30px) scale(0.8)',
            transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}
        >
          {/* N Logo */}
          <div style={{
            width: 80, height: 80,
            background: 'linear-gradient(135deg, #4f8ef7, #00d4ff)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 40, color: 'white',
            boxShadow: '0 0 40px rgba(79,142,247,0.5), 0 0 80px rgba(79,142,247,0.2)',
            animation: 'float 3s ease-in-out infinite',
          }}>N</div>

          {/* NEXORA wordmark */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #ffffff 0%, #4f8ef7 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 4s ease infinite',
              margin: 0,
            }}
          >
            NEXORA
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s',
            textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Your Game.{' '}
            <span style={{ color: 'var(--color-primary)' }}>Your Identity.</span>{' '}
            <span style={{ color: 'var(--color-cyan)' }}>Your Network.</span>
          </p>
          <p style={{
            fontSize: 'var(--text-base)', color: 'var(--color-text-muted)',
            maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
          }}>
            The premier gaming professional network for competitive players, esports teams, and gaming communities.
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.3s',
            display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          <button
            className="btn btn-primary btn-lg"
            onClick={enter}
            style={{
              fontSize: 'var(--text-md)',
              padding: '14px 40px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 800,
              boxShadow: '0 0 30px rgba(79,142,247,0.4), 0 0 60px rgba(79,142,247,0.15)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          >
            Enter NEXORA →
          </button>
          <button
            className="btn btn-ghost btn-lg"
            onClick={enter}
            style={{ fontSize: 'var(--text-md)', padding: '14px 28px' }}
          >
            Explore Platform
          </button>
        </div>

        {/* Bottom stats */}
        <div
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
            display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          {[
            { label: 'Gamers', value: '2.4M+' },
            { label: 'Teams', value: '48K+' },
            { label: 'Communities', value: '12K+' },
            { label: 'Tournaments', value: '8K+' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>{value}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </div>
  );
}
