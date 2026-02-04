
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Laptop, Cpu, HardDrive, Shield, 
  Settings, ArrowRight, Mail, Phone, MapPin, 
  Trash2, Edit2, PlusCircle, Network, Camera, Tv, MessageSquare, Smartphone, Database, CheckCircle, ExternalLink, Calendar, Plus, Save, Palette, FileText, Layout, ChevronRight
} from 'lucide-react';
import { Service, SiteConfig, BlogPost, ThemeConfig } from './types.ts';
import { INITIAL_SERVICES, INITIAL_SITE_CONFIG, INITIAL_POSTS, INITIAL_THEME_CONFIG } from './constants.tsx';

// --- Components ---

const Logo: React.FC<{ className?: string, height?: string }> = ({ className = "", height = "h-16 sm:h-20" }) => {
  return (
    <div className={`flex items-center gap-2 overflow-visible ${className}`}>
      <svg 
        viewBox="0 0 540 220" 
        className={`${height} w-auto drop-shadow-2xl transition-all duration-500 hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ isolation: 'isolate' }}>
          {/* 중앙 배경 글로우 - 원색을 받쳐주는 역할 */}
          <circle cx="230" cy="110" r="100" fill="#ffffff" opacity="0.6" filter="blur(20px)" />
          
          {/* 빛의 삼원색 (RGB) - 불투명도를 1.0으로 설정하여 최고로 선명하게 표현 */}
          <circle cx="230" cy="70" r="65" fill="#00FF00" style={{ mixBlendMode: 'multiply' }} opacity="1.0" />
          <circle cx="170" cy="150" r="65" fill="#FF0000" style={{ mixBlendMode: 'multiply' }} opacity="1.0" />
          <circle cx="290" cy="150" r="65" fill="#0000FF" style={{ mixBlendMode: 'multiply' }} opacity="1.0" />
        </g>
        <g>
          {/* 
             로고 텍스트 위치: 이전 요청에 따라 (95, 145) 중간 지점 유지.
             그림자 효과를 조절하여 원색 배경 위에서도 텍스트가 명확히 읽히도록 함.
          */}
          <text 
            x="95" 
            y="105" 
            fontFamily="'Times New Roman', Times, serif" 
            fontWeight="900" 
            fontSize="68" 
            fill="#0f172a"
            style={{ 
              filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,1)) drop-shadow(0px 0px 12px rgba(160,32,240,0.3))',
              paintOrder: 'stroke fill',
              letterSpacing: '-1px'
            }}
          >
            Shine
          </text>
          <text 
            x="145" 
            y="170" 
            fontFamily="'Times New Roman', Times, serif" 
            fontWeight="900" 
            fontSize="68" 
            fill="#0f172a"
            style={{ 
              filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,1)) drop-shadow(0px 0px 12px rgba(160,32,240,0.3))',
              paintOrder: 'stroke fill',
              letterSpacing: '-1px'
            }}
          >
            Electronic
          </text>
        </g>
      </svg>
    </div>
  );
};

const Navbar: React.FC<{ shopName: string }> = ({ shopName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${scrolled ? 'glass-header py-3 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-all flex-shrink-0 group">
          <Logo height={scrolled ? "h-12 sm:h-14" : "h-16 sm:h-20"} className="group-hover:translate-x-1" />
        </Link>
        
        <div className="hidden lg:flex items-center space-x-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                location.pathname === link.path 
                  ? 'text-brand-purple bg-brand-purple/5 font-black' 
                  : 'text-slate-600 hover:text-brand-purple hover:bg-slate-50 font-bold'
              } px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-all`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-5"></div>
          <Link to="/admin" className="text-slate-400 hover:text-brand-purple transition-all p-3 rounded-full hover:bg-brand-purple/5">
            <Settings size={18} />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 text-slate-900 bg-white rounded-2xl border border-slate-100 shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-white border border-slate-100 rounded-[2.5rem] p-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 rounded-2xl text-lg font-black tracking-tight transition-all ${
                location.pathname === link.path ? 'bg-brand-purple/5 text-brand-purple' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 rounded-2xl text-lg font-black text-slate-400 hover:bg-slate-50 border-t border-slate-50 mt-2"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <footer className="bg-slate-50 text-slate-900 pt-32 pb-16 overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Logo height="h-20 sm:h-24" className="mb-8" />
            <p className="text-slate-500 max-w-sm mb-10 text-lg leading-relaxed font-medium">
              New York's premier technical restoration laboratory since 1983. We bridge the gap between traditional craftsmanship and digital modernization.
            </p>
            <div className="flex space-x-4">
               {['Instagram', 'Twitter', 'Facebook'].map(social => (
                 <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center hover:text-brand-purple hover:border-brand-purple transition-all group shadow-sm">
                   <ExternalLink size={18} className="text-slate-400 group-hover:text-brand-purple" />
                 </a>
               ))}
            </div>
          </div>
          <div>
            <h3 className="text-brand-purple font-black mb-8 text-[10px] uppercase tracking-[0.4em]">Navigation</h3>
            <ul className="space-y-5 text-slate-600 font-bold uppercase text-xs tracking-widest">
              <li><Link to="/" className="hover:text-brand-purple transition-colors">The Studio</Link></li>
              <li><Link to="/services" className="hover:text-brand-purple transition-colors">Our Expertise</Link></li>
              <li><Link to="/blog" className="hover:text-brand-purple transition-colors">Tech Journal</Link></li>
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Concierge</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-brand-purple font-black mb-8 text-[10px] uppercase tracking-[0.4em]">Laboratory</h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shadow-sm"><Phone size={18} /></div>
                <span className="font-black text-lg text-slate-900">{config.phone}</span>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple shrink-0 shadow-sm"><MapPin size={18} /></div>
                <span className="font-medium text-sm leading-relaxed text-slate-500">{config.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[9px] font-black uppercase tracking-[0.5em]">
          <p>© {new Date().getFullYear()} {config.shopName.toUpperCase()}. NYC HERITAGE.</p>
          <div className="flex space-x-10">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Security</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages & Sub-components ---

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const icons: Record<string, any> = {
    laptop: Laptop,
    tv: Tv,
    network: Network,
    shield: Shield,
    database: Database,
    smartphone: Smartphone
  };
  const Icon = icons[service.icon] || Settings;

  return (
    <div className="group glass-card rounded-[3rem] overflow-hidden transition-all duration-700 flex flex-col h-full premium-shadow-hover">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
        <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur-xl rounded-2xl text-brand-purple shadow-lg border border-brand-purple/10">
          <Icon size={24} />
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter group-hover:text-brand-purple transition-colors">{service.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium italic">
          {service.description}
        </p>
        <div className="mt-auto">
          <Link to="/contact" className="inline-flex items-center gap-3 text-[10px] font-black text-brand-purple uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
            Inquire Portfolio <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="group glass-card rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full hover:border-brand-purple/30">
      <div className="h-56 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0" />
      </div>
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-3 text-brand-purple text-[9px] font-black uppercase tracking-widest">
           <Calendar size={12} /> {post.date}
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-brand-purple transition-colors leading-tight">{post.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-3 font-medium leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
};

const HomePage: React.FC<{ services: Service[], posts: BlogPost[], config: SiteConfig }> = ({ services, posts, config }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Blobs for Luxury Light Feel */}
        <div className="absolute top-20 right-[-10%] w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-400/5 blur-[100px] rounded-full animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-center">
            <div className="lg:col-span-8 space-y-12">
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-[10px] font-black uppercase tracking-[0.4em] animate-in fade-in slide-in-from-left duration-1000 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping"></span>
                <span>NYC Premier Technology Laboratory</span>
              </div>
              
              <h1 className="text-6xl md:text-[7.5rem] font-black text-slate-900 tracking-tighter leading-[0.85] text-balance">
                Precision Tech. <br />
                <span className="text-brand-purple italic">Pristine Care.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                Established 1983. Manhattan's most trusted restoration laboratory where heritage meets modern hardware engineering.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <Link to="/services" className="px-14 py-8 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-brand-purple transition-all shadow-xl hover:shadow-brand-purple/30 flex items-center justify-center gap-6 group">
                  Expert Consult <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                </Link>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Direct Laboratory Line</span>
                  <span className="text-2xl font-black text-slate-900 hover:text-brand-purple transition-colors cursor-pointer">
                    {config.phone}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block lg:col-span-4 relative">
               <div className="relative z-10 rounded-[5rem] overflow-hidden border border-slate-100 shadow-2xl transition-all duration-1000 hover:scale-[1.02] bg-white p-2">
                 <img src="https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800" className="w-full aspect-[4/5] object-cover rounded-[4.5rem]" />
               </div>
               <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white glass-card rounded-[3rem] p-10 shadow-2xl flex flex-col justify-center animate-float">
                  <p className="text-4xl font-black text-brand-purple leading-none">40+</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Years of Excellence</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-2xl space-y-6">
               <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Laboratory <br /><span className="text-brand-purple">Portfolio.</span></h2>
               <div className="h-2 w-32 bg-brand-purple rounded-full"></div>
            </div>
            <p className="text-slate-500 font-bold max-w-sm text-lg leading-relaxed italic">Restoring legacy, empowering future. Our suite of professional technical solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-40 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-20 gap-8">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase tracking-[0.1em]">The Technology Journal</h2>
              <Link to="/blog" className="text-brand-purple font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group">View All Archive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {posts.map(post => <BlogCard key={post.id} post={post} />)}
           </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 glass-card rounded-[4rem] p-16 md:p-32 border border-slate-100 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic">Modern Heritage. <br /><span className="text-brand-purple">Zero Compromise.</span></h2>
                 <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-md">Every restoration is handled with surgical precision and the reverence of a museum conservator.</p>
                 <div className="flex flex-wrap gap-10">
                    <div>
                       <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">40+</p>
                       <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.4em]">Years Studio</p>
                    </div>
                    <div>
                       <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">15k+</p>
                       <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.4em]">Restored Units</p>
                    </div>
                 </div>
              </div>
              <div className="p-16 bg-white border border-slate-100 rounded-[3.5rem] shadow-xl space-y-10">
                 <div className="text-brand-purple/20"><MessageSquare size={56} strokeWidth={1} /></div>
                 <blockquote className="text-3xl font-serif italic text-slate-800 leading-snug">"Shine is a Manhattan institution. They digitized my childhood archives and rebuilt our firm's entire secure network architecture perfectly."</blockquote>
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center font-black text-brand-purple text-xl shadow-sm">RM</div>
                    <div>
                       <p className="font-black text-xl text-slate-900 tracking-tight">Robert Montgomery</p>
                       <p className="text-brand-purple text-[10px] font-black uppercase tracking-[0.3em]">Creative Director, NYC</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="pt-48 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-40 space-y-10">
          <h1 className="text-7xl md:text-[8rem] font-black text-slate-900 tracking-tighter leading-none">The Service <br /><span className="text-brand-purple">Suite.</span></h1>
          <p className="text-2xl text-slate-500 leading-relaxed font-medium">
            Explore our comprehensive technical portfolio. From micro-component restoration to full-scale digital infrastructure modernization.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <div className="pt-48 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-16">
            <h1 className="text-7xl md:text-[8rem] font-black text-slate-900 tracking-tighter leading-none">Establish <br /><span className="text-brand-purple">Concierge.</span></h1>
            <p className="text-2xl text-slate-500 leading-relaxed font-medium max-w-lg">
              Visit our Upper West Side laboratory or request an on-site corporate diagnostic. Our craftsmen handle every inquiry with absolute discretion.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="p-10 glass-card rounded-[3rem] space-y-4 shadow-sm border-slate-100">
                <div className="text-brand-purple"><Phone size={24} /></div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Direct Access</h3>
                <p className="text-slate-900 font-black text-2xl">{config.phone}</p>
                <p className="text-[10px] font-black text-brand-purple uppercase tracking-widest italic mt-2">Text: {config.textPhone}</p>
              </div>
              <div className="p-10 glass-card rounded-[3rem] space-y-4 shadow-sm border-slate-100">
                <div className="text-brand-purple"><MapPin size={24} /></div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Laboratory</h3>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">{config.address}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manhattan, NY</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-14 md:p-16 rounded-[4.5rem] border border-brand-purple/5 relative shadow-2xl">
            <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Inquiry Protocol</h2>
            <form className="space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Client Identity</label>
                <input type="text" placeholder="Full Name" className="w-full px-8 py-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all font-bold text-slate-900 placeholder-slate-300" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Digital Channel</label>
                <input type="email" placeholder="Email Address" className="w-full px-8 py-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all font-bold text-slate-900 placeholder-slate-300" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Requirement Brief</label>
                <textarea rows={5} placeholder="Describe the diagnostic requirement..." className="w-full px-8 py-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all font-bold text-slate-900 placeholder-slate-300 resize-none"></textarea>
              </div>
              <button type="button" className="w-full py-7 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-purple transition-all shadow-xl">
                Transmit Protocol
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div className="pt-48 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-32 space-y-10">
          <h1 className="text-7xl md:text-[8rem] font-black text-slate-900 tracking-tighter leading-none">The <br /><span className="text-brand-purple">Journal.</span></h1>
          <p className="text-2xl text-slate-500 leading-relaxed font-medium">
            Studio notes, technical archives, and expert insights from the Manhattan laboratory.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminPage: React.FC<{ 
  config: SiteConfig, 
  setConfig: (c: SiteConfig) => void,
  theme: ThemeConfig,
  setTheme: (t: ThemeConfig) => void,
  services: Service[],
  setServices: (s: Service[]) => void,
  posts: BlogPost[],
  setPosts: (p: BlogPost[]) => void
}> = ({ config, setConfig, theme, setTheme, services, setServices, posts, setPosts }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'blog' | 'theme'>('general');

  return (
    <div className="pt-48 pb-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
           <div className="space-y-3">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Laboratory OS</h1>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Precision Core Operational</p>
              </div>
           </div>
           <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-[2rem] border border-slate-200">
              {(['general', 'services', 'blog', 'theme'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)} 
                  className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-brand-purple shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {tab}
                </button>
              ))}
           </div>
        </div>
        
        <div className="animate-in fade-in duration-500">
          {activeTab === 'general' && (
            <div className="bg-white p-16 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter"><Layout className="text-brand-purple" size={24} /> Site Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Laboratory Identity</label>
                  <input type="text" value={config.shopName} onChange={(e) => setConfig({ ...config, shopName: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Mission Tagline</label>
                  <input type="text" value={config.tagline} onChange={(e) => setConfig({ ...config, tagline: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Concierge Email</label>
                  <input type="text" value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Office Geo-Location</label>
                  <input type="text" value={config.address} onChange={(e) => setConfig({ ...config, address: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white p-16 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
              <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter"><Database className="text-brand-purple" size={24} /> Knowledge Nodes</h2>
                 <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-purple transition-all shadow-lg"><Plus size={16} /> Deploy New Node</button>
              </div>
              <div className="space-y-4">
                 {services.map(service => (
                   <div key={service.id} className="group flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-brand-purple/20 transition-all shadow-sm">
                      <div className="flex items-center gap-8">
                         <img src={service.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                         <div>
                            <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase italic">{service.title}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Type: {service.icon}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="p-5 bg-white text-slate-400 hover:text-brand-purple rounded-2xl transition-all shadow-sm"><Edit2 size={20} /></button>
                         <button className="p-5 bg-white text-slate-400 hover:text-red-500 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="bg-white p-16 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter"><FileText className="text-brand-purple" size={24} /> Technical Journal</h2>
                 <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-purple transition-all shadow-lg"><Plus size={16} /> Compose Entry</button>
              </div>
              <div className="space-y-4">
                 {posts.map(post => (
                   <div key={post.id} className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-brand-purple/20 transition-all shadow-sm">
                      <div className="flex items-center gap-8">
                         <div className="text-brand-purple bg-white p-6 rounded-2xl shadow-sm"><Calendar size={24} /></div>
                         <div>
                            <h4 className="font-black text-slate-900 text-xl tracking-tighter italic uppercase">{post.title}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Released: {post.date}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="p-5 bg-white text-slate-400 hover:text-brand-purple rounded-2xl transition-all shadow-sm"><Edit2 size={20} /></button>
                         <button className="p-5 bg-white text-slate-400 hover:text-red-500 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="bg-white p-16 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
               <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter"><Palette className="text-brand-purple" size={24} /> Aesthetic Protocol</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-5">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Brand Signature Color</label>
                     <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <input type="color" value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="w-20 h-20 rounded-2xl cursor-pointer overflow-hidden border-0 bg-transparent" />
                        <div>
                          <p className="font-black text-slate-900 text-xl tracking-tight uppercase">{theme.primaryColor}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hex Core</p>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Typography Architecture</label>
                    <select value={theme.headingFont} onChange={(e) => setTheme({ ...theme, headingFont: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold outline-none focus:border-brand-purple appearance-none">
                       <option value="Montserrat">Montserrat (Geometric Modern)</option>
                       <option value="Playfair Display">Playfair Display (Premium Serif)</option>
                       <option value="Inter">Inter (Global Grotesk)</option>
                    </select>
                  </div>
               </div>
               <div className="pt-12 border-t border-slate-100">
                  <button className="flex items-center gap-4 px-12 py-7 bg-brand-purple text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-brand-purple/20 hover:scale-105 transition-all">
                    <Save size={18} /> Apply Visual Protocol
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(INITIAL_THEME_CONFIG);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-brand-purple selection:text-white">
        <Navbar shopName={siteConfig.shopName} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage services={services} posts={posts} config={siteConfig} />} />
            <Route path="/services" element={<ServicesPage services={services} />} />
            <Route path="/blog" element={<BlogPage posts={posts} />} />
            <Route path="/contact" element={<ContactPage config={siteConfig} />} />
            <Route path="/admin" element={<AdminPage config={siteConfig} setConfig={setSiteConfig} theme={themeConfig} setTheme={setThemeConfig} services={services} setServices={setServices} posts={posts} setPosts={setPosts} />} />
          </Routes>
        </main>

        <Footer config={siteConfig} />
        
        {/* Floating Concierge Action */}
        <Link to="/contact" className="fixed bottom-12 right-12 z-50 p-7 bg-brand-purple text-white rounded-[2.5rem] shadow-2xl shadow-brand-purple/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
          <MessageSquare size={32} />
        </Link>
      </div>
    </Router>
  );
};

export default App;
