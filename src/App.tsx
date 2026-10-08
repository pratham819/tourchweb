import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Manufacturing from './pages/Manufacturing'
import Contact from './pages/Contact'
import TiebreakExperience from './components/TiebreakExperience/TiebreakExperience'

export type Page = 'home' | 'projects' | 'project-detail' | 'manufacturing' | 'contact' | 'tiebreak'

export interface PageProps {
  setPage: (page: Page) => void
  navigateToProject?: (id: string) => void
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [currentProjectId, setCurrentProjectId] = useState<string>('the-summit')

  const navigate = (target: Page) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const navigateToProject = (id: string) => {
    setCurrentProjectId(id)
    setPage('project-detail')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Full-screen 3D WebGL tennis experience mode
  if (page === 'tiebreak') {
    return <TiebreakExperience onBackToSite={() => navigate('home')} />
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home setPage={navigate} navigateToProject={navigateToProject} />
      case 'projects': return <Projects setPage={navigate} navigateToProject={navigateToProject} />
      case 'project-detail': return <ProjectDetail setPage={navigate} navigateToProject={navigateToProject} projectId={currentProjectId} />
      case 'manufacturing': return <Manufacturing setPage={navigate} />
      case 'contact': return <Contact setPage={navigate} />
      default: return <Home setPage={navigate} navigateToProject={navigateToProject} />
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      <Nav page={page} setPage={navigate} navigateToProject={navigateToProject} />
      <main>{renderPage()}</main>
      <Footer setPage={navigate} />
    </div>
  )
}
