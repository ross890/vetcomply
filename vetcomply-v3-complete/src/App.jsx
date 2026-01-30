import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Calendar, FolderOpen, Award, GraduationCap, 
  Settings, ClipboardCheck, Bell, Plus, ChevronRight,
  AlertTriangle, CheckCircle, Clock, FileText, Upload, X,
  Building2, Users, Shield, Menu, User,
  TrendingUp, AlertCircle, ChevronDown, Eye, Download, Trash2,
  Edit, ExternalLink, Search, Mail, CalendarPlus, Package,
  Globe, Copy, CheckSquare, Info, Send,
  BookOpen, Radiation, Pill, Stethoscope,
  RefreshCw, HelpCircle, FileCheck, MessageCircle,
  Phone, MapPin, ChevronUp,
} from 'lucide-react';

// ==================== EQUIPMENT SVG ICONS ====================
const EquipmentIcons = {
  'Diagnostic X-ray': () => (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <rect x="10" y="15" width="60" height="50" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5"/>
      <rect x="18" y="23" width="44" height="30" rx="3" fill="#0284c7"/>
      <circle cx="40" cy="38" r="10" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2"/>
      <path d="M40 28v20M30 38h20" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="25" y="58" width="30" height="6" rx="2" fill="#0284c7"/>
      <circle cx="55" cy="61" r="2.5" fill="#22d3ee"/>
      <circle cx="25" cy="61" r="2.5" fill="#22d3ee"/>
    </svg>
  ),
  'Dental Radiography': () => (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <ellipse cx="40" cy="40" rx="24" ry="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
      <path d="M28 24c0 10 5 15 12 15s12-5 12-15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"/>
      <rect x="35" y="39" width="10" height="20" rx="3" fill="#fbbf24"/>
      <circle cx="40" cy="22" r="4" fill="#f59e0b"/>
      <path d="M22 56l6-6M58 56l-6-6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="40" cy="48" r="3" fill="#f59e0b"/>
    </svg>
  ),
  'Mobile Radiography': () => (
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
  ),
};

