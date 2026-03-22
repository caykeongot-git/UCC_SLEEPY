import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Film, Ticket, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', path: '/', icon: Home },
    { name: 'Phim & Lịch', path: '/movies', icon: Film },
    { name: 'Rạp / Giá Vé', path: '/cinemas', icon: Ticket },
    { name: 'Khuyến Mãi', path: '/promotions', icon: Gift },
  ];

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0f1014]/90 backdrop-blur-xl border-b border-light-100/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-[#181a20]/80 backdrop-blur-lg py-5 border-b border-white/5 shadow-lg'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(14,165,233,0.4)] group-hover:shadow-[0_0_40px_rgba(14,165,233,0.8)] transition-all flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                 <Film size={24} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col drop-shadow-lg">
              <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 tracking-wider leading-none group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all">
                UCC
              </span>
              <span className="text-sm md:text-md font-bold text-white tracking-[0.2em] leading-none mt-1 group-hover:text-cyan-100 transition-colors">
                SLEEPY
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <motion.div 
                key={link.path}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide group overflow-hidden transition-all duration-300 ${isActive ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'}`}
                  title={link.name}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-125 group-hover:rotate-12'}`} />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-5">
           
           <motion.button 
             whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.8)" }}
             whileTap={{ scale: 0.95 }}
             className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-cyan-400/30"
           >
             <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
               <User size={18} />
             </motion.div>
             <span className="tracking-wide">Tài Khoản</span>
           </motion.button>

           <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="lg:hidden p-2 text-white bg-white/10 rounded-lg">
             <Menu size={24} />
           </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
