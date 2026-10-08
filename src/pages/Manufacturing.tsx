import { useState } from 'react'
import { type PageProps } from '../App'
import IPadMockup from '../components/IPadMockup'
import { FIXTURES } from '../data/projects'

const IMGS = {
  fabrication: 'https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=1200&h=800&fit=crop&auto=format',
  campus: 'https://images.unsplash.com/photo-1769971361536-d7d69715a9c2?w=1200&h=800&fit=crop&auto=format',
  pathway: 'https://images.unsplash.com/photo-1777013371468-1ec321f18915?w=1200&h=800&fit=crop&auto=format',
  hotel: 'https://images.unsplash.com/photo-1785910723802-99967d4fa265?w=1200&h=800&fit=crop&auto=format',
}

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

function Divider() {
  return <div style={{ width: 48, height: 1, backgroundColor: T.accent, marginBottom: 32 }} />
}

const capabilities = [
  { title: 'Custom Dimensions', desc: 'Fixtures built to exact size requirements — arm lengths, housing dimensions, pole heights, and projection angles.' },
  { title: 'Mounting Configurations', desc: 'Wall-mount, ground-mount, pole-mount, and embedded configurations designed for the specific installation condition.' },
  { title: 'Finish & Appearance', desc: 'Powder-coat finishes matched to architectural metal, structural elements, or brand standards.' },
  { title: 'Lighting Performance', desc: 'Optics, output levels, and beam distributions engineered to the requirements of each application.' },
  { title: 'Project-Specific Requirements', desc: 'Custom hardware, seismic mounting, concealed conduit, and other project-specific adaptations.' },
]

const techLabels = [
  { label: 'Plan', desc: 'Property boundary and building footprints mapped from site documentation.' },
  { label: 'Placement', desc: 'Every fixture positioned within the plan with lighting zone assignments.' },
  { label: 'Visualization', desc: 'Client reviews the complete plan digitally before any work is committed.' },
  { label: 'Client Review', desc: 'Adjustments made in real time. Plan finalized before specification.' },
]

const processFlow = ['Site', 'Lighting Plan', 'iPad Visualization', 'Manufacture', 'Installation']

function RequestCtaButton({ onClick }: { onClick: () => void }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
        backgroundColor: h ? '#a07840' : T.accent,
        color: '#0f0e0c', padding: '14px 32px', border: 'none',
        transition: 'background-color 0.25s', display: 'inline-block',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      Request a Custom Fixture
    </button>
  )
}

