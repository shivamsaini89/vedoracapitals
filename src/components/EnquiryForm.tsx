import { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { defaultContactMethod, loanOptions, safeSubmissionNotice } from '../data/siteData';

type FormValues = {
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  loanType: string;
  approxLoan: string;
  netSalary: string;
  employmentType: string;
  contactMethod: string;
  description: string;
  consent: boolean;
};

const initialValues: FormValues = {
  fullName: '',
  mobileNumber: '',
  email: '',
  city: '',
  loanType: '',
  approxLoan: '',
  netSalary: '',
  employmentType: '',
  contactMethod: defaultContactMethod,
  description: '',
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: FormValues) {
  const nextErrors: Partial<Record<keyof FormValues, string>> = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Please enter your full name.';
  }

  const cleanedPhone = values.mobileNumber.replace(/\s+/g, '').replace(/[-()]/g, '');
  if (!cleanedPhone) {
    nextErrors.mobileNumber = 'Please enter your mobile number.';
  } else if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(cleanedPhone)) {
    nextErrors.mobileNumber = 'Please enter a valid Indian mobile number.';
  }

  if (values.email && !emailPattern.test(values.email.trim())) {
    nextErrors.email = 'Please enter a valid email address.';
  }

  if (!values.city.trim()) {
    nextErrors.city = 'Please enter your city.';
  }

  if (!values.loanType) {
    nextErrors.loanType = 'Please select the loan type you are interested in.';
  }

  if (values.netSalary.trim() && !/^\d{1,9}$/.test(values.netSalary.trim())) {
    nextErrors.netSalary = 'Enter net monthly salary as whole rupees, without commas.';
  }

  if (!values.contactMethod) {
    nextErrors.contactMethod = 'Please choose a preferred contact method.';
  }

  if (!values.consent) {
    nextErrors.consent = 'Please confirm that you agree to the privacy policy before submitting.';
  }

  return nextErrors;
}