// ==================== INITIAL DATA ====================
const initialLicences = [
  { id: 1, type: 'Hospital Licence', holder: 'Northside Veterinary Hospital', number: 'VH-2024-1847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Authorises operation of a veterinary hospital in NSW under the Veterinary Practice Act 2003' },
  { id: 2, type: 'Radiation Management Licence', holder: 'Northside Veterinary Hospital', number: 'RML-NSW-4521', issued: '2024-03-15', expires: '2027-03-14', status: 'compliant', notes: '', regulatoryBody: 'EPA', description: 'Permits the management of radiation apparatus for diagnostic imaging' },
  { id: 3, type: 'Veterinary Practitioner', holder: 'Dr. Sarah Johnson', number: 'VET-12847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 4, type: 'Veterinary Practitioner', holder: 'Dr. Michael Smith', number: 'VET-14392', issued: '2025-07-01', expires: '2026-01-26', status: 'overdue', notes: 'Renewal submitted - awaiting confirmation', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 5, type: 'Veterinary Practitioner', holder: 'Dr. Emily Chen', number: 'VET-15678', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '', regulatoryBody: 'VPB', description: 'Registration to practice veterinary science in NSW' },
  { id: 6, type: 'Radiation User Licence', holder: 'Dr. Sarah Johnson', number: 'RUL-IA21-8834', issued: '2024-06-15', expires: '2027-06-14', status: 'compliant', notes: '', regulatoryBody: 'EPA', description: 'Authorises individual use of radiation apparatus' },
  { id: 7, type: 'Radiation User Licence', holder: 'Nurse Kate Williams', number: 'RUL-IA23S-9912', issued: '2025-04-28', expires: '2026-04-27', status: 'attention', notes: 'Renewal reminder sent', regulatoryBody: 'EPA', description: 'Authorises individual use of radiation apparatus' },
];

const initialDocuments = [
  { id: 1, name: 'Hospital Licence 2025-26.pdf', category: 'Hospital Licence', uploaded: '2025-07-01', expires: '2026-06-30', size: '245 KB', linkedTo: { type: 'licence', id: 1 }, regulatoryBody: 'VPB' },
  { id: 2, name: 'Radiation Management Plan.pdf', category: 'Radiation Safety', uploaded: '2024-03-15', expires: null, size: '1.2 MB', linkedTo: null, regulatoryBody: 'EPA' },
  { id: 3, name: 'Dr Johnson - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-06-30', size: '89 KB', linkedTo: { type: 'licence', id: 3 }, regulatoryBody: 'VPB' },
  { id: 4, name: 'Dr Smith - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-01-26', size: '91 KB', linkedTo: { type: 'licence', id: 4 }, regulatoryBody: 'VPB' },
  { id: 5, name: 'X-ray Compliance Certificate.pdf', category: 'Radiation Safety', uploaded: '2024-02-21', expires: '2026-02-21', size: '156 KB', linkedTo: { type: 'equipment', id: 1 }, regulatoryBody: 'EPA' },
  { id: 6, name: 'S8 Drug Register Audit - March 2026.pdf', category: 'Controlled Substances', uploaded: '2026-03-15', expires: null, size: '78 KB', linkedTo: null, regulatoryBody: 'NSW Health' },
  { id: 7, name: 'Self Assessment Checklist 2025.pdf', category: 'Hospital Licence', uploaded: '2025-11-15', expires: null, size: '234 KB', linkedTo: null, regulatoryBody: 'VPB' },
  { id: 8, name: 'AVA Conference 2025 - Certificate.pdf', category: 'Professional Development', uploaded: '2025-05-20', expires: null, size: '125 KB', linkedTo: { type: 'cpd', id: 1 }, regulatoryBody: 'AVA' },
  { id: 9, name: 'Emergency Medicine Workshop Certificate.pdf', category: 'Professional Development', uploaded: '2025-08-25', expires: null, size: '98 KB', linkedTo: { type: 'cpd', id: 2 }, regulatoryBody: 'Sydney University' },
  { id: 10, name: 'Surgical Masterclass Certificate.pdf', category: 'Professional Development', uploaded: '2025-03-15', expires: null, size: '112 KB', linkedTo: { type: 'cpd', id: 5 }, regulatoryBody: 'ASAV' },
  { id: 11, name: 'ASAV Conference 2025 Certificate.pdf', category: 'Professional Development', uploaded: '2025-06-25', expires: null, size: '134 KB', linkedTo: { type: 'cpd', id: 9 }, regulatoryBody: 'ASAV' },
  { id: 12, name: 'Radiation Safety Course - Dr Johnson.pdf', category: 'Professional Development', uploaded: '2024-05-10', expires: '2029-05-10', size: '187 KB', linkedTo: { type: 'licence', id: 6 }, regulatoryBody: 'EPA' },
];

const initialCpdRecords = [
  { id: 1, name: 'Dr. Sarah Johnson', registrationNumber: 'VET-12847', email: 'sarah.johnson@northsidevet.com.au', totalPoints: 48, required: 60, structured: 18, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 1, title: 'AVA Annual Conference 2025', points: 12, type: 'structured', date: '2025-05-15', provider: 'AVA', certificate: true, documentId: 8 },
    { id: 2, title: 'Emergency Medicine Workshop', points: 6, type: 'structured', date: '2025-08-22', provider: 'Sydney Uni', certificate: true, documentId: 9 },
    { id: 3, title: 'Journal Reading - Various', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 4, title: 'In-house Training Sessions', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 2, name: 'Dr. Michael Smith', registrationNumber: 'VET-14392', email: 'michael.smith@northsidevet.com.au', totalPoints: 52, required: 60, structured: 22, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 5, title: 'Surgical Techniques Masterclass', points: 16, type: 'structured', date: '2025-03-10', provider: 'ASAV', certificate: true, documentId: 10 },
    { id: 6, title: 'Online Pharmacology Course', points: 6, type: 'structured', date: '2025-09-05', provider: 'VetEducation', certificate: true },
    { id: 7, title: 'Case Study Reviews', points: 20, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 8, title: 'Peer Discussions', points: 10, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 3, name: 'Dr. Emily Chen', registrationNumber: 'VET-15678', email: 'emily.chen@northsidevet.com.au', totalPoints: 61, required: 60, structured: 24, unstructured: 37, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 9, title: 'ASAV Conference 2025', points: 14, type: 'structured', date: '2025-06-20', provider: 'ASAV', certificate: true, documentId: 11 },
    { id: 10, title: 'Dermatology Webinar Series', points: 10, type: 'structured', date: '2025-10-15', provider: 'VIN', certificate: true },
    { id: 11, title: 'Research Publication', points: 22, type: 'unstructured', date: '2025-07-30', provider: '', certificate: false },
    { id: 12, title: 'Mentoring Junior Vets', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
];

const initialEquipment = [
  { id: 1, name: 'X-ray Unit - Main Theatre', type: 'Diagnostic X-ray', model: 'Fujifilm VXR-40', serial: 'FVX-2022-4851', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Theatre 1', notes: 'EPA inspection booked for Feb 15', regulatoryBody: 'EPA', description: 'Primary diagnostic radiography unit for general imaging' },
  { id: 2, name: 'Dental X-ray Unit', type: 'Dental Radiography', model: 'iM3 CR7', serial: 'IM3-2023-1124', lastInspection: '2023-08-15', nextInspection: '2028-08-15', status: 'compliant', location: 'Dental Suite', notes: '', regulatoryBody: 'EPA', description: 'Dedicated dental radiography for oral examinations' },
  { id: 3, name: 'Portable X-ray', type: 'Mobile Radiography', model: 'MinXray HF100', serial: 'MXR-2021-8876', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Storage Room A', notes: 'To be inspected with main unit', regulatoryBody: 'EPA', description: 'Mobile unit for field and emergency imaging' },
];

const initialChecklist = [
  { id: 1, section: 'Premises & Facilities', item: 'Reception area clean and welcoming', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 2, section: 'Premises & Facilities', item: 'Consulting rooms meet minimum size requirements', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 3, section: 'Premises & Facilities', item: 'Surgery/procedure room appropriately equipped', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 4, section: 'Premises & Facilities', item: 'Adequate animal holding facilities', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 5, section: 'Premises & Facilities', item: 'Isolation facility available', completed: false, notes: 'Currently using separate ward - need dedicated isolation room', regulatoryBody: 'VPB' },
  { id: 6, section: 'Equipment', item: 'Anaesthetic equipment maintained and calibrated', completed: true, notes: 'Service due April 2026', regulatoryBody: 'VPB' },
  { id: 7, section: 'Equipment', item: 'Monitoring equipment available (ECG, pulse ox, etc.)', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 8, section: 'Equipment', item: 'Radiography equipment compliant', completed: false, notes: 'Inspection due February 2026', regulatoryBody: 'EPA' },
  { id: 9, section: 'Equipment', item: 'Sterilisation equipment validated', completed: true, notes: 'Autoclave validation completed Nov 2025', regulatoryBody: 'VPB' },
  { id: 10, section: 'Records & Documentation', item: 'Clinical records meet requirements', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 11, section: 'Records & Documentation', item: 'S8 drug register maintained correctly', completed: true, notes: 'Using Vet S8 electronic system', regulatoryBody: 'NSW Health' },
  { id: 12, section: 'Records & Documentation', item: 'Consent forms used appropriately', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 13, section: 'Staffing', item: 'Superintendent responsibilities understood', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 14, section: 'Staffing', item: 'All veterinarians currently registered', completed: false, notes: 'Dr Smith registration overdue', regulatoryBody: 'VPB' },
  { id: 15, section: 'Staffing', item: 'Adequate supervision of support staff', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 16, section: 'Emergency Procedures', item: 'Emergency protocols documented', completed: true, notes: '', regulatoryBody: 'VPB' },
  { id: 17, section: 'Emergency Procedures', item: 'After-hours arrangements adequate', completed: true, notes: 'Partnership with Emergency Vet Centre', regulatoryBody: 'VPB' },
  { id: 18, section: 'Emergency Procedures', item: 'Emergency drug kit maintained', completed: true, notes: 'Checked monthly', regulatoryBody: 'VPB' },
];

const initialCalendarEvents = [
  { id: 1, title: 'Dr. Smith Registration Overdue', date: '2026-01-26', type: 'overdue', category: 'Registration', linkedTo: { type: 'licence', id: 4 } },
  { id: 2, title: 'X-ray Inspection Due', date: '2026-02-21', type: 'attention', category: 'Radiation', linkedTo: { type: 'equipment', id: 1 } },
  { id: 3, title: 'S8 Stock Check', date: '2026-03-31', type: 'upcoming', category: 'Controlled Substances', linkedTo: null },
  { id: 4, title: 'Radiation Licence Renewal', date: '2026-04-28', type: 'upcoming', category: 'Radiation', linkedTo: { type: 'licence', id: 7 } },
  { id: 5, title: 'Hospital Licence Renewal', date: '2026-06-30', type: 'upcoming', category: 'Hospital', linkedTo: { type: 'licence', id: 1 } },
  { id: 6, title: 'VPB Annual Returns', date: '2026-06-30', type: 'upcoming', category: 'Registration', linkedTo: null },
  { id: 7, title: 'S8 Stock Check', date: '2026-09-30', type: 'upcoming', category: 'Controlled Substances', linkedTo: null },
];

const initialNotifications = [
  { id: 1, title: 'Registration Overdue', message: "Dr. Michael Smith's VPB registration expired 3 days ago", time: '2 hours ago', read: false, type: 'error' },
  { id: 2, title: 'Inspection Due Soon', message: 'X-ray equipment inspection due in 23 days', time: '1 day ago', read: false, type: 'warning' },
  { id: 3, title: 'Licence Expiring', message: 'Nurse Williams radiation licence expires in 89 days', time: '3 days ago', read: true, type: 'info' },
];

// Portal & Regulatory Data
const portalData = {
  vpb: { id: 'vpb', name: 'NSW Veterinary Practitioners Board', shortName: 'VPB', url: 'https://portal.vpb.nsw.gov.au/login', description: 'Vet registration, CPD reporting, hospital licensing, annual returns', icon: Stethoscope, color: 'blue', services: ['Registration Renewal', 'CPD Declaration', 'Hospital Licence', 'Annual Returns'], supportEmail: 'admin@vpb.nsw.gov.au', supportPhone: '(02) 8338 1177', address: 'Level 7, 12 Mount Street, North Sydney NSW 2060', hours: 'Mon-Fri 9:00am - 5:00pm' },
  epa: { id: 'epa', name: 'EPA NSW (Environment Protection Authority)', shortName: 'EPA', url: 'https://apps.epa.nsw.gov.au/epabusinessportal', description: 'Radiation user licences, management licences, equipment registration', icon: Radiation, color: 'orange', services: ['User Licence Application', 'User Licence Renewal', 'Management Licence', 'Equipment Registration'], supportEmail: 'eConnect.EPA@epa.nsw.gov.au', supportPhone: '(02) 9995 5700', address: '4 Parramatta Square, 12 Darcy Street, Parramatta NSW 2150', hours: 'Mon-Fri 8:30am - 5:00pm' },
  apvma: { id: 'apvma', name: 'APVMA (Australian Pesticides and Veterinary Medicines Authority)', shortName: 'APVMA', url: 'https://portal.apvma.gov.au/', description: 'Veterinary medicine registration, permits, adverse event reporting', icon: Pill, color: 'green', services: ['Product Registration', 'Permit Applications', 'Adverse Experience Reports'], supportEmail: 'enquiries@apvma.gov.au', supportPhone: '1300 700 583', address: 'Symonston ACT 2609', hours: 'Mon-Fri 9:00am - 5:00pm AEST' },
  safescript: { id: 'safescript', name: 'SafeScript NSW', shortName: 'SafeScript', url: 'https://www.safescript.nsw.gov.au/', description: 'Schedule 8 prescription monitoring (prescribers and pharmacists)', icon: Shield, color: 'purple', services: ['Patient History Check', 'S8 Authority Applications'], supportEmail: 'MOH-SafeScript@health.nsw.gov.au', supportPhone: '1800 563 766', address: 'NSW Ministry of Health, 73 Miller St, North Sydney', hours: '24/7 online access' },
  pharmaceutical: { id: 'pharmaceutical', name: 'NSW Pharmaceutical Services', shortName: 'Pharma Services', url: 'https://www.health.nsw.gov.au/pharmaceutical/Pages/doctors.aspx', description: 'S8 authorities, drug theft/loss notifications', icon: Pill, color: 'red', services: ['S8 Prescribing Authority', 'Loss/Theft Notification'], supportPhone: '(02) 9391 9944', address: 'Locked Bag 961, North Sydney NSW 2059', hours: 'Mon-Fri 8:30am - 4:30pm' },
};

const submissionChecklists = {
  'vpb-registration-renewal': { title: 'VPB Registration Renewal', portal: 'vpb', estimatedTime: '10-15 minutes', fee: '$495', items: [
    { id: 1, text: 'Log into VPB Portal', required: true, link: 'https://portal.vpb.nsw.gov.au/login' },
    { id: 2, text: 'Verify personal details are current', required: true },
    { id: 3, text: 'Confirm practice address(es)', required: true },
    { id: 4, text: 'Declare CPD compliance for period', required: true },
    { id: 5, text: 'Review and accept declarations', required: true },
    { id: 6, text: 'Pay renewal fee ($495)', required: true },
    { id: 7, text: 'Download and save confirmation', required: false },
    { id: 8, text: 'Upload certificate to VetComply', required: false },
  ], documents: ['Current registration certificate', 'CPD records summary', 'Payment method'], notes: 'Renewal must be completed before 30 June each year. Late renewals incur additional fees.' },
  'epa-user-licence-renewal': { title: 'EPA Radiation User Licence Renewal', portal: 'epa', estimatedTime: '15-20 minutes', fee: '$105', items: [
    { id: 1, text: 'Log into EPA eConnect', required: true, link: 'https://apps.epa.nsw.gov.au/epabusinessportal' },
    { id: 2, text: 'Locate licence renewal notice', required: true },
    { id: 3, text: 'Verify licence conditions are correct', required: true },
    { id: 4, text: 'Confirm radiation safety course still valid', required: true },
    { id: 5, text: 'Update any changed personal details', required: true },
    { id: 6, text: 'Review and submit renewal', required: true },
    { id: 7, text: 'Pay renewal fee ($105)', required: true },
  ], documents: ['Current licence', 'Safety course certificate', 'Payment method'], notes: 'Renewal can be done up to 60 days before expiry.' },
  's8-stock-check': { title: 'S8 Bi-Annual Stock Check', portal: 'pharmaceutical', estimatedTime: '30-60 minutes', fee: 'None', items: [
    { id: 1, text: 'Prepare S8 drug register', required: true },
    { id: 2, text: 'Count physical stock of each S8 substance', required: true },
    { id: 3, text: 'Reconcile counts with register balances', required: true },
    { id: 4, text: 'Investigate and document any discrepancies', required: true },
    { id: 5, text: 'Record stock check in register', required: true },
    { id: 6, text: 'Sign and date the stock check entry', required: true },
  ], documents: ['S8 Drug Register', 'Stock check template'], notes: 'Required in March and September each year. Keep records for minimum 2 years.' },
  'hospital-licence-renewal': { title: 'Hospital Licence Renewal', portal: 'vpb', estimatedTime: '20-30 minutes', fee: '$880', items: [
    { id: 1, text: 'Log into VPB Portal', required: true, link: 'https://portal.vpb.nsw.gov.au/login' },
    { id: 2, text: 'Navigate to Hospital Licence section', required: true },
    { id: 3, text: 'Verify hospital details are current', required: true },
    { id: 4, text: 'Confirm superintendent nomination', required: true },
    { id: 5, text: 'Complete self-assessment checklist', required: true },
    { id: 6, text: 'Upload supporting documentation', required: true },
    { id: 7, text: 'Review and submit renewal', required: true },
    { id: 8, text: 'Pay renewal fee ($880)', required: true },
  ], documents: ['Self-assessment checklist', 'Superintendent details', 'Insurance certificate'], notes: 'Annual renewal. Self-assessment must be completed before renewal submission.' },
};

const practiceInfo = { name: 'Northside Veterinary Hospital', abn: '12 345 678 901', address: '123 Main Street, Northside NSW 2000', phone: '(02) 9555 1234', email: 'admin@northsidevet.com.au', superintendent: 'Dr. Sarah Johnson', superintendentNumber: 'VET-12847' };

// FAQ Data for Chatbot
const faqData = [
  { id: 1, category: 'Registration', question: 'When do I need to renew my VPB registration?', answer: 'VPB registration must be renewed annually by 30 June. You can start the renewal process from 1 May each year. Late renewals incur additional fees and may result in your registration lapsing.' },
  { id: 2, category: 'Registration', question: 'What happens if my registration expires?', answer: 'If your registration expires, you cannot legally practice veterinary science in NSW. You will need to apply for restoration of registration, which involves additional fees and potentially re-meeting registration requirements.' },
  { id: 3, category: 'CPD', question: 'How many CPD points do I need?', answer: 'Veterinarians in NSW need to complete 60 CPD points over each 3-year registration period. At least 20 points must be from structured activities (conferences, courses) and no more than 40 from unstructured activities (reading, peer discussions).' },
  { id: 4, category: 'CPD', question: 'What counts as structured vs unstructured CPD?', answer: 'Structured CPD includes formal courses, conferences, workshops, and webinars with certificates. Unstructured CPD includes journal reading, case discussions, mentoring, and self-directed learning. Structured activities typically award more points per hour.' },
  { id: 5, category: 'Radiation', question: 'Do I need a radiation licence to take X-rays?', answer: 'Yes, anyone operating radiation apparatus (X-ray machines) in NSW needs a Radiation User Licence from the EPA. Additionally, the practice needs a Radiation Management Licence. Both require completing approved radiation safety training.' },
  { id: 6, category: 'Radiation', question: 'How often is radiation equipment inspected?', answer: 'Radiation equipment must be inspected at least every 2 years by an approved tester. The EPA may also conduct random compliance inspections. Results must be kept for at least 5 years.' },
  { id: 7, category: 'Controlled Substances', question: 'How often do I need to do S8 stock checks?', answer: 'S8 controlled substances must be physically counted and reconciled with the drug register at least every 6 months (typically March and September). Any discrepancies must be investigated and documented.' },
  { id: 8, category: 'Controlled Substances', question: 'What do I do if S8 drugs are stolen or lost?', answer: 'Report the theft or loss to NSW Police immediately, then notify NSW Pharmaceutical Services within 7 days using the official notification form. Document the incident in your S8 register and retain all records.' },
  { id: 9, category: 'Hospital Licence', question: 'What is the self-assessment checklist?', answer: 'The self-assessment checklist is a VPB requirement for hospital licence holders. It covers premises, equipment, records, staffing, and emergency procedures. You must complete it annually and submit it with your licence renewal.' },
  { id: 10, category: 'Hospital Licence', question: 'Who can be a hospital superintendent?', answer: 'The superintendent must be a registered veterinarian who takes responsibility for the professional standards of the hospital. They must be on-site or readily available during operating hours and ensure compliance with all regulatory requirements.' },
];

// Card Info Data
const cardInfoData = {
  controlledSubstances: { title: 'Controlled Substances', description: 'Monitors compliance with Schedule 8 (S8) drug management including bi-annual stock checks, drug register maintenance, and reporting requirements.', regulatoryBody: 'NSW Health / Pharmaceutical Services', requirements: ['Bi-annual stock reconciliation (March & September)', 'Accurate S8 drug register', 'Secure storage requirements', 'Loss/theft reporting within 7 days'] },
  radiationSafety: { title: 'Radiation Safety', description: 'Tracks radiation equipment compliance including inspection schedules, user licences, and management licences required under the Radiation Control Act.', regulatoryBody: 'EPA NSW', requirements: ['Equipment inspection every 2 years', 'Valid Radiation User Licences', 'Radiation Management Licence', 'Radiation Management Plan'] },
  hospitalLicence: { title: 'Hospital Licence', description: 'Covers your veterinary hospital licence status, including annual renewal, self-assessment compliance, and superintendent requirements.', regulatoryBody: 'NSW Veterinary Practitioners Board (VPB)', requirements: ['Annual licence renewal by 30 June', 'Completed self-assessment checklist', 'Appointed superintendent', 'Adequate facilities and equipment'] },
  registration: { title: 'Practitioner Registration', description: 'Monitors individual veterinarian registration status with the VPB, ensuring all practitioners are currently authorised to practice in NSW.', regulatoryBody: 'NSW Veterinary Practitioners Board (VPB)', requirements: ['Annual registration renewal', 'CPD compliance', 'Good standing with Board', 'Current contact details'] },
  cpd: { title: 'CPD Compliance', description: 'Tracks Continuing Professional Development points for all registered veterinarians against the 60-point triennial requirement.', regulatoryBody: 'NSW Veterinary Practitioners Board (VPB)', requirements: ['60 points per 3-year period', 'Minimum 20 structured points', 'Maximum 40 unstructured points', 'Records retained for 5 years'] },
};

// Utility Functions
const calculateDaysUntil = (dateStr) => {
  const today = new Date('2026-01-29');
  const target = new Date(dateStr);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

const formatDate = (dateStr) => !dateStr ? '—' : new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
const getStatusFromDays = (days) => days < 0 ? 'overdue' : days < 30 ? 'attention' : 'compliant';

const getRegulatoryBadgeColor = (body) => {
  const colors = { 'VPB': 'bg-blue-100 text-blue-700 border-blue-200', 'EPA': 'bg-orange-100 text-orange-700 border-orange-200', 'NSW Health': 'bg-purple-100 text-purple-700 border-purple-200', 'APVMA': 'bg-green-100 text-green-700 border-green-200', 'AVA': 'bg-teal-100 text-teal-700 border-teal-200', 'ASAV': 'bg-indigo-100 text-indigo-700 border-indigo-200', 'Sydney University': 'bg-red-100 text-red-700 border-red-200' };
  return colors[body] || 'bg-slate-100 text-slate-700 border-slate-200';
};


// ==================== BASE COMPONENTS ====================
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200`}>
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} className="text-slate-500" /></button>
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

const RegulatoryBadge = ({ body }) => (
  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getRegulatoryBadgeColor(body)}`}>{body}</span>
);

const FormField = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
    {children}
  </div>
);

const Input = (props) => <input className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all" {...props} />;
const Select = ({ options, placeholder, ...props }) => (
  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all" {...props}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);
const Textarea = (props) => <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none transition-all" rows={3} {...props} />;

// Info Button Component
const InfoButton = ({ infoKey, onClick }) => (
  <button onClick={() => onClick(infoKey)} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors group" title="More information">
    <Info size={16} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
  </button>
);

// Card Info Modal
const CardInfoModal = ({ isOpen, onClose, infoKey }) => {
  const info = cardInfoData[infoKey];
  if (!info) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={info.title} size="md">
      <div className="space-y-4">
        <p className="text-slate-600">{info.description}</p>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
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

// ==================== CHATBOT COMPONENT ====================
const ChatBot = () => {
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
      {/* Chat Button */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center z-40 group">
        <MessageCircle size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">?</span>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
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
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search FAQs..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setSelectedCategory(null); setSelectedQuestion(null); }} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm" />
            </div>
            
            {!selectedCategory && !searchTerm && (
              <>
                <p className="text-slate-600 text-sm mb-4">Select a topic to get started:</p>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left">
                      <span className="font-medium text-slate-700">{cat}</span>
                      <ChevronRight size={18} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              </>
            )}
            
            {(selectedCategory || searchTerm) && !selectedQuestion && (
              <>
                {selectedCategory && (
                  <button onClick={resetChat} className="flex items-center gap-2 text-teal-600 text-sm mb-4 hover:text-teal-700">
                    <ChevronDown size={16} className="rotate-90" /> Back to topics
                  </button>
                )}
                <div className="space-y-2">
                  {filteredFaqs.map(faq => (
                    <button key={faq.id} onClick={() => setSelectedQuestion(faq)} className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                      <p className="text-sm font-medium text-slate-700">{faq.question}</p>
                    </button>
                  ))}
                  {filteredFaqs.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No matching questions found</p>}
                </div>
              </>
            )}
            
            {selectedQuestion && (
              <>
                <button onClick={() => setSelectedQuestion(null)} className="flex items-center gap-2 text-teal-600 text-sm mb-4 hover:text-teal-700">
                  <ChevronDown size={16} className="rotate-90" /> Back to questions
                </button>
                <div className="bg-teal-50 rounded-xl p-4 mb-4">
                  <p className="font-medium text-teal-800">{selectedQuestion.question}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedQuestion.answer}</p>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  <p className="text-blue-700 text-xs">💡 Need more help? Contact the relevant regulatory body directly via the Contacts page.</p>
                </div>
              </>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">Can't find what you need? Check the Portal Hub for direct links to regulatory bodies.</p>
          </div>
        </div>
      )}
    </>
  );
};

// ==================== DOCUMENT VIEWER MODAL ====================
const DocumentViewerModal = ({ isOpen, onClose, document, documentContent }) => {
  if (!document) return null;
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
          <button className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Download size={16} /> Download
          </button>
        </div>
        <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
          {documentContent || 'Document preview not available'}
        </div>
      </div>
    </Modal>
  );
};

