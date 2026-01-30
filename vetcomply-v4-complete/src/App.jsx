import { useState } from 'react';
import { 
  LayoutDashboard, Calendar, FolderOpen, Award, GraduationCap, 
  Settings, ClipboardCheck, Bell, Plus, ChevronRight,
  AlertTriangle, CheckCircle, Clock, FileText, Upload, X,
  Building2, Users, Shield, Menu, User,
  TrendingUp, AlertCircle, ChevronDown, Eye, Download, Trash2,
  Edit, ExternalLink, Search, Mail, CalendarPlus, Package,
  Globe, Copy, Info, Send, BookOpen, Pill, Stethoscope,
  RefreshCw, HelpCircle, MessageCircle, Phone, MapPin, Zap
} from 'lucide-react';

// ============================================================================
// CUSTOM SVG ICONS FOR EQUIPMENT - These render actual SVG graphics
// ============================================================================
const XRayIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <rect x="10" y="15" width="60" height="50" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5"/>
    <rect x="18" y="23" width="44" height="30" rx="3" fill="#0284c7"/>
    <circle cx="40" cy="38" r="10" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2"/>
    <path d="M40 28v20M30 38h20" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="25" y="58" width="30" height="6" rx="2" fill="#0284c7"/>
    <circle cx="55" cy="61" r="2.5" fill="#22d3ee"/>
    <circle cx="25" cy="61" r="2.5" fill="#22d3ee"/>
  </svg>
);

const DentalXRayIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <ellipse cx="40" cy="40" rx="24" ry="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
    <path d="M28 24c0 10 5 15 12 15s12-5 12-15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
    <rect x="35" y="39" width="10" height="20" rx="3" fill="#fbbf24"/>
    <circle cx="40" cy="22" r="4" fill="#f59e0b"/>
    <path d="M22 56l6-6M58 56l-6-6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="40" cy="48" r="3" fill="#f59e0b"/>
  </svg>
);

const PortableXRayIcon = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <rect x="20" y="10" width="40" height="44" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
    <rect x="26" y="18" width="28" height="22" rx="3" fill="#16a34a"/>
    <circle cx="40" cy="29" r="7" fill="#86efac"/>
    <rect x="30" y="45" width="20" height="5" rx="2" fill="#16a34a"/>
    <rect x="35" y="54" width="10" height="14" fill="#16a34a"/>
    <circle cx="30" cy="70" r="5" fill="#16a34a" stroke="#dcfce7" strokeWidth="2"/>
    <circle cx="50" cy="70" r="5" fill="#16a34a" stroke="#dcfce7" strokeWidth="2"/>
    <path d="M40 29l-4-4M40 29l4-4M40 29l-4 4M40 29l4 4" stroke="#16a34a" strokeWidth="1.5"/>
  </svg>
);

// Radiation icon component
const RadiationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

// Map equipment types to their icons
const getEquipmentIcon = (type) => {
  switch(type) {
    case 'Diagnostic X-ray': return <XRayIcon />;
    case 'Dental Radiography': return <DentalXRayIcon />;
    case 'Mobile Radiography': return <PortableXRayIcon />;
    default: return <XRayIcon />;
  }
};

