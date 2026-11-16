import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../data/siteData';

const cardBaseClass =
  'rounded-[28px] border border-[#EAD8C8] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(239,118,34,0.08)]';

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <article className={cardBaseClass}>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E5] text-[#EF7622]">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#102E49]">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {service.useCases.slice(0, 2).map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#16865C]" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#EF7622] transition hover:text-[#102E49]">
          Learn More
          <ArrowRight size={16} />
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#EF7622] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D66516]">
          Enquire Now
        </Link>
      </div>
    </article>
  );
}
