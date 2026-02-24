import React from 'react';
import { Monitor, Cpu, Trash2, Layers, Battery, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const materials = [
    { icon: <Monitor size={40} />, title: "Sucata Eletrônica", desc: "Placas-mãe, computadores, servidores e componentes de informática.", accent: 'var(--secondary)' },
    { icon: <Cpu size={40} />, title: "Metais Nobres", desc: "Cobre, fios, barramentos e componentes com ligas especiais.", accent: 'var(--eco-green)' },
    { icon: <Layers size={40} />, title: "Outros Metais", desc: "Alumínio, inox e sucatas metálicas industriais e residenciais.", accent: 'var(--secondary)' },
    { icon: <Trash2 size={40} />, title: "Plásticos", desc: "Plásticos industriais, polímeros e descartes recicláveis em geral.", accent: 'var(--eco-green)' },
    { icon: <Battery size={40} />, title: "Baterias", desc: "Coleta e destinação de baterias e acumuladores de diversos tipos.", accent: 'var(--secondary)' },
    { icon: <Leaf size={40} />, title: "Descarte Sustentável", desc: "Apoio a empresas e indivíduos na destinação correta de resíduos.", accent: 'var(--eco-green)' }
];

export default function Services() {
    return (
        <section id="servicos" style={{
            margin: '4rem 0',
            borderRadius: '2rem',
            background: 'rgba(13, 31, 69, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(251, 191, 36, 0.12)',
            padding: '4rem 0'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem', marginBottom: '1.25rem' }}>
                        <span style={{ color: 'var(--eco-green)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em' }}>O QUE COMPRAMOS</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nossos <span className="chrome-text">Serviços</span></h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Compromisso com a eficiência e a sustentabilidade em cada material processado.
                    </p>
                </div>

                <div className="grid grid-3">
                    {materials.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ translateY: -8, borderColor: item.accent }}
                            style={{
                                padding: '2.5rem',
                                background: 'var(--surface)',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.06)',
                                textAlign: 'center',
                                transition: 'border-color 0.3s',
                                cursor: 'default'
                            }}
                        >
                            <div style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '1.25rem',
                                background: `rgba(${item.accent === 'var(--eco-green)' ? '251,191,36' : '59,130,246'}, 0.1)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: item.accent
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
