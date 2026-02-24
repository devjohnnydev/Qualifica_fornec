import React from 'react';
import logoImg from '../assets/logo.png';
import whatsappLogoImg from '../assets/whatsapp-logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(8, 19, 42, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
      boxShadow: '0 2px 30px rgba(0,0,0,0.4)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={logoImg} alt="Beto Sucata" style={{ height: '40px', width: 'auto' }} />
          <span className="chrome-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>BETO SUCATA</span>
        </div>

        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
          {['Home#hero', 'Serviços#servicos', 'Sobre#sobre', 'Contato#contato'].map((item) => {
            const [label, hash] = item.split('#');
            return (
              <a
                key={hash}
                href={`#${hash}`}
                style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 600, transition: 'color 0.2s', padding: '0.25rem 0', borderBottom: '2px solid transparent' }}
                onMouseEnter={e => { e.target.style.color = 'var(--eco-green)'; e.target.style.borderBottomColor = 'var(--eco-green)'; }}
                onMouseLeave={e => { e.target.style.color = 'var(--text)'; e.target.style.borderBottomColor = 'transparent'; }}
              >{label}</a>
            );
          })}
        </div>

        <a href="https://wa.me/5562994651152" className="btn btn-whatsapp" style={{ padding: '0.5rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.5rem' }}>
          <img src={whatsappLogoImg} alt="WhatsApp" style={{ width: '20px', height: '20px' }} />
          <span>Falar com Beto</span>
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
