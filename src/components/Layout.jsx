import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, UserRound, FolderOpen, Code2, Mail, Menu, X, ArrowUpRight, Link2, Instagram, Linkedin, Github, Youtube, Facebook, Globe } from 'lucide-react';
import { supabase } from '../lib/supabaseClient.js';

const EMAIL = 'shorlayteam@gmail.com';
const socialIcons={Instagram,LinkedIn:Linkedin,GitHub:Github,YouTube:Youtube,Facebook,Website:Globe,Other:Link2};
function SocialIcon({item,size=17}){const Icon=socialIcons[item.icon]||Link2;const badge=['TikTok','X','WhatsApp'].includes(item.platform);return badge?<span className="social-text-icon" aria-hidden="true">{item.platform==='WhatsApp'?'WA':item.platform==='TikTok'?'♪':'X'}</span>:<Icon size={size}/>;}
const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/about', label: 'About', icon: UserRound },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/skills', label: 'Skills', icon: Code2 },
  { to: '/contact', label: 'Contact', icon: Mail },
];
function Brand() { return <NavLink to="/" className="brand" aria-label="Shorlah Cloud home"><img className="brand-logo" src="/shorlah-cloud-logo.png" alt="" /><span><b className="brand-name">Shorlah Cloud</b><small className="brand-role">Digital experiences, built with purpose</small></span></NavLink>; }
export default function Layout() {
  const [open, setOpen] = useState(false);const [socialLinks,setSocialLinks]=useState([]);
  useEffect(()=>{if(!supabase)return;let active=true;const load=async()=>{const {data,error}=await supabase.from('social_links').select('id,platform,label,url,placement,icon,visible,display_order').eq('visible',true).order('display_order',{ascending:true});if(!active)return;if(error){setSocialLinks([]);return;}setSocialLinks(data||[]);};load();const channel=supabase.channel('public-social-links').on('postgres_changes',{event:'*',schema:'public',table:'social_links'},load).subscribe();const onFocus=()=>{if(document.visibilityState==='visible')load();};window.addEventListener('focus',onFocus);document.addEventListener('visibilitychange',onFocus);return()=>{active=false;window.removeEventListener('focus',onFocus);document.removeEventListener('visibilitychange',onFocus);supabase.removeChannel(channel);};},[]);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return <div className="shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><Brand /><div className="header-socials">{socialLinks.filter(x=>x.placement==='header').map(item=>{const Icon=socialIcons[item.icon]||Link2;return <a key={item.id} href={item.url} aria-label={item.label||item.platform} target="_blank" rel="noopener noreferrer"><SocialIcon item={item}/></a>;})}</div><button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</button></header>
    {open && <div className="scrim" onClick={() => setOpen(false)} />}
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-brand"><Brand /></div>
      <div className="sidebar-label">MENU</div>
      <nav className="nav" aria-label="Main navigation">{links.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} className={({isActive}) => isActive ? 'active' : ''}><Icon size={18} /> <span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-card"><span className="status-dot" /><div><strong>Available for projects</strong><small>Let’s build something useful.</small></div></div>
      <div className="sidebar-foot"><a className="btn btn-primary full" href={`mailto:${EMAIL}`}><Mail size={17} /> Get in touch <ArrowUpRight size={16} /></a><small>{EMAIL}</small></div>
    </aside>
    <main id="main" className="main"><Outlet /><footer className="site-footer"><span>© {new Date().getFullYear()} Shorlah Cloud</span><span>Designed & developed by Shorlah Cloud · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span><div className="footer-socials">{socialLinks.filter(x=>x.placement==='footer').map(item=>{const Icon=socialIcons[item.icon]||Link2;return <a key={item.id} href={item.url} aria-label={item.label||item.platform} target="_blank" rel="noopener noreferrer"><SocialIcon item={item}/><span>{item.label||item.platform}</span></a>;})}</div></footer></main>
  </div>;
}
