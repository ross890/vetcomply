import { useState, createContext, useContext } from 'react';
import { 
  LayoutDashboard, Calendar, FolderOpen, Award, GraduationCap, 
  Settings, ClipboardCheck, Bell, Plus, ChevronRight,
  AlertTriangle, CheckCircle, Clock, FileText, Upload, X,
  Building2, Users, Shield, Menu, User,
  TrendingUp, AlertCircle, ChevronDown, Eye, Download, Trash2,
  Edit, ExternalLink, Printer, Search, Filter, Link, 
  FileDown, Mail, CalendarPlus, Package, ListChecks,
  Globe, Copy, CheckSquare, ArrowRight, Info, Send,
  Clipboard, BookOpen, Radiation, Pill, Stethoscope,
  RefreshCw, HelpCircle, Zap, FileCheck, MoreHorizontal,
} from 'lucide-react';

// ==================== INITIAL DATA ====================
const initialLicences = [
  { id: 1, type: 'Hospital Licence', holder: 'Northside Veterinary Hospital', number: 'VH-2024-1847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '' },
  { id: 2, type: 'Radiation Management Licence', holder: 'Northside Veterinary Hospital', number: 'RML-NSW-4521', issued: '2024-03-15', expires: '2027-03-14', status: 'compliant', notes: '' },
  { id: 3, type: 'Veterinary Practitioner', holder: 'Dr. Sarah Johnson', number: 'VET-12847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '' },
  { id: 4, type: 'Veterinary Practitioner', holder: 'Dr. Michael Smith', number: 'VET-14392', issued: '2025-07-01', expires: '2026-01-26', status: 'overdue', notes: 'Renewal submitted - awaiting confirmation' },
  { id: 5, type: 'Veterinary Practitioner', holder: 'Dr. Emily Chen', number: 'VET-15678', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant', notes: '' },
  { id: 6, type: 'Radiation User Licence', holder: 'Dr. Sarah Johnson', number: 'RUL-IA21-8834', issued: '2024-06-15', expires: '2027-06-14', status: 'compliant', notes: '' },
  { id: 7, type: 'Radiation User Licence', holder: 'Nurse Kate Williams', number: 'RUL-IA23S-9912', issued: '2025-04-28', expires: '2026-04-27', status: 'attention', notes: 'Renewal reminder sent' },
];

const initialDocuments = [
  { id: 1, name: 'Hospital Licence 2025-26.pdf', category: 'Hospital Licence', uploaded: '2025-07-01', expires: '2026-06-30', size: '245 KB', linkedTo: { type: 'licence', id: 1 } },
  { id: 2, name: 'Radiation Management Plan.pdf', category: 'Radiation Safety', uploaded: '2024-03-15', expires: null, size: '1.2 MB', linkedTo: null },
  { id: 3, name: 'Dr Johnson - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-06-30', size: '89 KB', linkedTo: { type: 'licence', id: 3 } },
  { id: 4, name: 'Dr Smith - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-01-26', size: '91 KB', linkedTo: { type: 'licence', id: 4 } },
  { id: 5, name: 'X-ray Compliance Certificate.pdf', category: 'Radiation Safety', uploaded: '2024-02-21', expires: '2026-02-21', size: '156 KB', linkedTo: { type: 'equipment', id: 1 } },
  { id: 6, name: 'S8 Drug Register Audit - March 2026.pdf', category: 'Controlled Substances', uploaded: '2026-03-15', expires: null, size: '78 KB', linkedTo: null },
  { id: 7, name: 'Self Assessment Checklist 2025.pdf', category: 'Hospital Licence', uploaded: '2025-11-15', expires: null, size: '234 KB', linkedTo: null },
];

const initialCpdRecords = [
  { id: 1, name: 'Dr. Sarah Johnson', registrationNumber: 'VET-12847', email: 'sarah.johnson@northsidevet.com.au', totalPoints: 48, required: 60, structured: 18, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 1, title: 'AVA Annual Conference 2025', points: 12, type: 'structured', date: '2025-05-15', provider: 'AVA', certificate: true },
    { id: 2, title: 'Emergency Medicine Workshop', points: 6, type: 'structured', date: '2025-08-22', provider: 'Sydney Uni', certificate: true },
    { id: 3, title: 'Journal Reading - Various', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 4, title: 'In-house Training Sessions', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 2, name: 'Dr. Michael Smith', registrationNumber: 'VET-14392', email: 'michael.smith@northsidevet.com.au', totalPoints: 52, required: 60, structured: 22, unstructured: 30, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 5, title: 'Surgical Techniques Masterclass', points: 16, type: 'structured', date: '2025-03-10', provider: 'ASAV', certificate: true },
    { id: 6, title: 'Online Pharmacology Course', points: 6, type: 'structured', date: '2025-09-05', provider: 'VetEducation', certificate: true },
    { id: 7, title: 'Case Study Reviews', points: 20, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
    { id: 8, title: 'Peer Discussions', points: 10, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
  { id: 3, name: 'Dr. Emily Chen', registrationNumber: 'VET-15678', email: 'emily.chen@northsidevet.com.au', totalPoints: 61, required: 60, structured: 24, unstructured: 37, periodStart: '2024-07-01', periodEnd: '2027-06-30', activities: [
    { id: 9, title: 'ASAV Conference 2025', points: 14, type: 'structured', date: '2025-06-20', provider: 'ASAV', certificate: true },
    { id: 10, title: 'Dermatology Webinar Series', points: 10, type: 'structured', date: '2025-10-15', provider: 'VIN', certificate: true },
    { id: 11, title: 'Research Publication', points: 22, type: 'unstructured', date: '2025-07-30', provider: '', certificate: false },
    { id: 12, title: 'Mentoring Junior Vets', points: 15, type: 'unstructured', date: '2025-12-31', provider: '', certificate: false },
  ]},
];

const initialEquipment = [
  { id: 1, name: 'X-ray Unit - Main Theatre', type: 'Diagnostic X-ray', model: 'Fujifilm VXR-40', serial: 'FVX-2022-4851', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Theatre 1', notes: 'EPA inspection booked for Feb 15' },
  { id: 2, name: 'Dental X-ray Unit', type: 'Dental Radiography', model: 'iM3 CR7', serial: 'IM3-2023-1124', lastInspection: '2023-08-15', nextInspection: '2028-08-15', status: 'compliant', location: 'Dental Suite', notes: '' },
  { id: 3, name: 'Portable X-ray', type: 'Mobile Radiography', model: 'MinXray HF100', serial: 'MXR-2021-8876', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Storage Room A', notes: 'To be inspected with main unit' },
];

const initialChecklist = [
  { id: 1, section: 'Premises & Facilities', item: 'Reception area clean and welcoming', completed: true, notes: '' },
  { id: 2, section: 'Premises & Facilities', item: 'Consulting rooms meet minimum size requirements', completed: true, notes: '' },
  { id: 3, section: 'Premises & Facilities', item: 'Surgery/procedure room appropriately equipped', completed: true, notes: '' },
  { id: 4, section: 'Premises & Facilities', item: 'Adequate animal holding facilities', completed: true, notes: '' },
  { id: 5, section: 'Premises & Facilities', item: 'Isolation facility available', completed: false, notes: 'Currently using separate ward - need dedicated isolation room' },
  { id: 6, section: 'Equipment', item: 'Anaesthetic equipment maintained and calibrated', completed: true, notes: 'Service due April 2026' },
  { id: 7, section: 'Equipment', item: 'Monitoring equipment available (ECG, pulse ox, etc.)', completed: true, notes: '' },
  { id: 8, section: 'Equipment', item: 'Radiography equipment compliant', completed: false, notes: 'Inspection due February 2026' },
  { id: 9, section: 'Equipment', item: 'Sterilisation equipment validated', completed: true, notes: 'Autoclave validation completed Nov 2025' },
  { id: 10, section: 'Records & Documentation', item: 'Clinical records meet requirements', completed: true, notes: '' },
  { id: 11, section: 'Records & Documentation', item: 'S8 drug register maintained correctly', completed: true, notes: 'Using Vet S8 electronic system' },
  { id: 12, section: 'Records & Documentation', item: 'Consent forms used appropriately', completed: true, notes: '' },
  { id: 13, section: 'Staffing', item: 'Superintendent responsibilities understood', completed: true, notes: '' },
  { id: 14, section: 'Staffing', item: 'All veterinarians currently registered', completed: false, notes: 'Dr Smith registration overdue' },
  { id: 15, section: 'Staffing', item: 'Adequate supervision of support staff', completed: true, notes: '' },
  { id: 16, section: 'Emergency Procedures', item: 'Emergency protocols documented', completed: true, notes: '' },
  { id: 17, section: 'Emergency Procedures', item: 'After-hours arrangements adequate', completed: true, notes: 'Partnership with Emergency Vet Centre' },
  { id: 18, section: 'Emergency Procedures', item: 'Emergency drug kit maintained', completed: true, notes: 'Checked monthly' },
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

// Portal Data
const portalData = {
  vpb: { id: 'vpb', name: 'NSW Veterinary Practitioners Board', shortName: 'VPB', url: 'https://portal.vpb.nsw.gov.au/login', description: 'Vet registration, CPD reporting, hospital licensing, annual returns', icon: Stethoscope, color: 'blue', services: ['Registration Renewal', 'CPD Declaration', 'Hospital Licence', 'Annual Returns'], supportEmail: 'admin@vpb.nsw.gov.au', supportPhone: '(02) 8338 1177' },
  epa: { id: 'epa', name: 'EPA eConnect', shortName: 'EPA', url: 'https://apps.epa.nsw.gov.au/epabusinessportal', description: 'Radiation user licences, management licences, equipment registration', icon: Radiation, color: 'orange', services: ['User Licence Application', 'User Licence Renewal', 'Management Licence'], supportEmail: 'eConnect.EPA@epa.nsw.gov.au', supportPhone: '(02) 9995 5700' },
  apvma: { id: 'apvma', name: 'APVMA Online Services', shortName: 'APVMA', url: 'https://portal.apvma.gov.au/', description: 'Veterinary medicine registration, permits, adverse event reporting', icon: Pill, color: 'green', services: ['Product Registration', 'Permit Applications', 'Adverse Experience Reports'], supportEmail: 'enquiries@apvma.gov.au', supportPhone: '1300 700 583' },
  safescript: { id: 'safescript', name: 'SafeScript NSW', shortName: 'SafeScript', url: 'https://www.safescript.nsw.gov.au/', description: 'Schedule 8 prescription monitoring (prescribers and pharmacists)', icon: Shield, color: 'purple', services: ['Patient History Check', 'S8 Authority Applications'], supportEmail: 'MOH-SafeScript@health.nsw.gov.au', supportPhone: '1800 563 766' },
  pharmaceutical: { id: 'pharmaceutical', name: 'NSW Pharmaceutical Services', shortName: 'Pharma Services', url: 'https://www.health.nsw.gov.au/pharmaceutical/Pages/doctors.aspx', description: 'S8 authorities, drug theft/loss notifications', icon: Pill, color: 'red', services: ['S8 Prescribing Authority', 'Loss/Theft Notification'], supportPhone: '(02) 9391 9944' },
};

const submissionChecklists = {
  'vpb-registration-renewal': { title: 'VPB Registration Renewal', portal: 'vpb', estimatedTime: '10-15 minutes', fee: '\$495', items: [
    { id: 1, text: 'Log into VPB Portal', required: true, link: 'https://portal.vpb.nsw.gov.au/login' },
    { id: 2, text: 'Verify personal details are current', required: true },
    { id: 3, text: 'Confirm practice address(es)', required: true },
    { id: 4, text: 'Declare CPD compliance for period', required: true },
    { id: 5, text: 'Review and accept declarations', required: true },
    { id: 6, text: 'Pay renewal fee (\$495)', required: true },
    { id: 7, text: 'Download and save confirmation', required: false },
    { id: 8, text: 'Upload certificate to VetComply', required: false },
  ], documents: ['Current registration certificate', 'CPD records summary', 'Payment method'], notes: 'Renewal must be completed before 30 June each year. Late renewals incur additional fees.' },
  'epa-user-licence-renewal': { title: 'EPA Radiation User Licence Renewal', portal: 'epa', estimatedTime: '15-20 minutes', fee: '\$105', items: [
    { id: 1, text: 'Log into EPA eConnect', required: true, link: 'https://apps.epa.nsw.gov.au/epabusinessportal' },
    { id: 2, text: 'Locate licence renewal notice', required: true },
    { id: 3, text: 'Verify licence conditions are correct', required: true },
    { id: 4, text: 'Confirm radiation safety course still valid', required: true },
    { id: 5, text: 'Update any changed personal details', required: true },
    { id: 6, text: 'Review and submit renewal', required: true },
    { id: 7, text: 'Pay renewal fee (\$105)', required: true },
  ], documents: ['Current licence', 'Safety course certificate', 'Payment method'], notes: 'Renewal can be done up to 60 days before expiry.' },
  's8-stock-check': { title: 'S8 Bi-Annual Stock Check', portal: 'pharmaceutical', estimatedTime: '30-60 minutes', fee: 'None', items: [
    { id: 1, text: 'Prepare S8 drug register', required: true },
    { id: 2, text: 'Count physical stock of each S8 substance', required: true },
    { id: 3, text: 'Reconcile counts with register balances', required: true },
    { id: 4, text: 'Investigate and document any discrepancies', required: true },
    { id: 5, text: 'Record stock check in register', required: true },
    { id: 6, text: 'Sign and date the stock check entry', required: true },
  ], documents: ['S8 Drug Register', 'Stock check template'], notes: 'Required in March and September each year. Keep records for minimum 2 years.' },
  'hospital-licence-renewal': { title: 'Hospital Licence Renewal', portal: 'vpb', estimatedTime: '20-30 minutes', fee: '\$880', items: [
    { id: 1, text: 'Log into VPB Portal', required: true, link: 'https://portal.vpb.nsw.gov.au/login' },
    { id: 2, text: 'Navigate to Hospital Licence section', required: true },
    { id: 3, text: 'Verify hospital details are current', required: true },
    { id: 4, text: 'Confirm superintendent nomination', required: true },
    { id: 5, text: 'Complete self-assessment checklist', required: true },
    { id: 6, text: 'Upload supporting documentation', required: true },
    { id: 7, text: 'Review and submit renewal', required: true },
    { id: 8, text: 'Pay renewal fee (\$880)', required: true },
  ], documents: ['Self-assessment checklist', 'Superintendent details', 'Insurance certificate'], notes: 'Annual renewal. Self-assessment must be completed before renewal submission.' },
};

const practiceInfo = { name: 'Northside Veterinary Hospital', abn: '12 345 678 901', address: '123 Main Street, Northside NSW 2000', phone: '(02) 9555 1234', email: 'admin@northsidevet.com.au', superintendent: 'Dr. Sarah Johnson', superintendentNumber: 'VET-12847' };

// Utility Functions
const calculateDaysUntil = (dateStr) => {
  const today = new Date('2026-01-29');
  const target = new Date(dateStr);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

const formatDate = (dateStr) => !dateStr ? '—' : new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
const getStatusFromDays = (days) => days < 0 ? 'overdue' : days < 30 ? 'attention' : 'compliant';

// Components
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] flex flex-col`}>
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
  return <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>{labels[status]}</span>;
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
const Textarea = (props) => <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none" rows={3} {...props} />;


// Feature Modals
const LicenceModal = ({ isOpen, onClose, licence, onSave }) => {
  const [form, setForm] = useState(licence || { type: '', holder: '', number: '', issued: '', expires: '', notes: '' });
  const licenceTypes = [{ value: 'Hospital Licence', label: 'Hospital Licence' }, { value: 'Radiation Management Licence', label: 'Radiation Management Licence' }, { value: 'Veterinary Practitioner', label: 'Veterinary Practitioner Registration' }, { value: 'Radiation User Licence', label: 'Radiation User Licence' }];
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: licence?.id || Date.now(), status: getStatusFromDays(calculateDaysUntil(form.expires)) }); onClose(); };
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
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">{licence ? 'Save Changes' : 'Add Licence'}</button>
        </div>
      </form>
    </Modal>
  );
};

const LicenceDetailModal = ({ isOpen, onClose, licence, onEdit, onNavigate, onStartRenewal }) => {
  if (!licence) return null;
  const daysUntil = calculateDaysUntil(licence.expires);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Licence Details">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div><h3 className="font-semibold text-lg text-slate-800">{licence.type}</h3><p className="text-slate-600">{licence.holder}</p></div>
          <StatusBadge status={licence.status} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Licence Number</p><p className="font-medium text-slate-800">{licence.number}</p></div>
          <div><p className="text-sm text-slate-500">Status</p><p className={`font-medium ${daysUntil < 0 ? 'text-red-600' : daysUntil < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days remaining`}</p></div>
          <div><p className="text-sm text-slate-500">Issue Date</p><p className="font-medium">{formatDate(licence.issued)}</p></div>
          <div><p className="text-sm text-slate-500">Expiry Date</p><p className="font-medium">{formatDate(licence.expires)}</p></div>
        </div>
        {licence.notes && <div><p className="text-sm text-slate-500">Notes</p><p className="text-slate-700">{licence.notes}</p></div>}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button onClick={() => onEdit(licence)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><Edit size={16} /> Edit</button>
          <button onClick={() => onStartRenewal(licence)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><RefreshCw size={16} /> Start Renewal</button>
          <button onClick={() => { onClose(); onNavigate('documents'); }} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><FolderOpen size={16} /> View Documents</button>
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
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">{activity ? 'Save Changes' : 'Log Activity'}</button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentModal = ({ isOpen, onClose, equipment, onSave }) => {
  const [form, setForm] = useState(equipment || { name: '', type: '', model: '', serial: '', lastInspection: '', nextInspection: '', location: '', notes: '' });
  const equipmentTypes = [{ value: 'Diagnostic X-ray', label: 'Diagnostic X-ray' }, { value: 'Dental Radiography', label: 'Dental Radiography' }, { value: 'Mobile Radiography', label: 'Mobile Radiography' }];
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: equipment?.id || Date.now(), status: getStatusFromDays(calculateDaysUntil(form.nextInspection)) }); onClose(); };
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
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">{equipment ? 'Save Changes' : 'Add Equipment'}</button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentDetailModal = ({ isOpen, onClose, equipment, onEdit, onNavigate }) => {
  if (!equipment) return null;
  const daysUntil = calculateDaysUntil(equipment.nextInspection);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Equipment Details">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div><h3 className="font-semibold text-lg text-slate-800">{equipment.name}</h3><p className="text-slate-600">{equipment.type}</p></div>
          <StatusBadge status={equipment.status} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Model</p><p className="font-medium">{equipment.model || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Serial Number</p><p className="font-medium">{equipment.serial || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Location</p><p className="font-medium">{equipment.location || '—'}</p></div>
          <div><p className="text-sm text-slate-500">Inspection Status</p><p className={`font-medium ${daysUntil < 0 ? 'text-red-600' : daysUntil < 30 ? 'text-amber-600' : 'text-emerald-600'}`}>{daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days until due`}</p></div>
          <div><p className="text-sm text-slate-500">Last Inspection</p><p className="font-medium">{formatDate(equipment.lastInspection)}</p></div>
          <div><p className="text-sm text-slate-500">Next Inspection</p><p className="font-medium">{formatDate(equipment.nextInspection)}</p></div>
        </div>
        {equipment.notes && <div><p className="text-sm text-slate-500">Notes</p><p className="text-slate-700">{equipment.notes}</p></div>}
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={() => onEdit(equipment)} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><Edit size={16} /> Edit</button>
          <button onClick={() => { onClose(); onNavigate('documents'); }} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><FolderOpen size={16} /> View Documents</button>
        </div>
      </div>
    </Modal>
  );
};

const DocumentUploadModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', category: '', expires: '' });
  const categories = [{ value: 'Hospital Licence', label: 'Hospital Licence' }, { value: 'Registration', label: 'Registration' }, { value: 'Radiation Safety', label: 'Radiation Safety' }, { value: 'Controlled Substances', label: 'Controlled Substances' }, { value: 'Insurance', label: 'Insurance' }, { value: 'Other', label: 'Other' }];
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, id: Date.now(), uploaded: new Date().toISOString().split('T')[0], size: '125 KB', linkedTo: null }); onClose(); };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 cursor-pointer">
          <Upload size={32} className="mx-auto text-slate-400 mb-2" /><p className="text-slate-600">Click to upload or drag and drop</p><p className="text-sm text-slate-400">PDF, PNG, JPG up to 10MB</p>
        </div>
        <FormField label="Document Name" required><Input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., Hospital Licence 2025-26.pdf" required /></FormField>
        <FormField label="Category" required><Select options={categories} placeholder="Select category..." value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required /></FormField>
        <FormField label="Expiry Date (if applicable)"><Input type="date" value={form.expires} onChange={e => setForm({ ...form, expires: e.target.value })} /></FormField>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Upload Document</button>
        </div>
      </form>
    </Modal>
  );
};

const DocumentDetailModal = ({ isOpen, onClose, document, onDelete }) => {
  if (!document) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Details">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg"><FileText size={24} className="text-slate-600" /></div>
          <div className="flex-1"><h3 className="font-semibold text-lg text-slate-800">{document.name}</h3><p className="text-slate-600">{document.category}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-slate-500">Uploaded</p><p className="font-medium">{formatDate(document.uploaded)}</p></div>
          <div><p className="text-sm text-slate-500">File Size</p><p className="font-medium">{document.size}</p></div>
          <div><p className="text-sm text-slate-500">Expiry Date</p><p className="font-medium">{document.expires ? formatDate(document.expires) : 'N/A'}</p></div>
        </div>
        <div className="flex gap-3 pt-4 border-t">
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Download size={16} /> Download</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><Eye size={16} /> Preview</button>
          <button onClick={() => onDelete(document)} className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={16} /> Delete</button>
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
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">{event ? 'Save Changes' : 'Add Reminder'}</button>
        </div>
      </form>
    </Modal>
  );
};

