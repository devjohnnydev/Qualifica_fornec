import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Heart, Recycle, Sparkles, Shield } from 'lucide-react';
import nextGenImg from '../assets/next-gen.jpg';
import ecoIconsImg from '../assets/eco-icons.jpg';

export default function Sustainability() {
    return (
        <section id="sustentabilidade" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 2rem 0' }}>
            {/* Background Decorative Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--eco-green)', fontWeight: 700, marginBottom: '1rem' }}
                    >
                        <Leaf />
                        <span>NOSSO COMPROMISSO</span>
                    </motion.div>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Harmonia entre <span className="eco-text">Homem e Natureza</span></h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Construímos um legado de responsabilidade. Nosso mosaico sustentável une tecnologia industrial com o cuidado vital que o nosso planeta exige.
                    </p>
                </div>

                {/* Mosaic Grid (Bento Style) */}
                <div className="mosaic-grid">
                    {/* Main Focus Image */}
                    <motion.div
                        className="mosaic-item main-img"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <img src={nextGenImg} alt="Legado" />
                        <div className="overlay">
                            <Sparkles className="eco-text" />
                            <span>Para as Futuras Gerações</span>
                        </div>
                    </motion.div>

                    {/* Info Card 1 */}
                    <motion.div
                        className="mosaic-item card card-primary"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <Globe size={32} className="eco-text" />
                        <h3>Visão Global</h3>
                        <p>Atuamos localmente em Aparecida de Goiânia, mas conectamos cada processo ao equilíbrio ambiental do planeta.</p>
                    </motion.div>

                    {/* Info Card 2 */}
                    <motion.div
                        className="mosaic-item card card-secondary"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Shield size={32} style={{ color: 'var(--primary)' }} />
                        <h3>Ética e Segurança</h3>
                        <p>Cada quilo de material é processado com transparência total e respeito às normas ambientais.</p>
                    </motion.div>

                    {/* Second Image Card */}
                    <motion.div
                        className="mosaic-item secondary-img"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <img src={ecoIconsImg} alt="Natureza" />
                    </motion.div>

                    {/* Small Highlight Card */}
                    <motion.div
                        className="mosaic-item highlight"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <Heart className="pulse" style={{ color: '#ef4444' }} />
                        <span>Cuidado Humano</span>
                    </motion.div>
                </div>

                {/* Bottom Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: '3rem',
                        padding: '2.5rem',
                        background: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '2rem',
                        textAlign: 'center',
                        border: '1px solid rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <Recycle className="eco-text spin-slow" size={40} />
                    <p style={{ color: 'var(--text)', fontSize: '1.25rem', fontWeight: 600, maxWidth: '800px' }}>
                        "Não herdamos a Terra de nossos antepassados, nós a pegamos emprestada de nossos filhos."
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
                .mosaic-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(2, 300px);
                    gap: 1.5rem;
                }

                .mosaic-item {
                    border-radius: 2rem;
                    overflow: hidden;
                    position: relative;
                }

                .main-img {
                    grid-column: span 1;
                    grid-row: span 2;
                    border: 2px solid rgba(16, 185, 129, 0.3);
                }

                .main-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .main-img .overlay {
                    position: absolute;
                    bottom: 2rem;
                    left: 2rem;
                    right: 2rem;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(8px);
                    padding: 1rem 1.5rem;
                    border-radius: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 700;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .secondary-img {
                    grid-column: span 2;
                    grid-row: span 1;
                    border: 2px solid rgba(0, 119, 182, 0.3);
                }

                .secondary-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card {
                    padding: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1rem;
                    background: var(--surface);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .card h3 {
                    font-size: 1.5rem;
                    margin: 0;
                }

                .card p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin: 0;
                }

                .card-primary {
                    border-left: 5px solid var(--eco-green);
                }

                .card-secondary {
                    border-left: 5px solid var(--primary);
                }

                .highlight {
                    background: var(--surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-weight: 800;
                    font-size: 1.25rem;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }

                .pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }

                .spin-slow {
                    animation: spin 8s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 968px) {
                    .mosaic-grid {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto;
                    }
                    .main-img, .secondary-img {
                        grid-column: span 1;
                        grid-row: auto;
                        height: 350px;
                    }
                    .card {
                        height: auto;
                        padding: 2rem;
                    }
                    .highlight {
                        height: 100px;
                    }
                }
            `}</style>
        </section>
    );
}
