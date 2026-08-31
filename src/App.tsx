import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sounds from './pages/Sounds'
import Archives from './pages/Archives'
import Installations from './pages/Installations'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      {!isHome && <Navbar />}
      <main
        className={`flex-1 max-w-6xl mx-auto w-full px-6 md:px-10 ${
          isHome ? '' : 'pt-24 pb-16'
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sounds" element={<Sounds />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/installations" element={<Installations />} />
          <Route path="/installations/:slug" element={<ProjectDetail />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  )
}