// ============================================================================
// INITIAL DATA
// ============================================================================
const initialLicences = [
  { id: 1, type: 'Hospital Licence', holder: 'Northside Veterinary Hospital', number: 'VH-2024-1847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Authorises operation of a veterinary hospital in NSW' },
  { id: 2, type: 'Radiation Management Licence', holder: 'Northside Veterinary Hospital', number: 'RML-NSW-4521', issued: '2024-03-15', expires: '2027-03-14', status: 'compliant', notes: '', regulatoryBody: 'EPA', description: 'Permits the management of radiation apparatus' },
  { id: 3, type: 'Veterinary Practitioner', holder: 'Dr. Sarah Johnson', number: 'VET-12847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 4, type: 'Veterinary Practitioner', holder: 'Dr. Michael Smith', number: 'VET-14392', issued: '2025-07-01', expires: '2026-01-26', status: 'overdue', notes: 'Renewal submitted - awaiting confirmation', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 5, type: 'Veterinary Practitioner', holder: 'Dr. Emily Chen', number: 'VET-15678', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 6, type: 'Radiation User Licence', holder: 'Dr. Sarah Johnson', number: 'RUL-IA21-8834', issued: '2024-06-15', expires: '2027-06-14', status: 'compliant', notes: '', regulatoryBody: 'EPA', description: 'Authorises individual use of radiation apparatus' },
  { id: 7, type: 'Radiation User Licence', holder: 'Nurse Kate Williams', number: 'RUL-IA23S-9912', issued: '2025-04-28', expires: '2026-04-27', status: 'attention', notes: 'Renewal reminder sent', regulatoryBody: 'EPA', description: 'Authorises individual use of radiation apparatus' },
];

const initialDocuments = [
  { id: 1, name: 'Hospital Licence 2025-26.pdf', category: 'Hospital Licence', uploaded: '2025-07-01', expires: '2026-06-30', size: '245 KB', regulatoryBody: 'VPB' },
  { id: 2, name: 'Radiation Management Plan.pdf', category: 'Radiation Safety', uploaded: '2024-03-15', expires: null, size: '1.2 MB', regulatoryBody: 'EPA' },
  { id: 3, name: 'Dr Johnson - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-06-30', size: '89 KB', regulatoryBody: 'VPB' },
  { id: 4, name: 'Dr Smith - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-01-26', size: '91 KB', regulatoryBody: 'VPB' },
  { id: 5, name: 'X-ray Compliance Certificate.pdf', category: 'Radiation Safety', uploaded: '2024-02-21', expires: '2026-02-21', size: '156 KB', regulatoryBody: 'EPA' },
  { id: 6, name: 'S8 Drug Register Audit.pdf', category: 'Controlled Substances', uploaded: '2025-09-15', expires: null, size: '78 KB', regulatoryBody: 'NSW Health' },
  { id: 7, name: 'AVA Conference 2025 Certificate.pdf', category: 'Professional Development', uploaded: '2025-05-20', expires: null, size: '125 KB', regulatoryBody: 'AVA' },
  { id: 8, name: 'Emergency Medicine Workshop.pdf', category: 'Professional Development', uploaded: '2025-08-25', expires: null, size: '98 KB', regulatoryBody: 'Sydney Uni' },
  { id: 9, name: 'Surgical Masterclass Certificate.pdf', category: 'Professional Development', uploaded: '2025-03-15', expires: null, size: '112 KB', regulatoryBody: 'ASAV' },
  { id: 10, name: 'Dermatology Webinar Certificate.pdf', category: 'Professional Development', uploaded: '2025-10-20', expires: null, size: '94 KB', regulatoryBody: 'VIN' },
  { id: 11, name: 'Radiation Safety Training.pdf', category: 'Professional Development', uploaded: '2024-05-10', expires: '2029-05-10', size: '187 KB', regulatoryBody: 'EPA' },
];

const initialCpdRecords = [
  { id: 1, name: 'Dr. Sarah Johnson', registrationNumber: 'VET-12847', email: 'sarah.johnson@northsidevet.com.au', totalPoints: 48, required: 60, structured: 18, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 1, title: 'AVA Annual Conference 2025', points: 12, type: 'structured', date: '2025-05-15', provider: 'AVA', certificate: true },
    { id: 2, title: 'Emergency Medicine Workshop', points: 6, type: 'structured', date: '2025-08-22', provider: 'Sydney Uni', certificate: true },
    { id: 3, title: 'Journal Reading', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 4, title: 'In-house Training', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 2, name: 'Dr. Michael Smith', registrationNumber: 'VET-14392', email: 'michael.smith@northsidevet.com.au', totalPoints: 52, required: 60, structured: 22, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 5, title: 'Surgical Masterclass', points: 16, type: 'structured', date: '2025-03-10', provider: 'ASAV', certificate: true },
    { id: 6, title: 'Pharmacology Course', points: 6, type: 'structured', date: '2025-09-05', provider: 'VetEducation', certificate: true },
    { id: 7, title: 'Case Study Reviews', points: 20, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 8, title: 'Peer Discussions', points: 10, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 3, name: 'Dr. Emily Chen', registrationNumber: 'VET-15678', email: 'emily.chen@northsidevet.com.au', totalPoints: 61, required: 60, structured: 24, unstructured: 37, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 9, title: 'ASAV Conference 2025', points: 14, type: 'structured', date: '2025-06-20', provider: 'ASAV', certificate: true },
    { id: 10, title: 'Dermatology Webinar', points: 10, type: 'structured', date: '2025-10-15', provider: 'VIN', certificate: true },
    { id: 11, title: 'Research Publication', points: 22, type: 'unstructured', date: '2025-07-30', provider: '', certificate: false },
    { id: 12, title: 'Mentoring', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
];

const initialEquipment = [
  { id: 1, name: 'X-ray Unit - Main Theatre', type: 'Diagnostic X-ray', model: 'Fujifilm VXR-40', serial: 'FVX-2022-4851', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Theatre 1', notes: 'EPA inspection booked Feb 15', regulatoryBody: 'EPA' },
  { id: 2, name: 'Dental X-ray Unit', type: 'Dental Radiography', model: 'iM3 CR7', serial: 'IM3-2023-1124', lastInspection: '2023-08-15', nextInspection: '2028-08-15', status: 'compliant', location: 'Dental Suite', notes: '', regulatoryBody: 'EPA' },
  { id: 3, name: 'Portable X-ray', type: 'Mobile Radiography', model: 'MinXray HF100', serial: 'MXR-2021-8876', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Storage Room A', notes: 'Inspect with main unit', regulatoryBody: 'EPA' },
];

const initialChecklist = [
  { id: 1, section: 'Premises & Facilities', item: 'Reception area clean and welcoming', completed: true, regulatoryBody: 'VPB' },
  { id: 2, section: 'Premises & Facilities', item: 'Consulting rooms meet size requirements', completed: true, regulatoryBody: 'VPB' },
  { id: 3, section: 'Premises & Facilities', item: 'Surgery room appropriately equipped', completed: true, regulatoryBody: 'VPB' },
  { id: 4, section: 'Premises & Facilities', item: 'Adequate animal holding facilities', completed: true, regulatoryBody: 'VPB' },
  { id: 5, section: 'Premises & Facilities', item: 'Isolation facility available', completed: false, regulatoryBody: 'VPB' },
  { id: 6, section: 'Equipment', item: 'Anaesthetic equipment calibrated', completed: true, regulatoryBody: 'VPB' },
  { id: 7, section: 'Equipment', item: 'Monitoring equipment available', completed: true, regulatoryBody: 'VPB' },
  { id: 8, section: 'Equipment', item: 'Radiography equipment compliant', completed: false, regulatoryBody: 'EPA' },
  { id: 9, section: 'Equipment', item: 'Sterilisation equipment validated', completed: true, regulatoryBody: 'VPB' },
  { id: 10, section: 'Records', item: 'Clinical records meet requirements', completed: true, regulatoryBody: 'VPB' },
  { id: 11, section: 'Records', item: 'S8 drug register maintained', completed: true, regulatoryBody: 'NSW Health' },
  { id: 12, section: 'Records', item: 'Consent forms used appropriately', completed: true, regulatoryBody: 'VPB' },
  { id: 13, section: 'Staffing', item: 'Superintendent responsibilities understood', completed: true, regulatoryBody: 'VPB' },
  { id: 14, section: 'Staffing', item: 'All vets currently registered', completed: false, regulatoryBody: 'VPB' },
  { id: 15, section: 'Staffing', item: 'Adequate staff supervision', completed: true, regulatoryBody: 'VPB' },
];

const initialCalendarEvents = [
  { id: 1, title: 'Dr. Smith Registration Overdue', date: '2026-01-26', type: 'overdue', category: 'Registration' },
  { id: 2, title: 'X-ray Inspection Due', date: '2026-02-21', type: 'attention', category: 'Radiation' },
  { id: 3, title: 'S8 Stock Check', date: '2026-03-31', type: 'upcoming', category: 'Controlled Substances' },
  { id: 4, title: 'Radiation Licence Renewal', date: '2026-04-27', type: 'upcoming', category: 'Radiation' },
  { id: 5, title: 'Hospital Licence Renewal', date: '2026-06-30', type: 'upcoming', category: 'Hospital' },
];

const initialNotifications = [
  { id: 1, title: 'Registration Overdue', message: "Dr. Smith's VPB registration expired", time: '2 hours ago', read: false, type: 'error' },
  { id: 2, title: 'Inspection Due Soon', message: 'X-ray inspection due in 23 days', time: '1 day ago', read: false, type: 'warning' },
  { id: 3, title: 'Licence Expiring', message: 'Nurse Williams licence expires in 89 days', time: '3 days ago', read: true, type: 'info' },
];

// ============================================================================
// REGULATORY CONTACTS DATA - For the Contacts page
// ============================================================================
const regulatoryContacts = [
  { id: 'vpb', name: 'NSW Veterinary Practitioners Board', shortName: 'VPB', color: 'blue', icon: Stethoscope, phone: '(02) 8338 1177', email: 'admin@vpb.nsw.gov.au', address: 'Level 7, 12 Mount Street, North Sydney NSW 2060', hours: 'Mon-Fri 9:00am - 5:00pm', website: 'https://www.vpb.nsw.gov.au', description: 'Registration, CPD, Hospital Licences' },
  { id: 'epa', name: 'EPA NSW', shortName: 'EPA', color: 'orange', icon: Zap, phone: '(02) 9995 5700', email: 'eConnect.EPA@epa.nsw.gov.au', address: '4 Parramatta Square, Parramatta NSW 2150', hours: 'Mon-Fri 8:30am - 5:00pm', website: 'https://www.epa.nsw.gov.au', description: 'Radiation Licences, Equipment' },
  { id: 'apvma', name: 'APVMA', shortName: 'APVMA', color: 'green', icon: Pill, phone: '1300 700 583', email: 'enquiries@apvma.gov.au', address: 'Symonston ACT 2609', hours: 'Mon-Fri 9:00am - 5:00pm', website: 'https://www.apvma.gov.au', description: 'Veterinary Medicines' },
  { id: 'safescript', name: 'SafeScript NSW', shortName: 'SafeScript', color: 'purple', icon: Shield, phone: '1800 563 766', email: 'MOH-SafeScript@health.nsw.gov.au', address: '73 Miller St, North Sydney NSW 2060', hours: '24/7 online', website: 'https://www.safescript.nsw.gov.au', description: 'S8 Prescription Monitoring' },
  { id: 'pharma', name: 'NSW Pharmaceutical Services', shortName: 'Pharma Services', color: 'red', icon: Pill, phone: '(02) 9391 9944', email: 'pharmaceutical@health.nsw.gov.au', address: 'Locked Bag 961, North Sydney NSW 2059', hours: 'Mon-Fri 8:30am - 4:30pm', website: 'https://www.health.nsw.gov.au', description: 'S8 Authorities, Loss/Theft' },
];

// ============================================================================
// FAQ DATA - For the Chatbot
// ============================================================================
const faqData = [
  { id: 1, category: 'Registration', question: 'When do I need to renew my VPB registration?', answer: 'VPB registration must be renewed annually by 30 June. You can start the renewal process from 1 May. Late renewals incur additional fees.' },
  { id: 2, category: 'Registration', question: 'What happens if my registration expires?', answer: 'If your registration expires, you cannot legally practice veterinary science in NSW. You will need to apply for restoration with additional fees.' },
  { id: 3, category: 'CPD', question: 'How many CPD points do I need?', answer: 'You need 60 CPD points over each 3-year period. At least 20 must be structured (conferences, courses) and no more than 40 unstructured.' },
  { id: 4, category: 'CPD', question: 'What counts as structured vs unstructured CPD?', answer: 'Structured: formal courses, conferences, workshops with certificates. Unstructured: journal reading, case discussions, mentoring, self-directed learning.' },
  { id: 5, category: 'Radiation', question: 'Do I need a licence to take X-rays?', answer: 'Yes. Anyone operating X-ray machines needs a Radiation User Licence from EPA. The practice also needs a Radiation Management Licence.' },
  { id: 6, category: 'Radiation', question: 'How often is radiation equipment inspected?', answer: 'Radiation equipment must be inspected every 2 years by an approved tester. Results must be kept for 5 years minimum.' },
  { id: 7, category: 'Controlled Substances', question: 'How often do I need S8 stock checks?', answer: 'S8 drugs must be counted and reconciled every 6 months (March and September). Discrepancies must be investigated and documented.' },
  { id: 8, category: 'Controlled Substances', question: 'What if S8 drugs are stolen or lost?', answer: 'Report to NSW Police immediately, then notify Pharmaceutical Services within 7 days. Document in your S8 register.' },
  { id: 9, category: 'Hospital Licence', question: 'What is the self-assessment checklist?', answer: 'A VPB requirement covering premises, equipment, records, staffing, and emergency procedures. Complete annually with licence renewal.' },
  { id: 10, category: 'Hospital Licence', question: 'Who can be a hospital superintendent?', answer: 'A registered veterinarian responsible for professional standards. Must be on-site or readily available during operating hours.' },
];

// ============================================================================
// CARD INFO DATA - For the Info Buttons on Dashboard
// ============================================================================
const cardInfoData = {
  controlledSubstances: { title: 'Controlled Substances', description: 'Monitors S8 drug compliance including bi-annual stock checks, register maintenance, and reporting.', regulatoryBody: 'NSW Health / Pharmaceutical Services', requirements: ['Bi-annual stock check (March & September)', 'Accurate S8 drug register', 'Secure storage', 'Loss/theft reporting within 7 days'] },
  radiationSafety: { title: 'Radiation Safety', description: 'Tracks radiation equipment, inspections, user licences, and management licences under the Radiation Control Act.', regulatoryBody: 'EPA NSW', requirements: ['Equipment inspection every 2 years', 'Valid User Licences for all operators', 'Radiation Management Licence', 'Current Radiation Management Plan'] },
  hospitalLicence: { title: 'Hospital Licence', description: 'Covers hospital licence status, annual renewal, self-assessment compliance, and superintendent requirements.', regulatoryBody: 'NSW Veterinary Practitioners Board', requirements: ['Annual renewal by 30 June', 'Completed self-assessment', 'Appointed superintendent', 'Adequate facilities'] },
  registration: { title: 'Practitioner Registration', description: 'Monitors individual veterinarian registration ensuring all practitioners are authorised to practice in NSW.', regulatoryBody: 'NSW Veterinary Practitioners Board', requirements: ['Annual registration renewal', 'CPD compliance', 'Good standing', 'Current contact details'] },
  cpd: { title: 'CPD Compliance', description: 'Tracks Continuing Professional Development points against the 60-point triennial requirement.', regulatoryBody: 'NSW Veterinary Practitioners Board', requirements: ['60 points per 3-year period', 'Minimum 20 structured points', 'Maximum 40 unstructured', 'Records kept 5 years'] },
};

// Practice info
const practiceInfo = { name: 'Northside Veterinary Hospital', address: '123 Main Street, Northside NSW 2000', superintendent: 'Dr. Sarah Johnson' };

// Utility functions
const calculateDaysUntil = (dateStr) => {
  const today = new Date('2026-01-29');
  const target = new Date(dateStr);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};
const formatDate = (dateStr) => !dateStr ? '—' : new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
const getStatusFromDays = (days) => days < 0 ? 'overdue' : days < 30 ? 'attention' : 'compliant';


// ============================================================================
// BASE COMPONENTS
// ============================================================================
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-slideIn`}>
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} className="text-slate-500" /></button>
          </div>
          <div className="p-5 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = { compliant: 'bg-emerald-50 text-emerald-700 border-emerald-200', attention: 'bg-amber-50 text-amber-700 border-amber-200', overdue: 'bg-red-50 text-red-700 border-red-200', upcoming: 'bg-blue-50 text-blue-700 border-blue-200' };
  const labels = { compliant: 'Compliant', attention: 'Attention', overdue: 'Overdue', upcoming: 'Upcoming' };
  return <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>{labels[status]}</span>;
};

const RegulatoryBadge = ({ body }) => {
  const colors = { 'VPB': 'bg-blue-100 text-blue-700', 'EPA': 'bg-orange-100 text-orange-700', 'NSW Health': 'bg-purple-100 text-purple-700', 'APVMA': 'bg-green-100 text-green-700', 'AVA': 'bg-teal-100 text-teal-700', 'ASAV': 'bg-indigo-100 text-indigo-700', 'Sydney Uni': 'bg-red-100 text-red-700', 'VIN': 'bg-pink-100 text-pink-700' };
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors[body] || 'bg-slate-100 text-slate-700'}`}>{body}</span>;
};

const FormField = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
    {children}
  </div>
);

const Input = (props) => <input className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" {...props} />;
const Select = ({ options, placeholder, ...props }) => (
  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" {...props}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);
const Textarea = (props) => <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 resize-none" rows={3} {...props} />;

// ============================================================================
// INFO BUTTON - Clickable info icon for dashboard cards
// ============================================================================
const InfoButton = ({ onClick }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }} 
    className="p-1.5 hover:bg-white/50 rounded-full transition-colors"
    title="More information"
  >
    <Info size={16} className="text-slate-400 hover:text-teal-600" />
  </button>
);

