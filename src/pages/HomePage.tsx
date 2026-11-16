import { ArrowRight, CheckCircle2, CirclePlay, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaqAccordion } from '../components/FaqAccordion';
import { ServiceCard } from '../components/ServiceCard';
import { companyHighlights, faqs, processSteps, sectionSubtitleClass, sectionTitleClass, services, trustPoints, whyChooseUs } from '../data/siteData';

export function HomePage() {
  return (
    <main>
      <section className="bg-[#FFF8F2]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#EAD8C8] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#EF7622]">
              Financial solutions made simple
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.07em] text-[#102E49] sm:text-5xl lg:text-6xl">
              Find the Right Loan for Your Next Step
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Explore loan options for your personal needs, home, vehicle, education, or business with clear guidance throughout the process.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-[#EF7622] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D66516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7622] focus-visible:ring-offset-2">
                Explore Loan Options
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#EAD8C8] bg-white px-5 py-3.5 text-sm font-semibold text-[#102E49] transition hover:border-[#EF7622] hover:text-[#EF7622] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7622] focus-visible:ring-offset-2">
                <CirclePlay size={16} />
                Talk to Our Team
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
              {companyHighlights.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full border border-[#EAD8C8] bg-white px-3 py-2">
                  <CheckCircle2 size={16} className="text-[#16865C]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-64 w-64 rounded-full bg-[#FFF1E5] blur-2xl" />
            <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[#FCE8D5] blur-2xl" />
            <div className="relative overflow-hidden rounded-4xl border border-[#EAD8C8] bg-white p-6 shadow-[0_28px_80px_rgba(11,45,92,0.08)]">
              <div className="rounded-[28px] bg-[#FFF1E5] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EF7622]">Loan guidance</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tighter text-[#102E49]">Smart planning</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#EF7622] shadow-sm">
                    <Sparkles size={22} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/60 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Home financing</span>
                      <span className="rounded-full bg-[#FFF1E5] px-2 py-1 text-[#EF7622]">Needs review</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-extrabold tracking-[-0.06em] text-[#102E49]">₹18L</p>
                        <p className="text-sm text-slate-500">Estimated requirement</p>
                      </div>
                      <div className="rounded-xl bg-[#ECFDF5] p-2 text-[#16865C]">
                        <CheckCircle2 size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#EAD8C8] bg-white p-4">
                      <p className="text-sm text-slate-500">Loan type</p>
                      <p className="mt-2 text-lg font-bold text-[#102E49]">Home Loan</p>
                    </div>
                    <div className="rounded-2xl border border-[#EAD8C8] bg-white p-4">
                      <p className="text-sm text-slate-500">Next step</p>
                      <p className="mt-2 text-lg font-bold text-[#102E49]">Discuss options</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-[#102E49] p-4 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm text-blue-100">Guided support</p>
                      <p className="mt-1 text-xl font-bold text-white">Clear next steps</p>
                    </div>
                    <div className="rounded-full bg-white/10 p-2">
                      <ShieldCheck size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">Loan Solutions</p>
          <h2 className={sectionTitleClass}>Explore Loan Solutions</h2>
          <p className={sectionSubtitleClass + ' mx-auto'}>Understand your options and find a solution suited to your requirements.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-[#FFF8F2] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">Why choose us</p>
            <h2 className={sectionTitleClass}>A Clearer Way to Explore Loan Options</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyChooseUs.map((item) => {
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">How it works</p>
          <h2 className={sectionTitleClass}>A Simple, Guided Journey</h2>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[82%] w-px -translate-x-1/2 bg-[#EAD8C8] md:block" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative rounded-[28px] border border-[#EAD8C8] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#102E49] font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold tracking-[-0.04em] text-[#102E49]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF1E5] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-[-0.06em] text-[#102E49] md:text-5xl">Not Sure Which Loan Is Right for You?</h2>
          <p className="mt-4 text-lg text-slate-600">Tell us what you need, and our team can help you understand the available options.</p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#EF7622] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D66516]">
              Submit an Enquiry
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">FAQs</p>
          <h2 className={sectionTitleClass}>Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="bg-[#102E49] py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-[-0.06em] md:text-5xl">Let&apos;s Explore Your Loan Options</h2>
          <p className="mt-4 text-lg text-blue-100">Share your requirement and our team can help you review the most relevant next steps.</p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#102E49] transition hover:bg-slate-100">
              Enquire Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
