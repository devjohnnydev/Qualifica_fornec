import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Sustainability from './components/Sustainability';
import logoImg from './assets/logo.png';
import whatsappLogoImg from './assets/whatsapp-logo.png';

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <div data-reveal className="container">
          <Services />
        </div>
        <div data-reveal className="container">
          <Sustainability />
        </div>
        <div data-reveal className="container">
          <About />
        </div>

        {/* SVG Filter to remove white background from icons */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="remove-white" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -1 -1 -1 3 -0.5
              " />
            </filter>
          </defs>
        </svg>
        <div data-reveal className="container">
          <Contact />
        </div>
      </main>

      <footer style={{ padding: '2.5rem 0', borderTop: '2px solid rgba(251, 191, 36, 0.2)', textAlign: 'center', background: 'rgba(8,19,42,0.8)' }}>
        <div className="container">
          <img src={logoImg} alt="Beto Sucata" style={{ height: '55px', marginBottom: '1.25rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>
            © 2026 <strong style={{ color: 'var(--eco-green)' }}>BETO SUCATA ELETRONICA</strong>. Todos os direitos reservados. <br />
            Aparecida de Goiânia - GO
          </p>
        </div>
      </footer>

      <a href="https://wa.me/5562994651152" className="floating-whatsapp" target="_blank" rel="noopener noreferrer">
        <img src={whatsappLogoImg} alt="WhatsApp" style={{ width: '65px', height: '65px' }} />
      </a>

      <style jsx global>{`
        .app {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
