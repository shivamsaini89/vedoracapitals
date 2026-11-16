import { ArrowRight, CircleCheckBig, FileText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, sectionSubtitleClass, sectionTitleClass } from '../data/siteData';

export function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">Loan categories</p>
        <h1 className={sectionTitleClass}>Loan Services</h1>
        <p className={sectionSubtitleClass + ' mx-auto'}>
          Understand your options and find a solution suited to your requirements.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article id={service.id} key={service.id} className="rounded-4xl border border-[#EAD8C8] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] lg:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div className="rounded-[28px] bg-[#FFF1E5] p-6">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#EF7622] shadow-sm">
                    <Icon size={28} />
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tighter text-[#102E49]">{service.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#EF7622] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D66516]">
                    Enquire Now
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102E49]">
                      <CircleCheckBig size={18} className="text-[#16865C]" /> Common use cases
                    </h3>
                    <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      {service.useCases.map((item) => (
                        <li key={item} className="rounded-xl border border-[#FFF1E5] bg-[#FFF8F2] px-3 py-2">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102E49]">
                      <ShieldCheck size={18} className="text-[#EF7622]" /> General eligibility considerations
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {service.eligibility.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#EF7622]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102E49]">
                      <FileText size={18} className="text-[#EF7622]" /> Indicative document requirements
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {service.documents.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#16865C]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
