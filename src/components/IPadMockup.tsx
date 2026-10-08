export default function IPadMockup({ width = 460 }: { width?: number }) {
  const height = width * 1.35
  const frameR = width * 0.065
  const bezelTop = height * 0.06
  const bezelSide = width * 0.028
  const bezelBottom = height * 0.06
  const screenW = width - bezelSide * 2
  const screenH = height - bezelTop - bezelBottom

  return (
    <div
      style={{
        width,
        height,
        borderRadius: frameR,
        backgroundColor: '#1c1c1e',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 60px 120px rgba(0,0,0,0.9), 0 20px 40px rgba(0,0,0,0.6)',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: -4,
          transform: 'translateY(-50%)',
          width: 4,
          height: width * 0.12,
          backgroundColor: '#2a2a2c',
          borderRadius: '0 2px 2px 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: bezelTop * 0.45,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#2a2a2c',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: bezelTop,
          left: bezelSide,
          width: screenW,
          height: screenH,
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#d8e2ec',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 520"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <rect width="400" height="520" fill="#d8e2ec" />

          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 24} x2="400" y2={i * 24} stroke="#c0cdd8" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="520" stroke="#c0cdd8" strokeWidth="0.5" />
          ))}

          <rect x="18" y="30" width="364" height="460" fill="none" stroke="#98aab8" strokeWidth="1" strokeDasharray="5 4" />

          <rect x="70" y="100" width="220" height="150" fill="#b4bfcc" stroke="#8496a6" strokeWidth="1.5" />
          <text x="180" y="180" textAnchor="middle" fill="#3a4a5a" fontSize="9" fontWeight="600">SUMMIT CAMPUS</text>
          <text x="180" y="194" textAnchor="middle" fill="#4a5a6a" fontSize="7">MAIN BUILDING</text>

          <rect x="70" y="298" width="110" height="72" fill="#b4bfcc" stroke="#8496a6" strokeWidth="1" />
          <text x="125" y="338" textAnchor="middle" fill="#4a5a6a" fontSize="7">CONFERENCE</text>
          <text x="125" y="350" textAnchor="middle" fill="#4a5a6a" fontSize="7">ANNEX</text>

          <rect x="224" y="298" width="134" height="108" fill="#c2ccd4" stroke="#8496a6" strokeWidth="0.75" />
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`ps${i}`} x1={244 + i * 20} y1="303" x2={244 + i * 20} y2="400" stroke="#9aaab8" strokeWidth="0.5" />
          ))}
          <text x="291" y="355" textAnchor="middle" fill="#6a7a8a" fontSize="7.5">PARKING</text>

          <rect x="164" y="30" width="36" height="70" fill="#cad4dc" />
          <line x1="182" y1="30" x2="182" y2="100" stroke="#a8b8c4" strokeWidth="9" />

          <rect x="18" y="172" width="52" height="22" fill="#cad4dc" />
          <rect x="330" y="172" width="52" height="22" fill="#cad4dc" />
          <rect x="18" y="380" width="200" height="22" fill="#cad4dc" />

          <ellipse cx="42" cy="148" rx="20" ry="32" fill="#96b896" opacity="0.65" />
          <ellipse cx="348" cy="148" rx="20" ry="32" fill="#96b896" opacity="0.65" />
          <ellipse cx="40" cy="360" rx="18" ry="22" fill="#96b896" opacity="0.65" />
          <ellipse cx="350" cy="360" rx="14" ry="18" fill="#96b896" opacity="0.65" />

          {[148, 200].map(x => (
            <g key={`e${x}`}>
              <circle cx={x} cy="92" r="14" fill="#c9a96e" opacity="0.18" />
              <circle cx={x} cy="92" r="7" fill="#c9a96e" opacity="0.35" />
              <circle cx={x} cy="92" r="3.5" fill="#c9a96e" />
            </g>
          ))}

          {[0, 1, 2, 3, 4].map(i => (
            <g key={`lp${i}`}>
              <circle cx="32" cy={116 + i * 30} r="9" fill="#c9a96e" opacity="0.18" />
              <circle cx="32" cy={116 + i * 30} r="4.5" fill="#c9a96e" opacity="0.35" />
              <circle cx="32" cy={116 + i * 30} r="2.5" fill="#c9a96e" />
            </g>
          ))}

          {[0, 1, 2, 3, 4].map(i => (
            <g key={`rp${i}`}>
              <circle cx="362" cy={116 + i * 30} r="9" fill="#c9a96e" opacity="0.18" />
              <circle cx="362" cy={116 + i * 30} r="4.5" fill="#c9a96e" opacity="0.35" />
              <circle cx="362" cy={116 + i * 30} r="2.5" fill="#c9a96e" />
            </g>
          ))}

          {[86, 120, 156, 190, 230, 268].map(x => (
            <g key={`ul${x}`}>
              <circle cx={x} cy="100" r="5.5" fill="#c9a96e" opacity="0.35" />
              <circle cx={x} cy="100" r="2.5" fill="#c9a96e" />
            </g>
          ))}

          {[244, 282, 320, 346].map((x, i) => (
            <g key={`pk${i}`}>
              <circle cx={x} cy="310" r="10" fill="#c9a96e" opacity="0.2" />
              <circle cx={x} cy="310" r="5" fill="#c9a96e" opacity="0.38" />
              <circle cx={x} cy="310" r="2.5" fill="#c9a96e" />
            </g>
          ))}

          {[40, 90, 140, 200, 260, 320, 360].map(x => (
            <g key={`wp${x}`}>
              <circle cx={x} cy="390" r="6" fill="#c9a96e" opacity="0.28" />
              <circle cx={x} cy="390" r="2.5" fill="#c9a96e" opacity="0.5" />
              <circle cx={x} cy="390" r="1.5" fill="#c9a96e" />
            </g>
          ))}

          <rect x="20" y="440" width="130" height="56" fill="white" opacity="0.7" rx="2" />
          <text x="28" y="456" fill="#2a3a4a" fontSize="7.5" fontWeight="600">FIXTURE LEGEND</text>
          <circle cx="30" cy="469" r="4" fill="#c9a96e" />
          <text x="38" y="472" fill="#3a4a5a" fontSize="6.5">Pathway / Area Light</text>
          <circle cx="30" cy="482" r="3.5" fill="#c9a96e" opacity="0.6" />
          <text x="38" y="485" fill="#3a4a5a" fontSize="6.5">Architectural Uplight</text>
          <circle cx="30" cy="494" r="3" fill="#c9a96e" opacity="0.4" />
          <text x="38" y="497" fill="#3a4a5a" fontSize="6.5">Parking Area Light</text>

          <rect x="200" y="440" width="180" height="56" fill="white" opacity="0.7" rx="2" />
          <text x="208" y="456" fill="#2a3a4a" fontSize="7.5" fontWeight="600">THE SUMMIT CAMPUS</text>
          <text x="208" y="468" fill="#4a5a6a" fontSize="6.5">Project: PLN-2024-0847</text>
          <text x="208" y="480" fill="#4a5a6a" fontSize="6.5">Total Fixtures: 28 units</text>
          <text x="208" y="492" fill="#c9a96e" fontSize="6.5" fontWeight="600">LIGHTING PLAN · Rev 2.1</text>

          <rect x="18" y="30" width="80" height="20" fill="white" opacity="0.55" rx="1" />
          <text x="24" y="44" fill="#2a3a4a" fontSize="7" fontWeight="500">TouchStone Commercial</text>
        </svg>
      </div>
    </div>
  )
}
