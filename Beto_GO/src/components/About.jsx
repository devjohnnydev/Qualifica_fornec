import React from 'react';
import { CheckCircle2, History, Building, Globe } from 'lucide-react';
import locationPinImg from '../assets/location-pin.png';
import ecoMissionImg from '../assets/eco-mission.jpg';

export default function About() {
    return (
        <section id="sobre" style={{ padding: '6rem 0 2rem 0' }}>
            <div className="container grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--eco-green)', fontWeight: 700, marginBottom: '1rem' }}>
                        <Globe size={20} />
                        <span>NOSSO COMPROMISSO</span>
                    </div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Liderança em Reciclagem com <span className="eco-text">Consciência Ambiental</span></h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        A <strong>BETO SUCATA ELETRONICA</strong> nasceu com a missão de profissionalizar a gestão de resíduos e promover a economia circular em nossa região.
                    </p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Acreditamos que cada quilo de metal reciclado é um passo em direção a um planeta mais saudável. Nosso trabalho é focado na preservação do meio ambiente e no legado para as próximas gerações.
                    </p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                        Transformamos o que seria descarte em novos recursos, garantindo que o futuro dos nossos filhos e netos seja mais limpo e sustentável.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--eco-green)' }}>
                            <div style={{ color: 'var(--eco-green)', marginBottom: '0.5rem' }}><CheckCircle2 /></div>
                            <h4 style={{ marginBottom: '0.25rem' }}>Coleta Ética</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Seguimos rigorosamente as normas de descarte sustentável e logística reversa.</p>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}><Building /></div>
                            <h4 style={{ marginBottom: '0.25rem' }}>Infraestrutura</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Galpão amplo e moderno equipado para o processamento eficiente de sucatas.</p>
                        </div>
                    </div>

                    {/* Horizontal Location Bar */}
                    <div className="glass" style={{ padding: '1.25rem 2rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <div style={{ perspective: '1000px' }}>
                            <img src={locationPinImg} alt="" className="spin-3d remove-bg-white" style={{ width: '38px', height: '38px' }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Nossa Sede</p>
                            <p style={{ fontSize: '1rem', fontWeight: 600 }}>RUA São Vicente, 94 - Jardim Maria Inês, Aparecida de Goiânia - GO</p>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <div className="glass" style={{ borderRadius: '2.5rem', overflow: 'hidden', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ borderRadius: '2rem', overflow: 'hidden', height: '500px' }}>
                            <img
                                src={ecoMissionImg}
                                alt="Reciclagem e Meio Ambiente"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% 50%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Map Section */}
            <div className="container" style={{ marginTop: '2.5rem' }}>
                <div className="glass" style={{ borderRadius: '2rem', overflow: 'hidden', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.5374813230183!2d-49.2610172252473!3d-16.749914147207996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef09de6a5b0e7%3A0x6c5f969017e3db44!2sR.%20S%C3%A3o%20Vicente%2C%2094%20-%20Jardim%20Maria%20In%C3%AAs%2C%20Aparecida%20de%20Goi%C3%A2nia%20-%20GO%2C%2074914-560!5e0!3m2!1spt-BR!2sbr!4v1771543659898!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: '1.5rem' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 968px) {
          #sobre .grid { grid-template-columns: 1fr !important; }
          #sobre .glass { flex-direction: column; text-align: center; gap: 0.5rem; }
        }
      `}</style>
        </section>
    );
}
