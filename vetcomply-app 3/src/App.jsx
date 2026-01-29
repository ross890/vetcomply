import { useState, createContext, useContext } from 'react';
import { 
  LayoutDashboard, Calendar, FolderOpen, Award, GraduationCap, 
  Settings, ClipboardCheck, Bell, Plus, ChevronRight,
  AlertTriangle, CheckCircle, Clock, FileText, Upload, X,
  Building2, Users, Shield, Menu, User,
  TrendingUp, AlertCircle, ChevronDown, Eye, Download, Trash2,
  Edit, ExternalLink, Printer, Search, Filter,
} from 'lucide-react';

// ==================== CONTEXT ====================
const AppContext = createContext();

const useApp = () => useContext(AppContext);

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
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    totalPoints: 48, 
    required: 60, 
    structured: 18, 
    unstructured: 30,
    periodEnd: '2027-06-30',
    activities: [
      { id: 1, title: 'AVA Annual Conference 2025', points: 12, type: 'structured', date: '2025-05-15', provider: 'AVA' },
      { id: 2, title: 'Emergency Medicine Workshop', points: 6, type: 'structured', date: '2025-08-22', provider: 'Sydney Uni' },
      { id: 3, title: 'Journal Reading - Various', points: 15, type: 'unstructured', date: '2025-12-31', provider: '' },
      { id: 4, title: 'In-house Training Sessions', points: 15, type: 'unstructured', date: '2025-12-31', provider: '' },
    ]
  },
  { 
    id: 2, 
    name: 'Dr. Michael Smith', 
    totalPoints: 52, 
    required: 60, 
    structured: 22, 
    unstructured: 30,
    periodEnd: '2027-06-30',
    activities: [
      { id: 5, title: 'Surgical Techniques Masterclass', points: 16, type: 'structured', date: '2025-03-10', provider: 'ASAV' },
      { id: 6, title: 'Online Pharmacology Course', points: 6, type: 'structured', date: '2025-09-05', provider: 'VetEducation' },
      { id: 7, title: 'Case Study Reviews', points: 20, type: 'unstructured', date: '2025-12-31', provider: '' },
      { id: 8, title: 'Peer Discussions', points: 10, type: 'unstructured', date: '2025-12-31', provider: '' },
    ]
  },
  { 
    id: 3, 
    name: 'Dr. Emily Chen', 
    totalPoints: 61, 
    required: 60, 
    structured: 24, 
    unstructured: 37,
    periodEnd: '2027-06-30',
    activities: [
      { id: 9, title: 'ASAV Conference 2025', points: 14, type: 'structured', date: '2025-06-20', provider: 'ASAV' },
      { id: 10, title: 'Dermatology Webinar Series', points: 10, type: 'structured', date: '2025-10-15', provider: 'VIN' },
      { id: 11, title: 'Research Publication', points: 22, type: 'unstructured', date: '2025-07-30', provider: '' },
      { id: 12, title: 'Mentoring Junior Vets', points: 15, type: 'unstructured', date: '2025-12-31', provider: '' },
    ]
  },
];

