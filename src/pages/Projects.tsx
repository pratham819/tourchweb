import { useState } from 'react'
import { type PageProps } from '../App'
import { PROJECTS } from '../data/projects'

const T = {
  primary: '#0f0e0c',
  secondary: 'rgba(15,14,12,0.62)',
  muted: 'rgba(15,14,12,0.5)',
  faint: 'rgba(15,14,12,0.38)',
  label: '#7a5a20',
  accent: '#c9a96e',
  border: 'rgba(15,14,12,0.1)',
  bgA: '#faf9f7',
  bgB: '#ffffff',
  bgC: '#f0ede8',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.label, marginBottom: 16 }}>
      {children}
    </div>
  )
}

function ProjectCard({ project, large, onClick }: {
  project: typeof PROJECTS[0]
  large?: boolean
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#0f0e0c', aspectRatio: large ? '16/9' : '4/3' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <img
        src={project.heroImg}
        alt={project.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hover ? 'scale(1.04)' : 'scale(1)', opacity: 0.7, display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 55%)' }} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: large ? 40 : 28 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.accent, marginBottom: 10 }}>{project.type}</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: large ? 32 : 22, color: '#f0ede8', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.1 }}>{project.name}</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(240,237,232,0.55)' }}>{project.location}</div>
        {large && (
          <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.5)', marginTop: 12, lineHeight: 1.65, maxWidth: 440 }}>{project.challenge[0].split('.')[0]}.</div>
        )}
      </div>

      <div style={{
        position: 'absolute', top: large ? 32 : 20, right: large ? 32 : 20,
        fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: T.accent, opacity: hover ? 1 : 0, transition: 'opacity 0.25s',
      }}>
        View Project →
      </div>
    </div>
  )
}

export default function Projects({ setPage, navigateToProject }: PageProps) {
  const [featured, ...rest] = PROJECTS

  return (
    <div style={{ paddingTop: 104 }}>
      {/* HEADER */}
      <section style={{ backgroundColor: T.bgB, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 48px 80px' }}>
          <Label>Selected Work</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: T.primary, margin: 0 }}>
              PROJECTS THAT<br />SPEAK AFTER DARK.
            </h1>
            <p style={{ fontSize: 16, color: T.secondary, lineHeight: 1.8, maxWidth: 440, marginBottom: 4 }}>
              Every project is different. Below is a selection of completed commercial lighting installations across Minnesota — campus, hospitality, multifamily, and retail.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section style={{ backgroundColor: T.bgA }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '64px 48px 0' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 20 }}>Featured Project</div>
          <ProjectCard project={featured} large onClick={() => navigateToProject?.(featured.id)} />
        </div>
      </section>

      {/* PROJECT GRID */}
      <section style={{ backgroundColor: T.bgA }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '4px 48px 120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 4 }}>
            {rest.map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => navigateToProject?.(project.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 48px' }}>
          <Label>Property Types We Serve</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { type: 'Commercial Campus', examples: 'Corporate, Office, Medical, Education' },
              { type: 'Multifamily', examples: 'Market Rate, Luxury, Mixed-Income' },
              { type: 'Hospitality', examples: 'Full-Service, Select-Service, Resort' },
              { type: 'Retail & Mixed-Use', examples: 'Strip, Power Center, Mixed-Use' },
            ].map((item, i) => (
              <div key={i} style={{ paddingRight: i < 3 ? 40 : 0, paddingLeft: i > 0 ? 40 : 0, borderRight: i < 3 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ width: 28, height: 1, backgroundColor: T.accent, marginBottom: 20 }} />
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: T.primary, marginBottom: 8 }}>{item.type}</div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>{item.examples}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: T.bgC, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 48px', textAlign: 'center' }}>
          <Label>Start a Project</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 24, lineHeight: 1.05 }}>
            HAVE A COMMERCIAL PROPERTY<br />THAT NEEDS LIGHTING?
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, maxWidth: 420, margin: '0 auto 48px', lineHeight: 1.75 }}>
            Tell us about the property and what you are trying to achieve. We will help you develop the right approach.
          </p>
          <CtaBtn onClick={() => setPage('contact')}>Start Your Project</CtaBtn>
        </div>
      </section>
    </div>
  )
}

function CtaBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [h, setH] = useState(false)
  return (
    <button onClick={onClick} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', backgroundColor: h ? '#e4e0d7' : '#f0ede8', color: '#111111', padding: '14px 36px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 9999, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </button>
  )
}
