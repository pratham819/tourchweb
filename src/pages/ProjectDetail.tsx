import { useState } from 'react'
import { type PageProps } from '../App'
import { getProject, FIXTURES, PROJECTS } from '../data/projects'
import IPadMockup from '../components/IPadMockup'

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
  return <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.label, marginBottom: 16 }}>{children}</div>
}

function SectionNum({ n }: { n: string }) {
  return <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 11, letterSpacing: '0.2em', color: T.faint, marginBottom: 14 }}>— {n}</div>
}

interface Props extends PageProps {
  projectId: string
}

export default function ProjectDetail({ setPage, navigateToProject, projectId }: Props) {
  const project = getProject(projectId)
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('after')

  if (!project) {
    return (
      <div style={{ paddingTop: 160, textAlign: 'center', color: T.muted }}>
        <p>Project not found.</p>
        <button onClick={() => setPage('projects')} style={{ marginTop: 24, fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: T.label }}>← All Projects</button>
      </div>
    )
  }

  const fixtures = project.fixtureIds.map(id => FIXTURES[id]).filter(Boolean)
  const otherProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', height: '90vh', backgroundColor: '#060606', overflow: 'hidden' }}>
        <img src={project.heroImg} alt={project.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 55%, rgba(8,8,8,0.1) 100%)' }} />

        {/* Back nav */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', padding: '168px 48px 0' }}>
          <button
            onClick={() => setPage('projects')}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#f0ede8')}
            onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = 'rgba(240,237,232,0.5)')}
          >
            ← All Projects
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', padding: '0 48px 72px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, marginBottom: 18 }}>
            Case Study · {project.type}
          </div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '-0.03em', lineHeight: 0.93, color: '#f0ede8', margin: '0 0 20px' }}>
            {project.name.toUpperCase()}
          </h1>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(240,237,232,0.5)', letterSpacing: '0.07em' }}>
            {project.subtitle}
          </div>
        </div>
      </section>

      {/* META STRIP */}
      <section style={{ backgroundColor: T.bgC, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '52px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { label: 'Property Type', value: project.type },
            { label: 'Location', value: project.location },
            { label: 'Scope', value: project.scope },
            { label: 'Services', value: project.services },
          ].map((item, i) => (
            <div key={i} style={{ borderRight: i < 3 ? `1px solid ${T.border}` : 'none', paddingRight: i < 3 ? 40 : 0, paddingLeft: i > 0 ? 40 : 0 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 10 }}>{item.label}</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: T.primary }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 01 THE CHALLENGE */}
      <section style={{ backgroundColor: T.bgB }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
          <div>
            <SectionNum n="01" />
            <Label>The Challenge</Label>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.15 }}>
              {project.challenge[0].split('.')[0]}.
            </h2>
            {project.challenge.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: i < project.challenge.length - 1 ? 20 : 0 }}>{p}</p>
            ))}
          </div>

          <div style={{ paddingTop: 40 }}>
            <div style={{ backgroundColor: T.bgA, padding: 40, borderLeft: `2px solid rgba(201,169,110,0.5)` }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 24 }}>Project Objectives</div>
              {project.objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, borderBottom: i < project.objectives.length - 1 ? `1px solid ${T.border}` : 'none', marginBottom: i < project.objectives.length - 1 ? 16 : 0 }}>
                  <div style={{ width: 4, height: 4, backgroundColor: T.accent, flexShrink: 0, marginTop: 7 }} />
                  <div style={{ fontSize: 13, color: T.secondary, lineHeight: 1.6 }}>{obj}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 THE APPROACH */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          <div>
            <SectionNum n="02" />
            <Label>The Approach</Label>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.15 }}>
              {project.approach[0].split('.')[0]}.
            </h2>
            {project.approach.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: i < project.approach.length - 1 ? 20 : 0 }}>{p}</p>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: 'Site Walkthrough', desc: 'Full property assessment mapping zones, light levels, and architectural conditions.' },
              { step: 'Lighting Strategy', desc: 'Zone-by-zone approach developed before any product is specified.' },
              { step: 'iPad Planning', desc: 'All fixture positions mapped in the proprietary application and shared with the client.' },
              { step: 'Specification & Build', desc: 'Products sourced or manufactured to match the approved plan.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, border: `1px solid rgba(201,169,110,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 10, color: T.label }}>0{i + 1}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: T.primary, marginBottom: 5, letterSpacing: '0.04em' }}>{item.step}</div>
                  <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 LIGHTING PLAN */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="03" />
          <Label>The Lighting Plan</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 24, lineHeight: 1.15 }}>
                Every fixture position mapped before installation.
              </h2>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 48 }}>
                The complete lighting plan was built in the TouchStone iPad application and reviewed by the client before any work was committed. Fixture positions, zones, and product types were all visible and adjustable during the review.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                {project.stats.map((stat, i) => (
                  <div key={i} style={{ backgroundColor: T.bgA, padding: '24px 28px', border: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.faint, marginBottom: 8 }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 24, color: T.label }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: T.faint, marginTop: 20, lineHeight: 1.6, fontStyle: 'italic' }}>
                Placeholder data — replace with actual project specifications following client discovery.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IPadMockup width={440} />
            </div>
          </div>
        </div>
      </section>

      {/* 04 FIXTURES USED */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="04" />
          <Label>Fixtures Used</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 64, lineHeight: 1.15 }}>
            Products specified for this project.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {fixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </div>
      </section>

      {/* 05 INSTALLATION */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
          <div>
            <SectionNum n="05" />
            <Label>Installation</Label>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.15 }}>
              Executed to the plan.
            </h2>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85 }}>
              {project.installationNote}
            </p>
          </div>
          <div style={{ paddingTop: 40 }}>
            <div style={{ backgroundColor: T.bgA, padding: 40 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 24 }}>Services Delivered</div>
              {project.services.split(' · ').map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < project.services.split(' · ').length - 1 ? `1px solid ${T.border}` : 'none' }}>
                  <div style={{ width: 5, height: 5, backgroundColor: T.accent, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14, color: T.primary }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 THE RESULT */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="06" />
          <Label>The Result</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start', marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.02em', color: T.primary, lineHeight: 1.15, margin: 0 }}>
              {project.resultText[0].split('.')[0]}.
            </h2>
            <div>
              {project.resultText.map((p, i) => (
                <p key={i} style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: i < project.resultText.length - 1 ? 20 : 0 }}>{p}</p>
              ))}
            </div>
          </div>

          {/* Result images */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 4, marginBottom: 4 }}>
            <img src={project.resultImg} alt={`${project.name} — result`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
            <img src={project.resultImg2} alt={`${project.name} — result detail`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Before / After */}
          <div style={{ border: `1px solid ${T.border}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}` }}>
              {(['before', 'after'] as const).map(tab => (
                <button key={tab} onClick={() => setBeforeAfter(tab)} style={{ flex: 1, padding: '15px 0', fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', background: beforeAfter === tab ? T.bgC : T.bgB, border: 'none', cursor: 'pointer', color: beforeAfter === tab ? T.label : T.faint, borderBottom: beforeAfter === tab ? `2px solid ${T.accent}` : '2px solid transparent', transition: 'all 0.2s', fontWeight: beforeAfter === tab ? 500 : 400 }}>
                  {tab === 'before' ? 'Before' : 'After'}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', backgroundColor: '#0f0e0c' }}>
              <img
                src={beforeAfter === 'before' ? 'https://images.unsplash.com/photo-1610286986642-057ece0c3656?w=1200&h=600&fit=crop&auto=format' : project.resultImg}
                alt={beforeAfter === 'before' ? 'Before installation' : 'After installation'}
                style={{ width: '100%', aspectRatio: '21/8', objectFit: 'cover', display: 'block', opacity: beforeAfter === 'before' ? 0.75 : 1 }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f0ede8', backgroundColor: 'rgba(15,14,12,0.65)', backdropFilter: 'blur(6px)', padding: '6px 12px' }}>
                {beforeAfter === 'before' ? '— Before' : '— After'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE PROJECTS */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <Label>More Projects</Label>
            <button onClick={() => setPage('projects')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.muted, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = T.primary)} onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = T.muted)}>
              View All Projects →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {otherProjects.map(p => (
              <MoreProjectCard key={p.id} project={p} onClick={() => navigateToProject?.(p.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: T.bgC, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 48px', textAlign: 'center' }}>
          <Label>Ready to Begin</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 24, lineHeight: 1.05 }}>
            PLANNING A COMMERCIAL PROJECT?
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, maxWidth: 440, margin: '0 auto 48px', lineHeight: 1.75 }}>
            Tell us about your property. We will help develop the right outdoor lighting solution.
          </p>
          <CtaBtn onClick={() => setPage('contact')}>Start Your Project</CtaBtn>
        </div>
      </section>
    </div>
  )
}

function FixtureCard({ fixture }: { fixture: import('../data/projects').FixtureDef }) {
  const [hover, setHover] = useState(false)
  const [showProduct, setShowProduct] = useState(false)

  const activeImage = showProduct && fixture.productImg ? fixture.productImg : fixture.img

  return (
    <div style={{ backgroundColor: T.bgB, border: `1px solid ${T.border}`, overflow: 'hidden' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: showProduct ? '#f8f7f4' : '#0f0e0c' }}>
        <img
          src={activeImage}
          alt={fixture.imgAlt}
          style={{ width: '100%', height: '100%', objectFit: showProduct ? 'contain' : 'cover', display: 'block', transition: 'transform 0.6s ease', transform: hover && !showProduct ? 'scale(1.04)' : 'scale(1)', padding: showProduct ? '16px' : '0' }}
        />
        {fixture.productImg && (
          <button
            onClick={() => setShowProduct(!showProduct)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.75)',
              color: '#ffd51d',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20,
              padding: '3px 9px',
              fontSize: 10,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              zIndex: 5,
            }}
          >
            {showProduct ? 'Night View' : 'Product Shot'}
          </button>
        )}
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>
          {fixture.application}
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: T.primary, marginBottom: 6, lineHeight: 1.3 }}>{fixture.name}</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: T.faint, marginBottom: 12, letterSpacing: '0.06em' }}>{fixture.series}</div>
        <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.75 }}>{fixture.desc}</div>
      </div>
    </div>
  )
}

function MoreProjectCard({ project, onClick }: { project: import('../data/projects').Project; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#0f0e0c' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>
      <img src={project.heroImg} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease', transform: hover ? 'scale(1.05)' : 'scale(1)', opacity: 0.65 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.15) 55%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.accent, marginBottom: 8 }}>{project.type}</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, color: '#f0ede8', marginBottom: 4 }}>{project.name}</div>
        <div style={{ fontSize: 12, color: 'rgba(240,237,232,0.5)' }}>{project.location}</div>
      </div>
      <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.accent, opacity: hover ? 1 : 0, transition: 'opacity 0.25s' }}>
        View →
      </div>
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
