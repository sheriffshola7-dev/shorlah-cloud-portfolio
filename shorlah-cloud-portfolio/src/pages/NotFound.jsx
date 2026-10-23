import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
export default function NotFound(){return <div className="container inner-page not-found"><div className="eyebrow">404 · PAGE NOT FOUND</div><h1 className="page-title">Looks like this page <span className="gradient-text">took a different route.</span></h1><p className="page-intro">The link may be outdated, or the page may have moved.</p><Link className="btn btn-primary" to="/"><ArrowLeft size={17}/> Back to home</Link></div>}