// ==================== FEATURE MODALS ====================
const LicenceModal = ({ isOpen, onClose, licence, onSave }) => {
  const [form, setForm] = useState(licence || { type: '', holder: '', number: '', issued: '', expires: '', notes: '' });
  const licenceTypes = [{ value: 'Hospital Licence', label: 'Hospital Licence' }, { value: 'Radiation Management Licence', label: 'Radiation Management Licence' }, { value: 'Veterinary Practitioner', label: 'Veterinary Practitioner Registration' }, { value: 'Radiation User Licence', label: 'Radiation User Licence' }];
  const handleSubmit = (e) => { e.preventDefault(); const regulatoryBody = form.type.includes('Radiation') ? 'EPA' : 'VPB'; onSave({ ...form, id: licence?.id || Date.now(), status: getStatusFromDays(calculateDaysUntil(form.expires)), regulatoryBody }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={licence ? 'Edit Licence' : 'Add New Licence'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Licence Type" required><Select options={licenceTypes} placeholder="Select type..." value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required /></FormField>
        <FormField label="Holder Name" required><Input type="text" value={form.holder} onChange={e => setForm({ ...form, holder: e.target.value })} placeholder="e.g., Dr. Jane Smith" required /></FormField>
        <FormField label="Licence Number" required><Input type="text" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="e.g., VET-12345" required /></FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Issue Date" required><Input type="date" value={form.issued} onChange={e => setForm({ ...form, issued: e.target.value })} required /></FormField>
          <FormField label="Expiry Date" required><Input type="date" value={form.expires} onChange={e => setForm({ ...form, expires: e.target.value })} required /></FormField>
        </div>
        <FormField label="Notes"><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." /></FormField>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">{licence ? 'Save Changes' : 'Add Licence'}</button>
        </div>
      </form>
    </Modal>
  );
};

const LicenceDetailModal = ({ isOpen, onClose, licence, onEdit, onNavigate, onStartRenewal, onViewDocument }) => {
  if (!licence) return null;
  const daysUntil = calculateDaysUntil(licence.expires);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Licence Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div><h3 className="font-semibold text-lg text-slate-800">{licence.type}</h3><p className="text-slate-600">{licence.holder}</p></div>
          <div className="flex items-center gap-2"><RegulatoryBadge body={licence.regulatoryBody} /><StatusBadge status={licence.status} /></div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600 mb-2">{licence.description || 'No description available'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Licence Number</p><p className="font-medium text-slate-800">{licence.number}</p></div>
          <div><p className="text-sm text-slate-500">Status</p><p className={`font-medium ${daysUntil < 0 ? 'text-red-600' : daysUntil < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days remaining`}</p></div>
          <div><p className="text-sm text-slate-500">Issue Date</p><p className="font-medium">{formatDate(licence.issued)}</p></div>
          <div><p className="text-sm text-slate-500">Expiry Date</p><p className="font-medium">{formatDate(licence.expires)}</p></div>
        </div>
        {licence.notes && <div><p className="text-sm text-slate-500">Notes</p><p className="text-slate-700">{licence.notes}</p></div>}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button onClick={() => onEdit(licence)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><Edit size={16} /> Edit</button>
          <button onClick={() => onStartRenewal(licence)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"><RefreshCw size={16} /> Start Renewal</button>
          <button onClick={() => onViewDocument(licence)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><Eye size={16} /> View Certificate</button>
        </div>
      </div>
    </Modal>
  );
};

const CPDActivityModal = ({ isOpen, onClose, activity, practitioners, onSave }) => {
  const [form, setForm] = useState(activity || { title: '', points: '', type: 'structured', date: '', provider: '', practitionerId: '', certificate: false });
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: activity?.id || Date.now(), points: parseInt(form.points) }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity ? 'Edit CPD Activity' : 'Log CPD Activity'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Practitioner" required><Select options={practitioners.map(p => ({ value: p.id.toString(), label: p.name }))} placeholder="Select practitioner..." value={form.practitionerId?.toString() || ''} onChange={e => setForm({ ...form, practitionerId: parseInt(e.target.value) })} required /></FormField>
        <FormField label="Activity Title" required><Input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., AVA Annual Conference 2025" required /></FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="CPD Points" required><Input type="number" min="1" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} placeholder="e.g., 12" required /></FormField>
          <FormField label="Activity Type" required><Select options={[{ value: 'structured', label: 'Structured' }, { value: 'unstructured', label: 'Unstructured' }]} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required /></FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date Completed" required><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></FormField>
          <FormField label="Provider"><Input type="text" value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} placeholder="e.g., AVA" /></FormField>
        </div>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.certificate} onChange={e => setForm({ ...form, certificate: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-teal-600" /><span className="text-sm text-slate-700">Certificate of attendance available</span></label>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">{activity ? 'Save Changes' : 'Log Activity'}</button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentModal = ({ isOpen, onClose, equipment, onSave }) => {
  const [form, setForm] = useState(equipment || { name: '', type: '', model: '', serial: '', lastInspection: '', nextInspection: '', location: '', notes: '' });
  const equipmentTypes = [{ value: 'Diagnostic X-ray', label: 'Diagnostic X-ray' }, { value: 'Dental Radiography', label: 'Dental Radiography' }, { value: 'Mobile Radiography', label: 'Mobile Radiography' }];
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: equipment?.id || Date.now(), status: getStatusFromDays(calculateDaysUntil(form.nextInspection)), regulatoryBody: 'EPA' }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={equipment ? 'Edit Equipment' : 'Add Equipment'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Equipment Name" required><Input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., X-ray Unit - Main Theatre" required /></FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Equipment Type" required><Select options={equipmentTypes} placeholder="Select type..." value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required /></FormField>
          <FormField label="Location"><Input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Theatre 1" /></FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Model"><Input type="text" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} placeholder="e.g., Fujifilm VXR-40" /></FormField>
          <FormField label="Serial Number"><Input type="text" value={form.serial} onChange={e => setForm({ ...form, serial: e.target.value })} placeholder="e.g., FVX-2022-4851" /></FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Last Inspection"><Input type="date" value={form.lastInspection} onChange={e => setForm({ ...form, lastInspection: e.target.value })} /></FormField>
          <FormField label="Next Inspection Due" required><Input type="date" value={form.nextInspection} onChange={e => setForm({ ...form, nextInspection: e.target.value })} required /></FormField>
        </div>
        <FormField label="Notes"><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." /></FormField>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">{equipment ? 'Save Changes' : 'Add Equipment'}</button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentDetailModal = ({ isOpen, onClose, equipment, onEdit, onNavigate }) => {
  if (!equipment) return null;
  const daysUntil = calculateDaysUntil(equipment.nextInspection);
  const IconComponent = EquipmentIcons[equipment.type];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Equipment Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 bg-slate-50 rounded-2xl p-4 border border-slate-200">
            {IconComponent && <IconComponent />}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div><h3 className="font-semibold text-lg text-slate-800">{equipment.name}</h3><p className="text-slate-600">{equipment.type}</p></div>
              <div className="flex items-center gap-2"><RegulatoryBadge body={equipment.regulatoryBody} /><StatusBadge status={equipment.status} /></div>
            </div>
            <p className="text-sm text-slate-600 mt-2">{equipment.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Model</p><p className="font-medium">{equipment.model || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Serial Number</p><p className="font-medium">{equipment.serial || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Location</p><p className="font-medium">{equipment.location || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Inspection Status</p><p className={`font-medium ${daysUntil < 0 ? 'text-red-600' : daysUntil < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days until due`}</p></div>
          <div><p className="text-sm text-slate-500">Last Inspection</p><p className="font-medium">{formatDate(equipment.lastInspection)}</p></div>
          <div><p className="text-sm text-slate-500">Next Inspection</p><p className="font-medium">{formatDate(equipment.nextInspection)}</p></div>
        </div>
        {equipment.notes && <div className="p-4 bg-amber-50 rounded-xl"><p className="text-sm text-amber-800"><span className="font-medium">Note:</span> {equipment.notes}</p></div>}
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={() => onEdit(equipment)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><Edit size={16} /> Edit</button>
          <button onClick={() => { onClose(); onNavigate('documents'); }} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><FolderOpen size={16} /> View Documents</button>
        </div>
      </div>
    </Modal>
  );
};

const DocumentUploadModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', category: '', expires: '' });
  const categories = [{ value: 'Hospital Licence', label: 'Hospital Licence' }, { value: 'Registration', label: 'Registration' }, { value: 'Radiation Safety', label: 'Radiation Safety' }, { value: 'Controlled Substances', label: 'Controlled Substances' }, { value: 'Professional Development', label: 'Professional Development' }, { value: 'Insurance', label: 'Insurance' }, { value: 'Other', label: 'Other' }];
  const handleSubmit = (e) => { e.preventDefault(); const regulatoryBody = form.category === 'Radiation Safety' ? 'EPA' : form.category === 'Professional Development' ? 'Various' : form.category === 'Controlled Substances' ? 'NSW Health' : 'VPB'; onSave({ ...form, id: Date.now(), uploaded: new Date().toISOString().split('T')[0], size: '125 KB', linkedTo: null, regulatoryBody }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-teal-400 cursor-pointer transition-colors">
          <Upload size={32} className="mx-auto text-slate-400 mb-2" /><p className="text-slate-600">Click to upload or drag and drop</p><p className="text-sm text-slate-400">PDF, PNG, JPG up to 10MB</p>
        </div>
        <FormField label="Document Name" required><Input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., Hospital Licence 2025-26.pdf" required /></FormField>
        <FormField label="Category" required><Select options={categories} placeholder="Select category..." value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required /></FormField>
        <FormField label="Expiry Date (if applicable)"><Input type="date" value={form.expires} onChange={e => setForm({ ...form, expires: e.target.value })} /></FormField>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">Upload Document</button>
        </div>
      </form>
    </Modal>
  );
};

const DocumentDetailModal = ({ isOpen, onClose, document, onDelete, onViewDocument }) => {
  if (!document) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Details">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-xl"><FileText size={24} className="text-slate-600" /></div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-800">{document.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-sm rounded-full">{document.category}</span>
              <RegulatoryBadge body={document.regulatoryBody} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Uploaded</p><p className="font-medium">{formatDate(document.uploaded)}</p></div>
          <div><p className="text-sm text-slate-500">File Size</p><p className="font-medium">{document.size}</p></div>
          <div><p className="text-sm text-slate-500">Expiry Date</p><p className="font-medium">{document.expires ? formatDate(document.expires) : 'N/A'}</p></div>
        </div>
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={() => onViewDocument(document)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"><Eye size={16} /> Preview</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><Download size={16} /> Download</button>
          <button onClick={() => onDelete(document)} className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={16} /> Delete</button>
        </div>
      </div>
    </Modal>
  );
};

const CalendarEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [form, setForm] = useState(event || { title: '', date: '', category: '', notes: '' });
  const categories = [{ value: 'Registration', label: 'Registration' }, { value: 'Radiation', label: 'Radiation' }, { value: 'Hospital', label: 'Hospital' }, { value: 'Controlled Substances', label: 'Controlled Substances' }, { value: 'CPD', label: 'CPD' }, { value: 'Other', label: 'Other' }];
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: event?.id || Date.now(), type: getStatusFromDays(calculateDaysUntil(form.date)), linkedTo: null }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event ? 'Edit Reminder' : 'Add Reminder'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Title" required><Input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., X-ray Inspection Due" required /></FormField>
        <FormField label="Date" required><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></FormField>
        <FormField label="Category" required><Select options={categories} placeholder="Select category..." value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required /></FormField>
        <FormField label="Notes"><Textarea value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." /></FormField>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">{event ? 'Save Changes' : 'Add Reminder'}</button>
        </div>
      </form>
    </Modal>
  );
};

const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkRead }) => {
  if (!isOpen) return null;
  const getIcon = (type) => type === 'error' ? <AlertCircle size={16} className="text-red-500" /> : type === 'warning' ? <AlertTriangle size={16} className="text-amber-500" /> : <Info size={16} className="text-blue-500" />;
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b"><h2 className="font-semibold text-slate-800">Notifications</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} className="text-slate-500" /></button></div>
      <div className="overflow-y-auto h-full pb-20">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`} onClick={() => onMarkRead(n.id)}>
            <div className="flex gap-3">{getIcon(n.type)}<div className="flex-1"><p className="font-medium text-slate-800 text-sm">{n.title}</p><p className="text-slate-600 text-sm mt-1">{n.message}</p><p className="text-slate-400 text-xs mt-2">{n.time}</p></div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
    <div className="space-y-6">
      <div><h3 className="font-semibold text-slate-800 mb-3">Practice Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Practice Name"><Input type="text" defaultValue={practiceInfo.name} /></FormField>
          <FormField label="ABN"><Input type="text" defaultValue={practiceInfo.abn} /></FormField>
          <FormField label="Address"><Input type="text" defaultValue={practiceInfo.address} /></FormField>
          <FormField label="Phone"><Input type="text" defaultValue={practiceInfo.phone} /></FormField>
        </div>
      </div>
      <div><h3 className="font-semibold text-slate-800 mb-3">Notification Preferences</h3>
        <div className="space-y-3">
          {[{ label: 'Email reminders 30 days before expiry', checked: true }, { label: 'Email reminders 14 days before expiry', checked: true }, { label: 'Email reminders 7 days before expiry', checked: true }].map((pref, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked={pref.checked} className="w-4 h-4 rounded border-slate-300 text-teal-600" /><span className="text-slate-700">{pref.label}</span></label>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">Save Settings</button>
      </div>
    </div>
  </Modal>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <p className="text-slate-600 mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">Delete</button>
    </div>
  </Modal>
);

// ==================== PHASE 2 MODALS ====================
const PortalHubModal = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(null);
  const handleCopy = (url, id) => { navigator.clipboard.writeText(url); setCopiedUrl(id); setTimeout(() => setCopiedUrl(null), 2000); };
  const colorStyles = { blue: 'bg-blue-50 text-blue-600 border-blue-200', orange: 'bg-orange-50 text-orange-600 border-orange-200', green: 'bg-green-50 text-green-600 border-green-200', purple: 'bg-purple-50 text-purple-600 border-purple-200', red: 'bg-red-50 text-red-600 border-red-200' };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compliance Portal Hub" size="xl">
      <div className="space-y-4">
        <p className="text-slate-600 mb-4">Quick access to all NSW veterinary compliance portals.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(portalData).map((portal) => {
            const Icon = portal.icon;
            return (
              <div key={portal.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg border ${colorStyles[portal.color]}`}><Icon size={20} /></div>
                  <div className="flex-1"><h3 className="font-semibold text-slate-800">{portal.shortName}</h3><p className="text-sm text-slate-500">{portal.name}</p></div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{portal.description}</p>
                <div className="flex gap-2">
                  <a href={portal.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"><ExternalLink size={14} /> Open Portal</a>
                  <button onClick={() => handleCopy(portal.url, portal.id)} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors" title="Copy URL">
                    {copiedUrl === portal.id ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

const SubmissionChecklistModal = ({ isOpen, onClose, checklistId }) => {
  const [completedItems, setCompletedItems] = useState([]);
  const checklist = submissionChecklists[checklistId];
  if (!checklist) return null;
  const portal = portalData[checklist.portal];
  const Icon = portal?.icon || FileCheck;
  const toggleItem = (itemId) => setCompletedItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  const progress = Math.round((completedItems.length / checklist.items.length) * 100);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={checklist.title} size="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
          <div className="p-3 bg-white rounded-lg shadow-sm"><Icon size={24} className="text-teal-600" /></div>
          <div className="flex-1"><p className="font-medium text-slate-800">{portal?.name}</p><div className="flex gap-4 mt-1 text-sm text-slate-500"><span>⏱️ {checklist.estimatedTime}</span><span>💰 {checklist.fee}</span></div></div>
          <a href={portal?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"><ExternalLink size={16} /> Open Portal</a>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Progress</span><span className="font-medium text-slate-800">{completedItems.length}/{checklist.items.length} completed</span></div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="space-y-2">
          {checklist.items.map((item) => (
            <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${completedItems.includes(item.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`} onClick={() => toggleItem(item.id)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${completedItems.includes(item.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>{completedItems.includes(item.id) && <CheckCircle size={14} className="text-white" />}</div>
              <span className={`flex-1 ${completedItems.includes(item.id) ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800"><span className="font-medium">Note:</span> {checklist.notes}</p>
        </div>
      </div>
    </Modal>
  );
};

const CalendarExportModal = ({ isOpen, onClose, events }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const toggleEvent = (eventId) => setSelectedEvents(prev => prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]);
  const selectAll = () => setSelectedEvents(events.map(e => e.id));
  const generateICS = () => {
    const selectedEvts = events.filter(e => selectedEvents.includes(e.id));
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//VetComply//EN\n${selectedEvts.map(event => `BEGIN:VEVENT\nDTSTART;VALUE=DATE:${event.date.replace(/-/g, '')}\nSUMMARY:${event.title}\nEND:VEVENT`).join('\n')}\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'vetcomply-calendar.ics'; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export to Calendar" size="lg">
      <div className="space-y-6">
        <div className="flex justify-between items-center"><h4 className="font-medium text-slate-800">Select Events ({selectedEvents.length}/{events.length})</h4><button onClick={selectAll} className="text-sm text-teal-600 hover:text-teal-700">Select All</button></div>
        <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-3">
          {events.map((event) => (
            <div key={event.id} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedEvents.includes(event.id) ? 'bg-teal-50' : 'hover:bg-slate-50'}`} onClick={() => toggleEvent(event.id)}>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedEvents.includes(event.id) ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>{selectedEvents.includes(event.id) && <CheckCircle size={12} className="text-white" />}</div>
              <div className="flex-1"><p className="text-sm font-medium text-slate-800">{event.title}</p><p className="text-xs text-slate-500">{formatDate(event.date)}</p></div>
            </div>
          ))}
        </div>
        <button onClick={generateICS} disabled={selectedEvents.length === 0} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"><Download size={16} /> Download ICS File</button>
      </div>
    </Modal>
  );
};

const CPDExportModal = ({ isOpen, onClose, cpdRecords }) => {
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const practitioner = cpdRecords.find(p => p.id === selectedPractitioner);
  const generateSummary = () => {
    if (!practitioner) return;
    const content = `CPD DECLARATION SUMMARY\n\nName: ${practitioner.name}\nRegistration: ${practitioner.registrationNumber}\nPeriod: ${formatDate(practitioner.periodStart)} to ${formatDate(practitioner.periodEnd)}\nTotal Points: ${practitioner.totalPoints}/${practitioner.required}\nStructured: ${practitioner.structured} | Unstructured: ${practitioner.unstructured}\n\nActivities:\n${practitioner.activities.map(a => `- ${a.title} (${a.points} pts, ${a.type})`).join('\n')}\n\nGenerated by VetComply`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CPD-${practitioner.name.replace(/\s+/g, '-')}.txt`; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export CPD Records" size="lg">
      <div className="space-y-6">
        <FormField label="Select Practitioner"><Select options={cpdRecords.map(p => ({ value: p.id.toString(), label: `${p.name} (${p.totalPoints}/${p.required} pts)` }))} placeholder="Choose..." value={selectedPractitioner?.toString() || ''} onChange={e => setSelectedPractitioner(parseInt(e.target.value))} /></FormField>
        {practitioner && (
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-teal-600">{practitioner.totalPoints}</p><p className="text-xs text-slate-500">Total</p></div>
              <div className="p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-blue-600">{practitioner.structured}</p><p className="text-xs text-slate-500">Structured</p></div>
              <div className="p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-purple-600">{practitioner.unstructured}</p><p className="text-xs text-slate-500">Unstructured</p></div>
            </div>
          </div>
        )}
        <button onClick={generateSummary} disabled={!practitioner} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"><Download size={16} /> Export Summary</button>
      </div>
    </Modal>
  );
};

const EmailReminderModal = ({ isOpen, onClose, item, itemType }) => {
  const [customEmail, setCustomEmail] = useState('');
  if (!item) return null;
  const subject = itemType === 'licence' ? `Reminder: ${item.type} Renewal` : `Reminder: ${item.name} Inspection`;
  const body = `Compliance reminder for ${itemType === 'licence' ? item.holder : item.name}.\n\nExpires: ${formatDate(itemType === 'licence' ? item.expires : item.nextInspection)}\nStatus: ${item.status}\n\nGenerated by VetComply`;
  const mailto = `mailto:${customEmail || practiceInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Reminder">
      <div className="space-y-4">
        <FormField label="Email Address"><Input type="email" value={customEmail} onChange={e => setCustomEmail(e.target.value)} placeholder={practiceInfo.email} /></FormField>
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="font-medium text-slate-800 mb-2">Preview</p>
          <p className="text-sm text-slate-600"><strong>Subject:</strong> {subject}</p>
          <pre className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">{body}</pre>
        </div>
        <a href={mailto} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"><Mail size={16} /> Open Email Client</a>
      </div>
    </Modal>
  );
};

const DocumentPackageModal = ({ isOpen, onClose, submissionType, documents }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const configs = { 'vpb-registration': { title: 'VPB Registration Package', cats: ['Registration', 'Professional Development'] }, 'hospital-licence': { title: 'Hospital Licence Package', cats: ['Hospital Licence', 'Insurance'] } };
  const config = configs[submissionType] || configs['vpb-registration'];
  const relevantDocs = documents.filter(d => config.cats.some(c => d.category.includes(c)));
  const toggleDoc = (id) => setSelectedDocs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={config.title} size="lg">
      <div className="space-y-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {relevantDocs.map(doc => (
            <div key={doc.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selectedDocs.includes(doc.id) ? 'bg-teal-50 border-teal-200' : 'border-slate-200 hover:bg-slate-50'}`} onClick={() => toggleDoc(doc.id)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedDocs.includes(doc.id) ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>{selectedDocs.includes(doc.id) && <CheckCircle size={14} className="text-white" />}</div>
              <FileText size={16} className="text-slate-400" />
              <div className="flex-1"><p className="text-sm font-medium text-slate-800">{doc.name}</p><p className="text-xs text-slate-500">{doc.category}</p></div>
            </div>
          ))}
        </div>
        <button disabled={selectedDocs.length === 0} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"><Package size={16} /> Create Package ({selectedDocs.length})</button>
      </div>
    </Modal>
  );
};

// ==================== DASHBOARD & SIDEBAR ====================
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
          <InfoButton infoKey={data.infoKey} onClick={(e) => { e?.stopPropagation?.(); onInfoClick(data.infoKey); }} />
          <StatusBadge status={data.status} />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {data.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {item.status === 'compliant' || item.status === 'completed' ? <CheckCircle size={14} className="text-emerald-500" /> : item.status === 'attention' || item.status === 'upcoming' ? <Clock size={14} className="text-amber-500" /> : <AlertCircle size={14} className="text-red-500" />}
            <span className="text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400 uppercase tracking-wide">{data.regulatoryBody}</span>
        {data.daysUntil !== null && (
          <span className={`text-sm font-medium ${data.daysUntil < 0 ? 'text-red-600' : data.daysUntil < 30 ? 'text-amber-600' : 'text-slate-600'}`}>{data.daysUntil < 0 ? `${Math.abs(data.daysUntil)}d overdue` : `${data.daysUntil}d`}</span>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ activeView, setActiveView, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portals', label: 'Portal Hub', icon: Globe, badge: 'New' },
    { id: 'contacts', label: 'Contacts', icon: Phone },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'licences', label: 'Licences', icon: Award },
    { id: 'cpd', label: 'CPD Tracker', icon: GraduationCap },
    { id: 'equipment', label: 'Equipment', icon: Radiation },
    { id: 'checklist', label: 'Self-Assessment', icon: ClipboardCheck },
  ];
  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20"><Shield size={20} className="text-white" /></div>
              <span className="text-xl font-bold text-slate-800">VetComply</span>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveView(item.id); setIsMobileOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                  {item.label}
                  {item.badge && <span className="ml-auto px-1.5 py-0.5 bg-teal-500 text-white text-xs rounded-full">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center"><User size={18} className="text-teal-600" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800 truncate">Northside Vet</p><p className="text-xs text-slate-500 truncate">admin@northsidevet.com.au</p></div>
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
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"><Menu size={20} className="text-slate-600" /></button>
          <div><h1 className="text-xl lg:text-2xl font-bold text-slate-800">{title}</h1>{subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNotificationsClick} className="p-2.5 hover:bg-slate-100 rounded-xl relative transition-colors">
            <Bell size={20} className="text-slate-600" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">{unreadCount}</span>}
          </button>
          <button onClick={onSettingsClick} className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"><Settings size={20} className="text-slate-600" /></button>
        </div>
      </div>
    </header>
  );
};

// ==================== VIEWS ====================
const DashboardView = ({ licences, cpdRecords, equipment, checklist, setActiveView, onQuickAction, onOpenPortals, onOpenCalendarExport, onInfoClick }) => {
  const complianceData = {
    controlledSubstances: { status: 'compliant', title: 'Controlled Substances', icon: Shield, infoKey: 'controlledSubstances', regulatoryBody: 'NSW Health', nextDeadline: 'Sept Stock Check', daysUntil: 47, targetView: null, items: [{ name: 'March Stock Check', status: 'completed' }, { name: 'September Stock Check', status: 'upcoming' }, { name: 'Drug Register Current', status: 'compliant' }] },
    radiationSafety: { status: equipment.some(e => e.status === 'attention') ? 'attention' : 'compliant', title: 'Radiation Safety', icon: Radiation, infoKey: 'radiationSafety', regulatoryBody: 'EPA', nextDeadline: 'Equipment Inspection', daysUntil: 23, targetView: 'equipment', items: equipment.slice(0, 3).map(e => ({ name: e.name, status: e.status })) },
    hospitalLicence: { status: licences.find(l => l.type === 'Hospital Licence')?.status || 'compliant', title: 'Hospital Licence', icon: Building2, infoKey: 'hospitalLicence', regulatoryBody: 'VPB', nextDeadline: 'Annual Renewal', daysUntil: 152, targetView: 'licences', items: [{ name: 'Licence Current', status: 'compliant' }, { name: 'Superintendent Appointed', status: 'compliant' }, { name: 'Self-Assessment', status: checklist.every(c => c.completed) ? 'compliant' : 'attention' }] },
    registration: { status: licences.some(l => l.type === 'Veterinary Practitioner' && l.status === 'overdue') ? 'overdue' : 'compliant', title: 'Practitioner Registration', icon: Users, infoKey: 'registration', regulatoryBody: 'VPB', nextDeadline: 'Dr. Smith Renewal', daysUntil: -3, targetView: 'licences', items: licences.filter(l => l.type === 'Veterinary Practitioner').map(l => ({ name: l.holder, status: l.status })) },
    cpd: { status: cpdRecords.every(r => r.totalPoints >= r.required) ? 'compliant' : 'attention', title: 'CPD Compliance', icon: GraduationCap, infoKey: 'cpd', regulatoryBody: 'VPB', nextDeadline: 'Annual Return', daysUntil: 152, targetView: 'cpd', items: cpdRecords.map(r => ({ name: `${r.name} (${r.totalPoints}/${r.required} pts)`, status: r.totalPoints >= r.required ? 'compliant' : 'attention' })) },
  };
  const totalItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.length, 0);
  const compliantItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'compliant' || i.status === 'completed').length, 0);
  const overallCompliance = Math.round((compliantItems / totalItems) * 100);
  const overdueCount = Object.values(complianceData).filter(c => c.status === 'overdue').length;
  const attentionCount = Object.values(complianceData).filter(c => c.status === 'attention').length;
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onQuickAction('cpd')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"><Plus size={16} className="text-teal-600" />Log CPD</button>
        <button onClick={() => onQuickAction('document')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"><Upload size={16} className="text-teal-600" />Upload Document</button>
        <button onClick={onOpenPortals} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl text-sm hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm"><Globe size={16} />Open Portals</button>
        <button onClick={onOpenCalendarExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"><CalendarPlus size={16} className="text-teal-600" />Export Calendar</button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-teal-500/20">
          <div className="flex items-center gap-3"><div className="p-2 bg-white/20 rounded-xl"><TrendingUp size={20} /></div><div><p className="text-3xl font-bold">{overallCompliance}%</p><p className="text-teal-100 text-sm">Overall Compliance</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveView('licences')}>
          <div className="flex items-center gap-3"><div className="p-2 bg-red-50 rounded-xl"><AlertCircle size={20} className="text-red-600" /></div><div><p className="text-3xl font-bold text-slate-800">{overdueCount}</p><p className="text-sm text-slate-500">Overdue</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveView('calendar')}>
          <div className="flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-xl"><Clock size={20} className="text-amber-600" /></div><div><p className="text-3xl font-bold text-slate-800">{attentionCount}</p><p className="text-sm text-slate-500">Attention</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveView('licences')}>
          <div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-xl"><CheckCircle size={20} className="text-emerald-600" /></div><div><p className="text-3xl font-bold text-slate-800">{licences.filter(l => l.status === 'compliant').length}</p><p className="text-sm text-slate-500">Active</p></div></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(complianceData).map(([key, data]) => (<ComplianceCard key={key} data={data} onClick={data.targetView ? () => setActiveView(data.targetView) : undefined} onInfoClick={onInfoClick} />))}
      </div>
    </div>
  );
};

const ContactsView = () => {
  const colorStyles = { blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' }, orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' }, green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' }, purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' }, red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200' } };
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Regulatory Contacts</h2>
        <p className="text-slate-300">Contact information for all NSW veterinary regulatory bodies</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.values(portalData).map((portal) => {
          const Icon = portal.icon;
          const styles = colorStyles[portal.color];
          return (
            <div key={portal.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              <div className={`${styles.bg} p-4 border-b ${styles.border}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-white rounded-xl shadow-sm`}><Icon size={24} className={styles.icon} /></div>
                  <div><h3 className="font-semibold text-slate-800">{portal.shortName}</h3><p className="text-sm text-slate-600">{portal.name}</p></div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-slate-600">{portal.description}</p>
                <div className="space-y-3">
                  {portal.supportPhone && (
                    <div className="flex items-center gap-3"><Phone size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p><a href={`tel:${portal.supportPhone}`} className="font-medium text-slate-800 hover:text-teal-600 transition-colors">{portal.supportPhone}</a></div></div>
                  )}
                  {portal.supportEmail && (
                    <div className="flex items-center gap-3"><Mail size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500 uppercase tracking-wide">Email</p><a href={`mailto:${portal.supportEmail}`} className="font-medium text-slate-800 hover:text-teal-600 transition-colors break-all">{portal.supportEmail}</a></div></div>
                  )}
                  {portal.address && (
                    <div className="flex items-start gap-3"><MapPin size={18} className="text-slate-400 mt-0.5" /><div><p className="text-xs text-slate-500 uppercase tracking-wide">Address</p><p className="text-slate-700">{portal.address}</p></div></div>
                  )}
                  {portal.hours && (
                    <div className="flex items-center gap-3"><Clock size={18} className="text-slate-400" /><div><p className="text-xs text-slate-500 uppercase tracking-wide">Hours</p><p className="text-slate-700">{portal.hours}</p></div></div>
                  )}
                </div>
                <a href={portal.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors mt-4"><ExternalLink size={16} /> Visit Portal</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PortalHubView = ({ onOpenChecklist }) => {
  const colorStyles = { blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' }, orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }, green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' }, purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }, red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' } };
  const quickActions = [
    { id: 'vpb-registration-renewal', label: 'Renew VPB Registration', icon: RefreshCw },
    { id: 'epa-user-licence-renewal', label: 'Renew Radiation Licence', icon: RefreshCw },
    { id: 's8-stock-check', label: 'S8 Stock Check', icon: ClipboardCheck },
    { id: 'hospital-licence-renewal', label: 'Renew Hospital Licence', icon: Building2 },
  ];
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-teal-500/20">
        <h3 className="font-bold text-xl mb-2">Quick Submission Guides</h3>
        <p className="text-teal-100 mb-4">Step-by-step checklists for common compliance submissions</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(action => { const Icon = action.icon; return (<button key={action.id} onClick={() => onOpenChecklist(action.id)} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm transition-colors backdrop-blur-sm"><Icon size={16} />{action.label}</button>); })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(portalData).map((portal) => {
          const Icon = portal.icon;
          const styles = colorStyles[portal.color];
          return (
            <div key={portal.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3 mb-4"><div className={`p-3 rounded-xl ${styles.bg} ${styles.border} border`}><Icon size={24} className={styles.text} /></div><div><h3 className="font-semibold text-slate-800">{portal.shortName}</h3><p className="text-sm text-slate-500">{portal.name}</p></div></div>
              <p className="text-sm text-slate-600 mb-4">{portal.description}</p>
              <a href={portal.url} target="_blank" rel="noopener noreferrer" className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 ${styles.bg} ${styles.text} ${styles.border} border rounded-xl hover:opacity-80 font-medium transition-all`}><ExternalLink size={16} /> Open Portal</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarView = ({ events, onAdd, onView, onExport }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date('2026-01-01'));
  const getDaysInMonth = (date) => { const year = date.getFullYear(); const month = date.getMonth(); const firstDay = new Date(year, month, 1); const lastDay = new Date(year, month + 1, 0); const daysInMonth = lastDay.getDate(); const startingDay = firstDay.getDay(); const days = []; for (let i = 0; i < startingDay; i++) days.push(null); for (let i = 1; i <= daysInMonth; i++) days.push(i); return days; };
  const getEventsForDay = (day) => { if (!day) return []; const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; return events.filter(e => e.date === dateStr); };
  const days = getDaysInMonth(selectedMonth);
  const monthName = selectedMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronDown size={20} className="text-slate-600 rotate-90" /></button><h2 className="text-lg font-semibold text-slate-800 min-w-[160px] text-center">{monthName}</h2><button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronDown size={20} className="text-slate-600 -rotate-90" /></button></div>
        <div className="flex gap-2"><button onClick={onExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><CalendarPlus size={16} /> Export</button><button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"><Plus size={16} /> Add</button></div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="p-3 text-center text-sm font-medium text-slate-600">{day}</div>))}</div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = getEventsForDay(day);
            const isToday = day === 29 && selectedMonth.getMonth() === 0;
            return (
              <div key={idx} className={`min-h-[100px] p-2 border-b border-r border-slate-100 ${day ? 'hover:bg-slate-50' : 'bg-slate-50'} transition-colors`}>
                {day && (
                  <><span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isToday ? 'bg-teal-600 text-white font-bold' : 'text-slate-700'}`}>{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map(event => (<div key={event.id} onClick={() => onView(event)} className={`text-xs p-1.5 rounded-lg cursor-pointer truncate ${event.type === 'overdue' ? 'bg-red-100 text-red-700' : event.type === 'attention' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{event.title}</div>))}
                      {dayEvents.length > 2 && <span className="text-xs text-slate-500">+{dayEvents.length - 2}</span>}
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

const DocumentsView = ({ documents, onUpload, onView, onPackage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const categories = [...new Set(documents.map(d => d.category))];
  const filteredDocs = documents.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && (!filterCategory || doc.category === filterCategory));
  const grouped = { 'Professional Development': filteredDocs.filter(d => d.category === 'Professional Development'), 'Other': filteredDocs.filter(d => d.category !== 'Professional Development') };
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500" /></div>
          <Select options={[{ value: '', label: 'All' }, ...categories.map(c => ({ value: c, label: c }))]} value={filterCategory} onChange={e => setFilterCategory(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button onClick={onPackage} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Package size={16} /> Package</button>
          <button onClick={onUpload} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"><Upload size={16} /> Upload</button>
        </div>
      </div>
      
      {grouped['Professional Development'].length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-purple-600" /> Professional Development Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {grouped['Professional Development'].map(doc => (
              <div key={doc.id} onClick={() => onView(doc)} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all border border-purple-100">
                <FileText size={20} className="text-purple-500" />
                <div className="flex-1 min-w-0"><p className="font-medium text-slate-800 truncate">{doc.name}</p><div className="flex items-center gap-2 mt-1"><RegulatoryBadge body={doc.regulatoryBody} /><span className="text-xs text-slate-500">{formatDate(doc.uploaded)}</span></div></div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="text-left p-4 text-sm font-medium text-slate-600">Document</th><th className="text-left p-4 text-sm font-medium text-slate-600">Category</th><th className="text-left p-4 text-sm font-medium text-slate-600 hidden md:table-cell">Uploaded</th><th className="text-left p-4 text-sm font-medium text-slate-600 hidden lg:table-cell">Expires</th><th className="p-4"></th></tr></thead>
          <tbody>
            {grouped['Other'].map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4"><div className="flex items-center gap-3"><FileText size={20} className="text-slate-400" /><div><span className="font-medium text-slate-800">{doc.name}</span><div className="mt-1"><RegulatoryBadge body={doc.regulatoryBody} /></div></div></div></td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">{doc.category}</span></td>
                <td className="p-4 text-slate-600 hidden md:table-cell">{formatDate(doc.uploaded)}</td>
                <td className="p-4 hidden lg:table-cell">{doc.expires ? <span className={calculateDaysUntil(doc.expires) < 30 ? 'text-amber-600 font-medium' : 'text-slate-600'}>{formatDate(doc.expires)}</span> : <span className="text-slate-400">—</span>}</td>
                <td className="p-4"><button onClick={() => onView(doc)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><Eye size={16} className="text-slate-500" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LicencesView = ({ licences, onAdd, onView, onStartRenewal, onEmail }) => {
  const [filterType, setFilterType] = useState('');
  const types = [...new Set(licences.map(l => l.type))];
  const filteredLicences = licences.filter(l => !filterType || l.type === filterType);
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Select options={[{ value: '', label: 'All Types' }, ...types.map(t => ({ value: t, label: t }))]} value={filterType} onChange={e => setFilterType(e.target.value)} />
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"><Plus size={16} /> Add Licence</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLicences.map(licence => {
          const daysUntil = calculateDaysUntil(licence.expires);
          return (
            <div key={licence.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3"><div><h3 className="font-semibold text-slate-800">{licence.type}</h3><p className="text-sm text-slate-500">{licence.holder}</p></div><StatusBadge status={licence.status} /></div>
              <div className="flex items-center gap-2 mb-3"><RegulatoryBadge body={licence.regulatoryBody} /></div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Number</span><span className="font-medium text-slate-800">{licence.number}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Expires</span><span className={daysUntil < 0 ? 'text-red-600 font-medium' : daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>{formatDate(licence.expires)}</span></div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button onClick={() => onView(licence)} className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">View</button>
                <button onClick={() => onStartRenewal(licence)} className="flex-1 px-3 py-2 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors">Renew</button>
                <button onClick={() => onEmail(licence)} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Mail size={14} className="text-slate-500" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CPDView = ({ cpdRecords, onAdd, onExport }) => {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-between">
        <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Download size={16} /> Export for VPB</button>
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"><Plus size={16} /> Log Activity</button>
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
                  <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center"><User size={24} className="text-teal-600" /></div><div><h3 className="font-semibold text-slate-800">{record.name}</h3><p className="text-sm text-slate-500">{record.registrationNumber}</p></div></div>
                  <div className="flex items-center gap-4"><div className="text-right"><p className="text-2xl font-bold text-slate-800">{record.totalPoints}<span className="text-sm text-slate-500">/{record.required}</span></p></div><StatusBadge status={isCompliant ? 'compliant' : 'attention'} /><ChevronDown size={20} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full ${isCompliant ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} /></div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2"><span>Structured: {record.structured}</span><span>Unstructured: {record.unstructured}</span><span>Ends: {formatDate(record.periodEnd)}</span></div>
                </div>
              </div>
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 bg-slate-50">
                  <div className="space-y-2">
                    {record.activities.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                        <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'structured' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>{activity.type === 'structured' ? <BookOpen size={14} /> : <Users size={14} />}</div><div><p className="font-medium text-slate-800">{activity.title}</p><p className="text-sm text-slate-500">{formatDate(activity.date)} {activity.provider && `• ${activity.provider}`}</p></div></div>
                        <div className="flex items-center gap-3">{activity.certificate && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">Certificate</span>}<span className="font-semibold text-slate-800">{activity.points} pts</span></div>
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

const EquipmentView = ({ equipment, onAdd, onView, onEdit }) => (
  <div className="p-4 lg:p-6 space-y-6">
    <div className="flex justify-end"><button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"><Plus size={16} /> Add Equipment</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map(item => {
        const daysUntil = calculateDaysUntil(item.nextInspection);
        const IconComponent = EquipmentIcons[item.type];
        return (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
            <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
              <div className="w-24 h-24 mx-auto">{IconComponent && <IconComponent />}</div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3"><div><h3 className="font-semibold text-slate-800">{item.name}</h3><p className="text-sm text-slate-500">{item.type}</p></div><StatusBadge status={item.status} /></div>
              <div className="flex items-center gap-2 mb-3"><RegulatoryBadge body={item.regulatoryBody} /></div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Model</span><span className="text-slate-800">{item.model}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="text-slate-800">{item.location}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Next Inspection</span><span className={daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>{formatDate(item.nextInspection)}</span></div>
              </div>
              {item.notes && <p className="text-sm text-amber-700 p-2 bg-amber-50 rounded-lg mb-4">{item.notes}</p>}
              <div className="flex gap-2">
                <button onClick={() => onView(item)} className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Details</button>
                <button onClick={() => onEdit(item)} className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Edit</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ChecklistView = ({ checklist, onToggle, onExport }) => {
  const sections = [...new Set(checklist.map(c => c.section))];
  const totalItems = checklist.length;
  const completedItems = checklist.filter(c => c.completed).length;
  const progress = Math.round((completedItems / totalItems) * 100);
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4"><div><h3 className="font-semibold text-slate-800">Self-Assessment Progress</h3><p className="text-sm text-slate-500">{completedItems} of {totalItems} items</p></div><button onClick={onExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Download size={16} /> Export</button></div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full transition-all ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${progress}%` }} /></div>
      </div>
      {sections.map(section => {
        const sectionItems = checklist.filter(c => c.section === section);
        const sectionCompleted = sectionItems.filter(c => c.completed).length;
        return (
          <div key={section} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between"><h4 className="font-semibold text-slate-800">{section}</h4><span className="text-sm text-slate-500">{sectionCompleted}/{sectionItems.length}</span></div>
            <div className="divide-y divide-slate-100">
              {sectionItems.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => onToggle(item.id)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>{item.completed && <CheckCircle size={14} className="text-white" />}</div>
                  <div className="flex-1"><div className="flex items-center gap-2"><p className={`font-medium ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.item}</p><RegulatoryBadge body={item.regulatoryBody} /></div>{item.notes && <p className="text-sm text-slate-500 mt-1">{item.notes}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [licences, setLicences] = useState(initialLicences);
  const [documents, setDocuments] = useState(initialDocuments);
  const [cpdRecords, setCpdRecords] = useState(initialCpdRecords);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Modal States
  const [licenceModal, setLicenceModal] = useState({ open: false, licence: null });
  const [licenceDetailModal, setLicenceDetailModal] = useState({ open: false, licence: null });
  const [cpdModal, setCpdModal] = useState({ open: false, activity: null });
  const [equipmentModal, setEquipmentModal] = useState({ open: false, equipment: null });
  const [equipmentDetailModal, setEquipmentDetailModal] = useState({ open: false, equipment: null });
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [documentDetailModal, setDocumentDetailModal] = useState({ open: false, document: null });
  const [calendarEventModal, setCalendarEventModal] = useState({ open: false, event: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });
  const [cardInfoModal, setCardInfoModal] = useState({ open: false, infoKey: null });
  const [documentViewerModal, setDocumentViewerModal] = useState({ open: false, document: null, content: null });
  
  // Phase 2 Modal States
  const [portalHubModal, setPortalHubModal] = useState(false);
  const [submissionChecklistModal, setSubmissionChecklistModal] = useState({ open: false, checklistId: null });
  const [calendarExportModal, setCalendarExportModal] = useState(false);
  const [cpdExportModal, setCpdExportModal] = useState(false);
  const [emailReminderModal, setEmailReminderModal] = useState({ open: false, item: null, itemType: null });
  const [documentPackageModal, setDocumentPackageModal] = useState({ open: false, submissionType: null });
  
  const viewConfig = {
    dashboard: { title: 'Dashboard', subtitle: 'Overview of your compliance status' },
    portals: { title: 'Portal Hub', subtitle: 'Access NSW compliance portals' },
    contacts: { title: 'Regulatory Contacts', subtitle: 'Contact information for regulatory bodies' },
    calendar: { title: 'Calendar', subtitle: 'Upcoming deadlines and reminders' },
    documents: { title: 'Documents', subtitle: 'Manage compliance documents' },
    licences: { title: 'Licences', subtitle: 'Track licences and registrations' },
    cpd: { title: 'CPD Tracker', subtitle: 'Continuing professional development' },
    equipment: { title: 'Equipment', subtitle: 'Radiation equipment compliance' },
    checklist: { title: 'Self-Assessment', subtitle: 'Hospital licence checklist' },
  };
  
  // Handlers
  const handleSaveLicence = (licence) => { if (licences.find(l => l.id === licence.id)) { setLicences(licences.map(l => l.id === licence.id ? licence : l)); } else { setLicences([...licences, licence]); } };
  const handleSaveCpdActivity = (activity) => {
    setCpdRecords(cpdRecords.map(record => {
      if (record.id === activity.practitionerId) {
        const existingActivity = record.activities.find(a => a.id === activity.id);
        let newActivities = existingActivity ? record.activities.map(a => a.id === activity.id ? activity : a) : [...record.activities, activity];
        const structured = newActivities.filter(a => a.type === 'structured').reduce((sum, a) => sum + a.points, 0);
        const unstructured = newActivities.filter(a => a.type === 'unstructured').reduce((sum, a) => sum + a.points, 0);
        return { ...record, activities: newActivities, structured, unstructured, totalPoints: structured + unstructured };
      }
      return record;
    }));
  };
  const handleSaveEquipment = (item) => { if (equipment.find(e => e.id === item.id)) { setEquipment(equipment.map(e => e.id === item.id ? item : e)); } else { setEquipment([...equipment, item]); } };
  const handleSaveDocument = (doc) => setDocuments([...documents, doc]);
  const handleDeleteDocument = (doc) => {
    setConfirmModal({ open: true, title: 'Delete Document', message: `Delete "${doc.name}"?`,
      onConfirm: () => { setDocuments(documents.filter(d => d.id !== doc.id)); setDocumentDetailModal({ open: false, document: null }); setConfirmModal({ open: false, title: '', message: '', onConfirm: null }); }
    });
  };
  const handleSaveCalendarEvent = (event) => { if (calendarEvents.find(e => e.id === event.id)) { setCalendarEvents(calendarEvents.map(e => e.id === event.id ? event : e)); } else { setCalendarEvents([...calendarEvents, event]); } };
  const handleToggleChecklist = (itemId) => setChecklist(checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item));
  const handleMarkNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const handleQuickAction = (action) => { if (action === 'cpd') setCpdModal({ open: true, activity: null }); else if (action === 'document') setDocumentUploadModal(true); else if (action === 'event') setCalendarEventModal({ open: true, event: null }); };
  const handleExport = () => { const content = 'Checklist Export\nGenerated by VetComply'; const blob = new Blob([content], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'checklist-export.txt'; a.click(); };
  const handleStartRenewal = (licence) => {
    const map = { 'Veterinary Practitioner': 'vpb-registration-renewal', 'Hospital Licence': 'hospital-licence-renewal', 'Radiation User Licence': 'epa-user-licence-renewal', 'Radiation Management Licence': 'epa-user-licence-renewal' };
    setLicenceDetailModal({ open: false, licence: null });
    setSubmissionChecklistModal({ open: true, checklistId: map[licence.type] || 'vpb-registration-renewal' });
  };
  const handleViewDocument = (item) => {
    let content = '';
    if (item.type === 'Veterinary Practitioner' || item.category === 'Registration') {
      content = `═══════════════════════════════════════════════════════════════\n                NSW VETERINARY PRACTITIONERS BOARD\n                    CERTIFICATE OF REGISTRATION\n═══════════════════════════════════════════════════════════════\n\nThis is to certify that\n\n                         ${item.holder || 'Registered Practitioner'}\n\nis registered as a VETERINARY PRACTITIONER under the \nVeterinary Practice Act 2003 (NSW)\n\nRegistration Number: ${item.number || 'VET-XXXXX'}\nExpires: ${formatDate(item.expires)}\n\nIssued by NSW Veterinary Practitioners Board\n═══════════════════════════════════════════════════════════════`;
    } else if (item.type === 'Hospital Licence' || item.category === 'Hospital Licence') {
      content = `═══════════════════════════════════════════════════════════════\n                NSW VETERINARY PRACTITIONERS BOARD\n                    VETERINARY HOSPITAL LICENCE\n═══════════════════════════════════════════════════════════════\n\nLICENCE HOLDER: ${item.holder || practiceInfo.name}\nPREMISES: ${practiceInfo.address}\nLICENCE NUMBER: ${item.number || 'VH-XXXX-XXXX'}\nSUPERINTENDENT: ${practiceInfo.superintendent}\n\nThis licence is granted under Section 34 of the\nVeterinary Practice Act 2003 (NSW)\n\nExpires: ${formatDate(item.expires)}\n═══════════════════════════════════════════════════════════════`;
    } else if (item.type?.includes('Radiation') || item.category === 'Radiation Safety') {
      content = `═══════════════════════════════════════════════════════════════\n              NSW ENVIRONMENT PROTECTION AUTHORITY\n                    RADIATION LICENCE\n═══════════════════════════════════════════════════════════════\n\nLICENCE NUMBER: ${item.number || item.name}\nLICENCE HOLDER: ${item.holder || practiceInfo.name}\n\nAUTHORISED ACTIVITIES:\n• Operation of diagnostic X-ray apparatus\n• Veterinary diagnostic imaging\n\nIssued under the Radiation Control Act 1990 (NSW)\nExpires: ${formatDate(item.expires)}\n\nEPA NSW | www.epa.nsw.gov.au\n═══════════════════════════════════════════════════════════════`;
    } else if (item.category === 'Professional Development') {
      content = `═══════════════════════════════════════════════════════════════\n                    CERTIFICATE OF ATTENDANCE\n                  Continuing Professional Development\n═══════════════════════════════════════════════════════════════\n\nThis is to certify completion of\n\n"${item.name?.replace('.pdf', '') || 'CPD Activity'}"\n\nProvider: ${item.regulatoryBody}\nDate: ${formatDate(item.uploaded)}\n\nThis activity has been approved for CPD points.\n\nCertificate should be retained for minimum 5 years.\n═══════════════════════════════════════════════════════════════`;
    } else {
      content = `Document: ${item.name}\nCategory: ${item.category}\nUploaded: ${formatDate(item.uploaded)}\nRegulatory Body: ${item.regulatoryBody}\n\n[Document content preview not available]`;
    }
    setDocumentViewerModal({ open: true, document: item, content });
  };
  const handleInfoClick = (infoKey) => setCardInfoModal({ open: true, infoKey });
  
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView licences={licences} cpdRecords={cpdRecords} equipment={equipment} checklist={checklist} setActiveView={setActiveView} onQuickAction={handleQuickAction} onOpenPortals={() => setPortalHubModal(true)} onOpenCalendarExport={() => setCalendarExportModal(true)} onInfoClick={handleInfoClick} />;
      case 'portals': return <PortalHubView onOpenChecklist={(id) => setSubmissionChecklistModal({ open: true, checklistId: id })} />;
      case 'contacts': return <ContactsView />;
      case 'calendar': return <CalendarView events={calendarEvents} onAdd={() => setCalendarEventModal({ open: true, event: null })} onView={(e) => setCalendarEventModal({ open: true, event: e })} onExport={() => setCalendarExportModal(true)} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setDocumentUploadModal(true)} onView={(d) => setDocumentDetailModal({ open: true, document: d })} onPackage={() => setDocumentPackageModal({ open: true, submissionType: 'vpb-registration' })} />;
      case 'licences': return <LicencesView licences={licences} onAdd={() => setLicenceModal({ open: true, licence: null })} onView={(l) => setLicenceDetailModal({ open: true, licence: l })} onStartRenewal={handleStartRenewal} onEmail={(l) => setEmailReminderModal({ open: true, item: l, itemType: 'licence' })} />;
      case 'cpd': return <CPDView cpdRecords={cpdRecords} onAdd={() => setCpdModal({ open: true, activity: null })} onExport={() => setCpdExportModal(true)} />;
      case 'equipment': return <EquipmentView equipment={equipment} onAdd={() => setEquipmentModal({ open: true, equipment: null })} onView={(e) => setEquipmentDetailModal({ open: true, equipment: e })} onEdit={(e) => setEquipmentModal({ open: true, equipment: e })} />;
      case 'checklist': return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} onExport={handleExport} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <main className="flex-1 min-w-0 flex flex-col">
        <Header title={viewConfig[activeView].title} subtitle={viewConfig[activeView].subtitle} setIsMobileOpen={setIsMobileOpen} notifications={notifications} onNotificationsClick={() => setShowNotifications(!showNotifications)} onSettingsClick={() => setShowSettings(true)} />
        <div className="flex-1 overflow-y-auto">{renderView()}</div>
      </main>
      
      {/* Chatbot */}
      <ChatBot />
      
      {/* Panels & Modals */}
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} onMarkRead={handleMarkNotificationRead} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <CardInfoModal isOpen={cardInfoModal.open} onClose={() => setCardInfoModal({ open: false, infoKey: null })} infoKey={cardInfoModal.infoKey} />
      <DocumentViewerModal isOpen={documentViewerModal.open} onClose={() => setDocumentViewerModal({ open: false, document: null, content: null })} document={documentViewerModal.document} documentContent={documentViewerModal.content} />
      
      {/* Feature Modals */}
      <LicenceModal isOpen={licenceModal.open} onClose={() => setLicenceModal({ open: false, licence: null })} licence={licenceModal.licence} onSave={handleSaveLicence} />
      <LicenceDetailModal isOpen={licenceDetailModal.open} onClose={() => setLicenceDetailModal({ open: false, licence: null })} licence={licenceDetailModal.licence} onEdit={(l) => { setLicenceDetailModal({ open: false, licence: null }); setLicenceModal({ open: true, licence: l }); }} onNavigate={setActiveView} onStartRenewal={handleStartRenewal} onViewDocument={handleViewDocument} />
      <CPDActivityModal isOpen={cpdModal.open} onClose={() => setCpdModal({ open: false, activity: null })} activity={cpdModal.activity} practitioners={cpdRecords} onSave={handleSaveCpdActivity} />
      <EquipmentModal isOpen={equipmentModal.open} onClose={() => setEquipmentModal({ open: false, equipment: null })} equipment={equipmentModal.equipment} onSave={handleSaveEquipment} />
      <EquipmentDetailModal isOpen={equipmentDetailModal.open} onClose={() => setEquipmentDetailModal({ open: false, equipment: null })} equipment={equipmentDetailModal.equipment} onEdit={(e) => { setEquipmentDetailModal({ open: false, equipment: null }); setEquipmentModal({ open: true, equipment: e }); }} onNavigate={setActiveView} />
      <DocumentUploadModal isOpen={documentUploadModal} onClose={() => setDocumentUploadModal(false)} onSave={handleSaveDocument} />
      <DocumentDetailModal isOpen={documentDetailModal.open} onClose={() => setDocumentDetailModal({ open: false, document: null })} document={documentDetailModal.document} onDelete={handleDeleteDocument} onViewDocument={handleViewDocument} />
      <CalendarEventModal isOpen={calendarEventModal.open} onClose={() => setCalendarEventModal({ open: false, event: null })} event={calendarEventModal.event} onSave={handleSaveCalendarEvent} />
      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })} onConfirm={confirmModal.onConfirm} title={confirmModal.title} message={confirmModal.message} />
      
      {/* Phase 2 Modals */}
      <PortalHubModal isOpen={portalHubModal} onClose={() => setPortalHubModal(false)} />
      <SubmissionChecklistModal isOpen={submissionChecklistModal.open} onClose={() => setSubmissionChecklistModal({ open: false, checklistId: null })} checklistId={submissionChecklistModal.checklistId} />
      <CalendarExportModal isOpen={calendarExportModal} onClose={() => setCalendarExportModal(false)} events={calendarEvents} />
      <CPDExportModal isOpen={cpdExportModal} onClose={() => setCpdExportModal(false)} cpdRecords={cpdRecords} />
      <EmailReminderModal isOpen={emailReminderModal.open} onClose={() => setEmailReminderModal({ open: false, item: null, itemType: null })} item={emailReminderModal.item} itemType={emailReminderModal.itemType} />
      <DocumentPackageModal isOpen={documentPackageModal.open} onClose={() => setDocumentPackageModal({ open: false, submissionType: null })} submissionType={documentPackageModal.submissionType} documents={documents} />
    </div>
  );
}