export function EnquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionError, setSubmissionError] = useState(false);
  const submissionIdRef = useRef('');

  const validationHint = useMemo(() => {
    return safeSubmissionNotice;
  }, []);

  const handleChange = (field: keyof FormValues, value: string | boolean) => {
    if (isSubmitting) return;
    if (values[field] !== value) submissionIdRef.current = '';
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setIsSuccess(false);
    setSubmissionError(false);
    setSubmissionMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmissionMessage('');
    setSubmissionError(false);
    if (!submissionIdRef.current) submissionIdRef.current = crypto.randomUUID();
    const formData = new FormData(event.currentTarget);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          consent: values.consent,
          submissionId: submissionIdRef.current,
          website: String(formData.get('website') ?? ''),
        }),
        signal: controller.signal,
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The enquiry service is unavailable on this deployment. Please contact us directly.');
      }
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'We could not send your enquiry. Please try again later.');
      }

      setIsSuccess(true);
      setSubmissionError(false);
      setSubmissionMessage('Your enquiry has been emailed to our team. We will contact you using your preferred method.');
      setValues(initialValues);
      setErrors({});
      submissionIdRef.current = '';
    } catch (error) {
      setIsSuccess(false);
      setSubmissionError(true);
      setSubmissionMessage(error instanceof Error && error.name === 'AbortError'
        ? 'The email service took too long to respond. Your entries are still here; retry safely.'
        : error instanceof Error
          ? error.message
          : 'We could not send your enquiry. Your entries are still here; please try again.');
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#102E49]">Full Name *</label>
          <input
            id="fullName"
            type="text"
            value={values.fullName}
            onChange={(event) => handleChange('fullName', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && <p id="fullName-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="mb-2 block text-sm font-medium text-[#102E49]">Mobile Number *</label>
          <input
            id="mobileNumber"
            type="tel"
            inputMode="numeric"
            value={values.mobileNumber}
            onChange={(event) => handleChange('mobileNumber', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.mobileNumber)}
            aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
          />
          {errors.mobileNumber && <p id="mobileNumber-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.mobileNumber}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#102E49]">Email Address (optional)</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium text-[#102E49]">City *</label>
          <input
            id="city"
            type="text"
            value={values.city}
            onChange={(event) => handleChange('city', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && <p id="city-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="loanType" className="mb-2 block text-sm font-medium text-[#102E49]">Loan Type *</label>
          <select
            id="loanType"
            value={values.loanType}
            onChange={(event) => handleChange('loanType', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.loanType)}
            aria-describedby={errors.loanType ? 'loanType-error' : undefined}
          >
            <option value="">Select a loan type</option>
            {loanOptions.map((loan) => (
              <option key={loan} value={loan}>{loan}</option>
            ))}
          </select>
          {errors.loanType && <p id="loanType-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.loanType}</p>}
        </div>

        <div>
          <label htmlFor="approxLoan" className="mb-2 block text-sm font-medium text-[#102E49]">Approximate Loan Requirement (optional)</label>
          <input
            id="approxLoan"
            type="text"
            value={values.approxLoan}
            onChange={(event) => handleChange('approxLoan', event.target.value)}
            placeholder="e.g. 10 to 20 lakh"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
          />
        </div>

        <div>
          <label htmlFor="netSalary" className="mb-2 block text-sm font-medium text-[#102E49]">Net Monthly Salary in INR (optional)</label>
          <input
            id="netSalary"
            type="text"
            inputMode="numeric"
            maxLength={9}
            value={values.netSalary}
            onChange={(event) => handleChange('netSalary', event.target.value)}
            placeholder="e.g. 50000"
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.netSalary)}
            aria-describedby={errors.netSalary ? 'netSalary-error' : undefined}
          />
          {errors.netSalary && <p id="netSalary-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.netSalary}</p>}
        </div>

        <div>
          <label htmlFor="employmentType" className="mb-2 block text-sm font-medium text-[#102E49]">Employment Type (optional)</label>
          <select
            id="employmentType"
            value={values.employmentType}
            onChange={(event) => handleChange('employmentType', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
          >
            <option value="">Select employment type</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Business owner">Business owner</option>
            <option value="Professional">Professional</option>
          </select>
        </div>

        <div>
          <label htmlFor="contactMethod" className="mb-2 block text-sm font-medium text-[#102E49]">Preferred Contact Method *</label>
          <select
            id="contactMethod"
            value={values.contactMethod}
            onChange={(event) => handleChange('contactMethod', event.target.value)}
            className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
            aria-invalid={Boolean(errors.contactMethod)}
            aria-describedby={errors.contactMethod ? 'contactMethod-error' : undefined}
          >
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
          </select>
          {errors.contactMethod && <p id="contactMethod-error" className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.contactMethod}</p>}
        </div>
      </div>

      <p role="note" className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 shrink-0" size={16} />
        For better loan eligibility, your credit score should be greater than 700. Final approval is subject to lender assessment.
      </p>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-[#102E49]">Brief Description of Requirement (optional)</label>
        <textarea
          id="description"
          rows={4}
          value={values.description}
          onChange={(event) => handleChange('description', event.target.value)}
          className="w-full rounded-2xl border border-[#EAD8C8] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#EF7622] focus:ring-2 focus:ring-[#FFF1E5]"
          placeholder="Tell us a little about your requirement and timeline."
        />
      </div>

      <div className="rounded-2xl border border-[#FFF1E5] bg-[#FFF8F2] p-4">
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => handleChange('consent', event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#EAD8C8] text-[#EF7622] focus:ring-[#EF7622]"
          />
          <span>
            I agree to the privacy policy and understand that this enquiry is for information and loan guidance purposes only.
          </span>
        </label>
        {errors.consent && <p className="mt-2 flex items-center gap-2 text-xs text-red-600"><AlertCircle size={14} />{errors.consent}</p>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EF7622] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D66516] disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? <><Loader2 className="animate-spin" size={16} /> Sending enquiry...</> : 'Submit Enquiry'}
        </button>
        <p className="text-xs text-slate-500">{validationHint}</p>
      </div>

      {isSuccess && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#BEE7D1] bg-[#ECFDF5] p-4">
          <CheckCircle2 className="mt-0.5 text-[#16865C]" size={18} />
          <div>
            <p className="text-sm font-semibold text-[#16865C]">Enquiry submitted successfully</p>
            <p className="text-sm text-slate-600">{submissionMessage}</p>
          </div>
        </div>
      )}
      {submissionError && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <p>{submissionMessage}</p>
        </div>
      )}
    </form>
  );
}
