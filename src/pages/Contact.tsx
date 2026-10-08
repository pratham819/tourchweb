import { useState } from 'react'
import { type PageProps } from '../App'

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

const projectTypes = ['Multifamily', 'Hospitality', 'Retail', 'Office', 'Medical', 'Commercial Campus', 'Other']
const projectStages = ['Planning', 'Design', 'Under Construction', 'Existing Property / Upgrade']

const credibilityItems = [
  { label: 'Commercial Lighting', desc: 'Outdoor lighting designed for commercial properties of every type and scale.' },
  { label: 'Custom Manufacturing', desc: 'Fixtures built around the requirements of your project — not the other way around.' },
  { label: 'Lighting Design', desc: 'A complete design and planning process using our proprietary iPad application.' },
  { label: 'Professional Installation', desc: 'End-to-end installation by an experienced commercial lighting team.' },
]

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 8 }}>
      {children}
    </label>
  )
}

function InputField({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%', boxSizing: 'border-box',
          backgroundColor: T.bgB,
          border: `1px solid ${focused ? T.accent : T.border}`,
          color: T.primary,
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          padding: '13px 16px', outline: 'none', transition: 'border-color 0.2s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        style={{
          width: '100%', boxSizing: 'border-box',
          backgroundColor: T.bgB,
          border: `1px solid ${focused ? T.accent : T.border}`,
          color: T.primary,
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          padding: '13px 16px', outline: 'none', transition: 'border-color 0.2s',
          appearance: 'none', cursor: 'pointer',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(15,14,12,0.4)' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        defaultValue=""
      >
        <option value="" disabled>Select...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

export default function Contact({ setPage: _setPage }: PageProps) {
  const [submitted, setSubmitted] = useState(false)
  const [descFocused, setDescFocused] = useState(false)
  const [uploadHover, setUploadHover] = useState(false)
  const [submitHover, setSubmitHover] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ paddingTop: 104 }}>
      {/* HEADER */}
      <section style={{ backgroundColor: T.bgB, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 48px 80px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.label, marginBottom: 24 }}>
            Start Your Project
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: T.primary, margin: 0 }}>
              LET'S TALK ABOUT<br />YOUR PROJECT.
            </h1>
            <p style={{ fontSize: 16, color: T.secondary, lineHeight: 1.8, marginBottom: 4 }}>
              Tell us about your commercial property and what you are looking to achieve. Our team will review the project and help determine the right lighting approach.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section style={{ backgroundColor: T.bgA }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 48px 120px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 80, alignItems: 'start' }}>

          {submitted ? (
            <div style={{ padding: '80px 0' }}>
              <div style={{ width: 48, height: 1, backgroundColor: T.accent, marginBottom: 32 }} />
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 40, letterSpacing: '-0.02em', color: T.primary, marginBottom: 20 }}>
                Project Received.
              </h2>
              <p style={{ fontSize: 15, color: T.secondary, lineHeight: 1.8, maxWidth: 440 }}>
                Thank you for reaching out. A member of the TouchStone team will review your project and be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <InputField label="Name" placeholder="Full name" />
                <InputField label="Company" placeholder="Company or organization" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <InputField label="Email" type="email" placeholder="Email address" />
                <InputField label="Phone" type="tel" placeholder="Phone number" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <SelectField label="Project Type" options={projectTypes} />
                <SelectField label="Project Stage" options={projectStages} />
              </div>
              <InputField label="Project Location" placeholder="City, State" />
              <div>
                <FieldLabel>Project Description</FieldLabel>
                <textarea
                  rows={6}
                  placeholder="Describe your project, property, and what you are looking to achieve with outdoor lighting..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    backgroundColor: T.bgB,
                    border: `1px solid ${descFocused ? T.accent : T.border}`,
                    color: T.primary,
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    padding: '13px 16px', outline: 'none', transition: 'border-color 0.2s',
                    resize: 'vertical', lineHeight: 1.7,
                  }}
                  onFocus={() => setDescFocused(true)}
                  onBlur={() => setDescFocused(false)}
                />
              </div>
              <div>
                <FieldLabel>Upload Plans or Photos (optional)</FieldLabel>
                <div
                  style={{
                    border: `1px dashed ${uploadHover ? T.accent : T.border}`,
                    padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
                    backgroundColor: uploadHover ? 'rgba(201,169,110,0.04)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={() => setUploadHover(true)}
                  onMouseLeave={() => setUploadHover(false)}
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                    Drag files here or <span style={{ color: T.label, cursor: 'pointer', textDecoration: 'underline' }}>browse</span><br />
                    <span style={{ fontSize: 11, color: T.faint }}>PDF, JPG, PNG — up to 20MB</span>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 8 }}>
                <button
                  type="submit"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', backgroundColor: submitHover ? '#e4e0d7' : '#f0ede8', color: '#111111', padding: '16px 40px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 9999, transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  onMouseEnter={() => setSubmitHover(true)}
                  onMouseLeave={() => setSubmitHover(false)}
                >
                  Submit Project
                </button>
                <p style={{ fontSize: 11, color: T.faint, marginTop: 16, lineHeight: 1.6 }}>
                  We respond to all commercial project inquiries within one business day.
                </p>
              </div>
            </form>
          )}

          {/* SIDEBAR */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 28 }}>
                What We Provide
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {credibilityItems.map((item, i) => (
                  <div key={i} style={{ padding: '22px 0', borderBottom: i < credibilityItems.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ width: 4, height: 4, backgroundColor: T.accent, flexShrink: 0, marginTop: 6 }} />
                      <div>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: T.primary, marginBottom: 5 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.75 }}>{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: T.bgC, padding: 32, borderLeft: `2px solid rgba(201,169,110,0.5)` }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.faint, marginBottom: 14 }}>
                Service Area
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: T.primary, marginBottom: 10 }}>
                Minnesota & Surrounding Region
              </div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.75, marginBottom: 12 }}>
                Commercial projects only.
              </div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.75 }}>
                For residential lighting visit{' '}
                <a
                  href="https://touchstonelights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: T.label, textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  touchstonelights.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
