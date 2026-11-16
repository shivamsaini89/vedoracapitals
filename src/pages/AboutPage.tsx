import { Award, HandCoins, Sparkles, Users } from 'lucide-react';
import { sectionSubtitleClass, sectionTitleClass, trustPoints } from '../data/siteData';

const values = [
  {
    title: 'Purpose-led guidance',
    description: 'We help people understand their available options in a more straightforward and approachable way.',
    icon: HandCoins,
  },
  {
    title: 'Transparent conversations',
    description: 'We focus on explaining the process, likely requirements, and what to expect without overpromising outcomes.',
    icon: Sparkles,
  },
  {
    title: 'Customer-first support',
    description: 'The aim is to make the loan enquiry journey feel clearer, calmer, and more manageable.',
    icon: Users,
  },
  {
    title: 'Responsible decision support',
    description: 'Guide people toward informed decisions with realistic expectations around approvals, terms, and lender assessments.',
    icon: Award,
  },
];

export function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">About us</p>
        <h1 className={sectionTitleClass}>Helping You Understand Loan Options Clearly</h1>
        <p className={sectionSubtitleClass + ' mx-auto'}>
          We are building a service centred around clarity, transparency, and practical guidance for people exploring borrowing options.
        </p>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-4xl border border-[#EAD8C8] bg-[#FFF8F2] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          <h2 className="text-3xl font-extrabold tracking-tighter text-[#102E49]">Our approach</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Our focus is on helping individuals and families understand available loan options in a transparent, supportive way. We guide people through the enquiry journey by explaining the process, discussing likely requirements, and setting realistic expectations before they proceed with a lender.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            We believe a good lending support experience should feel simple, calm, and informed. That means concise conversations, clear information, and honest guidance around eligibility, documentation, and the final decision-making process.
          </p>
        </div>

        <div className="rounded-4xl border border-[#EAD8C8] bg-[#FFF1E5] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          <h2 className="text-3xl font-extrabold tracking-tighter text-[#102E49]">Service philosophy</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EF7622]" /> Helping people understand financial options without confusion.</li>
            <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EF7622]" /> Making the enquiry journey easier to navigate.</li>
            <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EF7622]" /> Providing responsible, transparent guidance.</li>
            <li className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EF7622]" /> Keeping the focus on realistic next steps and lender-led decisions.</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-center">
          <h2 className={sectionTitleClass}>What matters to us</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[28px] border border-[#EAD8C8] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E5] text-[#EF7622]">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold tracking-[-0.04em] text-[#102E49]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-4xl border border-[#EAD8C8] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <div className="text-center">
          <h2 className={sectionTitleClass}>Our promise</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="rounded-3xl border border-[#FFF1E5] bg-[#FFF8F2] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#EF7622]">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#102E49]">{point.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
