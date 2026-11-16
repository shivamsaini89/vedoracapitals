import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HandCoins,
  Landmark,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export type NavItem = {
  label: string;
  to: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  useCases: string[];
  eligibility: string[];
  documents: string[];
  icon: LucideIcon;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Loan Services', to: '/services' },
  { label: 'Loan Calculator', to: '/loan-calculator' },
  { label: 'Eligibility Checker', to: '/eligibility-checker' },
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact', to: '/contact' },
];

export const services: ServiceItem[] = [
  {
    id: 'personal-loan',
    title: 'Personal Loan',
    description: 'Flexible support for planned or unexpected personal financial needs with a clearer understanding of options.',
    useCases: ['Medical needs', 'Travel', 'Family commitments', 'Home-related improvements'],
    eligibility: ['Income stability and repayment capacity', 'Relevant employment or business profile', 'Adherence to the lender’s criteria'],
    documents: ['Identity proof', 'Address proof', 'Income documents', 'Recent bank statements'],
    icon: HandCoins,
  },
  {
    id: 'home-loan',
    title: 'Home Loan',
    description: 'Helpful guidance for homeowners and home buyers exploring financing options aligned with their goals.',
    useCases: ['Buying a home', 'Home extension', 'Property purchase', 'Balance transfer consideration'],
    eligibility: ['Stable income profile', 'Property and borrower information', 'Appropriate documentation as requested by the lender'],
    documents: ['Identity and address proof', 'Property-related documents', 'Income records', 'Employment details'],
    icon: Building2,
  },
  {
    id: 'car-loan',
    title: 'Car Loan',
    description: 'Evaluate financing options for personal or professional vehicle purchases with clear, informed guidance.',
    useCases: ['New car purchase', 'Used vehicle purchase', 'Commercial mobility', 'Replacement of existing transport'],
    eligibility: ['Suitable applicant profile', 'Vehicle and purchase details', 'Income and repayment assessment'],
    documents: ['Identity proof', 'Income records', 'Vehicle details', 'Address proof'],
    icon: CarFront,
  },
  {
    id: 'business-loan',
    title: 'Business Loan',
    description: 'Support for working capital, expansion plans, or business requirements through informed loan enquiry discussions.',
    useCases: ['Working capital', 'Equipment purchase', 'Inventory planning', 'Business expansion'],
    eligibility: ['Business profile and cash flow health', 'Applicable lender requirements', 'Relevant operational history'],
    documents: ['Business registration details', 'Financial statements', 'Income and tax records', 'Banking history'],
    icon: BriefcaseBusiness,
  },
  {
    id: 'education-loan',
    title: 'Education Loan',
    description: 'Explore financing options that may help with academic expenses and student-focused borrowing requirements.',
    useCases: ['Tuition and course fees', 'Study abroad plans', 'Academic programmes', 'Education-related expenses'],
    eligibility: ['Course and institution details', 'Applicant profile', 'Relevant lender criteria'],
    documents: ['Identity proof', 'Admission or course details', 'Financial records', 'Academic documentation'],
    icon: GraduationCap,
  },
];

export const whyChooseUs = [
  {
    title: 'Personalised Assistance',
    description: 'We help you understand the loan journey in a way that suits your requirements and priorities.',
    icon: Users,
  },
  {
    title: 'Transparent Communication',
    description: 'Clear explanations around process, paperwork, and next steps help you make informed decisions.',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Simple Enquiry Process',
    description: 'A straightforward form and guided response process make it easier to begin the conversation.',
    icon: ClipboardCheck,
  },
  {
    title: 'Support Through the Journey',
    description: 'We stay focused on explaining available options and helping you understand the relevant next steps.',
    icon: ShieldCheck,
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Share Your Requirements',
    description: 'Submit a basic enquiry describing your loan needs and the goal you are trying to address.',
  },
  {
    title: 'Discuss Your Options',
    description: 'Our team reviews the enquiry and discusses potentially suitable lending options and pathways.',
  },
  {
    title: 'Understand the Requirements',
    description: 'Learn about relevant eligibility criteria, documents, and general terms before moving ahead.',
  },
  {
    title: 'Proceed With the Appropriate Lender',
    description: 'Continue with the applicable lender’s process, subject to eligibility and approval processes.',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'What types of loans can I enquire about?',
    answer: 'You can enquire about personal loans, home loans, car loans, business loans, and education loans, depending on your requirements and the relevant lenders available for the profile.',
  },
  {
    question: 'How does the enquiry process work?',
    answer: 'You share your basic requirements through the enquiry form or a direct contact request. Our team reviews the information and helps explain what options may be relevant before you proceed with the lender’s process.',
  },
  {
    question: 'What information should I provide?',
    answer: 'The most helpful information includes your city, loan purpose, estimated requirement, employment type, and a brief summary of your needs. This helps the team understand the context and guide you appropriately.',
  },
  {
    question: 'What documents might be required?',
    answer: 'Depending on the loan type and lender, typical documents may include identity and address proof, income evidence, employment details, and other supporting records. These are indicative and vary by lender and applicant profile.',
  },
  {
    question: 'Does submitting an enquiry guarantee loan approval?',
    answer: 'No. Submitting an enquiry is not a loan approval. Final eligibility, interest rates, fees, and terms are determined by the relevant lender after assessing the applicant’s profile and documentation.',
  },
  {
    question: 'How can I contact your team?',
    answer: 'You can submit an enquiry through the contact page or use the listed contact details on our website when available. Final contact information should be confirmed before use.',
  },
];