const initialEquipment = [
  { id: 1, name: 'X-ray Unit - Main Theatre', type: 'Diagnostic X-ray', model: 'Fujifilm VXR-40', serial: 'FVX-2022-4851', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Theatre 1', notes: 'EPA inspection booked for Feb 15' },
  { id: 2, name: 'Dental X-ray Unit', type: 'Dental Radiography', model: 'iM3 CR7', serial: 'IM3-2023-1124', lastInspection: '2023-08-15', nextInspection: '2028-08-15', status: 'compliant', location: 'Dental Suite', notes: '' },
  { id: 3, name: 'Portable X-ray', type: 'Mobile Radiography', model: 'MinXray HF100', serial: 'MXR-2021-8876', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention', location: 'Storage Room A', notes: 'To be inspected with main unit' },
];

const initialChecklist = [
  { id: 1, section: 'Premises & Facilities', item: 'Reception area clean and welcoming', completed: true, notes: '', evidence: null },
  { id: 2, section: 'Premises & Facilities', item: 'Consulting rooms meet minimum size requirements', completed: true, notes: '', evidence: null },
  { id: 3, section: 'Premises & Facilities', item: 'Surgery/procedure room appropriately equipped', completed: true, notes: '', evidence: null },
  { id: 4, section: 'Premises & Facilities', item: 'Adequate animal holding facilities', completed: true, notes: '', evidence: null },
  { id: 5, section: 'Premises & Facilities', item: 'Isolation facility available', completed: false, notes: 'Currently using separate ward - need dedicated isolation room', evidence: null },
  { id: 6, section: 'Equipment', item: 'Anaesthetic equipment maintained and calibrated', completed: true, notes: 'Service due April 2026', evidence: null },
  { id: 7, section: 'Equipment', item: 'Monitoring equipment available (ECG, pulse ox, etc.)', completed: true, notes: '', evidence: null },
  { id: 8, section: 'Equipment', item: 'Radiography equipment compliant', completed: false, notes: 'Inspection due February 2026', evidence: null },
  { id: 9, section: 'Equipment', item: 'Sterilisation equipment validated', completed: true, notes: 'Autoclave validation completed Nov 2025', evidence: null },
  { id: 10, section: 'Records & Documentation', item: 'Clinical records meet requirements', completed: true, notes: '', evidence: null },
  { id: 11, section: 'Records & Documentation', item: 'S8 drug register maintained correctly', completed: true, notes: 'Using Vet S8 electronic system', evidence: null },
  { id: 12, section: 'Records & Documentation', item: 'Consent forms used appropriately', completed: true, notes: '', evidence: null },
  { id: 13, section: 'Staffing', item: 'Superintendent responsibilities understood', completed: true, notes: '', evidence: null },
  { id: 14, section: 'Staffing', item: 'All veterinarians currently registered', completed: false, notes: 'Dr Smith registration overdue', evidence: null },
  { id: 15, section: 'Staffing', item: 'Adequate supervision of support staff', completed: true, notes: '', evidence: null },
  { id: 16, section: 'Emergency Procedures', item: 'Emergency protocols documented', completed: true, notes: '', evidence: null },
  { id: 17, section: 'Emergency Procedures', item: 'After-hours arrangements adequate', completed: true, notes: 'Partnership with Emergency Vet Centre', evidence: null },
  { id: 18, section: 'Emergency Procedures', item: 'Emergency drug kit maintained', completed: true, notes: 'Checked monthly', evidence: null },
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
  { id: 1, title: 'Registration Overdue', message: 'Dr. Michael Smith\'s VPB registration expired 3 days ago', time: '2 hours ago', read: false, type: 'error', linkedTo: { type: 'licence', id: 4 } },
  { id: 2, title: 'Inspection Due Soon', message: 'X-ray equipment inspection due in 23 days', time: '1 day ago', read: false, type: 'warning', linkedTo: { type: 'equipment', id: 1 } },
  { id: 3, title: 'Licence Expiring', message: 'Nurse Williams radiation licence expires in 89 days', time: '3 days ago', read: true, type: 'info', linkedTo: { type: 'licence', id: 7 } },
];

// ==================== UTILITY FUNCTIONS ====================
const calculateDaysUntil = (dateStr) => {
  const today = new Date('2026-01-29');
  const target = new Date(dateStr);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusFromDays = (days) => {
  if (days < 0) return 'overdue';
  if (days < 30) return 'attention';
  return 'compliant';
};

// ==================== MODAL COMPONENTS ====================

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-xl shadow-xl w-full ${sizes[size]} transform transition-all`}>
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 font-display">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmStyle = 'danger' }) => {
  const styles = {
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    primary: 'bg-teal-600 hover:bg-teal-700 text-white',
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className={`px-4 py-2 rounded-lg transition-colors ${styles[confirmStyle]}`}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

// Form Components
const FormField = ({ label, required, children, error }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

const Input = ({ ...props }) => (
  <input
    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
    {...props}
  />
);

const Select = ({ options, placeholder, ...props }) => (
  <select
    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const Textarea = ({ ...props }) => (
  <textarea
    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
    rows={3}
    {...props}
  />
);

// ==================== FEATURE MODALS ====================

const LicenceModal = ({ isOpen, onClose, licence, onSave }) => {
  const [form, setForm] = useState(licence || {
    type: '',
    holder: '',
    number: '',
    issued: '',
    expires: '',
    notes: '',
  });
  
  const licenceTypes = [
    { value: 'Hospital Licence', label: 'Hospital Licence' },
    { value: 'Radiation Management Licence', label: 'Radiation Management Licence' },
    { value: 'Veterinary Practitioner', label: 'Veterinary Practitioner Registration' },
    { value: 'Radiation User Licence', label: 'Radiation User Licence' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDaysUntil(form.expires);
    onSave({
      ...form,
      id: licence?.id || Date.now(),
      status: getStatusFromDays(days),
    });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={licence ? 'Edit Licence' : 'Add New Licence'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Licence Type" required>
          <Select
            options={licenceTypes}
            placeholder="Select type..."
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            required
          />
        </FormField>
        
        <FormField label="Holder Name" required>
          <Input
            type="text"
            value={form.holder}
            onChange={e => setForm({ ...form, holder: e.target.value })}
            placeholder="e.g., Dr. Jane Smith or Practice Name"
            required
          />
        </FormField>
        
        <FormField label="Licence/Registration Number" required>
          <Input
            type="text"
            value={form.number}
            onChange={e => setForm({ ...form, number: e.target.value })}
            placeholder="e.g., VET-12345"
            required
          />
        </FormField>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Issue Date" required>
            <Input
              type="date"
              value={form.issued}
              onChange={e => setForm({ ...form, issued: e.target.value })}
              required
            />
          </FormField>
          
          <FormField label="Expiry Date" required>
            <Input
              type="date"
              value={form.expires}
              onChange={e => setForm({ ...form, expires: e.target.value })}
              required
            />
          </FormField>
        </div>
        
        <FormField label="Notes">
          <Textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Any additional notes..."
          />
        </FormField>
        
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            {licence ? 'Save Changes' : 'Add Licence'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const LicenceDetailModal = ({ isOpen, onClose, licence, onEdit, onNavigate }) => {
  if (!licence) return null;
  
  const daysUntil = calculateDaysUntil(licence.expires);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Licence Details" size="md">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">{licence.type}</h3>
            <p className="text-slate-600">{licence.holder}</p>
          </div>
          <StatusBadge status={licence.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Licence Number</p>
            <p className="text-sm font-mono text-slate-800">{licence.number}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
            <p className={`text-sm font-medium ${licence.status === 'overdue' ? 'text-red-600' : licence.status === 'attention' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days until expiry`}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Issue Date</p>
            <p className="text-sm text-slate-800">{formatDate(licence.issued)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Expiry Date</p>
            <p className="text-sm text-slate-800">{formatDate(licence.expires)}</p>
          </div>
        </div>
        
        {licence.notes && (
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-sm text-slate-600">{licence.notes}</p>
          </div>
        )}
        
        <div className="flex gap-3 justify-between pt-4 border-t border-slate-200">
          <button 
            onClick={() => onNavigate('documents')} 
            className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <FolderOpen size={18} />
            View Documents
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Close
            </button>
            <button onClick={() => { onClose(); onEdit(licence); }} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Edit size={16} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CPDActivityModal = ({ isOpen, onClose, activity, practitioners, onSave }) => {
  const [form, setForm] = useState(activity || {
    practitionerId: '',
    title: '',
    points: '',
    type: 'structured',
    date: '',
    provider: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: activity?.id || Date.now(),
      points: parseInt(form.points),
    });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity ? 'Edit CPD Activity' : 'Log CPD Activity'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Practitioner" required>
          <Select
            options={practitioners.map(p => ({ value: p.id, label: p.name }))}
            placeholder="Select practitioner..."
            value={form.practitionerId}
            onChange={e => setForm({ ...form, practitionerId: parseInt(e.target.value) })}
            required
          />
        </FormField>
        
        <FormField label="Activity Title" required>
          <Input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., AVA Annual Conference"
            required
          />
        </FormField>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Points" required>
            <Input
              type="number"
              min="1"
              max="60"
              value={form.points}
              onChange={e => setForm({ ...form, points: e.target.value })}
              placeholder="e.g., 12"
              required
            />
          </FormField>
          
          <FormField label="Type" required>
            <Select
              options={[
                { value: 'structured', label: 'Structured' },
                { value: 'unstructured', label: 'Unstructured' },
              ]}
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              required
            />
          </FormField>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date Completed" required>
            <Input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
          </FormField>
          
          <FormField label="Provider/Organisation">
            <Input
              type="text"
              value={form.provider}
              onChange={e => setForm({ ...form, provider: e.target.value })}
              placeholder="e.g., AVA, University"
            />
          </FormField>
        </div>
        
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            {activity ? 'Save Changes' : 'Log Activity'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentModal = ({ isOpen, onClose, equipment, onSave }) => {
  const [form, setForm] = useState(equipment || {
    name: '',
    type: '',
    model: '',
    serial: '',
    location: '',
    lastInspection: '',
    nextInspection: '',
    notes: '',
  });
  
  const equipmentTypes = [
    { value: 'Diagnostic X-ray', label: 'Diagnostic X-ray' },
    { value: 'Dental Radiography', label: 'Dental Radiography' },
    { value: 'Mobile Radiography', label: 'Mobile/Portable X-ray' },
    { value: 'CT Scanner', label: 'CT Scanner' },
    { value: 'Ultrasound', label: 'Ultrasound' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDaysUntil(form.nextInspection);
    onSave({
      ...form,
      id: equipment?.id || Date.now(),
      status: getStatusFromDays(days),
    });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={equipment ? 'Edit Equipment' : 'Add Equipment'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Equipment Name" required>
          <Input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., X-ray Unit - Main Theatre"
            required
          />
        </FormField>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Equipment Type" required>
            <Select
              options={equipmentTypes}
              placeholder="Select type..."
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              required
            />
          </FormField>
          
          <FormField label="Location">
            <Input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Theatre 1"
            />
          </FormField>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Make/Model" required>
            <Input
              type="text"
              value={form.model}
              onChange={e => setForm({ ...form, model: e.target.value })}
              placeholder="e.g., Fujifilm VXR-40"
              required
            />
          </FormField>
          
          <FormField label="Serial Number" required>
            <Input
              type="text"
              value={form.serial}
              onChange={e => setForm({ ...form, serial: e.target.value })}
              placeholder="e.g., FVX-2022-4851"
              required
            />
          </FormField>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Last Inspection">
            <Input
              type="date"
              value={form.lastInspection}
              onChange={e => setForm({ ...form, lastInspection: e.target.value })}
            />
          </FormField>
          
          <FormField label="Next Inspection Due" required>
            <Input
              type="date"
              value={form.nextInspection}
              onChange={e => setForm({ ...form, nextInspection: e.target.value })}
              required
            />
          </FormField>
        </div>
        
        <FormField label="Notes">
          <Textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Any additional notes..."
          />
        </FormField>
        
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            {equipment ? 'Save Changes' : 'Add Equipment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const EquipmentDetailModal = ({ isOpen, onClose, equipment, onEdit, onNavigate }) => {
  if (!equipment) return null;
  
  const daysUntil = calculateDaysUntil(equipment.nextInspection);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Equipment Details" size="md">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">{equipment.name}</h3>
            <p className="text-slate-600">{equipment.type}</p>
          </div>
          <StatusBadge status={equipment.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Make/Model</p>
            <p className="text-sm text-slate-800">{equipment.model}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Serial Number</p>
            <p className="text-sm font-mono text-slate-800">{equipment.serial}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
            <p className="text-sm text-slate-800">{equipment.location || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Next Inspection</p>
            <p className={`text-sm font-medium ${equipment.status === 'attention' ? 'text-amber-600' : 'text-slate-800'}`}>
              {formatDate(equipment.nextInspection)} ({daysUntil} days)
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Last Inspection</p>
            <p className="text-sm text-slate-800">{formatDate(equipment.lastInspection)}</p>
          </div>
        </div>
        
        {equipment.notes && (
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-sm text-slate-600">{equipment.notes}</p>
          </div>
        )}
        
        <div className="flex gap-3 justify-between pt-4 border-t border-slate-200">
          <button 
            onClick={() => onNavigate('documents')} 
            className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <FolderOpen size={18} />
            View Certificates
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Close
            </button>
            <button onClick={() => { onClose(); onEdit(equipment); }} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Edit size={16} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const DocumentUploadModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    expires: '',
  });
  const [dragActive, setDragActive] = useState(false);
  
  const categories = [
    { value: 'Hospital Licence', label: 'Hospital Licence' },
    { value: 'Radiation Safety', label: 'Radiation Safety' },
    { value: 'Registration', label: 'Registration' },
    { value: 'Controlled Substances', label: 'Controlled Substances' },
    { value: 'CPD', label: 'CPD Certificates' },
    { value: 'Other', label: 'Other' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      name: form.name || 'New Document.pdf',
      category: form.category,
      uploaded: new Date().toISOString().split('T')[0],
      expires: form.expires || null,
      size: '0 KB',
      linkedTo: null,
    });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-teal-500 bg-teal-50' : 'border-slate-300'}`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => setDragActive(false)}
        >
          <Upload size={40} className="mx-auto text-slate-400 mb-3" />
          <p className="text-sm text-slate-600 mb-1">Drag and drop your file here, or</p>
          <button type="button" className="text-sm text-teal-600 font-medium hover:text-teal-700">
            browse to upload
          </button>
          <p className="text-xs text-slate-400 mt-2">PDF, PNG, JPG up to 10MB</p>
        </div>
        
        <FormField label="Document Name">
          <Input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Hospital Licence 2026.pdf"
          />
        </FormField>
        
        <FormField label="Category" required>
          <Select
            options={categories}
            placeholder="Select category..."
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          />
        </FormField>
        
        <FormField label="Expiry Date (if applicable)">
          <Input
            type="date"
            value={form.expires}
            onChange={e => setForm({ ...form, expires: e.target.value })}
          />
        </FormField>
        
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Upload
          </button>
        </div>
      </form>
    </Modal>
  );
};

const DocumentDetailModal = ({ isOpen, onClose, document, onDelete }) => {
  if (!document) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Details" size="md">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-slate-100 rounded-lg">
            <FileText size={32} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800">{document.name}</h3>
            <p className="text-sm text-slate-500">{document.size} • {document.category}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Uploaded</p>
            <p className="text-sm text-slate-800">{formatDate(document.uploaded)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Expires</p>
            <p className="text-sm text-slate-800">{document.expires ? formatDate(document.expires) : 'No expiry'}</p>
          </div>
        </div>
        
        <div className="flex gap-3 justify-between pt-4 border-t border-slate-200">
          <button 
            onClick={() => onDelete(document.id)} 
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Close
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CalendarEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [form, setForm] = useState(event || {
    title: '',
    date: '',
    category: '',
    type: 'upcoming',
  });
  
  const categories = [
    { value: 'Registration', label: 'Registration' },
    { value: 'Radiation', label: 'Radiation Safety' },
    { value: 'Hospital', label: 'Hospital Licence' },
    { value: 'Controlled Substances', label: 'Controlled Substances' },
    { value: 'CPD', label: 'CPD' },
    { value: 'Other', label: 'Other' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDaysUntil(form.date);
    onSave({
      ...form,
      id: event?.id || Date.now(),
      type: getStatusFromDays(days) === 'compliant' ? 'upcoming' : getStatusFromDays(days),
    });
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event ? 'Edit Event' : 'Add Reminder'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Title" required>
          <Input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Licence Renewal Due"
            required
          />
        </FormField>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date" required>
            <Input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
          </FormField>
          
          <FormField label="Category" required>
            <Select
              options={categories}
              placeholder="Select category..."
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
            />
          </FormField>
        </div>
        
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            {event ? 'Save Changes' : 'Add Reminder'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkRead, onNavigate }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="fixed top-16 right-4 lg:right-6 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Notifications</h3>
          <button onClick={() => onMarkRead('all')} className="text-xs text-teal-600 hover:text-teal-700">
            Mark all read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No notifications
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => {
                  onMarkRead(notif.id);
                  if (notif.linkedTo) {
                    onNavigate(notif.linkedTo.type === 'licence' ? 'licences' : 'equipment');
                  }
                  onClose();
                }}
                className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${!notif.read ? 'bg-teal-50/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full ${notif.type === 'error' ? 'bg-red-100' : notif.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                    {notif.type === 'error' ? <AlertCircle size={14} className="text-red-600" /> :
                     notif.type === 'warning' ? <AlertTriangle size={14} className="text-amber-600" /> :
                     <Bell size={14} className="text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-teal-500 rounded-full" />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('practice');
  
  const tabs = [
    { id: 'practice', label: 'Practice Details' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'account', label: 'Account' },
  ];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
      <div className="flex gap-6">
        <div className="w-48 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 min-h-[300px]">
          {activeTab === 'practice' && (
            <div className="space-y-4">
              <FormField label="Practice Name">
                <Input type="text" defaultValue="Northside Veterinary Hospital" />
              </FormField>
              <FormField label="Address">
                <Textarea defaultValue="123 Main Street, Sydney NSW 2000" />
              </FormField>
              <FormField label="ABN">
                <Input type="text" defaultValue="12 345 678 901" />
              </FormField>
              <FormField label="Phone">
                <Input type="tel" defaultValue="(02) 9876 5432" />
              </FormField>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                  <p className="text-xs text-slate-500">Receive deadline reminders via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-teal-600 rounded" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-800">SMS Notifications</p>
                  <p className="text-xs text-slate-500">Receive urgent alerts via SMS</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-teal-600 rounded" />
              </div>
              <FormField label="Reminder Lead Time">
                <Select
                  options={[
                    { value: '7', label: '7 days before' },
                    { value: '14', label: '14 days before' },
                    { value: '30', label: '30 days before' },
                    { value: '60', label: '60 days before' },
                  ]}
                  defaultValue="30"
                />
              </FormField>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="space-y-4">
              <FormField label="Email">
                <Input type="email" defaultValue="admin@northsidevet.com.au" />
              </FormField>
              <FormField label="Current Password">
                <Input type="password" placeholder="Enter current password" />
              </FormField>
              <FormField label="New Password">
                <Input type="password" placeholder="Enter new password" />
              </FormField>
              <button className="text-sm text-red-600 hover:text-red-700">
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-3 justify-end pt-4 mt-6 border-t border-slate-200">
        <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

// ==================== UI COMPONENTS ====================

const StatusBadge = ({ status }) => {
  const styles = {
    compliant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    attention: 'bg-amber-50 text-amber-700 border-amber-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  
  const labels = {
    compliant: 'Compliant',
    attention: 'Attention',
    overdue: 'Overdue',
    upcoming: 'Upcoming',
    completed: 'Completed',
  };
  
  const icons = {
    compliant: CheckCircle,
    attention: AlertTriangle,
    overdue: AlertCircle,
    upcoming: Clock,
    completed: CheckCircle,
  };
  
  const Icon = icons[status] || Clock;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.upcoming}`}>
      <Icon size={12} />
      {labels[status] || status}
    </span>
  );
};

const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E2E8F0" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#0D9488" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

const ComplianceCard = ({ data, onClick }) => {
  const Icon = data.icon;
  const statusColors = {
    compliant: 'border-l-emerald-500',
    attention: 'border-l-amber-500',
    overdue: 'border-l-red-500',
  };
  
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 border-l-4 ${statusColors[data.status]} p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${data.status === 'compliant' ? 'bg-emerald-50' : data.status === 'attention' ? 'bg-amber-50' : 'bg-red-50'}`}>
            <Icon size={20} className={data.status === 'compliant' ? 'text-emerald-600' : data.status === 'attention' ? 'text-amber-600' : 'text-red-600'} />
          </div>
          <h3 className="font-semibold text-slate-800 font-display">{data.title}</h3>
        </div>
        <StatusBadge status={data.status} />
      </div>
      
      <div className="space-y-2 mb-4">
        {data.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {item.status === 'compliant' || item.status === 'completed' ? (
              <CheckCircle size={14} className="text-emerald-500" />
            ) : item.status === 'attention' || item.status === 'upcoming' ? (
              <Clock size={14} className="text-amber-500" />
            ) : (
              <AlertCircle size={14} className="text-red-500" />
            )}
            <span className="text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
      
      {data.daysUntil !== null && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm text-slate-500">Next: {data.nextDeadline}</span>
          <span className={`text-sm font-medium ${data.daysUntil < 0 ? 'text-red-600' : data.daysUntil < 30 ? 'text-amber-600' : 'text-slate-600'}`}>
            {data.daysUntil < 0 ? `${Math.abs(data.daysUntil)} days overdue` : `${data.daysUntil} days`}
          </span>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ activeView, setActiveView, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'licences', label: 'Licences', icon: Award },
    { id: 'cpd', label: 'CPD Tracker', icon: GraduationCap },
    { id: 'equipment', label: 'Equipment', icon: Shield },
    { id: 'checklist', label: 'Self-Assessment', icon: ClipboardCheck },
  ];
  
  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 font-display">VetComply</span>
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div className="p-3 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
              <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
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
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-800 font-display">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNotificationsClick} className="p-2 hover:bg-slate-100 rounded-lg relative">
            <Bell size={20} className="text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={onSettingsClick} className="p-2 hover:bg-slate-100 rounded-lg">
            <Settings size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

// ==================== VIEWS ====================

const DashboardView = ({ licences, cpdRecords, equipment, checklist, setActiveView, onQuickAction }) => {
  const complianceData = {
    controlledSubstances: {
      status: 'compliant',
      title: 'Controlled Substances',
      icon: Shield,
      nextDeadline: 'September Stock Check',
      daysUntil: 47,
      targetView: null,
      items: [
        { name: 'March Stock Check', status: 'completed' },
        { name: 'September Stock Check', status: 'upcoming' },
        { name: 'Drug Register Current', status: 'compliant' },
      ]
    },
    radiationSafety: {
      status: equipment.some(e => e.status === 'attention') ? 'attention' : 'compliant',
      title: 'Radiation Safety',
      icon: Shield,
      nextDeadline: 'Equipment Inspection',
      daysUntil: 23,
      targetView: 'equipment',
      items: equipment.slice(0, 3).map(e => ({ name: e.name, status: e.status })),
    },
    hospitalLicence: {
      status: licences.find(l => l.type === 'Hospital Licence')?.status || 'compliant',
      title: 'Hospital Licence',
      icon: Building2,
      nextDeadline: 'Annual Renewal',
      daysUntil: 152,
      targetView: 'licences',
      items: [
        { name: 'Licence Current', status: 'compliant' },
        { name: 'Superintendent Appointed', status: 'compliant' },
        { name: 'Self-Assessment', status: checklist.every(c => c.completed) ? 'compliant' : 'attention' },
      ]
    },
    registration: {
      status: licences.some(l => l.type === 'Veterinary Practitioner' && l.status === 'overdue') ? 'overdue' : 'compliant',
      title: 'Practitioner Registration',
      icon: Users,
      nextDeadline: 'Dr. Smith Renewal',
      daysUntil: -3,
      targetView: 'licences',
      items: licences.filter(l => l.type === 'Veterinary Practitioner').map(l => ({ name: l.holder, status: l.status })),
    },
    cpd: {
      status: cpdRecords.every(r => r.totalPoints >= r.required) ? 'compliant' : 'attention',
      title: 'CPD Compliance',
      icon: GraduationCap,
      nextDeadline: 'Annual Return',
      daysUntil: 152,
      targetView: 'cpd',
      items: cpdRecords.map(r => ({ name: `${r.name} (${r.totalPoints}/${r.required} pts)`, status: r.totalPoints >= r.required ? 'compliant' : 'attention' })),
    },
    biosecurity: {
      status: 'compliant',
      title: 'Biosecurity',
      icon: Shield,
      nextDeadline: 'No pending items',
      daysUntil: null,
      targetView: null,
      items: [
        { name: 'Notifiable Disease Protocol', status: 'compliant' },
        { name: 'Emergency Contact Posted', status: 'compliant' },
      ]
    }
  };
  
  const totalItems = Object.values(complianceData).reduce((acc, cat) => acc + cat.items.length, 0);
  const compliantItems = Object.values(complianceData).reduce(
    (acc, cat) => acc + cat.items.filter(i => i.status === 'compliant' || i.status === 'completed').length, 0
  );
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
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onQuickAction('cpd')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">
          <Plus size={16} className="text-teal-600" />
          Log CPD
        </button>
        <button onClick={() => onQuickAction('document')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">
          <Upload size={16} className="text-teal-600" />
          Upload Document
        </button>
        <button onClick={() => onQuickAction('event')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">
          <Calendar size={16} className="text-teal-600" />
          Add Reminder
        </button>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg"><TrendingUp size={20} className="text-teal-600" /></div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{overallCompliance}%</p>
              <p className="text-sm text-slate-500">Overall Compliance</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveView('licences')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><AlertCircle size={20} className="text-red-600" /></div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{overdueCount}</p>
              <p className="text-sm text-slate-500">Overdue Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveView('equipment')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg"><AlertTriangle size={20} className="text-amber-600" /></div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{attentionCount}</p>
              <p className="text-sm text-slate-500">Need Attention</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg"><CheckCircle size={20} className="text-emerald-600" /></div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{compliantItems}/{totalItems}</p>
              <p className="text-sm text-slate-500">Items Compliant</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 font-display">Compliance Areas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(complianceData).map(([key, data]) => (
              <ComplianceCard 
                key={key} 
                data={data} 
                onClick={() => data.targetView && setActiveView(data.targetView)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4 font-display">Compliance Score</h3>
            <div className="flex justify-center">
              <ProgressRing progress={overallCompliance} />
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">{compliantItems} of {totalItems} requirements met</p>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 font-display">Upcoming Deadlines</h3>
              <button onClick={() => setActiveView('calendar')} className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-1">
              {upcomingDeadlines.slice(0, 5).map(deadline => (
                <div key={deadline.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <div className={`w-2 h-2 rounded-full ${deadline.status === 'overdue' ? 'bg-red-500' : deadline.status === 'attention' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{deadline.title}</p>
                    <p className="text-xs text-slate-500">{deadline.category}</p>
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${deadline.days < 0 ? 'text-red-600' : deadline.days < 30 ? 'text-amber-600' : 'text-slate-600'}`}>
                    {deadline.days < 0 ? `${Math.abs(deadline.days)}d overdue` : `${deadline.days}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarView = ({ events, onAddEvent, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 29));
  
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
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = getDaysInMonth(currentMonth);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800 font-display">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-slate-100 rounded-lg">←</button>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-slate-100 rounded-lg">→</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">{day}</div>
            ))}
            {days.map((day, idx) => {
              const dayEvents = getEventsForDay(day);
              const isToday = day === 29 && currentMonth.getMonth() === 0 && currentMonth.getFullYear() === 2026;
              
              return (
                <div key={idx} className={`min-h-[80px] p-1 border border-slate-100 rounded-lg ${day ? 'hover:bg-slate-50 cursor-pointer' : ''} ${isToday ? 'bg-teal-50 border-teal-200' : ''}`}>
                  {day && (
                    <>
                      <span className={`text-sm ${isToday ? 'font-bold text-teal-700' : 'text-slate-600'}`}>{day}</span>
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div key={event.id} onClick={() => onEventClick(event)}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${
                              event.type === 'overdue' ? 'bg-red-100 text-red-700' :
                              event.type === 'attention' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && <div className="text-xs text-slate-500">+{dayEvents.length - 2} more</div>}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 font-display">All Deadlines</h3>
            <button onClick={onAddEvent} className="p-2 hover:bg-slate-100 rounded-lg">
              <Plus size={18} className="text-slate-600" />
            </button>
          </div>
          <div className="space-y-3">
            {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
              <div key={event.id} onClick={() => onEventClick(event)} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  event.type === 'overdue' ? 'bg-red-500' : event.type === 'attention' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentsView = ({ documents, onUpload, onView, onDelete }) => {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(documents.map(d => d.category))];
  const filteredDocs = filter === 'all' ? documents : documents.filter(d => d.category === filter);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Documents' : cat}
            </button>
          ))}
        </div>
        <button onClick={onUpload} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Upload size={18} />
          Upload
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Document</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Uploaded</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Expires</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => {
                const isExpiringSoon = doc.expires && calculateDaysUntil(doc.expires) < 30 && calculateDaysUntil(doc.expires) >= 0;
                const isExpired = doc.expires && calculateDaysUntil(doc.expires) < 0;
                
                return (
                  <tr key={doc.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onView(doc)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg"><FileText size={18} className="text-slate-500" /></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                          <p className="text-xs text-slate-500 sm:hidden">{doc.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-slate-600">{doc.category}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="text-sm text-slate-600">{formatDate(doc.uploaded)}</span></td>
                    <td className="px-4 py-3">
                      {doc.expires ? (
                        <span className={`text-sm ${isExpired ? 'text-red-600 font-medium' : isExpiringSoon ? 'text-amber-600' : 'text-slate-600'}`}>
                          {formatDate(doc.expires)}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <button onClick={() => onView(doc)} className="p-2 hover:bg-slate-100 rounded-lg"><Eye size={16} className="text-slate-500" /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg"><Download size={16} className="text-slate-500" /></button>
                        <button onClick={() => onDelete(doc.id)} className="p-2 hover:bg-slate-100 rounded-lg"><Trash2 size={16} className="text-slate-500" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LicencesView = ({ licences, onAdd, onView, onEdit }) => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Add Licence
        </button>
      </div>
      
      <div className="grid gap-4">
        {licences.map(licence => (
          <div key={licence.id} onClick={() => onView(licence)}
            className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer ${licence.status === 'overdue' ? 'border-l-4 border-l-red-500' : licence.status === 'attention' ? 'border-l-4 border-l-amber-500' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${licence.status === 'compliant' ? 'bg-emerald-50' : licence.status === 'attention' ? 'bg-amber-50' : 'bg-red-50'}`}>
                  <Award size={24} className={licence.status === 'compliant' ? 'text-emerald-600' : licence.status === 'attention' ? 'text-amber-600' : 'text-red-600'} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 font-display">{licence.type}</h3>
                  <p className="text-sm text-slate-600">{licence.holder}</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{licence.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:text-right">
                <div>
                  <p className="text-xs text-slate-500">Expires</p>
                  <p className={`text-sm font-medium ${licence.status === 'overdue' ? 'text-red-600' : licence.status === 'attention' ? 'text-amber-600' : 'text-slate-800'}`}>
                    {formatDate(licence.expires)}
                  </p>
                </div>
                <StatusBadge status={licence.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CPDView = ({ cpdRecords, onAddActivity, onEditActivity, onExport }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end gap-3">
        <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Printer size={18} />
          Export for VPB
        </button>
        <button onClick={onAddActivity} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Log Activity
        </button>
      </div>
      
      <div className="space-y-4">
        {cpdRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-5 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${record.totalPoints >= record.required ? 'bg-emerald-100' : 'bg-teal-100'}`}>
                    {record.totalPoints >= record.required ? (
                      <CheckCircle size={24} className="text-emerald-600" />
                    ) : (
                      <GraduationCap size={24} className="text-teal-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 font-display">{record.name}</h3>
                    <p className="text-sm text-slate-500">Period ends: {formatDate(record.periodEnd)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${record.totalPoints >= record.required ? 'text-emerald-600' : 'text-slate-800'}`}>{record.totalPoints}</p>
                    <p className="text-xs text-slate-500">of {record.required} pts</p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${record.totalPoints >= record.required ? 'bg-emerald-500' : 'bg-teal-500'}`}
                        style={{ width: `${Math.min((record.totalPoints / record.required) * 100, 100)}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-slate-500">
                      <span>S: {record.structured}</span>
                      <span>U: {record.unstructured}</span>
                    </div>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedId === record.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
            
            {expandedId === record.id && (
              <div className="border-t border-slate-200 p-5 bg-slate-50">
                <h4 className="text-sm font-medium text-slate-700 mb-3">CPD Activities</h4>
                <div className="space-y-2">
                  {record.activities.map((activity) => (
                    <div key={activity.id} onClick={() => onEditActivity(activity, record.id)}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-teal-300 cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                        <p className="text-xs text-slate-500">{formatDate(activity.date)} • {activity.type} {activity.provider && `• ${activity.provider}`}</p>
                      </div>
                      <span className="text-sm font-semibold text-teal-600">+{activity.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EquipmentView = ({ equipment, onAdd, onView, onEdit }) => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Add Equipment
        </button>
      </div>
      
      <div className="grid gap-4">
        {equipment.map(item => (
          <div key={item.id} onClick={() => onView(item)} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${item.status === 'compliant' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  <Shield size={24} className={item.status === 'compliant' ? 'text-emerald-600' : 'text-amber-600'} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 font-display">{item.name}</h3>
                  <p className="text-sm text-slate-600">{item.type}</p>
                  <div className="flex gap-4 mt-2 text-xs text-slate-500">
                    <span>Model: {item.model}</span>
                    <span>Serial: {item.serial}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Last Inspection</p>
                  <p className="text-sm text-slate-800">{formatDate(item.lastInspection)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Next Due</p>
                  <p className={`text-sm font-medium ${item.status === 'attention' ? 'text-amber-600' : 'text-slate-800'}`}>
                    {formatDate(item.nextInspection)}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChecklistView = ({ checklist, onToggle, onUpdateNote, onExport }) => {
  const sections = [...new Set(checklist.map(i => i.section))];
  const completedCount = checklist.filter(i => i.completed).length;
  const progress = Math.round((completedCount / checklist.length) * 100);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 font-display">VPB Hospital Self-Assessment</h2>
            <p className="text-sm text-slate-500">Based on Guideline GH03</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onExport} className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Printer size={16} />
              Export PDF
            </button>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800">{completedCount}/{checklist.length}</p>
              <p className="text-xs text-slate-500">Items Complete</p>
            </div>
            <ProgressRing progress={progress} size={80} strokeWidth={6} />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {sections.map(section => {
          const sectionItems = checklist.filter(i => i.section === section);
          const sectionComplete = sectionItems.filter(i => i.completed).length;
          
          return (
            <div key={section} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 font-display">{section}</h3>
                <span className={`text-sm ${sectionComplete === sectionItems.length ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
                  {sectionComplete}/{sectionItems.length}{sectionComplete === sectionItems.length && ' ✓'}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {sectionItems.map(item => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <button onClick={() => onToggle(item.id)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.completed ? 'bg-teal-600 border-teal-600' : 'border-slate-300 hover:border-teal-400'
                        }`}
                      >
                        {item.completed && <CheckCircle size={14} className="text-white" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.item}</p>
                        {item.notes && (
                          <p className={`text-xs mt-1 flex items-center gap-1 ${item.completed ? 'text-slate-400' : 'text-amber-600'}`}>
                            {!item.completed && <AlertTriangle size={12} />}
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================

export default function App() {
  // View state
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Data state
  const [licences, setLicences] = useState(initialLicences);
  const [documents, setDocuments] = useState(initialDocuments);
  const [cpdRecords, setCpdRecords] = useState(initialCpdRecords);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Modal state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [licenceModal, setLicenceModal] = useState({ open: false, licence: null });
  const [licenceDetailModal, setLicenceDetailModal] = useState({ open: false, licence: null });
  const [cpdModal, setCpdModal] = useState({ open: false, activity: null, practitionerId: null });
  const [equipmentModal, setEquipmentModal] = useState({ open: false, equipment: null });
  const [equipmentDetailModal, setEquipmentDetailModal] = useState({ open: false, equipment: null });
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [documentDetailModal, setDocumentDetailModal] = useState({ open: false, document: null });
  const [calendarEventModal, setCalendarEventModal] = useState({ open: false, event: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });
  
  // Handlers
  const handleSaveLicence = (licence) => {
    if (licences.find(l => l.id === licence.id)) {
      setLicences(licences.map(l => l.id === licence.id ? licence : l));
    } else {
      setLicences([...licences, licence]);
    }
  };
  
  const handleSaveDocument = (doc) => {
    setDocuments([...documents, doc]);
  };
  
  const handleDeleteDocument = (id) => {
    setConfirmModal({
      open: true,
      title: 'Delete Document',
      message: 'Are you sure you want to delete this document? This action cannot be undone.',
      onConfirm: () => {
        setDocuments(documents.filter(d => d.id !== id));
        setDocumentDetailModal({ open: false, document: null });
        setConfirmModal({ open: false, title: '', message: '', onConfirm: null });
      }
    });
  };
  
  const handleSaveCpdActivity = (activity) => {
    setCpdRecords(cpdRecords.map(record => {
      if (record.id === activity.practitionerId) {
        const existingIdx = record.activities.findIndex(a => a.id === activity.id);
        let newActivities;
        if (existingIdx >= 0) {
          newActivities = record.activities.map(a => a.id === activity.id ? activity : a);
        } else {
          newActivities = [...record.activities, activity];
        }
        const structured = newActivities.filter(a => a.type === 'structured').reduce((sum, a) => sum + a.points, 0);
        const unstructured = newActivities.filter(a => a.type === 'unstructured').reduce((sum, a) => sum + a.points, 0);
        return {
          ...record,
          activities: newActivities,
          totalPoints: structured + unstructured,
          structured,
          unstructured,
        };
      }
      return record;
    }));
  };
  
  const handleSaveEquipment = (equip) => {
    if (equipment.find(e => e.id === equip.id)) {
      setEquipment(equipment.map(e => e.id === equip.id ? equip : e));
    } else {
      setEquipment([...equipment, equip]);
    }
  };
  
  const handleSaveCalendarEvent = (event) => {
    if (calendarEvents.find(e => e.id === event.id)) {
      setCalendarEvents(calendarEvents.map(e => e.id === event.id ? event : e));
    } else {
      setCalendarEvents([...calendarEvents, event]);
    }
  };
  
  const handleToggleChecklist = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };
  
  const handleMarkNotificationRead = (id) => {
    if (id === 'all') {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } else {
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };
  
  const handleQuickAction = (action) => {
    switch (action) {
      case 'cpd':
        setCpdModal({ open: true, activity: null, practitionerId: null });
        break;
      case 'document':
        setDocumentUploadModal(true);
        break;
      case 'event':
        setCalendarEventModal({ open: true, event: null });
        break;
    }
  };
  
  const handleExport = (type) => {
    alert(`Export ${type} feature coming soon! This will generate a PDF report for VPB submission.`);
  };
  
  const viewConfig = {
    dashboard: { title: 'Compliance Dashboard', subtitle: 'Northside Veterinary Hospital' },
    calendar: { title: 'Compliance Calendar', subtitle: 'Track all your important dates' },
    documents: { title: 'Documents', subtitle: 'Store and manage compliance documents' },
    licences: { title: 'Licences & Registrations', subtitle: 'Track all practice and staff licences' },
    cpd: { title: 'CPD Tracker', subtitle: 'Monitor continuing professional development' },
    equipment: { title: 'Equipment Register', subtitle: 'Radiation and medical equipment tracking' },
    checklist: { title: 'Self-Assessment Checklist', subtitle: 'Prepare for VPB hospital inspections' },
  };
  
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView licences={licences} cpdRecords={cpdRecords} equipment={equipment} checklist={checklist} setActiveView={setActiveView} onQuickAction={handleQuickAction} />;
      case 'calendar':
        return <CalendarView events={calendarEvents} onAddEvent={() => setCalendarEventModal({ open: true, event: null })} onEventClick={(e) => setCalendarEventModal({ open: true, event: e })} />;
      case 'documents':
        return <DocumentsView documents={documents} onUpload={() => setDocumentUploadModal(true)} onView={(d) => setDocumentDetailModal({ open: true, document: d })} onDelete={handleDeleteDocument} />;
      case 'licences':
        return <LicencesView licences={licences} onAdd={() => setLicenceModal({ open: true, licence: null })} onView={(l) => setLicenceDetailModal({ open: true, licence: l })} onEdit={(l) => setLicenceModal({ open: true, licence: l })} />;
      case 'cpd':
        return <CPDView cpdRecords={cpdRecords} onAddActivity={() => setCpdModal({ open: true, activity: null, practitionerId: null })} onEditActivity={(a, pId) => setCpdModal({ open: true, activity: { ...a, practitionerId: pId }, practitionerId: pId })} onExport={() => handleExport('CPD')} />;
      case 'equipment':
        return <EquipmentView equipment={equipment} onAdd={() => setEquipmentModal({ open: true, equipment: null })} onView={(e) => setEquipmentDetailModal({ open: true, equipment: e })} onEdit={(e) => setEquipmentModal({ open: true, equipment: e })} />;
      case 'checklist':
        return <ChecklistView checklist={checklist} onToggle={handleToggleChecklist} onExport={() => handleExport('Checklist')} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <main className="flex-1 min-w-0">
        <Header 
          title={viewConfig[activeView].title}
          subtitle={viewConfig[activeView].subtitle}
          setIsMobileOpen={setIsMobileOpen}
          notifications={notifications}
          onNotificationsClick={() => setShowNotifications(!showNotifications)}
          onSettingsClick={() => setShowSettings(true)}
        />
        {renderView()}
      </main>
      
      {/* Modals */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        onNavigate={(view) => { setActiveView(view); setShowNotifications(false); }}
      />
      
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      <LicenceModal 
        isOpen={licenceModal.open} 
        onClose={() => setLicenceModal({ open: false, licence: null })} 
        licence={licenceModal.licence}
        onSave={handleSaveLicence}
      />
      
      <LicenceDetailModal
        isOpen={licenceDetailModal.open}
        onClose={() => setLicenceDetailModal({ open: false, licence: null })}
        licence={licenceDetailModal.licence}
        onEdit={(l) => { setLicenceDetailModal({ open: false, licence: null }); setLicenceModal({ open: true, licence: l }); }}
        onNavigate={setActiveView}
      />
      
      <CPDActivityModal
        isOpen={cpdModal.open}
        onClose={() => setCpdModal({ open: false, activity: null, practitionerId: null })}
        activity={cpdModal.activity}
        practitioners={cpdRecords}
        onSave={handleSaveCpdActivity}
      />
      
      <EquipmentModal
        isOpen={equipmentModal.open}
        onClose={() => setEquipmentModal({ open: false, equipment: null })}
        equipment={equipmentModal.equipment}
        onSave={handleSaveEquipment}
      />
      
      <EquipmentDetailModal
        isOpen={equipmentDetailModal.open}
        onClose={() => setEquipmentDetailModal({ open: false, equipment: null })}
        equipment={equipmentDetailModal.equipment}
        onEdit={(e) => { setEquipmentDetailModal({ open: false, equipment: null }); setEquipmentModal({ open: true, equipment: e }); }}
        onNavigate={setActiveView}
      />
      
      <DocumentUploadModal
        isOpen={documentUploadModal}
        onClose={() => setDocumentUploadModal(false)}
        onSave={handleSaveDocument}
      />
      
      <DocumentDetailModal
        isOpen={documentDetailModal.open}
        onClose={() => setDocumentDetailModal({ open: false, document: null })}
        document={documentDetailModal.document}
        onDelete={handleDeleteDocument}
      />
      
      <CalendarEventModal
        isOpen={calendarEventModal.open}
        onClose={() => setCalendarEventModal({ open: false, event: null })}
        event={calendarEventModal.event}
        onSave={handleSaveCalendarEvent}
      />
      
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Delete"
        confirmStyle="danger"
      />
    </div>
  );
}
