const loanTypes = new Set(['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan']);
const employmentTypes = new Set(['', 'Salaried', 'Self-employed', 'Business owner', 'Professional']);
const contactMethods = new Set(['Phone', 'Email']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value, maxLength, allowNewlines = false) {
  if (typeof value !== 'string') return '';
  const cleaned = [...value].map((character) => {
    const code = character.charCodeAt(0);
    const preserveLineBreak = allowNewlines && (code === 9 || code === 10 || code === 13);
    return code < 32 || code === 127
      ? preserveLineBreak ? character : ' '
      : character;
  }).join('').trim();
  return cleaned.slice(0, maxLength);
}

export function validateEnquiry(body) {
  const fullName = cleanText(body.fullName, 100);
  const mobileNumber = cleanText(body.mobileNumber, 24).replace(/[\s()-]/g, '');
  const email = cleanText(body.email, 254).toLowerCase();
  const city = cleanText(body.city, 100);
  const loanType = cleanText(body.loanType, 60);
  const approxLoan = cleanText(body.approxLoan, 80);
  const netSalary = cleanText(body.netSalary, 9);
  const employmentType = cleanText(body.employmentType, 40);
  const contactMethod = cleanText(body.contactMethod, 20);
  const description = cleanText(body.description, 1000, true);
  const submissionId = cleanText(body.submissionId, 80);

  if (!fullName || !city || !loanType || !contactMethod || body.consent !== true) {
    throw new Error('Please complete all required fields and confirm the privacy notice.');
  }
  if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(mobileNumber)) {
    throw new Error('Please enter a valid Indian mobile number.');
  }
  if (email && !emailPattern.test(email)) throw new Error('Please enter a valid email address.');
  if (!loanTypes.has(loanType)) throw new Error('Please select a valid loan type.');
  if (!employmentTypes.has(employmentType)) throw new Error('Please select a valid employment type.');
  if (!contactMethods.has(contactMethod)) throw new Error('Please select a valid contact method.');
  if (netSalary && !/^\d{1,9}$/.test(netSalary)) throw new Error('Enter net monthly salary as whole rupees, without commas.');
  if (!/^[\w-]{20,80}$/.test(submissionId)) throw new Error('Could not verify this submission. Please try again.');

  return {
    fullName,
    mobileNumber,
    email,
    city,
    loanType,
    approxLoan,
    netSalary,
    employmentType,
    contactMethod,
    description,
    submissionId,
  };
}

export function hasHoneypotValue(body) {
  return Boolean(cleanText(body.website, 200));
}