export default function Manufacturing({ setPage }: PageProps) {
  const [ctaH, setCtaH] = useState(false)
  const [outlineH, setOutlineH] = useState(false)

  return (
    <div>
      {/* HERO — dark image */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: '#060606', overflow: 'hidden' }}>
        <img src={IMGS.fabrication} alt="Metal fabrication with sparks" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.5) 55%, rgba(8,8,8,0.15) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', width: '100%', padding: '0 48px 96px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent, marginBottom: 20 }}>Custom Manufacturing & Technology</div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: '#f0ede8', marginBottom: 24, maxWidth: 800 }}>
            DESIGNED FOR THE PROJECT.<br />
            <span style={{ color: 'rgba(240,237,232,0.4)' }}>BUILT FOR THE</span><br />
            <span style={{ color: 'rgba(240,237,232,0.4)' }}>PROPERTY.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(240,237,232,0.65)', maxWidth: 520, lineHeight: 1.7 }}>
            Commercial lighting solutions developed around real project requirements.
          </p>
        </div>
      </section>

      {/* CUSTOM MANUFACTURING INTRO */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <Label>Section A — Custom Manufacturing</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start', marginBottom: 96 }}>
            <div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 46px)', letterSpacing: '-0.02em', lineHeight: 1.05, color: T.primary, marginBottom: 32 }}>
                WE DON'T JUST SELECT FIXTURES.<br />WE CAN BUILD THEM.
              </h2>
              <Divider />
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 24 }}>
                Most commercial lighting projects involve selecting from a catalog of standard products. When those products don't match the requirements of the project, the project gets adjusted — or compromised.
              </p>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85 }}>
                TouchStone manufactures its own fixtures. When a project calls for something that doesn't exist off the shelf, we build it — to the exact dimensions, mounting configuration, finish, and performance specifications the project requires.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {['Requirement', 'Design', 'Engineering', 'Manufacturing', 'Finished Fixture'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid rgba(201,169,110,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 10, color: T.label }}>0{i + 1}</span>
                    </div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 15, color: T.primary, letterSpacing: '0.04em' }}>{step}</div>
                    {i < 4 && <div style={{ marginLeft: 'auto', fontSize: 16, color: 'rgba(201,169,110,0.4)' }}>↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img src={IMGS.fabrication} alt="In-house fixture manufacturing" style={{ width: '100%', aspectRatio: '21/8', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', top: 40, left: 48 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.6)', marginBottom: 8 }}>In-House Capability</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 22, color: '#f0ede8' }}>Custom Fixture Manufacturing</div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <Label>Manufacturing Capabilities</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 64, lineHeight: 1.1 }}>
            Built around your project's requirements.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
            {capabilities.map((cap, i) => (
              <div key={i} style={{ backgroundColor: T.bgB, padding: 32, border: `1px solid ${T.border}` }}>
                <div style={{ width: 32, height: 1, backgroundColor: T.accent, marginBottom: 24 }} />
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: T.primary, marginBottom: 12, lineHeight: 1.3 }}>{cap.title}</div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.75 }}>{cap.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXTURE GALLERY + CUSTOMIZATION */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start', marginBottom: 72 }}>
            <div>
              <Label>Our Fixture Range</Label>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: T.primary, marginBottom: 24 }}>
                FROM COLOR TO BODY — FULLY CUSTOMIZABLE.
              </h2>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 24 }}>
                Every fixture TouchStone manufactures can be adapted to the requirements of the project. That means more than selecting a finish — it means rebuilding the fixture around what the property actually needs.
              </p>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 40 }}>
                Housing dimensions, body profile, mounting configuration, arm length, diffuser type, lens angle, finish color, and output specification — all of it can be adjusted. If a standard fixture gets you 80% of the way there, we build the other 20%.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
                {[
                  { attr: 'Body & Housing', desc: 'Profile, dimensions, and wall thickness tailored to the installation condition.' },
                  { attr: 'Color & Finish', desc: 'Powder-coat matched to architectural metal, brand standards, or any RAL color.' },
                  { attr: 'Mounting', desc: 'Arm length, angle, and hardware for any surface or structural condition.' },
                  { attr: 'Optics & Output', desc: 'Beam angle, color temperature, and lumen output engineered to spec.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, padding: '18px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ flexShrink: 0, fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.label, paddingTop: 2, minWidth: 110 }}>{item.attr}</div>
                    <div style={{ fontSize: 13, color: T.secondary, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <RequestCtaButton onClick={() => setPage('contact')} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 3 }}>
              {Object.values(FIXTURES).map((fixture) => (
                <div key={fixture.id} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#0f0e0c' }}>
                  <img
                    src={fixture.img}
                    alt={fixture.imgAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.06)')}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.accent, marginBottom: 3 }}>{fixture.series}</div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, color: '#f0ede8', lineHeight: 1.2 }}>{fixture.name.replace('TSC ', '')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT EXAMPLES */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <Label>Applied Examples</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {[
              { img: IMGS.campus, title: 'Commercial Campus', sub: 'Custom arm-mount entry fixtures' },
              { img: IMGS.pathway, title: 'Pedestrian Pathway', sub: 'Modified bollard height and diffuser' },
              { img: IMGS.hotel, title: 'Hospitality Property', sub: 'Custom porte-cochère fixtures' },
            ].map((ex, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#111' }}>
                <img src={ex.img} alt={ex.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#f0ede8', marginBottom: 6 }}>{ex.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(240,237,232,0.6)' }}>{ex.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <Label>Section B — Proprietary Technology</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.05, color: T.primary, marginBottom: 24 }}>
            CLARITY BEFORE<br />INSTALLATION.
          </h2>
          <p style={{ fontSize: 16, color: T.secondary, maxWidth: 560, lineHeight: 1.8, marginBottom: 96 }}>
            Every commercial project begins with a lighting plan built inside the TouchStone iPad application — so clients see exactly what is being proposed before a single fixture is ordered.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center', marginBottom: 96 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IPadMockup width={460} />
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {techLabels.map((item, i) => (
                  <div key={i} style={{ padding: '32px 0', borderBottom: i < techLabels.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.label, minWidth: 96 }}>{item.label}</div>
                      <div style={{ flex: 1, height: 1, backgroundColor: T.border }} />
                    </div>
                    <div style={{ fontSize: 14, color: T.secondary, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 64 }}>
            <Label>Complete Process</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', marginBottom: 24 }}>
              {processFlow.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <div style={{ padding: '14px 28px', backgroundColor: T.bgB, border: `1px solid ${T.border}` }}>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: T.primary, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{step}</div>
                  </div>
                  {i < processFlow.length - 1 && (
                    <div style={{ padding: '0 12px', fontSize: 14, color: T.accent }}>→</div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, maxWidth: 560 }}>
              The technology improves communication between our team and the client, reduces surprises, and ensures the final installation matches what was intended.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: T.bgC, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          <div>
            <Label>Ready to Begin</Label>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 40px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 24, lineHeight: 1.1 }}>
              YOUR PROJECT DOESN'T HAVE TO FIT OUR FIXTURES.
            </h2>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.8, marginBottom: 40 }}>
              We can build the right lighting solution around your project. Tell us what you are working on.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={() => setPage('contact')}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', backgroundColor: ctaH ? '#e4e0d7' : '#f0ede8', color: '#111111', padding: '14px 34px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 9999, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                onMouseEnter={() => setCtaH(true)}
                onMouseLeave={() => setCtaH(false)}
              >
                Start Your Project
              </button>
              <button
                onClick={() => setPage('projects')}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', backgroundColor: outlineH ? '#e4e0d7' : '#faf9f7', color: '#111111', padding: '14px 34px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 9999, transition: 'all 0.2s' }}
                onMouseEnter={() => setOutlineH(true)}
                onMouseLeave={() => setOutlineH(false)}
              >
                View Projects
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <img src={IMGS.campus} alt="Commercial campus night lighting" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
            <img src={IMGS.pathway} alt="Pathway lighting at night" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', marginTop: 24 }} />
          </div>
        </div>
      </section>
    </div>
  )
}