export const companyHighlights = [
  'Personalised Guidance',
  'Clear Process',
  'Support at Every Step',
];

export const trustPoints = [
  {
    title: 'Responsible guidance',
    description: 'We focus on informed conversations and realistic expectations around borrowing decisions.',
    icon: Sparkles,
  },
  {
    title: 'Transparent process',
    description: 'We explain what is typically required so the enquiry journey feels familiar and manageable.',
    icon: FileText,
  },
  {
    title: 'Lender-focused journey',
    description: 'Eligibility, pricing, and terms vary with the lender and applicant, so we keep the discussion honest.',
    icon: Landmark,
  },
  {
    title: 'Clear next steps',
    description: 'You understand the steps involved before you proceed with a lender or application process.',
    icon: CheckCircle2,
  },
];

export const serviceHighlights = [
  'Flexible enquiry support',
  'Loan type guidance',
  'Requirement review',
  'Documentation clarity',
];

export const heroStats = [
  { label: 'Loan categories', value: '5+' },
  { label: 'Support approach', value: 'Guided' },
  { label: 'Process', value: 'Clear & simple' },
];

export const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Loan Services', to: '/services' },
  { label: 'Loan Calculator', to: '/loan-calculator' },
  { label: 'Eligibility Checker', to: '/eligibility-checker' },
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Contact', to: '/contact' },
];

export const loanFooterLinks = services.map((service) => ({
  label: service.title,
  to: `/services#${service.id}`,
}));

export const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export const companyMeta = {
  name: 'Vedora Capital Services Private Limited',
  shortDescription: 'A modern lending support service focused on clear guidance, transparent conversations, and practical next steps for informed loan enquiries.',
};

export const contactPlaceholders = {
  phone: 'Phone: +91-9911256474',
  email: 'Email: info@vedoracapital.in',
  address: '65, 2nd Floor, Sector 62, Noida 201301',
};

export const siteTagline = 'Financial solutions made simple';
export const serviceIntro = 'Understand your options and find a solution suited to your requirements.';
export const enquiryPrompt = 'Tell us what you need, and our team can help you understand the available options.';
export const safeSubmissionNotice = 'Your enquiry is used to respond to your request. Please do not include passwords, OTPs, or document numbers.';

export const defaultContactMethod = 'Phone';

export const loanOptions = services.map((service) => service.title);

export const sectionTitleClass = 'text-3xl font-extrabold tracking-[-0.06em] text-[#0B2D5C] md:text-4xl';
export const sectionSubtitleClass = 'mt-3 max-w-2xl text-base text-slate-600 md:text-lg';
export const accentRingClass = 'ring-1 ring-[#DCE7F5] shadow-[0_10px_30px_rgba(11,45,92,0.06)]';
export const primaryButtonClass = 'inline-flex items-center justify-center rounded-full bg-[#2463EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d52ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2463EB] focus-visible:ring-offset-2';
export const secondaryButtonClass = 'inline-flex items-center justify-center rounded-full border border-[#DCE7F5] bg-white px-5 py-3 text-sm font-semibold text-[#0B2D5C] transition hover:border-[#2463EB] hover:text-[#2463EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2463EB] focus-visible:ring-offset-2';
export const mutedButtonClass = 'inline-flex items-center justify-center rounded-full bg-[#EAF3FF] px-4 py-2.5 text-sm font-medium text-[#0B2D5C] transition hover:bg-[#dfeeff]';
export const cardBaseClass = `rounded-[28px] border border-[#DCE7F5] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(36,99,235,0.08)]`;
export const iconWrapClass = 'flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2463EB]';
