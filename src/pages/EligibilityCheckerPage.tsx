import { useState } from 'react';
import { ArrowRight, CircleAlert, CircleCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

function formatRupees(value: number) {
  return `₹${currencyFormatter.format(Math.round(value))}`;
}

function calculateEmi(principal: number, annualRate: number, tenureYears: number) {
  const months = tenureYears * 12;
  const monthlyRate = annualRate / 1200;
  if (principal <= 0 || months <= 0 || annualRate < 0) return 0;
  if (monthlyRate === 0) return principal / months;

  const rateFactor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * rateFactor) / (rateFactor - 1);
}

export function EligibilityCheckerPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [existingEmis, setExistingEmis] = useState('0');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('12');
  const [tenureYears, setTenureYears] = useState('5');
  const [hasChecked, setHasChecked] = useState(false);

  const income = Number(monthlyIncome);
  const commitments = Number(existingEmis);
  const principal = Number(loanAmount);
  const annualRate = Number(interestRate);
  const years = Number(tenureYears);
  const estimatedEmi = calculateEmi(principal, annualRate, years);
  const totalMonthlyObligations = commitments + estimatedEmi;
  const obligationRatio = income > 0 ? (totalMonthlyObligations / income) * 100 : 100;
  const withinIndicativeRange = income > 0 && totalMonthlyObligations <= income * 0.5;
  const remainingIndicativeEmiCapacity = Math.max(0, income * 0.5 - commitments);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasChecked(true);
  }

  return (
    <main>
      <section className="border-b border-[#EAD8C8] bg-[#FFF8F2]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">A first look at affordability</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.06em] text-[#102E49] sm:text-5xl">
            Loan Eligibility Checker
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Get a preliminary repayment-capacity estimate using your income, current EMIs, and loan details. No personal details are requested.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="eligibility-income" className="mb-2 block text-sm font-semibold text-[#243746]">Monthly take-home income</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
                <input
                  id="eligibility-income"
                  type="number"
                  min="1000"
                  max="100000000"
                  step="1000"
                  required
                  value={monthlyIncome}
                  onChange={(event) => setMonthlyIncome(event.target.value)}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white py-3 pl-8 pr-3 text-sm text-[#243746] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                  placeholder="e.g. 75,000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="eligibility-existing-emis" className="mb-2 block text-sm font-semibold text-[#243746]">Existing monthly EMIs</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
                <input
                  id="eligibility-existing-emis"
                  type="number"
                  min="0"
                  max="100000000"
                  step="500"
                  required
                  value={existingEmis}
                  onChange={(event) => setExistingEmis(event.target.value)}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white py-3 pl-8 pr-3 text-sm text-[#243746] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="eligibility-loan-amount" className="mb-2 block text-sm font-semibold text-[#243746]">Loan amount requested</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
                <input
                  id="eligibility-loan-amount"
                  type="number"
                  min="10000"
                  max="1000000000"
                  step="10000"
                  required
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white py-3 pl-8 pr-3 text-sm text-[#243746] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                  placeholder="e.g. 5,00,000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="eligibility-interest" className="mb-2 block text-sm font-semibold text-[#243746]">Illustrative annual interest rate</label>
              <div className="relative">
                <input
                  id="eligibility-interest"
                  type="number"
                  min="0"
                  max="40"
                  step="0.1"
                  required
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                  className="w-full rounded-lg border border-[#EAD8C8] bg-white px-3 py-3 pr-9 text-sm text-[#243746] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">%</span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="eligibility-tenure" className="mb-2 block text-sm font-semibold text-[#243746]">Loan tenure</label>
              <select
                id="eligibility-tenure"
                value={tenureYears}
                onChange={(event) => setTenureYears(event.target.value)}
                className="w-full rounded-lg border border-[#EAD8C8] bg-white px-3 py-3 text-sm text-[#243746] outline-none focus:border-[#EF7622] focus:ring-2 focus:ring-[#EF7622]/15"
              >
                {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map((yearsOption) => (
                  <option key={yearsOption} value={yearsOption}>{yearsOption} {yearsOption === 1 ? 'year' : 'years'}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EF7622] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D66516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7622] focus-visible:ring-offset-2">
            Check repayment capacity <ArrowRight size={16} />
          </button>
          <p className="text-xs leading-5 text-slate-500">Your entries stay in this browser and are not submitted or stored.</p>
        </form>

        <aside aria-live="polite" className="self-start rounded-2xl border border-[#EAD8C8] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-8">
          {!hasChecked ? (
            <div className="py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1E5] text-[#EF7622]"><ShieldCheck size={23} /></div>
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-[#102E49]">Your estimate will appear here</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Enter your monthly income, current EMI commitments, and the loan details you are considering.</p>
              <div className="mt-6 border-t border-[#FFF1E5] pt-5 text-sm leading-6 text-slate-600">
                This guide uses an illustrative 50% monthly-obligation-to-income threshold. Lender policies and other eligibility factors vary.
              </div>
            </div>
          ) : (
            <div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${withinIndicativeRange ? 'bg-[#E9F8F1] text-[#16865C]' : 'bg-[#FFF4E5] text-[#A85A00]'}`}>
                {withinIndicativeRange ? <CircleCheck size={23} /> : <CircleAlert size={23} />}
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Preliminary estimate</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#102E49]">
                {withinIndicativeRange ? 'Within the guide range' : 'May need a closer review'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {withinIndicativeRange
                  ? 'The estimated new EMI and current commitments fall within the illustrative repayment guide used here.'
                  : 'The estimated monthly commitments are above the illustrative repayment guide used here. A different amount or tenure may change the estimate.'}
              </p>

              <dl className="mt-6 divide-y divide-[#FFF1E5] border-y border-[#FFF1E5] text-sm">
                <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Estimated new EMI</dt><dd className="font-semibold text-[#102E49]">{formatRupees(estimatedEmi)}</dd></div>
                <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Existing monthly EMIs</dt><dd className="font-semibold text-[#102E49]">{formatRupees(commitments)}</dd></div>
                <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Monthly obligations / income</dt><dd className="font-semibold text-[#102E49]">{obligationRatio.toFixed(1)}%</dd></div>
                <div className="flex justify-between gap-4 py-4"><dt className="text-slate-600">Indicative EMI headroom*</dt><dd className="font-semibold text-[#102E49]">{formatRupees(remainingIndicativeEmiCapacity)}</dd></div>
              </dl>

              <p className="mt-5 text-xs leading-5 text-slate-500">*Based on the 50% guide and your stated existing EMIs. This result is not a credit decision, loan offer, or approval. Lenders assess credit history, age, income stability, documentation, loan type, and other factors.</p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#102E49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174477] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7622] focus-visible:ring-offset-2">
                Discuss your options <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}