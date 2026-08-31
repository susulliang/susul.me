import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sounds from './pages/Sounds'
import Archives from './pages/Archives'
import Installations from './pages/Installations'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/installations/:slug" element={<ProjectDetail />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
