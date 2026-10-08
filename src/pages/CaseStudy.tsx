import { useState } from 'react'
import { type PageProps } from '../App'
import IPadMockup from '../components/IPadMockup'

const IMGS = {
  hero: 'https://images.unsplash.com/photo-1769971361536-d7d69715a9c2?w=1920&h=1080&fit=crop&auto=format',
  approach: 'https://images.unsplash.com/photo-1785736098735-51909a463903?w=1200&h=800&fit=crop&auto=format',
  fabrication: 'https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=1200&h=800&fit=crop&auto=format',
  result1: 'https://images.unsplash.com/photo-1772289767405-69513d023448?w=1200&h=800&fit=crop&auto=format',
  result2: 'https://images.unsplash.com/photo-1785910723802-99967d4fa265?w=1200&h=800&fit=crop&auto=format',
  dayBefore: 'https://images.unsplash.com/photo-1610286986642-057ece0c3656?w=1200&h=800&fit=crop&auto=format',
  cityDusk: 'https://images.unsplash.com/photo-1770234895407-27d41a860541?w=1200&h=800&fit=crop&auto=format',
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

function SectionNum({ n }: { n: string }) {
  return <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 11, letterSpacing: '0.2em', color: T.faint, marginBottom: 16 }}>— {n}</div>
}

const products = [
  { name: 'TSC-A12 Architectural Uplight', application: 'Building Facade', desc: 'Custom-angle ground-mount uplight for facade wash applications. Powder-coat finish matched to building exterior.' },
  { name: 'TSC-P8 Pathway Series', application: 'Pedestrian Paths & Entry', desc: 'Low-profile pathway bollard with diffused output. Available in multiple heights and finishes.' },
  { name: 'TSC-AL30 Area Light', application: 'Parking & Surface Areas', desc: 'High-efficiency area luminaire for parking surfaces and open areas. Full cutoff optics for dark-sky compliance.' },
  { name: 'TSC-W6 Wall Sconce', application: 'Building Entry', desc: 'Architecturally integrated wall-mount fixture. Custom arm and housing configurations available.' },
]

