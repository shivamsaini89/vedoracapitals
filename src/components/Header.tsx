import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../data/siteData';
import vedoraIcon from '../assets/vedora_icon.png';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFF1E5] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Vedora home">
          <img src={vedoraIcon} alt="" className="h-10 w-10 object-contain" />
          <div className="leading-none">
            <div className="text-[0.95rem] font-black tracking-[-0.08em] text-[#102E49] sm:text-[1.1rem]">
              Vedora Capital Services
            </div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-[#102E49]' : 'text-slate-600 hover:text-[#102E49]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#EF7622] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D66516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7622] focus-visible:ring-offset-2">
            Enquire Now
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#EAD8C8] p-2 text-[#102E49] xl:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#FFF1E5] bg-white xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-[#FFF1E5] text-[#102E49]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#102E49]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#EF7622] px-5 py-3 text-sm font-semibold text-white">
              Enquire Now
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
