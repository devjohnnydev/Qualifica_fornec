import React from 'react';
import { Phone, Mail, Instagram, MapPin, Send } from 'lucide-react';
import whatsappLogoImg from '../assets/whatsapp-logo.png';
import locationPinImg from '../assets/location-pin.png';

export default function Contact() {
    return (
        <section id="contato" style={{ background: 'var(--surface)', margin: '0', borderRadius: '2rem' }}>
            <div className="container">
                <div className="grid grid-3" style={{ alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Entre em <span className="chrome-text">Contato</span></h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Estamos prontos para avaliar sua sucata. Ligue ou envie uma mensagem no WhatsApp para um atendimento rápido.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <a href="https://wa.me/5562994651152" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', transition: '0.3s' }} className="hover-lift">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={whatsappLogoImg} alt="WhatsApp" style={{ width: '42px', height: '42px' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', margin: 0 }}>WhatsApp</p>
                                    <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>+55 62 99465-1152</p>
                                </div>
                            </a>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
                                    <img
                                        src={locationPinImg}
                                        alt="Localização"
                                        className="spin-3d remove-bg-white"
                                        style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', margin: 0 }}>Endereço</p>
                                    <p style={{ fontWeight: 700, margin: 0 }}>Aparecida de Goiânia - GO</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass" style={{ gridColumn: 'span 2', padding: '3rem', borderRadius: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Clique no botão abaixo para iniciar uma conversa agora!</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                                Atendimento de segunda a sexta, das 08h às 18h.
                            </p>
                            <a
                                href="https://wa.me/5562994651152"
                                className="btn btn-whatsapp"
                                style={{ padding: '1.5rem 3rem', fontSize: '1.25rem', borderRadius: '1rem', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}
                            >
                                <img src={whatsappLogoImg} alt="WhatsApp" style={{ width: '32px', height: '32px' }} /> Abrir WhatsApp Agora
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 968px) {
          #contato .grid-3 { grid-template-columns: 1fr !important; }
          #contato .glass { grid-column: span 1 !important; padding: 2rem !important; }
        }
      `}</style>
        </section>
    );
}
