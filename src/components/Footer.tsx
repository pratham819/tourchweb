import { type Page } from '../App'
import TouchStoneLogo from './TouchStoneLogo'

interface FooterProps {
  setPage: (page: Page) => void
}

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer style={{ backgroundColor: '#f0ede8', borderTop: '1px solid rgba(15,14,12,0.1)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 48, marginBottom: 80 }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <TouchStoneLogo variant="light" height={26} />
            </div>
            <p style={{ fontSize: 13, color: 'rgba(15,14,12,0.65)', lineHeight: 1.7, maxWidth: 280 }}>
              U.S.-made commercial low-voltage LED luminaires for hotels, corporate campuses, multifamily developments, and healthcare facilities. Engineered in Minnesota.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,14,12,0.4)', marginBottom: 20 }}>
              Services
            </div>
            {['Commercial Lighting', 'Custom Manufacturing', 'Lighting Design', 'Professional Installation', 'Technology Planning'].map(item => (
              <button
                key={item}
                onClick={() => setPage('home')}
                style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(15,14,12,0.55)', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#0f0e0c')}
                onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = 'rgba(15,14,12,0.55)')}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,14,12,0.4)', marginBottom: 20 }}>
              Company
            </div>
            {[
              { label: 'Projects', page: 'projects' as Page },
              { label: 'Custom Manufacturing', page: 'manufacturing' as Page },
              { label: 'Our Technology', page: 'manufacturing' as Page },
              { label: '🎾 3D Court Lab', page: 'tiebreak' as Page },
              { label: 'Start Your Project', page: 'contact' as Page },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => setPage(page)}
                style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(15,14,12,0.55)', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#0f0e0c')}
                onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = 'rgba(15,14,12,0.55)')}
              >
                {label}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,14,12,0.4)', marginBottom: 20 }}>
              Contact
            </div>
            <p style={{ fontSize: 13, color: 'rgba(15,14,12,0.6)', lineHeight: 1.9, marginBottom: 6 }}>
              Minnesota & Surrounding Region<br />
              Commercial Projects Only
            </p>
            <p style={{ fontSize: 13, color: 'rgba(15,14,12,0.55)', lineHeight: 1.7, marginBottom: 24 }}>
              For residential lighting visit{' '}
              <a
                href="https://touchstonelights.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#7a5a20', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                touchstonelights.com
              </a>
            </p>
            <button
              onClick={() => setPage('contact')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f0e0c', background: 'none', border: '1px solid rgba(15,14,12,0.5)', cursor: 'pointer', padding: '10px 20px', transition: 'all 0.25s' }}
              onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = '#0f0e0c'; b.style.color = '#faf9f7' }}
              onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = 'transparent'; b.style.color = '#0f0e0c' }}
            >
              Start Your Project
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(15,14,12,0.12)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(15,14,12,0.4)', letterSpacing: '0.05em' }}>
            © 2025 TouchStone Commercial. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(15,14,12,0.4)', letterSpacing: '0.05em' }}>
            Commercial Outdoor Lighting · Minnesota
          </p>
        </div>
      </div>
    </footer>
  )
}