// ============================================================================
// CARD INFO MODAL - Shows info when clicking info button
// ============================================================================
const CardInfoModal = ({ isOpen, onClose, infoKey }) => {
  const info = cardInfoData[infoKey];
  if (!info) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={info.title}>
      <div className="space-y-4">
        <p className="text-slate-600">{info.description}</p>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Building2 size={18} className="text-teal-600" />
            <span className="font-medium text-slate-800">Regulatory Body</span>
          </div>
          <p className="text-slate-700">{info.regulatoryBody}</p>
        </div>
        <div>
          <h4 className="font-medium text-slate-800 mb-2">Key Requirements</h4>
          <ul className="space-y-2">
            {info.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

// ============================================================================
// FAQ CHATBOT - Floating chat button and window
// ============================================================================
const FAQChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [...new Set(faqData.map(f => f.category))];
  const filteredFaqs = searchTerm 
    ? faqData.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedCategory ? faqData.filter(f => f.category === selectedCategory) : [];
  
  const resetChat = () => { setSelectedCategory(null); setSelectedQuestion(null); setSearchTerm(''); };
  
  return (
    <>
      {/* Floating Chat Button - Always visible */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-40"
      >
        <MessageCircle size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">?</span>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 animate-slideIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">VetComply Help</h3>
                  <p className="text-teal-100 text-sm">Frequently Asked Questions</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search FAQs..." 
                value={searchTerm} 
                onChange={e => { setSearchTerm(e.target.value); setSelectedCategory(null); setSelectedQuestion(null); }} 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500" 
              />
            </div>
            
            {/* Category Selection */}
            {!selectedCategory && !searchTerm && (
              <>
                <p className="text-slate-600 text-sm mb-4">Select a topic:</p>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)} 
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors"
                    >
                      <span className="font-medium text-slate-700">{cat}</span>
                      <ChevronRight size={18} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {/* Questions List */}
            {(selectedCategory || searchTerm) && !selectedQuestion && (
              <>
                {selectedCategory && (
                  <button onClick={resetChat} className="flex items-center gap-2 text-teal-600 text-sm mb-4 hover:text-teal-700">
                    <ChevronDown size={16} className="rotate-90" /> Back
                  </button>
                )}
                <div className="space-y-2">
                  {filteredFaqs.length > 0 ? filteredFaqs.map(faq => (
                    <button 
                      key={faq.id} 
                      onClick={() => setSelectedQuestion(faq)} 
                      className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <p className="text-sm font-medium text-slate-700">{faq.question}</p>
                    </button>
                  )) : <p className="text-slate-500 text-sm text-center py-4">No matching questions</p>}
                </div>
              </>
            )}
            
            {/* Answer Display */}
            {selectedQuestion && (
              <>
                <button onClick={() => setSelectedQuestion(null)} className="flex items-center gap-2 text-teal-600 text-sm mb-4 hover:text-teal-700">
                  <ChevronDown size={16} className="rotate-90" /> Back
                </button>
                <div className="bg-teal-50 rounded-xl p-4 mb-4">
                  <p className="font-medium text-teal-800">{selectedQuestion.question}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedQuestion.answer}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 border-t bg-slate-50">
            <p className="text-xs text-slate-500 text-center">Visit the Contacts page for regulatory body details</p>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// DOCUMENT PREVIEW MODAL - Shows formatted document templates
// ============================================================================
const DocumentPreviewModal = ({ isOpen, onClose, document }) => {
  if (!document) return null;
  
  const getDocumentContent = () => {
    if (document.category === 'Registration' || document.name.includes('VPB Certificate')) {
      return `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           NSW VETERINARY PRACTITIONERS BOARD                   ║
║              CERTIFICATE OF REGISTRATION                       ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  This is to certify that                                       ║
║                                                                ║
║          ${document.name.replace(' - VPB Certificate.pdf', '').replace('.pdf', '').padEnd(40)}        ║
║                                                                ║
║  is registered as a VETERINARY PRACTITIONER                    ║
║  under the Veterinary Practice Act 2003 (NSW)                  ║
║                                                                ║
║  Registration Period: 1 July 2025 to 30 June 2026              ║
║  Category: General Registration                                ║
║                                                                ║
║  This certificate is subject to the conditions                 ║
║  of the Veterinary Practice Act 2003.                          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
                     NSW Veterinary Practitioners Board
                     Level 7, 12 Mount Street
                     North Sydney NSW 2060`;
    } else if (document.category === 'Hospital Licence') {
      return `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           NSW VETERINARY PRACTITIONERS BOARD                   ║
║              VETERINARY HOSPITAL LICENCE                       ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  LICENCE HOLDER: Northside Veterinary Hospital                 ║
║                                                                ║
║  PREMISES: 123 Main Street, Northside NSW 2000                 ║
║                                                                ║
║  LICENCE NUMBER: VH-2024-1847                                  ║
║  LICENCE PERIOD: 1 July 2025 to 30 June 2026                   ║
║  CATEGORY: Veterinary Hospital                                 ║
║                                                                ║
║  SUPERINTENDENT: Dr. Sarah Johnson (VET-12847)                 ║
║                                                                ║
║  This licence is granted under Section 34 of the               ║
║  Veterinary Practice Act 2003 (NSW)                            ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝`;
    } else if (document.category === 'Radiation Safety') {
      return `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           NSW ENVIRONMENT PROTECTION AUTHORITY                 ║
║                   RADIATION LICENCE                            ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  LICENCE NUMBER: RML-NSW-4521                                  ║
║                                                                ║
║  LICENCE HOLDER: Northside Veterinary Hospital                 ║
║                                                                ║
║  LICENCE TYPE: Radiation Management Licence                    ║
║  LICENCE CLASS: Veterinary Diagnostic                          ║
║                                                                ║
║  AUTHORISED ACTIVITIES:                                        ║
║  • Operation of diagnostic X-ray apparatus                     ║
║  • Veterinary diagnostic imaging                               ║
║                                                                ║
║  Issued under the Radiation Control Act 1990 (NSW)             ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
                     EPA NSW | www.epa.nsw.gov.au`;
    } else if (document.category === 'Professional Development') {
      return `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║               CERTIFICATE OF ATTENDANCE                        ║
║          Continuing Professional Development                   ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  This is to certify that the participant has                   ║
║  successfully completed:                                       ║
║                                                                ║
║  "${document.name.replace('.pdf', '')}"
║                                                                ║
║  Provider: ${document.regulatoryBody.padEnd(45)}              ║
║  Date: ${formatDate(document.uploaded).padEnd(48)}            ║
║                                                                ║
║  This activity has been approved for CPD points                ║
║  by the relevant professional body.                            ║
║                                                                ║
║  Certificate should be retained for minimum 5 years.           ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝`;
    } else {
      return `
Document: ${document.name}
Category: ${document.category}
Uploaded: ${formatDate(document.uploaded)}
Regulatory Body: ${document.regulatoryBody}

[Document preview not available for this category]`;
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Preview" size="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-slate-600" />
            <div>
              <h3 className="font-semibold text-slate-800">{document.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <RegulatoryBadge body={document.regulatoryBody} />
                <span className="text-sm text-slate-500">{document.size}</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            <Download size={16} /> Download
          </button>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-green-400 whitespace-pre overflow-x-auto max-h-96 overflow-y-auto">
          {getDocumentContent()}
        </div>
      </div>
    </Modal>
  );
};

// ============================================================================
// SIDEBAR AND HEADER
// ============================================================================
const Sidebar = ({ activeView, setActiveView, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Phone, isNew: true },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'licences', label: 'Licences', icon: Award },
    { id: 'cpd', label: 'CPD Tracker', icon: GraduationCap },
    { id: 'equipment', label: 'Equipment', icon: Zap },
    { id: 'checklist', label: 'Self-Assessment', icon: ClipboardCheck },
  ];
  
  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">VetComply</span>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveView(item.id); setIsMobileOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                  {item.label}
                  {item.isNew && <span className="ml-auto px-1.5 py-0.5 bg-teal-500 text-white text-xs rounded-full">New</span>}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                <User size={18} className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">Northside Vet</p>
                <p className="text-xs text-slate-500 truncate">admin@northsidevet.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ title, subtitle, setIsMobileOpen, notifications, onNotificationsClick, onSettingsClick }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
            <Menu size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-800">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNotificationsClick} className="p-2.5 hover:bg-slate-100 rounded-xl relative">
            <Bell size={20} className="text-slate-600" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">{unreadCount}</span>}
          </button>
          <button onClick={onSettingsClick} className="p-2.5 hover:bg-slate-100 rounded-xl">
            <Settings size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// NOTIFICATIONS PANEL
// ============================================================================
const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkRead }) => {
  if (!isOpen) return null;
  const getIcon = (type) => type === 'error' ? <AlertCircle size={16} className="text-red-500" /> : type === 'warning' ? <AlertTriangle size={16} className="text-amber-500" /> : <Info size={16} className="text-blue-500" />;
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 animate-slideIn">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-slate-800">Notifications</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} className="text-slate-500" /></button>
      </div>
      <div className="overflow-y-auto h-full pb-20">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`} onClick={() => onMarkRead(n.id)}>
            <div className="flex gap-3">{getIcon(n.type)}<div><p className="font-medium text-slate-800 text-sm">{n.title}</p><p className="text-slate-600 text-sm mt-1">{n.message}</p><p className="text-slate-400 text-xs mt-2">{n.time}</p></div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// SETTINGS MODAL
// ============================================================================
const SettingsModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Practice Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Practice Name"><Input defaultValue={practiceInfo.name} /></FormField>
          <FormField label="Address"><Input defaultValue={practiceInfo.address} /></FormField>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Notifications</h3>
        <div className="space-y-3">
          {['30 days before expiry', '14 days before expiry', '7 days before expiry'].map((label, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-teal-600" />
              <span className="text-slate-700">Email reminder {label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Save</button>
      </div>
    </div>
  </Modal>
);

// ============================================================================
// COMPLIANCE CARD - With Info Button
// ============================================================================
const ComplianceCard = ({ data, onClick, onInfoClick }) => {
  const Icon = data.icon;
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${data.status === 'compliant' ? 'bg-emerald-50' : data.status === 'attention' ? 'bg-amber-50' : 'bg-red-50'}`}>
            <Icon size={22} className={data.status === 'compliant' ? 'text-emerald-600' : data.status === 'attention' ? 'text-amber-600' : 'text-red-600'} />
          </div>
          <h3 className="font-semibold text-slate-800">{data.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {/* INFO BUTTON - Click to see card details */}
          <InfoButton onClick={() => onInfoClick(data.infoKey)} />
          <StatusBadge status={data.status} />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {data.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {item.status === 'compliant' || item.status === 'completed' ? <CheckCircle size={14} className="text-emerald-500" /> : item.status === 'attention' || item.status === 'upcoming' ? <Clock size={14} className="text-amber-500" /> : <AlertCircle size={14} className="text-red-500" />}
            <span className="text-slate-600 truncate">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400 uppercase tracking-wide">{data.regulatoryBody}</span>
        {data.daysUntil !== null && (
          <span className={`text-sm font-medium ${data.daysUntil < 0 ? 'text-red-600' : data.daysUntil < 30 ? 'text-amber-600' : 'text-slate-600'}`}>
            {data.daysUntil < 0 ? `${Math.abs(data.daysUntil)}d overdue` : `${data.daysUntil}d`}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD VIEW - With Info Buttons on Cards
// ============================================================================
const DashboardView = ({ licences, cpdRecords, equipment, checklist, setActiveView, onInfoClick }) => {
  const complianceData = {
    controlledSubstances: { 
      status: 'compliant', 
      title: 'Controlled Substances', 
      icon: Shield, 
      infoKey: 'controlledSubstances', 
      regulatoryBody: 'NSW Health', 
      daysUntil: 61, 
      items: [
        { name: 'March Stock Check', status: 'completed' }, 
        { name: 'September Stock Check', status: 'upcoming' }, 
        { name: 'Drug Register Current', status: 'compliant' }
      ] 
    },
    radiationSafety: { 
      status: equipment.some(e => e.status === 'attention') ? 'attention' : 'compliant', 
      title: 'Radiation Safety', 
      icon: Zap, 
      infoKey: 'radiationSafety', 
      regulatoryBody: 'EPA', 
      daysUntil: 23, 
      items: equipment.map(e => ({ name: e.name, status: e.status })) 
    },
    hospitalLicence: { 
      status: 'compliant', 
      title: 'Hospital Licence', 
      icon: Building2, 
      infoKey: 'hospitalLicence', 
      regulatoryBody: 'VPB', 
      daysUntil: 152, 
      items: [
        { name: 'Licence Current', status: 'compliant' }, 
        { name: 'Superintendent Appointed', status: 'compliant' }, 
        { name: 'Self-Assessment', status: checklist.every(c => c.completed) ? 'compliant' : 'attention' }
      ] 
    },
    registration: { 
      status: licences.some(l => l.type === 'Veterinary Practitioner' && l.status === 'overdue') ? 'overdue' : 'compliant', 
      title: 'Practitioner Registration', 
      icon: Users, 
      infoKey: 'registration', 
      regulatoryBody: 'VPB', 
      daysUntil: -3, 
      items: licences.filter(l => l.type === 'Veterinary Practitioner').map(l => ({ name: l.holder, status: l.status })) 
    },
    cpd: { 
      status: cpdRecords.every(r => r.totalPoints >= r.required) ? 'compliant' : 'attention', 
      title: 'CPD Compliance', 
      icon: GraduationCap, 
      infoKey: 'cpd', 
      regulatoryBody: 'VPB', 
      daysUntil: 152, 
      items: cpdRecords.map(r => ({ name: `${r.name} (${r.totalPoints}/${r.required} pts)`, status: r.totalPoints >= r.required ? 'compliant' : 'attention' })) 
    },
  };
  
  const totalItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.length, 0);
  const compliantItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'compliant' || i.status === 'completed').length, 0);
  const overallCompliance = Math.round((compliantItems / totalItems) * 100);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl"><TrendingUp size={20} /></div>
            <div><p className="text-3xl font-bold">{overallCompliance}%</p><p className="text-teal-100 text-sm">Overall</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg" onClick={() => setActiveView('licences')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-xl"><AlertCircle size={20} className="text-red-600" /></div>
            <div><p className="text-3xl font-bold text-slate-800">1</p><p className="text-sm text-slate-500">Overdue</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg" onClick={() => setActiveView('equipment')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl"><Clock size={20} className="text-amber-600" /></div>
            <div><p className="text-3xl font-bold text-slate-800">2</p><p className="text-sm text-slate-500">Attention</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg" onClick={() => setActiveView('licences')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl"><CheckCircle size={20} className="text-emerald-600" /></div>
            <div><p className="text-3xl font-bold text-slate-800">{licences.filter(l => l.status === 'compliant').length}</p><p className="text-sm text-slate-500">Active</p></div>
          </div>
        </div>
      </div>
      
      {/* Compliance Cards - Each has Info Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(complianceData).map(([key, data]) => (
          <ComplianceCard 
            key={key} 
            data={data} 
            onClick={() => setActiveView(key === 'radiationSafety' ? 'equipment' : key === 'hospitalLicence' || key === 'registration' ? 'licences' : key === 'cpd' ? 'cpd' : 'checklist')} 
            onInfoClick={onInfoClick} 
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// CONTACTS VIEW - NEW: Regulatory body contact information
// ============================================================================
const ContactsView = () => {
  const colorStyles = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', iconBg: 'bg-blue-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', iconBg: 'bg-orange-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', iconBg: 'bg-green-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', iconBg: 'bg-purple-100' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', iconBg: 'bg-red-100' },
  };
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Regulatory Contacts</h2>
        <p className="text-slate-300">Contact information for all NSW veterinary regulatory bodies</p>
      </div>
      
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {regulatoryContacts.map((contact) => {
          const Icon = contact.icon;
          const styles = colorStyles[contact.color];
          return (
            <div key={contact.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              {/* Card Header */}
              <div className={`${styles.bg} p-4 border-b ${styles.border}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${styles.iconBg} rounded-xl`}>
                    <Icon size={24} className={styles.text} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{contact.shortName}</h3>
                    <p className="text-sm text-slate-600">{contact.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-5 space-y-4">
                <p className="text-sm text-slate-600">{contact.description}</p>
                
                <div className="space-y-3">
                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                      <a href={`tel:${contact.phone}`} className="font-medium text-slate-800 hover:text-teal-600">{contact.phone}</a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                      <a href={`mailto:${contact.email}`} className="font-medium text-slate-800 hover:text-teal-600 break-all">{contact.email}</a>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Address</p>
                      <p className="text-slate-700">{contact.address}</p>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Hours</p>
                      <p className="text-slate-700">{contact.hours}</p>
                    </div>
                  </div>
                </div>
                
                {/* Website Button */}
                <a 
                  href={contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors mt-4"
                >
                  <ExternalLink size={16} /> Visit Website
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// DOCUMENTS VIEW - With Professional Development Section
// ============================================================================
const DocumentsView = ({ documents, onPreview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const categories = [...new Set(documents.map(d => d.category))];
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (!filterCategory || doc.category === filterCategory)
  );
  
  // Separate Professional Development documents
  const cpdDocs = filteredDocs.filter(d => d.category === 'Professional Development');
  const otherDocs = filteredDocs.filter(d => d.category !== 'Professional Development');
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500" 
            />
          </div>
          <Select 
            options={[{ value: '', label: 'All Categories' }, ...categories.map(c => ({ value: c, label: c }))]} 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)} 
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
          <Upload size={16} /> Upload
        </button>
      </div>
      
      {/* PROFESSIONAL DEVELOPMENT SECTION - Purple themed */}
      {cpdDocs.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <GraduationCap size={20} className="text-purple-600" /> 
            Professional Development Certificates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cpdDocs.map(doc => (
              <div 
                key={doc.id} 
                onClick={() => onPreview(doc)} 
                className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all border border-purple-100"
              >
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText size={20} className="text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <RegulatoryBadge body={doc.regulatoryBody} />
                    <span className="text-xs text-slate-500">{formatDate(doc.uploaded)}</span>
                  </div>
                </div>
                <Eye size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Other Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-slate-600">Document</th>
              <th className="text-left p-4 text-sm font-medium text-slate-600">Category</th>
              <th className="text-left p-4 text-sm font-medium text-slate-600 hidden md:table-cell">Uploaded</th>
              <th className="text-left p-4 text-sm font-medium text-slate-600 hidden lg:table-cell">Expires</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {otherDocs.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-slate-400" />
                    <div>
                      <span className="font-medium text-slate-800">{doc.name}</span>
                      <div className="mt-1"><RegulatoryBadge body={doc.regulatoryBody} /></div>
                    </div>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">{doc.category}</span></td>
                <td className="p-4 text-slate-600 hidden md:table-cell">{formatDate(doc.uploaded)}</td>
                <td className="p-4 hidden lg:table-cell">{doc.expires ? formatDate(doc.expires) : '—'}</td>
                <td className="p-4">
                  <button onClick={() => onPreview(doc)} className="p-2 hover:bg-slate-100 rounded-xl">
                    <Eye size={16} className="text-slate-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// EQUIPMENT VIEW - With Custom SVG Icons
// ============================================================================
const EquipmentView = ({ equipment }) => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
          <Plus size={16} /> Add Equipment
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map(item => {
          const daysUntil = calculateDaysUntil(item.nextInspection);
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              {/* Equipment Icon - CUSTOM SVG */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-center">
                <div className="w-24 h-24">
                  {getEquipmentIcon(item.type)}
                </div>
              </div>
              
              {/* Equipment Details */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <RegulatoryBadge body={item.regulatoryBody} />
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Model</span>
                    <span className="text-slate-800">{item.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location</span>
                    <span className="text-slate-800">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Inspection</span>
                    <span className={daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>
                      {formatDate(item.nextInspection)}
                    </span>
                  </div>
                </div>
                
                {item.notes && (
                  <p className="text-sm text-amber-700 p-2 bg-amber-50 rounded-lg mb-4">{item.notes}</p>
                )}
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50">Details</button>
                  <button className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50">Edit</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// LICENCES VIEW
// ============================================================================
const LicencesView = ({ licences }) => {
  const [filterType, setFilterType] = useState('');
  const types = [...new Set(licences.map(l => l.type))];
  const filteredLicences = licences.filter(l => !filterType || l.type === filterType);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Select 
          options={[{ value: '', label: 'All Types' }, ...types.map(t => ({ value: t, label: t }))]} 
          value={filterType} 
          onChange={e => setFilterType(e.target.value)} 
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
          <Plus size={16} /> Add Licence
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLicences.map(licence => {
          const daysUntil = calculateDaysUntil(licence.expires);
          return (
            <div key={licence.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-800">{licence.type}</h3>
                  <p className="text-sm text-slate-500">{licence.holder}</p>
                </div>
                <StatusBadge status={licence.status} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <RegulatoryBadge body={licence.regulatoryBody} />
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Number</span>
                  <span className="font-medium text-slate-800">{licence.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expires</span>
                  <span className={daysUntil < 0 ? 'text-red-600 font-medium' : daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>
                    {formatDate(licence.expires)}
                  </span>
                </div>
              </div>
              {licence.notes && <p className="text-sm text-amber-700 p-2 bg-amber-50 rounded-lg mb-4">{licence.notes}</p>}
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50">View</button>
                <button className="flex-1 px-3 py-2 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded-xl hover:bg-teal-100">Renew</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// CPD VIEW
// ============================================================================
const CPDView = ({ cpdRecords }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
          <Plus size={16} /> Log Activity
        </button>
      </div>
      
      <div className="space-y-4">
        {cpdRecords.map(record => {
          const isExpanded = expandedId === record.id;
          const progress = Math.round((record.totalPoints / record.required) * 100);
          const isCompliant = record.totalPoints >= record.required;
          
          return (
            <div key={record.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : record.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                      <User size={24} className="text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{record.name}</h3>
                      <p className="text-sm text-slate-500">{record.registrationNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-800">{record.totalPoints}<span className="text-sm text-slate-500">/{record.required}</span></p>
                    </div>
                    <StatusBadge status={isCompliant ? 'compliant' : 'attention'} />
                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${isCompliant ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Structured: {record.structured}</span>
                    <span>Unstructured: {record.unstructured}</span>
                    <span>Period ends: {formatDate(record.periodEnd)}</span>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 bg-slate-50">
                  <div className="space-y-2">
                    {record.activities.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'structured' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {activity.type === 'structured' ? <BookOpen size={14} /> : <Users size={14} />}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{activity.title}</p>
                            <p className="text-sm text-slate-500">{formatDate(activity.date)} {activity.provider && `• ${activity.provider}`}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {activity.certificate && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">Certificate</span>}
                          <span className="font-semibold text-slate-800">{activity.points} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// CALENDAR VIEW
// ============================================================================
const CalendarView = ({ events }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date('2026-01-01'));
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };
  
  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };
  
  const days = getDaysInMonth(selectedMonth);
  const monthName = selectedMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))} className="p-2 hover:bg-slate-100 rounded-xl">
            <ChevronDown size={20} className="text-slate-600 rotate-90" />
          </button>
          <h2 className="text-lg font-semibold text-slate-800 min-w-[160px] text-center">{monthName}</h2>
          <button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))} className="p-2 hover:bg-slate-100 rounded-xl">
            <ChevronDown size={20} className="text-slate-600 -rotate-90" />
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
          <Plus size={16} /> Add Event
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-slate-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = getEventsForDay(day);
            const isToday = day === 29 && selectedMonth.getMonth() === 0;
            return (
              <div key={idx} className={`min-h-[100px] p-2 border-b border-r border-slate-100 ${day ? 'hover:bg-slate-50' : 'bg-slate-50'}`}>
                {day && (
                  <>
                    <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isToday ? 'bg-teal-600 text-white font-bold' : 'text-slate-700'}`}>{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div key={event.id} className={`text-xs p-1.5 rounded-lg cursor-pointer truncate ${event.type === 'overdue' ? 'bg-red-100 text-red-700' : event.type === 'attention' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CHECKLIST VIEW
// ============================================================================
const ChecklistView = ({ checklist, onToggle }) => {
  const sections = [...new Set(checklist.map(c => c.section))];
  const totalItems = checklist.length;
  const completedItems = checklist.filter(c => c.completed).length;
  const progress = Math.round((completedItems / totalItems) * 100);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800">Self-Assessment Progress</h3>
            <p className="text-sm text-slate-500">{completedItems} of {totalItems} items completed</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full transition-all ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      {sections.map(section => {
        const sectionItems = checklist.filter(c => c.section === section);
        const sectionCompleted = sectionItems.filter(c => c.completed).length;
        return (
          <div key={section} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">{section}</h4>
              <span className="text-sm text-slate-500">{sectionCompleted}/{sectionItems.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {sectionItems.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer" onClick={() => onToggle(item.id)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                    {item.completed && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.item}</p>
                      <RegulatoryBadge body={item.regulatoryBody} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  // Navigation state
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Data state
  const [licences] = useState(initialLicences);
  const [documents] = useState(initialDocuments);
  const [cpdRecords] = useState(initialCpdRecords);
  const [equipment] = useState(initialEquipment);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [calendarEvents] = useState(initialCalendarEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Modal state
  const [cardInfoModal, setCardInfoModal] = useState({ open: false, infoKey: null });
  const [documentPreviewModal, setDocumentPreviewModal] = useState({ open: false, document: null });
  
  // View configuration
  const viewConfig = {
    dashboard: { title: 'Dashboard', subtitle: 'Overview of your compliance status' },
    contacts: { title: 'Regulatory Contacts', subtitle: 'Contact information for regulatory bodies' },
    calendar: { title: 'Calendar', subtitle: 'Upcoming deadlines and reminders' },
    documents: { title: 'Documents', subtitle: 'Manage compliance documents' },
    licences: { title: 'Licences', subtitle: 'Track licences and registrations' },
    cpd: { title: 'CPD Tracker', subtitle: 'Continuing professional development' },
    equipment: { title: 'Equipment', subtitle: 'Radiation equipment compliance' },
    checklist: { title: 'Self-Assessment', subtitle: 'Hospital licence checklist' },
  };
  
  // Handlers
  const handleMarkNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const handleToggleChecklist = (itemId) => {
    setChecklist(checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item));
  };
  
  const handleInfoClick = (infoKey) => {
    setCardInfoModal({ open: true, infoKey });
  };
  
  const handleDocumentPreview = (document) => {
    setDocumentPreviewModal({ open: true, document });
  };
  
  // Render current view
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView 
          licences={licences} 
          cpdRecords={cpdRecords} 
          equipment={equipment} 
          checklist={checklist} 
          setActiveView={setActiveView} 
          onInfoClick={handleInfoClick} 
        />;
      case 'contacts':
        return <ContactsView />;
      case 'calendar':
        return <CalendarView events={calendarEvents} />;
      case 'documents':
        return <DocumentsView documents={documents} onPreview={handleDocumentPreview} />;
      case 'licences':
        return <LicencesView licences={licences} />;
      case 'cpd':
        return <CPDView cpdRecords={cpdRecords} />;
      case 'equipment':
        return <EquipmentView equipment={equipment} />;
      case 'checklist':
        return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <Header 
          title={viewConfig[activeView].title} 
          subtitle={viewConfig[activeView].subtitle} 
          setIsMobileOpen={setIsMobileOpen} 
          notifications={notifications} 
          onNotificationsClick={() => setShowNotifications(!showNotifications)} 
          onSettingsClick={() => setShowSettings(true)} 
        />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>
      
      {/* FAQ CHATBOT - Floating button bottom-right */}
      <FAQChatbot />
      
      {/* Panels */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        notifications={notifications} 
        onMarkRead={handleMarkNotificationRead} 
      />
      
      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* Card Info Modal - Opens when clicking info button on dashboard cards */}
      <CardInfoModal 
        isOpen={cardInfoModal.open} 
        onClose={() => setCardInfoModal({ open: false, infoKey: null })} 
        infoKey={cardInfoModal.infoKey} 
      />
      
      {/* Document Preview Modal - Shows formatted document templates */}
      <DocumentPreviewModal 
        isOpen={documentPreviewModal.open} 
        onClose={() => setDocumentPreviewModal({ open: false, document: null })} 
        document={documentPreviewModal.document} 
      />
    </div>
  );
}
