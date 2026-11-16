import { useState } from 'react';
import { ArrowRight, Calculator, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

function formatRupees(value: number) {
  return `₹${currencyFormatter.format(Math.round(value))}`;
}

function getEmi(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0 || annualRate < 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return principal / months;

  const rateFactor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * rateFactor) / (rateFactor - 1);
}

export function LoanCalculatorPage() {
  const [amount, setAmount] = useState(2500000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const tenureMonths = tenureYears * 12;
  const emi = getEmi(amount, annualRate, tenureMonths);
  const totalPayment = emi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - amount);
  const principalShare = totalPayment > 0 ? (amount / totalPayment) * 100 : 0;

  return (
    <main>
      <section className="border-b border-[#EAD8C8] bg-[#FFF8F2]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">Plan your repayments</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.06em] text-[#102E49] sm:text-5xl">
            Loan EMI Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Adjust the loan amount, interest rate, and tenure to estimate your monthly instalment and repayment total.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="loan-amount" className="text-sm font-semibold text-[#243746]">Loan amount</label>
              <div className="relative w-44">
                <IndianRupee aria-hidden="true" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="loan-amount"
                  type="number"
                  min="100000"
                  max="50000000"
                  step="50000"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white py-2.5 pl-9 pr-3 text-right text-sm font-bold text-[#102E49] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                />
              </div>
            </div>
            <input
              aria-label="Loan amount slider"
              type="range"
              min="100000"
              max="50000000"
              step="50000"
              value={Number.isFinite(amount) ? Math.min(50000000, Math.max(100000, amount)) : 100000}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-5 h-2 w-full cursor-pointer accent-[#EF7622]"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500"><span>₹1 lakh</span><span>₹5 crore</span></div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="interest-rate" className="text-sm font-semibold text-[#243746]">Interest rate (per year)</label>
              <div className="relative w-32">
                <input
                  id="interest-rate"
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  value={annualRate}
                  onChange={(event) => setAnnualRate(Number(event.target.value))}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white px-3 py-2.5 pr-8 text-right text-sm font-bold text-[#102E49] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
              </div>
            </div>
            <input
              aria-label="Annual interest rate slider"
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={Number.isFinite(annualRate) ? Math.min(30, Math.max(0, annualRate)) : 0}
              onChange={(event) => setAnnualRate(Number(event.target.value))}
              className="mt-5 h-2 w-full cursor-pointer accent-[#EF7622]"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500"><span>0%</span><span>30%</span></div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="loan-tenure" className="text-sm font-semibold text-[#243746]">Loan tenure</label>
              <div className="relative w-32">
                <input
                  id="loan-tenure"
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(event) => setTenureYears(Number(event.target.value))}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white px-3 py-2.5 pr-12 text-right text-sm font-bold text-[#102E49] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">years</span>
              </div>
            </div>
            <input
              aria-label="Loan tenure slider"
              type="range"
              min="1"
              max="30"
              step="1"
              value={Number.isFinite(tenureYears) ? Math.min(30, Math.max(1, tenureYears)) : 1}
              onChange={(event) => setTenureYears(Number(event.target.value))}
              className="mt-5 h-2 w-full cursor-pointer accent-[#EF7622]"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500"><span>1 year</span><span>30 years</span></div>
          </div>
        </div>

        <aside className="rounded-2xl bg-[#102E49] p-6 text-white sm:p-8" aria-live="polite">
          <div className="flex items-center gap-3 text-blue-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Calculator size={20} /></span>
            <p className="text-sm font-semibold">Estimated monthly EMI</p>
          </div>
          <p className="mt-5 text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">{formatRupees(emi)}</p>
          <p className="mt-2 text-sm text-blue-100">For {tenureYears} {tenureYears === 1 ? 'year' : 'years'} ({tenureMonths} monthly instalments)</p>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/15" aria-label={`Principal ${Math.round(principalShare)} percent, interest ${Math.round(100 - principalShare)} percent`}>
            <div className="h-full rounded-full bg-[#4DD6A5] transition-[width] duration-300" style={{ width: `${principalShare}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-blue-100">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-[#4DD6A5]" /> Principal {Math.round(principalShare)}%</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white/30" /> Interest {Math.round(100 - principalShare)}%</span>
          </div>

          <dl className="mt-8 divide-y divide-white/15 border-y border-white/15 text-sm">
            <div className="flex justify-between gap-4 py-4"><dt className="text-blue-100">Principal amount</dt><dd className="font-semibold">{formatRupees(amount)}</dd></div>
            <div className="flex justify-between gap-4 py-4"><dt className="text-blue-100">Total interest</dt><dd className="font-semibold">{formatRupees(totalInterest)}</dd></div>
            <div className="flex justify-between gap-4 py-4"><dt className="text-blue-100">Total repayment</dt><dd className="font-semibold">{formatRupees(totalPayment)}</dd></div>
          </dl>

          <p className="mt-5 text-xs leading-5 text-blue-100">This is an indicative estimate using a fixed rate and monthly reducing balance. Actual EMI, fees, and terms depend on the lender and your approved offer.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102E49] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102E49]">
            Discuss your requirement <ArrowRight size={16} />
          </Link>
        </aside>
      </section>
    </main>
  );
}