import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Projects from '../pages/Projects.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';
import Skills from '../pages/Skills.jsx';
import Contact from '../pages/Contact.jsx';
import Admin from '../admin/Admin.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:slug" element={<ProjectDetail />} />
      <Route path="skills" element={<Skills />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/admin/*" element={<Admin />} />
  </Routes>;
}