const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkRead }) => {
  if (!isOpen) return null;
  const getIcon = (type) => type === 'error' ? <AlertCircle size={16} className="text-red-500" /> : type === 'warning' ? <AlertTriangle size={16} className="text-amber-500" /> : <Info size={16} className="text-blue-500" />;
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50">
      <div className="flex items-center justify-between p-4 border-b"><h2 className="font-semibold text-slate-800">Notifications</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} className="text-slate-500" /></button></div>
      <div className="overflow-y-auto h-full pb-20">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`} onClick={() => onMarkRead(n.id)}>
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
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Save Settings</button>
      </div>
    </div>
  </Modal>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm' }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <p className="text-slate-600 mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">{confirmText}</button>
    </div>
  </Modal>
);

// Phase 2 Feature Modals
const PortalHubModal = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(null);
  const handleCopy = (url, id) => { navigator.clipboard.writeText(url); setCopiedUrl(id); setTimeout(() => setCopiedUrl(null), 2000); };
  const colorStyles = { blue: 'bg-blue-50 text-blue-600 border-blue-200', orange: 'bg-orange-50 text-orange-600 border-orange-200', green: 'bg-green-50 text-green-600 border-green-200', purple: 'bg-purple-50 text-purple-600 border-purple-200', red: 'bg-red-50 text-red-600 border-red-200' };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compliance Portal Hub" size="xl">
      <div className="space-y-4">
        <p className="text-slate-600 mb-4">Quick access to all NSW veterinary compliance portals. Click to open in a new tab.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(portalData).map((portal) => {
            const Icon = portal.icon;
            return (
              <div key={portal.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg border ${colorStyles[portal.color]}`}><Icon size={20} /></div>
                  <div className="flex-1"><h3 className="font-semibold text-slate-800">{portal.shortName}</h3><p className="text-sm text-slate-500">{portal.name}</p></div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{portal.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {portal.services.slice(0, 3).map((service, idx) => (<span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{service}</span>))}
                </div>
                <div className="flex gap-2">
                  <a href={portal.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700"><ExternalLink size={14} /> Open Portal</a>
                  <button onClick={() => handleCopy(portal.url, portal.id)} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50" title="Copy URL">
                    {copiedUrl === portal.id ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-500" />}
                  </button>
                </div>
                {(portal.supportEmail || portal.supportPhone) && (<div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">{portal.supportPhone && <span>📞 {portal.supportPhone}</span>}{portal.supportEmail && portal.supportPhone && <span className="mx-2">•</span>}{portal.supportEmail && <span>✉️ {portal.supportEmail}</span>}</div>)}
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
  const handleExportChecklist = () => {
    const content = `${checklist.title}\n${'='.repeat(checklist.title.length)}\n\nPortal: ${portal?.name || 'N/A'}\nEstimated Time: ${checklist.estimatedTime}\nFee: ${checklist.fee}\n\nCHECKLIST ITEMS:\n${checklist.items.map((item, idx) => `${idx + 1}. [${completedItems.includes(item.id) ? 'X' : ' '}] ${item.text}${item.required ? ' *' : ''}`).join('\n')}\n\nREQUIRED DOCUMENTS:\n${checklist.documents.map(doc => `• ${doc}`).join('\n')}\n\nNOTES:\n${checklist.notes}\n\nGenerated by VetComply on ${new Date().toLocaleDateString('en-AU')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${checklistId}-checklist.txt`; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={checklist.title} size="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="p-3 bg-white rounded-lg shadow-sm"><Icon size={24} className="text-teal-600" /></div>
          <div className="flex-1"><p className="font-medium text-slate-800">{portal?.name}</p><div className="flex gap-4 mt-1 text-sm text-slate-500"><span>⏱️ {checklist.estimatedTime}</span><span>💰 {checklist.fee}</span></div></div>
          <a href={portal?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><ExternalLink size={16} /> Open Portal</a>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Progress</span><span className="font-medium text-slate-800">{completedItems.length}/{checklist.items.length} completed</span></div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-slate-800">Steps to Complete</h4>
          {checklist.items.map((item) => (
            <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${completedItems.includes(item.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`} onClick={() => toggleItem(item.id)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${completedItems.includes(item.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>{completedItems.includes(item.id) && <CheckCircle size={14} className="text-white" />}</div>
              <span className={`flex-1 ${completedItems.includes(item.id) ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{item.text}{item.required && <span className="text-red-500 ml-1">*</span>}</span>
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 text-teal-600 hover:text-teal-700"><ExternalLink size={14} /></a>}
            </div>
          ))}
        </div>
        <div><h4 className="font-medium text-slate-800 mb-2">Required Documents</h4><div className="flex flex-wrap gap-2">{checklist.documents.map((doc, idx) => (<span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">📄 {doc}</span>))}</div></div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg"><div className="flex gap-2"><AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" /><p className="text-sm text-amber-800">{checklist.notes}</p></div></div>
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={handleExportChecklist} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><Download size={16} /> Export Checklist</button>
          <button onClick={() => setCompletedItems([])} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><RefreshCw size={16} /> Reset</button>
        </div>
      </div>
    </Modal>
  );
};

const CalendarExportModal = ({ isOpen, onClose, events }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [exportFormat, setExportFormat] = useState('ics');
  const toggleEvent = (eventId) => setSelectedEvents(prev => prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]);
  const selectAll = () => setSelectedEvents(events.map(e => e.id));
  const selectNone = () => setSelectedEvents([]);
  const generateICS = () => {
    const selectedEvts = events.filter(e => selectedEvents.includes(e.id));
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//VetComply//Compliance Calendar//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n${selectedEvts.map(event => {
      const date = event.date.replace(/-/g, '');
      return `BEGIN:VEVENT\nDTSTART;VALUE=DATE:${date}\nDTEND;VALUE=DATE:${date}\nSUMMARY:${event.title}\nDESCRIPTION:Category: ${event.category}\\nGenerated by VetComply\nSTATUS:CONFIRMED\nEND:VEVENT`;
    }).join('\n')}\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'vetcomply-calendar.ics'; a.click();
    URL.revokeObjectURL(url);
  };
  const generateGoogleCalendarUrl = (event) => {
    const date = event.date.replace(/-/g, '');
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`Category: ${event.category}\nGenerated by VetComply`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${details}`;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export to Calendar" size="lg">
      <div className="space-y-6">
        <p className="text-slate-600">Export compliance deadlines to your preferred calendar application.</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="format" value="ics" checked={exportFormat === 'ics'} onChange={() => setExportFormat('ics')} className="text-teal-600" /><span className="text-slate-700">Download .ICS file</span></label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="format" value="links" checked={exportFormat === 'links'} onChange={() => setExportFormat('links')} className="text-teal-600" /><span className="text-slate-700">Direct calendar links</span></label>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3"><h4 className="font-medium text-slate-800">Select Events ({selectedEvents.length}/{events.length})</h4><div className="flex gap-2"><button onClick={selectAll} className="text-sm text-teal-600 hover:text-teal-700">Select All</button><span className="text-slate-300">|</span><button onClick={selectNone} className="text-sm text-teal-600 hover:text-teal-700">Clear</button></div></div>
          <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-3">
            {events.map((event) => (
              <div key={event.id} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedEvents.includes(event.id) ? 'bg-teal-50' : 'hover:bg-slate-50'}`} onClick={() => toggleEvent(event.id)}>
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedEvents.includes(event.id) ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>{selectedEvents.includes(event.id) && <CheckCircle size={12} className="text-white" />}</div>
                <div className="flex-1"><p className="text-sm font-medium text-slate-800">{event.title}</p><p className="text-xs text-slate-500">{formatDate(event.date)} • {event.category}</p></div>
                <StatusBadge status={event.type} />
              </div>
            ))}
          </div>
        </div>
        {exportFormat === 'ics' ? (
          <button onClick={generateICS} disabled={selectedEvents.length === 0} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"><Download size={16} /> Download ICS File ({selectedEvents.length} events)</button>
        ) : (
          <div className="space-y-3">
            {selectedEvents.length === 0 ? <p className="text-center text-slate-500 py-4">Select events above to generate calendar links</p> : events.filter(e => selectedEvents.includes(e.id)).map(event => (
              <div key={event.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex-1"><p className="text-sm font-medium text-slate-800">{event.title}</p><p className="text-xs text-slate-500">{formatDate(event.date)}</p></div>
                <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Google</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

const CPDExportModal = ({ isOpen, onClose, cpdRecords }) => {
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [exportFormat, setExportFormat] = useState('summary');
  const practitioner = cpdRecords.find(p => p.id === selectedPractitioner);
  const generateCPDSummary = () => {
    if (!practitioner) return;
    const structuredActivities = practitioner.activities.filter(a => a.type === 'structured');
    const unstructuredActivities = practitioner.activities.filter(a => a.type === 'unstructured');
    const content = `CPD DECLARATION SUMMARY\n=======================\n\nPractitioner Details\n--------------------\nName: ${practitioner.name}\nRegistration Number: ${practitioner.registrationNumber}\nEmail: ${practitioner.email}\n\nCPD Period: ${formatDate(practitioner.periodStart)} to ${formatDate(practitioner.periodEnd)}\n\nSummary\n-------\nTotal Points Accrued: ${practitioner.totalPoints}\nPoints Required: ${practitioner.required}\nStatus: ${practitioner.totalPoints >= practitioner.required ? 'COMPLIANT' : 'INCOMPLETE'}\n\nStructured Activities: ${practitioner.structured} points\nUnstructured Activities: ${practitioner.unstructured} points\n\nSTRUCTURED ACTIVITIES (${structuredActivities.length})\n========================================\n${structuredActivities.map((a, idx) => `\n${idx + 1}. ${a.title}\n   Date: ${formatDate(a.date)}\n   Points: ${a.points}\n   Provider: ${a.provider || 'N/A'}\n   Certificate: ${a.certificate ? 'Yes' : 'No'}`).join('\n')}\n\nUNSTRUCTURED ACTIVITIES (${unstructuredActivities.length})\n========================================\n${unstructuredActivities.map((a, idx) => `\n${idx + 1}. ${a.title}\n   Date: ${formatDate(a.date)}\n   Points: ${a.points}`).join('\n')}\n\n---\nGenerated by VetComply on ${new Date().toLocaleDateString('en-AU')}\nThis document is for record-keeping purposes. Submit CPD declaration via the VPB Portal.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CPD-Summary-${practitioner.name.replace(/\s+/g, '-')}.txt`; a.click();
    URL.revokeObjectURL(url);
  };
  const generateCPDCSV = () => {
    if (!practitioner) return;
    const headers = ['Activity', 'Type', 'Date', 'Points', 'Provider', 'Certificate'];
    const rows = practitioner.activities.map(a => [a.title, a.type, a.date, a.points, a.provider || '', a.certificate ? 'Yes' : 'No']);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CPD-Activities-${practitioner.name.replace(/\s+/g, '-')}.csv`; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export CPD Records" size="lg">
      <div className="space-y-6">
        <p className="text-slate-600">Generate CPD summaries for VPB annual returns and declarations.</p>
        <FormField label="Select Practitioner"><Select options={cpdRecords.map(p => ({ value: p.id.toString(), label: `${p.name} (${p.totalPoints}/${p.required} pts)` }))} placeholder="Choose a practitioner..." value={selectedPractitioner?.toString() || ''} onChange={e => setSelectedPractitioner(parseInt(e.target.value))} /></FormField>
        {practitioner && (
          <>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3"><h4 className="font-medium text-slate-800">{practitioner.name}</h4><StatusBadge status={practitioner.totalPoints >= practitioner.required ? 'compliant' : 'attention'} /></div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-teal-600">{practitioner.totalPoints}</p><p className="text-xs text-slate-500">Total Points</p></div>
                <div className="text-center p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-blue-600">{practitioner.structured}</p><p className="text-xs text-slate-500">Structured</p></div>
                <div className="text-center p-3 bg-white rounded-lg"><p className="text-2xl font-bold text-purple-600">{practitioner.unstructured}</p><p className="text-xs text-slate-500">Unstructured</p></div>
              </div>
              <div className="text-sm text-slate-600"><p>Period: {formatDate(practitioner.periodStart)} – {formatDate(practitioner.periodEnd)}</p><p>Registration: {practitioner.registrationNumber}</p></div>
            </div>
            <div><h4 className="font-medium text-slate-800 mb-3">Export Format</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${exportFormat === 'summary' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}><input type="radio" name="exportFormat" value="summary" checked={exportFormat === 'summary'} onChange={() => setExportFormat('summary')} className="text-teal-600" /><div><p className="font-medium text-slate-800">Declaration Summary</p><p className="text-sm text-slate-500">Formatted text for VPB submission</p></div></label>
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${exportFormat === 'csv' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}><input type="radio" name="exportFormat" value="csv" checked={exportFormat === 'csv'} onChange={() => setExportFormat('csv')} className="text-teal-600" /><div><p className="font-medium text-slate-800">CSV Spreadsheet</p><p className="text-sm text-slate-500">Activities list for records</p></div></label>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <button onClick={exportFormat === 'summary' ? generateCPDSummary : generateCPDCSV} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Download size={16} /> Export {exportFormat === 'summary' ? 'Summary' : 'CSV'}</button>
              <a href={portalData.vpb.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><ExternalLink size={16} /> Open VPB Portal</a>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const EmailReminderModal = ({ isOpen, onClose, item, itemType }) => {
  const [emailType, setEmailType] = useState('self');
  const [customEmail, setCustomEmail] = useState('');
  const getSubject = () => !item ? '' : itemType === 'licence' ? `Reminder: ${item.type} Renewal - ${item.holder}` : `Reminder: ${item.name} Inspection Due`;
  const getBody = () => {
    if (!item) return '';
    const portalLinks = { 'Veterinary Practitioner': portalData.vpb.url, 'Hospital Licence': portalData.vpb.url, 'Radiation User Licence': portalData.epa.url, 'Radiation Management Licence': portalData.epa.url };
    const portalUrl = itemType === 'licence' ? portalLinks[item.type] || portalData.vpb.url : portalData.epa.url;
    return `Dear Team,\n\nThis is a reminder regarding the following compliance item:\n\n${itemType === 'licence' ? `TYPE: ${item.type}\nHOLDER: ${item.holder}\nNUMBER: ${item.number}\nEXPIRES: ${formatDate(item.expires)}\nSTATUS: ${item.status.toUpperCase()}` : `EQUIPMENT: ${item.name}\nTYPE: ${item.type}\nSERIAL: ${item.serial}\nNEXT INSPECTION: ${formatDate(item.nextInspection)}`}\n\nACTION REQUIRED:\nPlease log into the relevant portal to complete the required renewal/submission:\n${portalUrl}\n\n---\nThis reminder was generated by VetComply.\nPractice: ${practiceInfo.name}`;
  };
  const getMailtoLink = () => { const email = emailType === 'custom' ? customEmail : practiceInfo.email; return `mailto:${email}?subject=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(getBody())}`; };
  const handleCopyEmail = () => navigator.clipboard.writeText(getBody());
  if (!item) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Email Reminder" size="lg">
      <div className="space-y-6">
        <div><h4 className="font-medium text-slate-800 mb-3">Send To</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="emailType" value="self" checked={emailType === 'self'} onChange={() => setEmailType('self')} className="text-teal-600" /><span className="text-slate-700">Practice Email ({practiceInfo.email})</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="emailType" value="custom" checked={emailType === 'custom'} onChange={() => setEmailType('custom')} className="text-teal-600" /><span className="text-slate-700">Custom Email</span></label>
            {emailType === 'custom' && <Input type="email" value={customEmail} onChange={e => setCustomEmail(e.target.value)} placeholder="Enter email address..." className="mt-2" />}
          </div>
        </div>
        <div><h4 className="font-medium text-slate-800 mb-3">Email Preview</h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b"><p className="text-sm"><span className="text-slate-500">Subject:</span> <span className="font-medium text-slate-800">{getSubject()}</span></p></div>
            <pre className="p-4 text-sm text-slate-700 whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">{getBody()}</pre>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t">
          <a href={getMailtoLink()} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Mail size={16} /> Open in Email App</a>
          <button onClick={handleCopyEmail} className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"><Copy size={16} /> Copy Text</button>
        </div>
      </div>
    </Modal>
  );
};

const DocumentPackageModal = ({ isOpen, onClose, submissionType, documents }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const packageConfigs = {
    'vpb-registration': { title: 'VPB Registration Renewal Package', suggestedDocs: ['Registration', 'CPD'], additionalInfo: ['CPD declaration form', 'Proof of identity (if changed)', 'Address update form (if changed)'] },
    'hospital-licence': { title: 'Hospital Licence Renewal Package', suggestedDocs: ['Hospital Licence', 'Insurance'], additionalInfo: ['Self-assessment checklist', 'Superintendent nomination', 'Staff registration list'] },
    'radiation-user': { title: 'Radiation User Licence Package', suggestedDocs: ['Radiation Safety'], additionalInfo: ['Safety course certificate', 'Current registration proof', 'Employment letter'] },
  };
  const config = packageConfigs[submissionType] || packageConfigs['vpb-registration'];
  const relevantDocs = documents.filter(d => config.suggestedDocs.some(cat => d.category.includes(cat)));
  const toggleDoc = (docId) => setSelectedDocs(prev => prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]);
  const handleCreatePackage = () => {
    const selectedDocuments = documents.filter(d => selectedDocs.includes(d.id));
    const content = `${config.title}\n${'='.repeat(config.title.length)}\n\nPractice: ${practiceInfo.name}\nGenerated: ${new Date().toLocaleDateString('en-AU')}\n\nINCLUDED DOCUMENTS\n------------------\n${selectedDocuments.map((d, idx) => `${idx + 1}. ${d.name} (${d.category})`).join('\n')}\n\nADDITIONAL ITEMS TO PREPARE\n---------------------------\n${config.additionalInfo.map(item => `☐ ${item}`).join('\n')}\n\nSUBMISSION NOTES\n----------------\n- Ensure all documents are current and not expired\n- Keep copies of all submitted documents\n- Note your submission reference number\n\n---\nGenerated by VetComply`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${submissionType}-package-checklist.txt`; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={config.title} size="lg">
      <div className="space-y-6">
        <p className="text-slate-600">Prepare your document package for submission. Select the documents to include.</p>
        <div><h4 className="font-medium text-slate-800 mb-3">Available Documents</h4>
          {relevantDocs.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {relevantDocs.map(doc => (
                <div key={doc.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selectedDocs.includes(doc.id) ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`} onClick={() => toggleDoc(doc.id)}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedDocs.includes(doc.id) ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>{selectedDocs.includes(doc.id) && <CheckCircle size={14} className="text-white" />}</div>
                  <FileText size={16} className="text-slate-400" />
                  <div className="flex-1"><p className="text-sm font-medium text-slate-800">{doc.name}</p><p className="text-xs text-slate-500">{doc.category} • {doc.size}</p></div>
                  {doc.expires && calculateDaysUntil(doc.expires) < 30 && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Expiring soon</span>}
                </div>
              ))}
            </div>
          ) : <p className="text-slate-500 text-sm">No matching documents found. Upload relevant documents first.</p>}
        </div>
        <div><h4 className="font-medium text-slate-800 mb-3">Additional Items Needed</h4>
          <div className="grid grid-cols-1 gap-2">{config.additionalInfo.map((item, idx) => (<div key={idx} className="flex items-center gap-2 text-sm text-slate-600"><CheckSquare size={16} className="text-slate-400" />{item}</div>))}</div>
        </div>
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={handleCreatePackage} disabled={selectedDocs.length === 0} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"><Package size={16} /> Create Package Checklist</button>
        </div>
      </div>
    </Modal>
  );
};

// Dashboard Components
const ComplianceCard = ({ data, onClick }) => {
  const Icon = data.icon;
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${data.status === 'compliant' ? 'bg-emerald-50' : data.status === 'attention' ? 'bg-amber-50' : 'bg-red-50'}`}>
            <Icon size={20} className={data.status === 'compliant' ? 'text-emerald-600' : data.status === 'attention' ? 'text-amber-600' : 'text-red-600'} />
          </div>
          <h3 className="font-semibold text-slate-800">{data.title}</h3>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="space-y-2 mb-4">
        {data.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {item.status === 'compliant' || item.status === 'completed' ? <CheckCircle size={14} className="text-emerald-500" /> : item.status === 'attention' || item.status === 'upcoming' ? <Clock size={14} className="text-amber-500" /> : <AlertCircle size={14} className="text-red-500" />}
            <span className="text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
      {data.daysUntil !== null && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm text-slate-500">Next: {data.nextDeadline}</span>
          <span className={`text-sm font-medium ${data.daysUntil < 0 ? 'text-red-600' : data.daysUntil < 30 ? 'text-amber-600' : 'text-slate-600'}`}>{data.daysUntil < 0 ? `${Math.abs(data.daysUntil)} days overdue` : `${data.daysUntil} days`}</span>
        </div>
      )}
    </div>
  );
};

// Sidebar & Header
const Sidebar = ({ activeView, setActiveView, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portals', label: 'Portal Hub', icon: Globe },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'licences', label: 'Licences', icon: Award },
    { id: 'cpd', label: 'CPD Tracker', icon: GraduationCap },
    { id: 'equipment', label: 'Equipment', icon: Shield },
    { id: 'checklist', label: 'Self-Assessment', icon: ClipboardCheck },
  ];
  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center"><Shield size={18} className="text-white" /></div>
              <span className="text-xl font-bold text-slate-800">VetComply</span>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveView(item.id); setIsMobileOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                  {item.label}
                  {item.id === 'portals' && <span className="ml-auto px-1.5 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">New</span>}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer">
              <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center"><User size={18} className="text-teal-600" /></div>
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
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"><Menu size={20} className="text-slate-600" /></button>
          <div><h1 className="text-xl lg:text-2xl font-bold text-slate-800">{title}</h1>{subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNotificationsClick} className="p-2 hover:bg-slate-100 rounded-lg relative">
            <Bell size={20} className="text-slate-600" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">{unreadCount}</span>}
          </button>
          <button onClick={onSettingsClick} className="p-2 hover:bg-slate-100 rounded-lg"><Settings size={20} className="text-slate-600" /></button>
        </div>
      </div>
    </header>
  );
};

// Views
const DashboardView = ({ licences, cpdRecords, equipment, checklist, setActiveView, onQuickAction, onOpenPortals, onOpenCalendarExport }) => {
  const complianceData = {
    controlledSubstances: { status: 'compliant', title: 'Controlled Substances', icon: Shield, nextDeadline: 'September Stock Check', daysUntil: 47, targetView: null, items: [{ name: 'March Stock Check', status: 'completed' }, { name: 'September Stock Check', status: 'upcoming' }, { name: 'Drug Register Current', status: 'compliant' }] },
    radiationSafety: { status: equipment.some(e => e.status === 'attention') ? 'attention' : 'compliant', title: 'Radiation Safety', icon: Radiation, nextDeadline: 'Equipment Inspection', daysUntil: 23, targetView: 'equipment', items: equipment.slice(0, 3).map(e => ({ name: e.name, status: e.status })) },
    hospitalLicence: { status: licences.find(l => l.type === 'Hospital Licence')?.status || 'compliant', title: 'Hospital Licence', icon: Building2, nextDeadline: 'Annual Renewal', daysUntil: 152, targetView: 'licences', items: [{ name: 'Licence Current', status: 'compliant' }, { name: 'Superintendent Appointed', status: 'compliant' }, { name: 'Self-Assessment', status: checklist.every(c => c.completed) ? 'compliant' : 'attention' }] },
    registration: { status: licences.some(l => l.type === 'Veterinary Practitioner' && l.status === 'overdue') ? 'overdue' : 'compliant', title: 'Practitioner Registration', icon: Users, nextDeadline: 'Dr. Smith Renewal', daysUntil: -3, targetView: 'licences', items: licences.filter(l => l.type === 'Veterinary Practitioner').map(l => ({ name: l.holder, status: l.status })) },
    cpd: { status: cpdRecords.every(r => r.totalPoints >= r.required) ? 'compliant' : 'attention', title: 'CPD Compliance', icon: GraduationCap, nextDeadline: 'Annual Return', daysUntil: 152, targetView: 'cpd', items: cpdRecords.map(r => ({ name: `${r.name} (${r.totalPoints}/${r.required} pts)`, status: r.totalPoints >= r.required ? 'compliant' : 'attention' })) },
  };
  const totalItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.length, 0);
  const compliantItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'compliant' || i.status === 'completed').length, 0);
  const overallCompliance = Math.round((compliantItems / totalItems) * 100);
  const upcomingDeadlines = [
    { id: 1, title: 'Dr. Michael Smith - VPB Registration', days: -3, status: 'overdue', category: 'Registration' },
    { id: 2, title: 'X-ray Equipment Compliance Inspection', days: 23, status: 'attention', category: 'Radiation' },
    { id: 3, title: 'September S8 Stock Check', days: 47, status: 'compliant', category: 'Controlled Substances' },
    { id: 4, title: 'Radiation User Licence - Nurse Williams', days: 89, status: 'compliant', category: 'Radiation' },
    { id: 5, title: 'Hospital Licence Renewal', days: 152, status: 'compliant', category: 'Hospital' },
  ];
  const overdueCount = Object.values(complianceData).filter(c => c.status === 'overdue').length;
  const attentionCount = Object.values(complianceData).filter(c => c.status === 'attention').length;
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onQuickAction('cpd')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><Plus size={16} className="text-teal-600" />Log CPD</button>
        <button onClick={() => onQuickAction('document')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><Upload size={16} className="text-teal-600" />Upload Document</button>
        <button onClick={() => onQuickAction('event')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><Calendar size={16} className="text-teal-600" />Add Reminder</button>
        <button onClick={onOpenPortals} className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 hover:bg-teal-100"><Globe size={16} />Open Portals</button>
        <button onClick={onOpenCalendarExport} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50"><CalendarPlus size={16} className="text-teal-600" />Export Calendar</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><div className="flex items-center gap-3"><div className="p-2 bg-teal-50 rounded-lg"><TrendingUp size={20} className="text-teal-600" /></div><div><p className="text-2xl font-bold text-slate-800">{overallCompliance}%</p><p className="text-sm text-slate-500">Overall Compliance</p></div></div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md" onClick={() => setActiveView('licences')}><div className="flex items-center gap-3"><div className="p-2 bg-red-50 rounded-lg"><AlertCircle size={20} className="text-red-600" /></div><div><p className="text-2xl font-bold text-slate-800">{overdueCount}</p><p className="text-sm text-slate-500">Overdue Items</p></div></div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md" onClick={() => setActiveView('calendar')}><div className="flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-lg"><Clock size={20} className="text-amber-600" /></div><div><p className="text-2xl font-bold text-slate-800">{attentionCount}</p><p className="text-sm text-slate-500">Need Attention</p></div></div></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md" onClick={() => setActiveView('licences')}><div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle size={20} className="text-emerald-600" /></div><div><p className="text-2xl font-bold text-slate-800">{licences.filter(l => l.status === 'compliant').length}</p><p className="text-sm text-slate-500">Active Licences</p></div></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(complianceData).map(([key, data]) => (<ComplianceCard key={key} data={data} onClick={data.targetView ? () => setActiveView(data.targetView) : undefined} />))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-slate-800">Upcoming Deadlines</h3><button onClick={() => setActiveView('calendar')} className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">View All <ChevronRight size={16} /></button></div>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${deadline.status === 'overdue' ? 'bg-red-500' : deadline.status === 'attention' ? 'bg-amber-500' : 'bg-emerald-500'}`} /><div><p className="font-medium text-slate-800">{deadline.title}</p><p className="text-sm text-slate-500">{deadline.category}</p></div></div>
              <span className={`text-sm font-medium ${deadline.days < 0 ? 'text-red-600' : deadline.days < 30 ? 'text-amber-600' : 'text-slate-600'}`}>{deadline.days < 0 ? `${Math.abs(deadline.days)} days overdue` : `${deadline.days} days`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PortalHubView = ({ onOpenChecklist }) => {
  const colorStyles = { blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' }, orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }, green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' }, purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }, red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' } };
  const quickActions = [
    { id: 'vpb-registration-renewal', label: 'Renew VPB Registration', portal: 'vpb', icon: RefreshCw },
    { id: 'epa-user-licence-renewal', label: 'Renew Radiation Licence', portal: 'epa', icon: RefreshCw },
    { id: 's8-stock-check', label: 'S8 Stock Check', portal: 'pharmaceutical', icon: ClipboardCheck },
    { id: 'hospital-licence-renewal', label: 'Renew Hospital Licence', portal: 'vpb', icon: Building2 },
  ];
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-5 text-white">
        <h3 className="font-semibold text-lg mb-2">Quick Submission Guides</h3>
        <p className="text-teal-100 text-sm mb-4">Step-by-step checklists for common compliance submissions</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(action => { const Icon = action.icon; return (<button key={action.id} onClick={() => onOpenChecklist(action.id)} className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm"><Icon size={16} />{action.label}</button>); })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(portalData).map((portal) => {
          const Icon = portal.icon;
          const styles = colorStyles[portal.color];
          return (
            <div key={portal.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md">
              <div className="flex items-start gap-3 mb-4"><div className={`p-3 rounded-lg ${styles.bg} ${styles.border} border`}><Icon size={24} className={styles.text} /></div><div className="flex-1"><h3 className="font-semibold text-slate-800">{portal.shortName}</h3><p className="text-sm text-slate-500">{portal.name}</p></div></div>
              <p className="text-sm text-slate-600 mb-4">{portal.description}</p>
              <div className="mb-4"><p className="text-xs text-slate-500 mb-2">Available Services:</p><div className="flex flex-wrap gap-1">{portal.services.map((service, idx) => (<span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{service}</span>))}</div></div>
              <a href={portal.url} target="_blank" rel="noopener noreferrer" className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 ${styles.bg} ${styles.text} ${styles.border} border rounded-lg hover:opacity-80 font-medium`}><ExternalLink size={16} /> Open Portal</a>
              {(portal.supportPhone || portal.supportEmail) && (<div className="mt-3 pt-3 border-t border-slate-100"><p className="text-xs text-slate-500">{portal.supportPhone && <span>📞 {portal.supportPhone}</span>}{portal.supportEmail && (<>{portal.supportPhone && <span className="mx-2">•</span>}<span>✉️ {portal.supportEmail}</span></>)}</p></div>)}
            </div>
          );
        })}
      </div>
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex items-start gap-3">
          <HelpCircle size={24} className="text-slate-400" />
          <div><h4 className="font-semibold text-slate-800 mb-1">Need Help?</h4><p className="text-sm text-slate-600 mb-3">These portals don't offer API integration, so all submissions must be done manually through their websites. VetComply helps you prepare documents and track deadlines, but you'll need to log in to each portal separately.</p><p className="text-sm text-slate-500">💡 Tip: Use the submission checklists above to ensure you have everything ready before starting a portal submission.</p></div>
        </div>
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
        <div className="flex items-center gap-3"><button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronDown size={20} className="text-slate-600 rotate-90" /></button><h2 className="text-lg font-semibold text-slate-800">{monthName}</h2><button onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronDown size={20} className="text-slate-600 -rotate-90" /></button></div>
        <div className="flex gap-2"><button onClick={onExport} className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"><CalendarPlus size={16} /> Export</button><button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Plus size={16} /> Add Reminder</button></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="p-3 text-center text-sm font-medium text-slate-600">{day}</div>))}</div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = getEventsForDay(day);
            const isToday = day === 29 && selectedMonth.getMonth() === 0;
            return (
              <div key={idx} className={`min-h-[100px] p-2 border-b border-r border-slate-100 ${day ? 'hover:bg-slate-50' : 'bg-slate-50'}`}>
                {day && (
                  <><span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isToday ? 'bg-teal-600 text-white' : 'text-slate-700'}`}>{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map(event => (<div key={event.id} onClick={() => onView(event)} className={`text-xs p-1 rounded cursor-pointer truncate ${event.type === 'overdue' ? 'bg-red-100 text-red-700' : event.type === 'attention' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{event.title}</div>))}
                      {dayEvents.length > 2 && <span className="text-xs text-slate-500">+{dayEvents.length - 2} more</span>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">All Upcoming Events</h3>
        <div className="space-y-3">
          {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
            <div key={event.id} onClick={() => onView(event)} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3"><div className={`w-3 h-3 rounded-full ${event.type === 'overdue' ? 'bg-red-500' : event.type === 'attention' ? 'bg-amber-500' : 'bg-emerald-500'}`} /><div><p className="font-medium text-slate-800">{event.title}</p><p className="text-sm text-slate-500">{event.category} • {formatDate(event.date)}</p></div></div>
              <StatusBadge status={event.type} />
            </div>
          ))}
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
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></div>
          <Select options={[{ value: '', label: 'All Categories' }, ...categories.map(c => ({ value: c, label: c }))]} value={filterCategory} onChange={e => setFilterCategory(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button onClick={onPackage} className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"><Package size={16} /> Create Package</button>
          <button onClick={onUpload} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Upload size={16} /> Upload</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="text-left p-4 text-sm font-medium text-slate-600">Document</th><th className="text-left p-4 text-sm font-medium text-slate-600">Category</th><th className="text-left p-4 text-sm font-medium text-slate-600">Uploaded</th><th className="text-left p-4 text-sm font-medium text-slate-600">Expires</th><th className="text-left p-4 text-sm font-medium text-slate-600">Size</th><th className="p-4"></th></tr></thead>
          <tbody>
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4"><div className="flex items-center gap-3"><FileText size={20} className="text-slate-400" /><span className="font-medium text-slate-800">{doc.name}</span></div></td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">{doc.category}</span></td>
                <td className="p-4 text-slate-600">{formatDate(doc.uploaded)}</td>
                <td className="p-4">{doc.expires ? <span className={calculateDaysUntil(doc.expires) < 30 ? 'text-amber-600' : 'text-slate-600'}>{formatDate(doc.expires)}</span> : <span className="text-slate-400">—</span>}</td>
                <td className="p-4 text-slate-600">{doc.size}</td>
                <td className="p-4"><button onClick={() => onView(doc)} className="p-2 hover:bg-slate-100 rounded-lg"><Eye size={16} className="text-slate-500" /></button></td>
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
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Plus size={16} /> Add Licence</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLicences.map(licence => {
          const daysUntil = calculateDaysUntil(licence.expires);
          return (
            <div key={licence.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md">
              <div className="flex items-start justify-between mb-3"><div><h3 className="font-semibold text-slate-800">{licence.type}</h3><p className="text-sm text-slate-500">{licence.holder}</p></div><StatusBadge status={licence.status} /></div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Number</span><span className="text-slate-800 font-medium">{licence.number}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Expires</span><span className={daysUntil < 0 ? 'text-red-600 font-medium' : daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>{formatDate(licence.expires)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Status</span><span className={daysUntil < 0 ? 'text-red-600' : daysUntil < 30 ? 'text-amber-600' : 'text-emerald-600'}>{daysUntil < 0 ? `${Math.abs(daysUntil)}d overdue` : `${daysUntil}d remaining`}</span></div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button onClick={() => onView(licence)} className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">View</button>
                <button onClick={() => onStartRenewal(licence)} className="flex-1 px-3 py-1.5 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100">Renew</button>
                <button onClick={() => onEmail(licence)} className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50" title="Send reminder"><Mail size={14} className="text-slate-500" /></button>
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
        <button onClick={onExport} className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"><Download size={16} /> Export for VPB</button>
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Plus size={16} /> Log Activity</button>
      </div>
      <div className="space-y-4">
        {cpdRecords.map(record => {
          const isExpanded = expandedId === record.id;
          const progress = Math.round((record.totalPoints / record.required) * 100);
          const isCompliant = record.totalPoints >= record.required;
          return (
            <div key={record.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 cursor-pointer hover:bg-slate-50" onClick={() => setExpandedId(isExpanded ? null : record.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4"><div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center"><User size={24} className="text-teal-600" /></div><div><h3 className="font-semibold text-slate-800">{record.name}</h3><p className="text-sm text-slate-500">{record.registrationNumber}</p></div></div>
                  <div className="flex items-center gap-4"><div className="text-right"><p className="text-2xl font-bold text-slate-800">{record.totalPoints}<span className="text-sm text-slate-500">/{record.required}</span></p><p className="text-sm text-slate-500">points</p></div><StatusBadge status={isCompliant ? 'compliant' : 'attention'} /><ChevronDown size={20} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Progress</span><span className="font-medium text-slate-800">{progress}%</span></div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full ${isCompliant ? 'bg-emerald-500' : progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} /></div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2"><span>Structured: {record.structured} pts</span><span>Unstructured: {record.unstructured} pts</span><span>Period ends: {formatDate(record.periodEnd)}</span></div>
                </div>
              </div>
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 bg-slate-50">
                  <h4 className="font-medium text-slate-800 mb-3">CPD Activities</h4>
                  <div className="space-y-2">
                    {record.activities.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
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
    <div className="flex justify-end"><button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><Plus size={16} /> Add Equipment</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipment.map(item => {
        const daysUntil = calculateDaysUntil(item.nextInspection);
        return (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md">
            <div className="flex items-start justify-between mb-3"><div><h3 className="font-semibold text-slate-800">{item.name}</h3><p className="text-sm text-slate-500">{item.type}</p></div><StatusBadge status={item.status} /></div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Model</span><span className="text-slate-800">{item.model}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Serial</span><span className="text-slate-800">{item.serial}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="text-slate-800">{item.location}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Next Inspection</span><span className={daysUntil < 30 ? 'text-amber-600 font-medium' : 'text-slate-800'}>{formatDate(item.nextInspection)}</span></div>
            </div>
            {item.notes && <p className="text-sm text-slate-500 mb-4 p-2 bg-slate-50 rounded-lg">{item.notes}</p>}
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => onView(item)} className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">View Details</button>
              <button onClick={() => onEdit(item)} className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Edit</button>
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
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4"><div><h3 className="font-semibold text-slate-800">Self-Assessment Progress</h3><p className="text-sm text-slate-500">{completedItems} of {totalItems} items completed</p></div><button onClick={onExport} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"><Download size={16} /> Export Report</button></div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full ${progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${progress}%` }} /></div>
      </div>
      {sections.map(section => {
        const sectionItems = checklist.filter(c => c.section === section);
        const sectionCompleted = sectionItems.filter(c => c.completed).length;
        return (
          <div key={section} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between"><h4 className="font-semibold text-slate-800">{section}</h4><span className="text-sm text-slate-500">{sectionCompleted}/{sectionItems.length}</span></div>
            <div className="divide-y divide-slate-100">
              {sectionItems.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer" onClick={() => onToggle(item.id)}>
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>{item.completed && <CheckCircle size={14} className="text-white" />}</div>
                  <div className="flex-1"><p className={`font-medium ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.item}</p>{item.notes && <p className="text-sm text-slate-500 mt-1">{item.notes}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
 structured = newActivities.filter(a => a.type === 'structured').reduce((sum, a) => sum + a.points, 0);
        const unstructured = newActivities.filter(a => a.type === 'unstructured').reduce((sum, a) => sum + a.points, 0);
        return { ...record, activities: newActivities, structured, unstructured, totalPoints: structured + unstructured };
      }
      return record;
    }));
  };
  const handleSaveEquipment = (item) => { if (equipment.find(e => e.id === item.id)) { setEquipment(equipment.map(e => e.id === item.id ? item : e)); } else { setEquipment([...equipment, item]); } };
  const handleSaveDocument = (doc) => setDocuments([...documents, doc]);
  const handleDeleteDocument = (doc) => {
    setConfirmModal({ open: true, title: 'Delete Document', message: `Are you sure you want to delete "${doc.name}"? This action cannot be undone.`,
      onConfirm: () => { setDocuments(documents.filter(d => d.id !== doc.id)); setDocumentDetailModal({ open: false, document: null }); setConfirmModal({ open: false, title: '', message: '', onConfirm: null }); }
    });
  };
  const handleSaveCalendarEvent = (event) => { if (calendarEvents.find(e => e.id === event.id)) { setCalendarEvents(calendarEvents.map(e => e.id === event.id ? event : e)); } else { setCalendarEvents([...calendarEvents, event]); } };
  const handleToggleChecklist = (itemId) => setChecklist(checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item));
  const handleMarkNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  
  const handleQuickAction = (action) => {
    switch (action) {
      case 'cpd': setCpdModal({ open: true, activity: null, practitionerId: null }); break;
      case 'document': setDocumentUploadModal(true); break;
      case 'event': setCalendarEventModal({ open: true, event: null }); break;
    }
  };
  
  const handleExport = (type) => {
    const content = `${type} Export\nGenerated: ${new Date().toLocaleDateString()}\n\nThis is a placeholder export.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${type.toLowerCase()}-export.txt`; a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleStartRenewal = (licence) => {
    const checklistMap = { 'Veterinary Practitioner': 'vpb-registration-renewal', 'Hospital Licence': 'hospital-licence-renewal', 'Radiation User Licence': 'epa-user-licence-renewal', 'Radiation Management Licence': 'epa-user-licence-renewal' };
    const checklistId = checklistMap[licence.type] || 'vpb-registration-renewal';
    setLicenceDetailModal({ open: false, licence: null });
    setSubmissionChecklistModal({ open: true, checklistId });
  };
  
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView licences={licences} cpdRecords={cpdRecords} equipment={equipment} checklist={checklist} setActiveView={setActiveView} onQuickAction={handleQuickAction} onOpenPortals={() => setPortalHubModal(true)} onOpenCalendarExport={() => setCalendarExportModal(true)} />;
      case 'portals': return <PortalHubView onOpenChecklist={(id) => setSubmissionChecklistModal({ open: true, checklistId: id })} />;
      case 'calendar': return <CalendarView events={calendarEvents} onAdd={() => setCalendarEventModal({ open: true, event: null })} onView={(e) => setCalendarEventModal({ open: true, event: e })} onExport={() => setCalendarExportModal(true)} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setDocumentUploadModal(true)} onView={(d) => setDocumentDetailModal({ open: true, document: d })} onPackage={() => setDocumentPackageModal({ open: true, submissionType: 'vpb-registration' })} />;
      case 'licences': return <LicencesView licences={licences} onAdd={() => setLicenceModal({ open: true, licence: null })} onView={(l) => setLicenceDetailModal({ open: true, licence: l })} onStartRenewal={handleStartRenewal} onEmail={(l) => setEmailReminderModal({ open: true, item: l, itemType: 'licence' })} />;
      case 'cpd': return <CPDView cpdRecords={cpdRecords} onAdd={() => setCpdModal({ open: true, activity: null, practitionerId: null })} onExport={() => setCpdExportModal(true)} />;
      case 'equipment': return <EquipmentView equipment={equipment} onAdd={() => setEquipmentModal({ open: true, equipment: null })} onView={(e) => setEquipmentDetailModal({ open: true, equipment: e })} onEdit={(e) => setEquipmentModal({ open: true, equipment: e })} />;
      case 'checklist': return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} onExport={() => handleExport('Checklist')} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <main className="flex-1 min-w-0">
        <Header title={viewConfig[activeView].title} subtitle={viewConfig[activeView].subtitle} setIsMobileOpen={setIsMobileOpen} notifications={notifications} onNotificationsClick={() => setShowNotifications(!showNotifications)} onSettingsClick={() => setShowSettings(true)} />
        {renderView()}
      </main>
      
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} onMarkRead={handleMarkNotificationRead} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <LicenceModal isOpen={licenceModal.open} onClose={() => setLicenceModal({ open: false, licence: null })} licence={licenceModal.licence} onSave={handleSaveLicence} />
      <LicenceDetailModal isOpen={licenceDetailModal.open} onClose={() => setLicenceDetailModal({ open: false, licence: null })} licence={licenceDetailModal.licence} onEdit={(l) => { setLicenceDetailModal({ open: false, licence: null }); setLicenceModal({ open: true, licence: l }); }} onNavigate={setActiveView} onStartRenewal={handleStartRenewal} />
      <CPDActivityModal isOpen={cpdModal.open} onClose={() => setCpdModal({ open: false, activity: null, practitionerId: null })} activity={cpdModal.activity} practitioners={cpdRecords} onSave={handleSaveCpdActivity} />
      <EquipmentModal isOpen={equipmentModal.open} onClose={() => setEquipmentModal({ open: false, equipment: null })} equipment={equipmentModal.equipment} onSave={handleSaveEquipment} />
      <EquipmentDetailModal isOpen={equipmentDetailModal.open} onClose={() => setEquipmentDetailModal({ open: false, equipment: null })} equipment={equipmentDetailModal.equipment} onEdit={(e) => { setEquipmentDetailModal({ open: false, equipment: null }); setEquipmentModal({ open: true, equipment: e }); }} onNavigate={setActiveView} />
      <DocumentUploadModal isOpen={documentUploadModal} onClose={() => setDocumentUploadModal(false)} onSave={handleSaveDocument} />
      <DocumentDetailModal isOpen={documentDetailModal.open} onClose={() => setDocumentDetailModal({ open: false, document: null })} document={documentDetailModal.document} onDelete={handleDeleteDocument} />
      <CalendarEventModal isOpen={calendarEventModal.open} onClose={() => setCalendarEventModal({ open: false, event: null })} event={calendarEventModal.event} onSave={handleSaveCalendarEvent} />
      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })} onConfirm={confirmModal.onConfirm} title={confirmModal.title} message={confirmModal.message} />
      
      <PortalHubModal isOpen={portalHubModal} onClose={() => setPortalHubModal(false)} />
      <SubmissionChecklistModal isOpen={submissionChecklistModal.open} onClose={() => setSubmissionChecklistModal({ open: false, checklistId: null })} checklistId={submissionChecklistModal.checklistId} />
      <CalendarExportModal isOpen={calendarExportModal} onClose={() => setCalendarExportModal(false)} events={calendarEvents} />
      <CPDExportModal isOpen={cpdExportModal} onClose={() => setCpdExportModal(false)} cpdRecords={cpdRecords} />
      <EmailReminderModal isOpen={emailReminderModal.open} onClose={() => setEmailReminderModal({ open: false, item: null, itemType: null })} item={emailReminderModal.item} itemType={emailReminderModal.itemType} />
      <DocumentPackageModal isOpen={documentPackageModal.open} onClose={() => setDocumentPackageModal({ open: false, submissionType: null })} submissionType={documentPackageModal.submissionType} documents={documents} />
    </div>
  );
}
 structured = newActivities.filter(a => a.type === 'structured').reduce((sum, a) => sum + a.points, 0);
        const unstructured = newActivities.filter(a => a.type === 'unstructured').reduce((sum, a) => sum + a.points, 0);
        return { ...record, activities: newActivities, structured, unstructured, totalPoints: structured + unstructured };
      }
      return record;
    }));
  };
  const handleSaveEquipment = (item) => { if (equipment.find(e => e.id === item.id)) { setEquipment(equipment.map(e => e.id === item.id ? item : e)); } else { setEquipment([...equipment, item]); } };
  const handleSaveDocument = (doc) => setDocuments([...documents, doc]);
  const handleDeleteDocument = (doc) => {
    setConfirmModal({ open: true, title: 'Delete Document', message: `Are you sure you want to delete "${doc.name}"? This action cannot be undone.`, onConfirm: () => { setDocuments(documents.filter(d => d.id !== doc.id)); setDocumentDetailModal({ open: false, document: null }); setConfirmModal({ open: false, title: '', message: '', onConfirm: null }); } });
  };
  const handleSaveCalendarEvent = (event) => { if (calendarEvents.find(e => e.id === event.id)) { setCalendarEvents(calendarEvents.map(e => e.id === event.id ? event : e)); } else { setCalendarEvents([...calendarEvents, event]); } };
  const handleToggleChecklist = (itemId) => setChecklist(checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item));
  const handleMarkNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const handleQuickAction = (action) => { switch (action) { case 'cpd': setCpdModal({ open: true, activity: null, practitionerId: null }); break; case 'document': setDocumentUploadModal(true); break; case 'event': setCalendarEventModal({ open: true, event: null }); break; } };
  const handleExport = (type) => { const content = `${type} Export\nGenerated: ${new Date().toLocaleDateString()}\n\nThis is a placeholder export.`; const blob = new Blob([content], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${type.toLowerCase()}-export.txt`; a.click(); URL.revokeObjectURL(url); };
  const handleStartRenewal = (licence) => {
    const checklistMap = { 'Veterinary Practitioner': 'vpb-registration-renewal', 'Hospital Licence': 'hospital-licence-renewal', 'Radiation User Licence': 'epa-user-licence-renewal', 'Radiation Management Licence': 'epa-user-licence-renewal' };
    setLicenceDetailModal({ open: false, licence: null });
    setSubmissionChecklistModal({ open: true, checklistId: checklistMap[licence.type] || 'vpb-registration-renewal' });
  };
  
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView licences={licences} cpdRecords={cpdRecords} equipment={equipment} checklist={checklist} setActiveView={setActiveView} onQuickAction={handleQuickAction} onOpenPortals={() => setPortalHubModal(true)} onOpenCalendarExport={() => setCalendarExportModal(true)} />;
      case 'portals': return <PortalHubView onOpenChecklist={(id) => setSubmissionChecklistModal({ open: true, checklistId: id })} />;
      case 'calendar': return <CalendarView events={calendarEvents} onAdd={() => setCalendarEventModal({ open: true, event: null })} onView={(e) => setCalendarEventModal({ open: true, event: e })} onExport={() => setCalendarExportModal(true)} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setDocumentUploadModal(true)} onView={(d) => setDocumentDetailModal({ open: true, document: d })} onPackage={() => setDocumentPackageModal({ open: true, submissionType: 'vpb-registration' })} />;
      case 'licences': return <LicencesView licences={licences} onAdd={() => setLicenceModal({ open: true, licence: null })} onView={(l) => setLicenceDetailModal({ open: true, licence: l })} onStartRenewal={handleStartRenewal} onEmail={(l) => setEmailReminderModal({ open: true, item: l, itemType: 'licence' })} />;
      case 'cpd': return <CPDView cpdRecords={cpdRecords} onAdd={() => setCpdModal({ open: true, activity: null, practitionerId: null })} onExport={() => setCpdExportModal(true)} />;
      case 'equipment': return <EquipmentView equipment={equipment} onAdd={() => setEquipmentModal({ open: true, equipment: null })} onView={(e) => setEquipmentDetailModal({ open: true, equipment: e })} onEdit={(e) => setEquipmentModal({ open: true, equipment: e })} />;
      case 'checklist': return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} onExport={() => handleExport('Checklist')} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <main className="flex-1 min-w-0">
        <Header title={viewConfig[activeView].title} subtitle={viewConfig[activeView].subtitle} setIsMobileOpen={setIsMobileOpen} notifications={notifications} onNotificationsClick={() => setShowNotifications(!showNotifications)} onSettingsClick={() => setShowSettings(true)} />
        {renderView()}
      </main>
      
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} onMarkRead={handleMarkNotificationRead} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <LicenceModal isOpen={licenceModal.open} onClose={() => setLicenceModal({ open: false, licence: null })} licence={licenceModal.licence} onSave={handleSaveLicence} />
      <LicenceDetailModal isOpen={licenceDetailModal.open} onClose={() => setLicenceDetailModal({ open: false, licence: null })} licence={licenceDetailModal.licence} onEdit={(l) => { setLicenceDetailModal({ open: false, licence: null }); setLicenceModal({ open: true, licence: l }); }} onNavigate={setActiveView} onStartRenewal={handleStartRenewal} />
      <CPDActivityModal isOpen={cpdModal.open} onClose={() => setCpdModal({ open: false, activity: null, practitionerId: null })} activity={cpdModal.activity} practitioners={cpdRecords} onSave={handleSaveCpdActivity} />
      <EquipmentModal isOpen={equipmentModal.open} onClose={() => setEquipmentModal({ open: false, equipment: null })} equipment={equipmentModal.equipment} onSave={handleSaveEquipment} />
      <EquipmentDetailModal isOpen={equipmentDetailModal.open} onClose={() => setEquipmentDetailModal({ open: false, equipment: null })} equipment={equipmentDetailModal.equipment} onEdit={(e) => { setEquipmentDetailModal({ open: false, equipment: null }); setEquipmentModal({ open: true, equipment: e }); }} onNavigate={setActiveView} />
      <DocumentUploadModal isOpen={documentUploadModal} onClose={() => setDocumentUploadModal(false)} onSave={handleSaveDocument} />
      <DocumentDetailModal isOpen={documentDetailModal.open} onClose={() => setDocumentDetailModal({ open: false, document: null })} document={documentDetailModal.document} onDelete={handleDeleteDocument} />
      <CalendarEventModal isOpen={calendarEventModal.open} onClose={() => setCalendarEventModal({ open: false, event: null })} event={calendarEventModal.event} onSave={handleSaveCalendarEvent} />
      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })} onConfirm={confirmModal.onConfirm} title={confirmModal.title} message={confirmModal.message} confirmText="Delete" />
      
      <PortalHubModal isOpen={portalHubModal} onClose={() => setPortalHubModal(false)} />
      <SubmissionChecklistModal isOpen={submissionChecklistModal.open} onClose={() => setSubmissionChecklistModal({ open: false, checklistId: null })} checklistId={submissionChecklistModal.checklistId} />
      <CalendarExportModal isOpen={calendarExportModal} onClose={() => setCalendarExportModal(false)} events={calendarEvents} />
      <CPDExportModal isOpen={cpdExportModal} onClose={() => setCpdExportModal(false)} cpdRecords={cpdRecords} />
      <EmailReminderModal isOpen={emailReminderModal.open} onClose={() => setEmailReminderModal({ open: false, item: null, itemType: null })} item={emailReminderModal.item} itemType={emailReminderModal.itemType} />
      <DocumentPackageModal isOpen={documentPackageModal.open} onClose={() => setDocumentPackageModal({ open: false, submissionType: null })} submissionType={documentPackageModal.submissionType} documents={documents} />
    </div>
  );
}
 structured = newActivities.filter(a => a.type === 'structured').reduce((sum, a) => sum + a.points, 0);
        const unstructured = newActivities.filter(a => a.type === 'unstructured').reduce((sum, a) => sum + a.points, 0);
        return { ...record, activities: newActivities, structured, unstructured, totalPoints: structured + unstructured };
      }
      return record;
    }));
  };
  const handleSaveEquipment = (item) => { if (equipment.find(e => e.id === item.id)) { setEquipment(equipment.map(e => e.id === item.id ? item : e)); } else { setEquipment([...equipment, item]); } };
  const handleSaveDocument = (doc) => setDocuments([...documents, doc]);
  const handleDeleteDocument = (doc) => {
    setConfirmModal({ open: true, title: 'Delete Document', message: `Are you sure you want to delete "${doc.name}"? This action cannot be undone.`,
      onConfirm: () => { setDocuments(documents.filter(d => d.id !== doc.id)); setDocumentDetailModal({ open: false, document: null }); setConfirmModal({ open: false, title: '', message: '', onConfirm: null }); }
    });
  };
  const handleSaveCalendarEvent = (event) => { if (calendarEvents.find(e => e.id === event.id)) { setCalendarEvents(calendarEvents.map(e => e.id === event.id ? event : e)); } else { setCalendarEvents([...calendarEvents, event]); } };
  const handleToggleChecklist = (itemId) => setChecklist(checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item));
  const handleMarkNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const handleQuickAction = (action) => { switch (action) { case 'cpd': setCpdModal({ open: true, activity: null, practitionerId: null }); break; case 'document': setDocumentUploadModal(true); break; case 'event': setCalendarEventModal({ open: true, event: null }); break; } };
  const handleExport = (type) => { const content = `${type} Export\nGenerated: ${new Date().toLocaleDateString()}\n\nThis is a placeholder export.`; const blob = new Blob([content], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${type.toLowerCase()}-export.txt`; a.click(); URL.revokeObjectURL(url); };
  const handleStartRenewal = (licence) => {
    const checklistMap = { 'Veterinary Practitioner': 'vpb-registration-renewal', 'Hospital Licence': 'hospital-licence-renewal', 'Radiation User Licence': 'epa-user-licence-renewal', 'Radiation Management Licence': 'epa-user-licence-renewal' };
    setLicenceDetailModal({ open: false, licence: null });
    setSubmissionChecklistModal({ open: true, checklistId: checklistMap[licence.type] || 'vpb-registration-renewal' });
  };
  
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView licences={licences} cpdRecords={cpdRecords} equipment={equipment} checklist={checklist} setActiveView={setActiveView} onQuickAction={handleQuickAction} onOpenPortals={() => setPortalHubModal(true)} onOpenCalendarExport={() => setCalendarExportModal(true)} />;
      case 'portals': return <PortalHubView onOpenChecklist={(id) => setSubmissionChecklistModal({ open: true, checklistId: id })} />;
      case 'calendar': return <CalendarView events={calendarEvents} onAdd={() => setCalendarEventModal({ open: true, event: null })} onView={(e) => setCalendarEventModal({ open: true, event: e })} onExport={() => setCalendarExportModal(true)} />;
      case 'documents': return <DocumentsView documents={documents} onUpload={() => setDocumentUploadModal(true)} onView={(d) => setDocumentDetailModal({ open: true, document: d })} onPackage={() => setDocumentPackageModal({ open: true, submissionType: 'vpb-registration' })} />;
      case 'licences': return <LicencesView licences={licences} onAdd={() => setLicenceModal({ open: true, licence: null })} onView={(l) => setLicenceDetailModal({ open: true, licence: l })} onStartRenewal={handleStartRenewal} onEmail={(l) => setEmailReminderModal({ open: true, item: l, itemType: 'licence' })} />;
      case 'cpd': return <CPDView cpdRecords={cpdRecords} onAdd={() => setCpdModal({ open: true, activity: null, practitionerId: null })} onExport={() => setCpdExportModal(true)} />;
      case 'equipment': return <EquipmentView equipment={equipment} onAdd={() => setEquipmentModal({ open: true, equipment: null })} onView={(e) => setEquipmentDetailModal({ open: true, equipment: e })} onEdit={(e) => setEquipmentModal({ open: true, equipment: e })} />;
      case 'checklist': return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} onExport={() => handleExport('Checklist')} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <main className="flex-1 min-w-0">
        <Header title={viewConfig[activeView].title} subtitle={viewConfig[activeView].subtitle} setIsMobileOpen={setIsMobileOpen} notifications={notifications} onNotificationsClick={() => setShowNotifications(!showNotifications)} onSettingsClick={() => setShowSettings(true)} />
        {renderView()}
      </main>
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} onMarkRead={handleMarkNotificationRead} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <LicenceModal isOpen={licenceModal.open} onClose={() => setLicenceModal({ open: false, licence: null })} licence={licenceModal.licence} onSave={handleSaveLicence} />
      <LicenceDetailModal isOpen={licenceDetailModal.open} onClose={() => setLicenceDetailModal({ open: false, licence: null })} licence={licenceDetailModal.licence} onEdit={(l) => { setLicenceDetailModal({ open: false, licence: null }); setLicenceModal({ open: true, licence: l }); }} onNavigate={setActiveView} onStartRenewal={handleStartRenewal} />
      <CPDActivityModal isOpen={cpdModal.open} onClose={() => setCpdModal({ open: false, activity: null, practitionerId: null })} activity={cpdModal.activity} practitioners={cpdRecords} onSave={handleSaveCpdActivity} />
      <EquipmentModal isOpen={equipmentModal.open} onClose={() => setEquipmentModal({ open: false, equipment: null })} equipment={equipmentModal.equipment} onSave={handleSaveEquipment} />
      <EquipmentDetailModal isOpen={equipmentDetailModal.open} onClose={() => setEquipmentDetailModal({ open: false, equipment: null })} equipment={equipmentDetailModal.equipment} onEdit={(e) => { setEquipmentDetailModal({ open: false, equipment: null }); setEquipmentModal({ open: true, equipment: e }); }} onNavigate={setActiveView} />
      <DocumentUploadModal isOpen={documentUploadModal} onClose={() => setDocumentUploadModal(false)} onSave={handleSaveDocument} />
      <DocumentDetailModal isOpen={documentDetailModal.open} onClose={() => setDocumentDetailModal({ open: false, document: null })} document={documentDetailModal.document} onDelete={handleDeleteDocument} />
      <CalendarEventModal isOpen={calendarEventModal.open} onClose={() => setCalendarEventModal({ open: false, event: null })} event={calendarEventModal.event} onSave={handleSaveCalendarEvent} />
      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })} onConfirm={confirmModal.onConfirm} title={confirmModal.title} message={confirmModal.message} />
      <PortalHubModal isOpen={portalHubModal} onClose={() => setPortalHubModal(false)} />
      <SubmissionChecklistModal isOpen={submissionChecklistModal.open} onClose={() => setSubmissionChecklistModal({ open: false, checklistId: null })} checklistId={submissionChecklistModal.checklistId} />
      <CalendarExportModal isOpen={calendarExportModal} onClose={() => setCalendarExportModal(false)} events={calendarEvents} />
      <CPDExportModal isOpen={cpdExportModal} onClose={() => setCpdExportModal(false)} cpdRecords={cpdRecords} />
      <EmailReminderModal isOpen={emailReminderModal.open} onClose={() => setEmailReminderModal({ open: false, item: null, itemType: null })} item={emailReminderModal.item} itemType={emailReminderModal.itemType} />
      <DocumentPackageModal isOpen={documentPackageModal.open} onClose={() => setDocumentPackageModal({ open: false, submissionType: null })} submissionType={documentPackageModal.submissionType} documents={documents} />
    </div>
  );
}
