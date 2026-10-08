import spotNight from '../imports/16A98159-12D6-4B10-B1A2-A5094D1A552A.png.png'
import stepInstalled from '../imports/2B126419-9A3F-4515-8DA3-40865A098C5E.png.png'
import stepProduct from '../imports/562DE9A9-88F3-4D1A-80EC-94BB6738F236.png.png'
import bollardNight from '../imports/nightime_bollard.png.png'
import shadowBollardImg from '../imports/shadownight.png.png'
import tubelleImg from '../imports/tubelle_night.jpg'

export interface FixtureDef {
  id: string
  name: string
  series: string
  application: string
  desc: string
  img: string
  imgAlt: string
  productImg?: string
}

export const FIXTURES: Record<string, FixtureDef> = {
  bollard: {
    id: 'bollard',
    name: 'Bollard Commercial Series',
    series: '360° Radial Pathway Series',
    application: 'Campus Perimeter & Amenity Pathways',
    desc: 'Heavy-gauge extruded aluminum cylindrical louvered bollard for commercial pathway and perimeter applications. Provides balanced 360° radial downlight with internal anti-glare louvers. IP65 rated.',
    img: bollardNight,
    imgAlt: 'TouchStone Bollard Commercial Series installed at commercial campus at dusk',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/bollard.png?v=1772058270',
  },
  spotlight: {
    id: 'spotlight',
    name: 'Commander Commercial Series',
    series: 'Directional Spot & Uplighting',
    application: 'Architectural Facade & Specimen Tree Uplighting',
    desc: 'Heavy-duty solid cast brass and aluminum directional luminaire. Features 360-degree rotational knuckle, high-temp silicone O-ring sealing, and glare-shielding cowl for precise beam direction.',
    img: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/commanderlightnight.png?v=1772165548',
    imgAlt: 'TouchStone Commander Commercial Series fixture illuminating landscape canopy at night',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/maincommanderlight.png?v=1781284386',
  },
  stepLight: {
    id: 'stepLight',
    name: 'Micro Bullet Series – Paver Mount',
    series: 'Flush Hardscape & Step Series',
    application: 'Commercial Masonry, Retaining Walls & Step Risers',
    desc: 'Drive-over and walk-over rated flush recessed luminaire with solid brass square flat bezel. Recesses seamlessly into retaining walls, granite steps, and commercial walking decks.',
    img: stepInstalled,
    imgAlt: 'TouchStone Micro Bullet paver fixture installed in masonry step riser at night',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/D484AC3D-7C5D-4BDF-9380-0CBF61E7BE5E.png?v=1781277825',
  },
  stepProduct: {
    id: 'stepProduct',
    name: 'Micro Bullet Series – WallMount HalfMoon',
    series: 'Surface Hardscape Series',
    application: 'Entry Steps & Hardscape Perimeter',
    desc: 'Low-profile half-moon eyelid step light preventing upward light trespass while providing smooth forward floor grazing. Machined brass housing with high-output low-voltage LED.',
    img: stepProduct,
    imgAlt: 'TouchStone Micro Bullet HalfMoon step fixture product photograph',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/562DE9A9-88F3-4D1A-80EC-94BB6738F236.png?v=1781277838',
  },
  shadowBollard: {
    id: 'shadowBollard',
    name: 'Shadow Bollard Commercial Series',
    series: 'Architectural Corten Heritage Series',
    application: 'Decorative Plaza, Hotel Entry & Terrace Illumination',
    desc: 'Genuine A606 Corten weathering steel bollard precision laser-cut with architectural patterns that project dramatic geometric light silhouettes across paving surfaces.',
    img: shadowBollardImg,
    imgAlt: 'TouchStone Shadow Bollard Commercial Series installed in plaza casting geometric shadows at dusk',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/shadowbollardmain.png?v=1772168478',
  },
  tubelle: {
    id: 'tubelle',
    name: 'Tubelle Commercial Series',
    series: 'Pedestrian Pathway Series',
    application: 'Curved Walkways & Commercial Pedestrian Paths',
    desc: 'Sleek angled pedestrian luminaire engineered for glare-free 180° forward path throw. Billet aluminum construction with marine-grade powder coat designed for zero light trespass.',
    img: tubelleImg,
    imgAlt: 'TouchStone Tubelle Commercial Series fixtures installed along curved walkway at night',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/253E299C-72F1-4F33-8561-FF384E96CE6B.png?v=1781277838',
  },
  tubesconce: {
    id: 'tubesconce',
    name: 'TubeSconce – Dual Direction',
    series: 'Architectural Facade Sconce Series',
    application: 'Commercial Entry Portals & Perimeter Wall Grazing',
    desc: 'Bi-directional up/down architectural wall sconce. Delivers dramatic vertical grazing columns on masonry, stone, and wood siding with independently sealed optical chambers.',
    img: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/tubesconcenighttime.png?v=1773088572',
    imgAlt: 'TouchStone TubeSconce Dual Direction illuminating exterior facade columns at night',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/0B6E5847-A92E-424D-9407-32E59E293E0D.png?v=1781277826',
  },
  maxwell: {
    id: 'maxwell',
    name: 'Maxwell Heavy Duty 11 Commercial Series',
    series: 'High-Output Accent Series',
    application: 'Commercial Facade & Multi-Story Canopy Lighting',
    desc: 'Cast brass high-lumen accent luminaire built for severe institutional environments with anti-reflective tempered optical glass and interchangeable beam distributions.',
    img: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/80D467BC-8E61-4627-A102-360774120C36.png?v=1785264632',
    imgAlt: 'TouchStone Maxwell Heavy Duty luminaire in commercial setting',
    productImg: 'https://cdn.shopify.com/s/files/1/0705/3780/6006/files/maxwell_black.png?v=1772146797',
  },
}

