import { Link } from 'react-router-dom';
import { EnquiryForm } from '../components/EnquiryForm';
import { contactPlaceholders } from '../data/siteData';

export function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-[#EAD8C8] bg-[#FFF8F2] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#EF7622]">Get in touch</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.06em] text-[#102E49]">Tell us what you need</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Share a few basic details and our team can help you understand the most relevant loan options before you proceed with a lender.
          </p>

          <div className="mt-8 space-y-5 text-sm text-slate-600">
            <div>
              <div className="font-semibold text-[#102E49]">Phone</div>
              <div>{contactPlaceholders.phone}</div>
            </div>
            <div>
              <div className="font-semibold text-[#102E49]">Email</div>
              <div>{contactPlaceholders.email}</div>
            </div>
            <div>
              <div className="font-semibold text-[#102E49]">Office Address</div>
              <div>{contactPlaceholders.address}</div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#EAD8C8] bg-white p-4 text-sm text-slate-600">
            Final eligibility, interest rates, fees, and terms depend on the lender’s review and the applicant’s profile.
          </div>
        </div>

        <div className="rounded-[32px] border border-[#EAD8C8] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-8">
          <h2 className="mb-3 text-2xl font-bold tracking-[-0.04em] text-[#102E49]">Loan Enquiry Form</h2>
          <p className="mb-6 text-sm text-slate-600">Please complete the form below. Fields marked with * are required.</p>
          <EnquiryForm />
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-500">
        Need a quick review before you apply? <Link to="/services" className="font-semibold text-[#EF7622]">See available loan categories</Link>
      </div>
    </main>
  );
}