export default function CaseStudy({ setPage }: PageProps) {
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('after')
  const [ctaH, setCtaH] = useState(false)

  return (
    <div>
      {/* HERO — dark image */}
      <section style={{ position: 'relative', height: '90vh', backgroundColor: '#060606', overflow: 'hidden' }}>
        <img src={IMGS.hero} alt="The Summit Commercial Campus at night" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.1) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', padding: '160px 48px 0' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.accent }}>Case Study · Placeholder Project</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', padding: '0 48px 72px' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '-0.03em', lineHeight: 0.95, color: '#f0ede8', margin: '0 0 20px' }}>THE SUMMIT</h1>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(240,237,232,0.55)', letterSpacing: '0.08em' }}>Commercial Campus &nbsp;·&nbsp; Minnesota</div>
        </div>
      </section>

      {/* PROJECT META */}
      <section style={{ backgroundColor: T.bgC, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '56px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { label: 'Property Type', value: 'Commercial Campus' },
            { label: 'Location', value: 'Eden Prairie, MN' },
            { label: 'Scope', value: 'Full Exterior Lighting' },
            { label: 'Services', value: 'Design · Manufacture · Install' },
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
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.1 }}>
              A four-building campus with no cohesive outdoor lighting strategy.
            </h2>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 24 }}>
              The Summit is a 4-building commercial campus in Eden Prairie. Prior to this project, the property had inconsistent exterior lighting — some areas over-lit, others dark, and no unified approach to safety, wayfinding, or architectural character.
            </p>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85 }}>
              The property management team needed a complete rethink — addressing safety, improving the arrival experience, highlighting the architecture, and creating consistency across all four buildings and parking areas.
            </p>
          </div>
          <div style={{ paddingTop: 40 }}>
            <div style={{ backgroundColor: T.bgA, padding: 40, borderLeft: `2px solid rgba(201,169,110,0.5)` }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 24 }}>Project Objectives</div>
              {[
                'Unified lighting approach across all four buildings',
                'Improved pedestrian safety and wayfinding',
                'Architectural character for evening presence',
                'Dark-sky compliant parking area lighting',
                'Custom fixture solutions for unique mounting conditions',
              ].map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, borderBottom: i < 4 ? `1px solid ${T.border}` : 'none', marginBottom: i < 4 ? 16 : 0 }}>
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
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="02" />
          <Label>The Approach</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.1 }}>
                Site analysis before a single fixture was specified.
              </h2>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 24 }}>
                The TouchStone team conducted a full property walkthrough, mapping every zone — parking fields, pedestrian paths, building entries, and facade elevations — evaluating each for current light levels, safety requirements, and aesthetic opportunity.
              </p>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85 }}>
                The approach was developed as a zone-by-zone lighting strategy before any product was selected — establishing the right light levels, directions, and character for each application.
              </p>
            </div>
            <div>
              <img src={IMGS.approach} alt="Commercial campus exterior at dusk" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE LIGHTING PLAN */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="03" />
          <Label>The Lighting Plan</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 20, lineHeight: 1.1 }}>
            Every fixture position mapped before installation.
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, maxWidth: 640, marginBottom: 72 }}>
            Using the TouchStone iPad planning application, the complete lighting plan was developed and reviewed with the client. Every fixture position, lighting zone, and product specification was visible before a single hole was dug.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <IPadMockup width={480} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 40, maxWidth: 280 }}>
              {[
                { label: 'Fixture Count', value: '28 units' },
                { label: 'Zones Mapped', value: '6 distinct zones' },
                { label: 'Plan Revisions', value: '2 client reviews' },
                { label: 'Coverage Area', value: '4.2 acres' },
              ].map((stat, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${T.border}`, paddingBottom: 32 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 24, color: T.label }}>{stat.value}</div>
                </div>
              ))}
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: T.faint, lineHeight: 1.6, fontStyle: 'italic' }}>
                Placeholder data — replace with actual project specifications following client discovery.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 CUSTOM MANUFACTURING */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
          <div>
            <img src={IMGS.fabrication} alt="Custom fixture manufacturing" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          </div>
          <div>
            <SectionNum n="04" />
            <Label>Custom Manufacturing</Label>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 32, lineHeight: 1.1 }}>
              Three fixture types built to specification.
            </h2>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, marginBottom: 32 }}>
              The canopy entry condition on Building 2 required a fixture that didn't exist off-the-shelf. TouchStone designed and manufactured a low-profile recessed mount unit with a custom arm length and powder-coat finish matched to the building's architectural metal panels.
            </p>
            <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85 }}>
              The pathway fixtures were adapted from the TSC-P8 series with a modified head height and custom diffuser to reduce glare on the pedestrian level.
            </p>
          </div>
        </div>
      </section>

      {/* 05 INSTALLATION */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="05" />
          <Label>Installation</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 20, lineHeight: 1.1 }}>
            Executed in three phases to minimize property disruption.
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, maxWidth: 640, marginBottom: 64 }}>
            The installation was phased across three weekends to keep the property operational. Phase one addressed parking and perimeter, phase two covered walkways and entries, and phase three completed the facade uplighting on all four buildings.
          </p>
          <img src={IMGS.cityDusk} alt="Commercial campus lighting installation" style={{ width: '100%', aspectRatio: '21/8', objectFit: 'cover' }} />
        </div>
      </section>

      {/* 06 THE RESULT */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="06" />
          <Label>The Result</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 20, lineHeight: 1.1 }}>
            A campus that reads as a destination after dark.
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.85, maxWidth: 640, marginBottom: 72 }}>
            The completed lighting environment transformed the property. Tenants reported improved perceptions of safety and the architectural uplighting established a distinctive presence that sets the campus apart in the market.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
            <img src={IMGS.result1} alt="The Summit — night view after installation" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            <img src={IMGS.result2} alt="The Summit — illuminated entrance" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          </div>
          <div style={{ backgroundColor: T.bgB, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}` }}>
              {(['before', 'after'] as const).map(tab => (
                <button key={tab} onClick={() => setBeforeAfter(tab)} style={{ flex: 1, padding: '16px 0', fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: beforeAfter === tab ? T.label : T.faint, borderBottom: beforeAfter === tab ? `1px solid ${T.accent}` : '1px solid transparent', transition: 'color 0.2s', fontWeight: beforeAfter === tab ? 500 : 400 }}>
                  {tab === 'before' ? 'Before' : 'After'}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <img src={beforeAfter === 'before' ? IMGS.dayBefore : IMGS.result1} alt={beforeAfter === 'before' ? 'Before installation' : 'After installation'} style={{ width: '100%', aspectRatio: '21/8', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f0ede8', backgroundColor: 'rgba(15,14,12,0.6)', backdropFilter: 'blur(6px)', padding: '6px 12px' }}>
                {beforeAfter === 'before' ? '— Before' : '— After'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 PRODUCTS USED */}
      <section style={{ backgroundColor: T.bgB, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px' }}>
          <SectionNum n="07" />
          <Label>Products Used</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 2.5vw, 38px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 64, lineHeight: 1.1 }}>
            Fixture specifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {products.map((product, i) => (
              <div key={i} style={{ backgroundColor: T.bgA, padding: 32, border: `1px solid ${T.border}` }}>
                <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: T.bgC, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.faint }}>Product Image</div>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>{product.application}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: T.primary, marginBottom: 12, lineHeight: 1.3 }}>{product.name}</div>
                <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>{product.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: T.bgA, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 48px', textAlign: 'center' }}>
          <Label>Ready to Begin</Label>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.02em', color: T.primary, marginBottom: 24, lineHeight: 1.05 }}>
            PLANNING A COMMERCIAL PROJECT?
          </h2>
          <p style={{ fontSize: 15, color: T.secondary, maxWidth: 440, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Tell us about your property. We will help develop the right outdoor lighting solution.
          </p>
          <button
            onClick={() => setPage('contact')}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', backgroundColor: ctaH ? '#1a1917' : T.primary, color: '#faf9f7', padding: '14px 32px', border: 'none', transition: 'background-color 0.25s' }}
            onMouseEnter={() => setCtaH(true)}
            onMouseLeave={() => setCtaH(false)}
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  )
}