export interface Project {
  id: string
  name: string
  subtitle: string
  type: string
  location: string
  scope: string
  services: string
  heroImg: string
  resultImg: string
  resultImg2: string
  challenge: string[]
  approach: string[]
  objectives: string[]
  resultText: string[]
  stats: { label: string; value: string }[]
  fixtureIds: string[]
  installationNote: string
}

const UNSPLASH = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

export const PROJECTS: Project[] = [
  {
    id: 'the-summit',
    name: 'The Summit',
    subtitle: 'Commercial Campus · Eden Prairie, MN',
    type: 'Commercial Campus',
    location: 'Eden Prairie, MN',
    scope: 'Full Exterior Lighting',
    services: 'Design · Manufacture · Install',
    heroImg: UNSPLASH('1769971361536-d7d69715a9c2', 1920, 1080),
    resultImg: UNSPLASH('1772289767405-69513d023448'),
    resultImg2: UNSPLASH('1785910723802-99967d4fa265'),
    challenge: [
      'The Summit is a 4-building commercial campus in Eden Prairie with inconsistent exterior lighting across all structures and surface areas. Some zones were over-lit with harsh industrial fixtures while others were left entirely dark, creating safety concerns and a poor arrival experience.',
      'The property management team needed a unified strategy that addressed safety, wayfinding, architectural character, and energy performance — without shutting down operations during installation.',
    ],
    objectives: [
      'Unified lighting approach across all four buildings',
      'Improved pedestrian safety and wayfinding',
      'Architectural character for evening presence',
      'Dark-sky compliant parking area lighting',
      'Custom fixture solutions for unique canopy mounting conditions',
    ],
    approach: [
      'TouchStone conducted a full property walkthrough mapping every zone — parking fields, pedestrian paths, building entries, and facade elevations. Each area was evaluated for current light levels, safety requirements, and aesthetic opportunity.',
      'The lighting strategy was developed zone by zone before any product was specified. The iPad planning application was used to map all 28 fixture positions and share the complete plan with the client for review prior to procurement.',
    ],
    resultText: [
      'The completed lighting environment transformed the campus. Tenants reported improved perceptions of safety and arrival experience. The architectural uplighting and Heritage Bollard plaza fixtures established a distinctive evening presence that sets the property apart in the submarket.',
    ],
    stats: [
      { label: 'Fixture Count', value: '28 units' },
      { label: 'Zones Mapped', value: '6 zones' },
      { label: 'Plan Revisions', value: '2 reviews' },
      { label: 'Coverage Area', value: '4.2 acres' },
    ],
    fixtureIds: ['bollard', 'spotlight', 'stepLight', 'shadowBollard'],
    installationNote: 'Phased across three weekends to maintain full property operation. Phase one: parking and perimeter. Phase two: walkways and entries. Phase three: facade uplighting.',
  },
  {
    id: 'riverside-commons',
    name: 'Riverside Commons',
    subtitle: 'Multifamily Development · Plymouth, MN',
    type: 'Multifamily Development',
    location: 'Plymouth, MN',
    scope: 'Amenity, Entry & Perimeter Lighting',
    services: 'Design · Installation',
    heroImg: UNSPLASH('1571440727633-ca6b05da2008', 1920, 1080),
    resultImg: UNSPLASH('1765665017478-f10e88f8b85f'),
    resultImg2: UNSPLASH('1766164185798-d6e7eb23a131'),
    challenge: [
      'Riverside Commons is a 220-unit multifamily development in Plymouth. The property\'s original lighting specification was value-engineered during construction, leaving amenity courtyards underlit, walkway paths dark after sunset, and the main entry lacking any architectural presence.',
      'Residents had raised safety concerns about the perimeter path and garage approach. The property owner needed a solution that improved resident satisfaction, safety, and the property\'s competitive positioning — on a defined budget.',
    ],
    objectives: [
      'Safe, well-lit pedestrian paths throughout the property',
      'Improved amenity courtyard lighting for evening use',
      'Distinctive entry presence visible from the street',
      'Perimeter security lighting along the parking structure',
      'Low maintenance fixtures with long-cycle performance',
    ],
    approach: [
      'The property was mapped in the TouchStone iPad application with particular attention to pedestrian flow — from parking structure to each building entry and through the central amenity courtyard. Fixture spacing was calculated for consistent 0.5fc path illumination throughout.',
      'The Slim Path Bollard was selected for the curved walkway network due to its low-profile and directional output that keeps light on the path surface rather than spilling into adjacent units. Heritage Bollards were specified for the central amenity courtyard as a design feature.',
    ],
    resultText: [
      'Resident satisfaction scores for property safety increased following installation. The amenity courtyard became an actively used evening space. The defined entry sequence — path lighting from street to lobby — elevated the property\'s arrival experience and supported leasing differentiation.',
    ],
    stats: [
      { label: 'Fixture Count', value: '34 units' },
      { label: 'Zones Mapped', value: '5 zones' },
      { label: 'Plan Revisions', value: '1 review' },
      { label: 'Property Size', value: '220 units' },
    ],
    fixtureIds: ['tubelle', 'spotlight', 'shadowBollard', 'bollard'],
    installationNote: 'Single-phase weekend installation. All conduit routed below existing hardscape using directional boring to avoid surface disruption to landscaping and pavers.',
  },
  {
    id: 'the-grand-marquette',
    name: 'The Grand Marquette',
    subtitle: 'Hospitality Property · Bloomington, MN',
    type: 'Hospitality Property',
    location: 'Bloomington, MN',
    scope: 'Full Exterior Lighting & Porte-Cochère',
    services: 'Design · Custom Manufacturing · Install',
    heroImg: UNSPLASH('1785910723802-99967d4fa265', 1920, 1080),
    resultImg: UNSPLASH('1766164185798-d6e7eb23a131'),
    resultImg2: UNSPLASH('1769971361536-d7d69715a9c2'),
    challenge: [
      'The Grand Marquette is a full-service hotel in Bloomington requiring a complete exterior lighting redesign ahead of a brand repositioning. The existing lighting was inconsistent with the new interior direction — utilitarian fixtures conflicted with the premium guest experience the ownership group was investing in.',
      'The porte-cochère entry presented a specific challenge: the existing fixtures were mounted in a custom soffit condition that no standard product could address without significant structural modification.',
    ],
    objectives: [
      'Premium arrival sequence from street to lobby entry',
      'Unified lighting across porte-cochère, pool deck, and landscape',
      'Custom fixture solution for non-standard porte-cochère soffit',
      'Warm color temperature consistent with interior design direction',
      'Minimize fixture visibility during daylight hours',
    ],
    approach: [
      'TouchStone developed the lighting concept in collaboration with the hotel\'s interior design team, establishing a consistent warm 2700K palette throughout all exterior zones. The iPad plan was shared with both the ownership group and the design team to align expectations before specification.',
      'The porte-cochère soffit required a custom-manufactured recessed fixture with a modified arm length and bronze finish matched to the interior metalwork. TouchStone fabricated four units to specification — no structural modification required.',
    ],
    resultText: [
      'The completed exterior lighting concept elevated the property\'s arrival experience and brought the exterior visual language into alignment with the brand repositioning. The custom porte-cochère fixtures became a distinguishing detail that guests and reviewers consistently noted.',
    ],
    stats: [
      { label: 'Fixture Count', value: '41 units' },
      { label: 'Zones Mapped', value: '7 zones' },
      { label: 'Custom Units', value: '4 units' },
      { label: 'Color Temp', value: '2700K' },
    ],
    fixtureIds: ['shadowBollard', 'stepLight', 'bollard', 'spotlight'],
    installationNote: 'Installation coordinated with hotel operations to avoid impact on guest experience. All work completed between 10pm and 6am across four evenings.',
  },
  {
    id: 'northfield-crossing',
    name: 'Northfield Crossing',
    subtitle: 'Mixed-Use Retail · Maple Grove, MN',
    type: 'Mixed-Use Retail',
    location: 'Maple Grove, MN',
    scope: 'Parking, Signage & Facade Lighting',
    services: 'Design · Installation',
    heroImg: UNSPLASH('1785736098735-51909a463903', 1920, 1080),
    resultImg: UNSPLASH('1780147328887-5e214beaeaca'),
    resultImg2: UNSPLASH('1770234895407-27d41a860541'),
    challenge: [
      'Northfield Crossing is a 140,000 sq ft mixed-use retail center in Maple Grove. A combination of aging parking lot luminaires, inconsistent facade lighting, and poorly lit pedestrian connections between buildings created a safety and aesthetic problem that was affecting tenant retention conversations.',
      'The property management company needed a complete re-specification that improved safety, met current dark-sky ordinance requirements, and created a more premium evening presence — without a full parking lot reconstruction.',
    ],
    objectives: [
      'Dark-sky compliant parking area re-lamping',
      'Consistent pedestrian path lighting between buildings',
      'Facade accent lighting for anchor tenants',
      'Signage area illumination at all entry points',
      'Reduced energy consumption vs. existing system',
    ],
    approach: [
      'The property was assessed at night — unusual in the industry — to document actual light levels across the site before any recommendation was made. This gave TouchStone a precise picture of where the gaps and over-lit zones were relative to the ordinance requirements.',
      'The Slim Path Bollard network was designed to connect all pedestrian routes between the building clusters. Landscape Spotlights were positioned to illuminate the anchor tenant signage and entry feature planting from grade.',
    ],
    resultText: [
      'Energy consumption from exterior lighting was reduced by an estimated 38% compared to the previous system. Tenant feedback on the improved evening atmosphere was immediate, and two renewal conversations that had stalled were completed within 60 days of the lighting installation.',
    ],
    stats: [
      { label: 'Fixture Count', value: '52 units' },
      { label: 'Property Size', value: '140,000 sq ft' },
      { label: 'Energy Reduction', value: '~38%' },
      { label: 'Zones Mapped', value: '8 zones' },
    ],
    fixtureIds: ['tubelle', 'bollard', 'spotlight', 'stepProduct'],
    installationNote: 'Full installation completed across two weeks. Existing conduit infrastructure was reused where feasible to reduce cost. All new fixtures were dark-sky certified.',
  },
  {
    id: 'highland-plaza',
    name: 'Highland Civic Plaza',
    subtitle: 'Public Realm & Parks · St. Paul, MN',
    type: 'Public Realm & Parks',
    location: 'St. Paul, MN',
    scope: 'Civic Gathering & Path Illumination',
    services: 'Design · Engineering · Manufacture',
    heroImg: UNSPLASH('1770234895407-27d41a860541', 1920, 1080),
    resultImg: UNSPLASH('1769971361536-d7d69715a9c2'),
    resultImg2: UNSPLASH('1785736098735-51909a463903'),
    challenge: [
      'Highland Civic Plaza required high-visibility pedestrian illumination that met stringent municipal dark-sky regulations while maintaining welcoming warmth for evening public events.',
      'The municipal park district required vandal-resistant solid brass and marine-grade fixtures that could withstand harsh Minnesota freeze-thaw cycles without degradation.',
    ],
    objectives: [
      'Dark-sky certified pedestrian illumination',
      'High impact resistance and anti-tamper hardware',
      'Warm 2700K color rendering for public gathering',
      'Zero maintenance optical enclosures',
    ],
    approach: [
      'TouchStone engineered heavy-gauge cylindrical bollards with internal anti-glare louvers to direct 100% of lumen output down onto walking surfaces.',
      'All fixture positions were mapped with iPad photometrics to ensure continuous safe footing throughout the plaza perimeter.',
    ],
    resultText: [
      'Evening foot traffic increased by 45% in the months following completion, with zero reported fixture damage or outages through winter operations.',
    ],
    stats: [
      { label: 'Fixture Count', value: '38 units' },
      { label: 'Coverage Area', value: '3.1 acres' },
      { label: 'CRI Rating', value: '95+' },
      { label: 'Warranty', value: '10-Year Commercial' },
    ],
    fixtureIds: ['bollard', 'shadowBollard', 'stepLight'],
    installationNote: 'Installed in coordination with city public works departments during off-peak morning hours.',
  },
  {
    id: 'wayzata-bay-club',
    name: 'Wayzata Bay Club',
    subtitle: 'Private Hospitality · Wayzata, MN',
    type: 'Private Hospitality',
    location: 'Wayzata, MN',
    scope: 'Waterfront Promenade & Facade Illumination',
    services: 'Design · Custom Fabrication · Installation',
    heroImg: UNSPLASH('1766164185798-d6e7eb23a131', 1920, 1080),
    resultImg: UNSPLASH('1785910723802-99967d4fa265'),
    resultImg2: UNSPLASH('1772289767405-69513d023448'),
    challenge: [
      'A private waterfront clubhouse with strict aesthetic standards needed illumination for dock approaches, dining terraces, and exterior timber architecture without glare reflecting on the lake surface.',
      'Corrosive humidity from the lakefront required marine-grade alloys and customized bronze patinas.',
    ],
    objectives: [
      'Zero glare toward the lake shoreline',
      'Architectural timber grazing with 2700K warm LED optics',
      'Custom weathered bronze finish matching existing hardware',
      'Smart zone control for evening private dining',
    ],
    approach: [
      'TouchStone custom-patinated solid brass luminaires to harmonize with the timber exterior and specified deeply recessed optics.',
      'Bollards along the lake promenade cast radial downward pools of warm illumination without upward spill.',
    ],
    resultText: [
      'The installation created a warm, intimate evening atmosphere praised by club members and management alike.',
    ],
    stats: [
      { label: 'Fixture Count', value: '29 units' },
      { label: 'Custom Finishes', value: 'Weathered Bronze' },
      { label: 'Zones', value: '4 Dimming Zones' },
      { label: 'Color Temp', value: '2700K Warm' },
    ],
    fixtureIds: ['shadowBollard', 'tubesconce', 'spotlight'],
    installationNote: 'Finished during pre-season dock refitting with specialized marine conduit runs.',
  },
]

export const getProject = (id: string): Project | undefined =>
  PROJECTS.find(p => p.id === id)

