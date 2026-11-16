import { Link } from 'react-router-dom';
import { footerLinks, legalLinks, loanFooterLinks, companyMeta, contactPlaceholders } from '../data/siteData';
import vedoraLogo from '../assets/vedora logo.png';

export function Footer() {
  return (
    <footer className="border-t border-[#FFF1E5] bg-[#FFF8F2]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src={vedoraLogo} alt={companyMeta.name} className="h-auto w-64 max-w-full object-contain object-left" />
          </div>
          <p className="max-w-xs text-sm leading-7 text-slate-600">{companyMeta.shortDescription}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-[#EF7622]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Loan Services</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            {loanFooterLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-[#EF7622]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>{contactPlaceholders.phone}</li>
            <li>{contactPlaceholders.email}</li>
            <li>{contactPlaceholders.address}</li>
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-[#EF7622]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#EAD8C8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {companyMeta.name}. All rights reserved.</p>
          <p>Loan enquiries are subject to lender assessment and eligibility.</p>
        </div>
      </div>
    </footer>
  );
}
