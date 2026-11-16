import { Check, ClipboardList, MessageSquareText, ShieldCheck } from 'lucide-react';
import { processSteps, sectionSubtitleClass, sectionTitleClass } from '../data/siteData';

const icons = [ClipboardList, MessageSquareText, Check, ShieldCheck];

export function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">How it works</p>
        <h1 className={sectionTitleClass}>A Clear Process for Understanding Loan Options</h1>
        <p className={sectionSubtitleClass + ' mx-auto'}>
          We focus on a practical, transparent journey so you know what to expect before exploring lender-specific next steps.
        </p>
      </div>

      <section className="mt-12">
        <div className="grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[index] || ClipboardList;
            return (
              <div key={step.title} className="relative rounded-[28px] border border-[#EAD8C8] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1E5] text-[#EF7622]">
                  <Icon size={22} />
                </div>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#EF7622]">Step {index + 1}</div>
                <h2 className="text-2xl font-bold tracking-tighter text-[#102E49]">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-4xl border border-[#EAD8C8] bg-[#FFF8F2] p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-[#102E49]">Important note</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              An enquiry is not a loan approval. Final eligibility, documentation, interest rates, fees, and terms depend on the lender’s assessment and the applicant’s profile. We help you understand the process, not make promises about approval or outcome.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#EAD8C8] bg-white p-6">
            <div className="flex items-center gap-3 text-[#102E49]">
              <ShieldCheck className="text-[#EF7622]" size={22} />
              <h3 className="text-xl font-bold">Responsible guidance</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We focus on transparent communication, realistic next steps, and a clear understanding of lending requirements before you move forward.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
