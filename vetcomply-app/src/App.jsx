import { useState } from 'react';
import { 
  LayoutDashboard, Calendar, FolderOpen, Award, GraduationCap, 
  Settings, ClipboardCheck, Bell, Plus, ChevronRight,
  AlertTriangle, CheckCircle, Clock, FileText, Upload, X,
  Building2, Users, Shield, Menu, User,
  TrendingUp, AlertCircle, ChevronDown, Eye, Download, Trash2,
} from 'lucide-react';

// ==================== DATA ====================
const initialComplianceData = {
  controlledSubstances: {
    status: 'compliant',
    title: 'Controlled Substances',
    icon: Shield,
    nextDeadline: 'September Stock Check',
    daysUntil: 47,
    items: [
      { name: 'March Stock Check', status: 'completed', date: '2026-03-15' },
      { name: 'September Stock Check', status: 'upcoming', date: '2026-09-30' },
      { name: 'Drug Register Current', status: 'compliant', date: null },
    ]
  },
  radiationSafety: {
    status: 'attention',
    title: 'Radiation Safety',
    icon: Shield,
    nextDeadline: 'Equipment Inspection',
    daysUntil: 23,
    items: [
      { name: 'Management Licence', status: 'compliant', date: '2027-06-30' },
      { name: 'User Licences (3 staff)', status: 'compliant', date: '2026-12-31' },
      { name: 'X-ray Equipment Inspection', status: 'attention', date: '2026-02-21' },
    ]
  },
  hospitalLicence: {
    status: 'compliant',
    title: 'Hospital Licence',
    icon: Building2,
    nextDeadline: 'Annual Renewal',
    daysUntil: 152,
    items: [
      { name: 'Licence Current', status: 'compliant', date: '2026-06-30' },
      { name: 'Superintendent Appointed', status: 'compliant', date: null },
      { name: 'Self-Assessment Complete', status: 'compliant', date: '2025-11-15' },
    ]
  },
  registration: {
    status: 'overdue',
    title: 'Practitioner Registration',
    icon: Users,
    nextDeadline: 'Dr. Smith Renewal',
    daysUntil: -3,
    items: [
      { name: 'Dr. Sarah Johnson', status: 'compliant', date: '2026-06-30' },
      { name: 'Dr. Michael Smith', status: 'overdue', date: '2026-01-26' },
      { name: 'Dr. Emily Chen', status: 'compliant', date: '2026-06-30' },
    ]
  },
  cpd: {
    status: 'compliant',
    title: 'CPD Compliance',
    icon: GraduationCap,
    nextDeadline: 'Annual Return',
    daysUntil: 152,
    items: [
      { name: 'Dr. Sarah Johnson (48/60 pts)', status: 'compliant', date: null },
      { name: 'Dr. Michael Smith (52/60 pts)', status: 'compliant', date: null },
      { name: 'Dr. Emily Chen (61/60 pts)', status: 'compliant', date: null },
    ]
  },
  biosecurity: {
    status: 'compliant',
    title: 'Biosecurity',
    icon: Shield,
    nextDeadline: 'No pending items',
    daysUntil: null,
    items: [
      { name: 'Notifiable Disease Protocol', status: 'compliant', date: null },
      { name: 'Emergency Contact Posted', status: 'compliant', date: null },
    ]
  }
};

const upcomingDeadlines = [
  { id: 1, title: 'Dr. Michael Smith - VPB Registration', days: -3, status: 'overdue', category: 'Registration' },
  { id: 2, title: 'X-ray Equipment Compliance Inspection', days: 23, status: 'attention', category: 'Radiation' },
  { id: 3, title: 'September S8 Stock Check', days: 47, status: 'compliant', category: 'Controlled Substances' },
  { id: 4, title: 'Radiation User Licence - Nurse Williams', days: 89, status: 'compliant', category: 'Radiation' },
  { id: 5, title: 'Hospital Licence Renewal', days: 152, status: 'compliant', category: 'Hospital' },
  { id: 6, title: 'VPB Annual Returns Due', days: 152, status: 'compliant', category: 'Registration' },
];

const calendarEvents = [
  { id: 1, title: 'Dr. Smith Registration Overdue', date: '2026-01-26', type: 'overdue' },
  { id: 2, title: 'X-ray Inspection Due', date: '2026-02-21', type: 'attention' },
  { id: 3, title: 'S8 Stock Check', date: '2026-03-31', type: 'upcoming' },
  { id: 4, title: 'Radiation Licence Renewal', date: '2026-04-28', type: 'upcoming' },
  { id: 5, title: 'Hospital Licence Renewal', date: '2026-06-30', type: 'upcoming' },
  { id: 6, title: 'VPB Annual Returns', date: '2026-06-30', type: 'upcoming' },
  { id: 7, title: 'S8 Stock Check', date: '2026-09-30', type: 'upcoming' },
];

const documents = [
  { id: 1, name: 'Hospital Licence 2025-26.pdf', category: 'Hospital Licence', uploaded: '2025-07-01', expires: '2026-06-30', size: '245 KB' },
  { id: 2, name: 'Radiation Management Plan.pdf', category: 'Radiation Safety', uploaded: '2024-03-15', expires: null, size: '1.2 MB' },
  { id: 3, name: 'Dr Johnson - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-06-30', size: '89 KB' },
  { id: 4, name: 'Dr Smith - VPB Certificate.pdf', category: 'Registration', uploaded: '2025-07-01', expires: '2026-01-26', size: '91 KB' },
  { id: 5, name: 'X-ray Compliance Certificate.pdf', category: 'Radiation Safety', uploaded: '2024-02-21', expires: '2026-02-21', size: '156 KB' },
  { id: 6, name: 'S8 Drug Register Audit - March 2026.pdf', category: 'Controlled Substances', uploaded: '2026-03-15', expires: null, size: '78 KB' },
  { id: 7, name: 'Self Assessment Checklist 2025.pdf', category: 'Hospital Licence', uploaded: '2025-11-15', expires: null, size: '234 KB' },
];

const licences = [
  { id: 1, type: 'Hospital Licence', holder: 'Northside Veterinary Hospital', number: 'VH-2024-1847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant' },
  { id: 2, type: 'Radiation Management Licence', holder: 'Northside Veterinary Hospital', number: 'RML-NSW-4521', issued: '2024-03-15', expires: '2027-03-14', status: 'compliant' },
  { id: 3, type: 'Veterinary Practitioner', holder: 'Dr. Sarah Johnson', number: 'VET-12847', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant' },
  { id: 4, type: 'Veterinary Practitioner', holder: 'Dr. Michael Smith', number: 'VET-14392', issued: '2025-07-01', expires: '2026-01-26', status: 'overdue' },
  { id: 5, type: 'Veterinary Practitioner', holder: 'Dr. Emily Chen', number: 'VET-15678', issued: '2025-07-01', expires: '2026-06-30', status: 'compliant' },
  { id: 6, type: 'Radiation User Licence', holder: 'Dr. Sarah Johnson', number: 'RUL-IA21-8834', issued: '2024-06-15', expires: '2027-06-14', status: 'compliant' },
  { id: 7, type: 'Radiation User Licence', holder: 'Nurse Kate Williams', number: 'RUL-IA23S-9912', issued: '2025-04-28', expires: '2026-04-27', status: 'attention' },
];

const cpdRecords = [
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    totalPoints: 48, 
    required: 60, 
    structured: 18, 
    unstructured: 30,
    periodEnd: '2027-06-30',
    activities: [
      { title: 'AVA Annual Conference 2025', points: 12, type: 'structured', date: '2025-05-15' },
      { title: 'Emergency Medicine Workshop', points: 6, type: 'structured', date: '2025-08-22' },
      { title: 'Journal Reading - Various', points: 15, type: 'unstructured', date: '2025-12-31' },
      { title: 'In-house Training Sessions', points: 15, type: 'unstructured', date: '2025-12-31' },
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
      { title: 'Surgical Techniques Masterclass', points: 16, type: 'structured', date: '2025-03-10' },
      { title: 'Online Pharmacology Course', points: 6, type: 'structured', date: '2025-09-05' },
      { title: 'Case Study Reviews', points: 20, type: 'unstructured', date: '2025-12-31' },
      { title: 'Peer Discussions', points: 10, type: 'unstructured', date: '2025-12-31' },
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
      { title: 'ASAV Conference 2025', points: 14, type: 'structured', date: '2025-06-20' },
      { title: 'Dermatology Webinar Series', points: 10, type: 'structured', date: '2025-10-15' },
      { title: 'Research Publication', points: 22, type: 'unstructured', date: '2025-07-30' },
      { title: 'Mentoring Junior Vets', points: 15, type: 'unstructured', date: '2025-12-31' },
    ]
  },
];

const equipment = [
  { id: 1, name: 'X-ray Unit - Main Theatre', type: 'Diagnostic X-ray', model: 'Fujifilm VXR-40', serial: 'FVX-2022-4851', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention' },
  { id: 2, name: 'Dental X-ray Unit', type: 'Dental Radiography', model: 'iM3 CR7', serial: 'IM3-2023-1124', lastInspection: '2023-08-15', nextInspection: '2028-08-15', status: 'compliant' },
  { id: 3, name: 'Portable X-ray', type: 'Mobile Radiography', model: 'MinXray HF100', serial: 'MXR-2021-8876', lastInspection: '2024-02-21', nextInspection: '2026-02-21', status: 'attention' },
];

const checklistItems = [
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

// ==================== COMPONENTS ====================

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
  
  const Icon = icons[status];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon size={12} />
      {labels[status]}
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0D9488"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
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

const DeadlineItem = ({ deadline }) => {
  const statusColors = {
    overdue: 'bg-red-500',
    attention: 'bg-amber-500',
    compliant: 'bg-emerald-500',
  };
  
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full ${statusColors[deadline.status]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{deadline.title}</p>
        <p className="text-xs text-slate-500">{deadline.category}</p>
      </div>
      <span className={`text-sm font-medium whitespace-nowrap ${deadline.days < 0 ? 'text-red-600' : deadline.days < 30 ? 'text-amber-600' : 'text-slate-600'}`}>
        {deadline.days < 0 ? `${Math.abs(deadline.days)}d overdue` : `${deadline.days}d`}
      </span>
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
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 font-display">VetComply</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600 -ml-[4px] pl-[16px]' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          {/* User section */}
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

const Header = ({ title, subtitle, setIsMobileOpen }) => (
  <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-800 font-display">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-slate-100 rounded-lg relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Settings size={20} className="text-slate-600" />
        </button>
      </div>
    </div>
  </header>
);

// ==================== VIEWS ====================

const DashboardView = () => {
  const totalItems = Object.values(initialComplianceData).reduce((acc, cat) => acc + cat.items.length, 0);
  const compliantItems = Object.values(initialComplianceData).reduce(
    (acc, cat) => acc + cat.items.filter(i => i.status === 'compliant' || i.status === 'completed').length, 0
  );
  const overallCompliance = Math.round((compliantItems / totalItems) * 100);
  
  const overdueCount = upcomingDeadlines.filter(d => d.days < 0).length;
  const attentionCount = upcomingDeadlines.filter(d => d.days >= 0 && d.days < 30).length;
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <TrendingUp size={20} className="text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{overallCompliance}%</p>
              <p className="text-sm text-slate-500">Overall Compliance</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{overdueCount}</p>
              <p className="text-sm text-slate-500">Overdue Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{attentionCount}</p>
              <p className="text-sm text-slate-500">Need Attention</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{compliantItems}/{totalItems}</p>
              <p className="text-sm text-slate-500">Items Compliant</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compliance Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 font-display">Compliance Areas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(initialComplianceData).map(([key, data]) => (
              <ComplianceCard key={key} data={data} />
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4 font-display">Compliance Score</h3>
            <div className="flex justify-center">
              <ProgressRing progress={overallCompliance} />
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
              {compliantItems} of {totalItems} requirements met
            </p>
          </div>
          
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 font-display">Upcoming Deadlines</h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-1">
              {upcomingDeadlines.slice(0, 5).map(deadline => (
                <DeadlineItem key={deadline.id} deadline={deadline} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 29));
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };
  
  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = getDaysInMonth(currentMonth);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800 font-display">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                ←
              </button>
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                →
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              const events = getEventsForDay(day);
              const isToday = day === 29 && currentMonth.getMonth() === 0 && currentMonth.getFullYear() === 2026;
              
              return (
                <div 
                  key={idx} 
                  className={`min-h-[80px] p-1 border border-slate-100 rounded-lg ${day ? 'hover:bg-slate-50' : ''} ${isToday ? 'bg-teal-50 border-teal-200' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-sm ${isToday ? 'font-bold text-teal-700' : 'text-slate-600'}`}>{day}</span>
                      <div className="mt-1 space-y-1">
                        {events.map(event => (
                          <div 
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${
                              event.type === 'overdue' ? 'bg-red-100 text-red-700' :
                              event.type === 'attention' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
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
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 font-display">All Deadlines</h3>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Plus size={18} className="text-slate-600" />
            </button>
          </div>
          <div className="space-y-3">
            {calendarEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  event.type === 'overdue' ? 'bg-red-500' :
                  event.type === 'attention' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentsView = () => {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(documents.map(d => d.category))];
  
  const filteredDocs = filter === 'all' ? documents : documents.filter(d => d.category === filter);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Documents' : cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
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
                const isExpiringSoon = doc.expires && new Date(doc.expires) < new Date('2026-03-01');
                const isExpired = doc.expires && new Date(doc.expires) < new Date('2026-01-29');
                
                return (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <FileText size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                          <p className="text-xs text-slate-500 sm:hidden">{doc.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-slate-600">{doc.category}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{new Date(doc.uploaded).toLocaleDateString('en-AU')}</span>
                    </td>
                    <td className="px-4 py-3">
                      {doc.expires ? (
                        <span className={`text-sm ${isExpired ? 'text-red-600 font-medium' : isExpiringSoon ? 'text-amber-600' : 'text-slate-600'}`}>
                          {new Date(doc.expires).toLocaleDateString('en-AU')}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <Eye size={16} className="text-slate-500" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <Download size={16} className="text-slate-500" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <Trash2 size={16} className="text-slate-500" />
                        </button>
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

const LicencesView = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Add Licence
        </button>
      </div>
      
      <div className="grid gap-4">
        {licences.map(licence => (
          <div key={licence.id} className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow ${licence.status === 'overdue' ? 'border-l-4 border-l-red-500' : ''}`}>
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
                    {new Date(licence.expires).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
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

const CPDView = () => {
  const [expandedId, setExpandedId] = useState(null);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Log Activity
        </button>
      </div>
      
      <div className="space-y-4">
        {cpdRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div 
              className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
            >
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
                    <p className="text-sm text-slate-500">Period ends: {new Date(record.periodEnd).toLocaleDateString('en-AU')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${record.totalPoints >= record.required ? 'text-emerald-600' : 'text-slate-800'}`}>{record.totalPoints}</p>
                    <p className="text-xs text-slate-500">of {record.required} pts</p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${record.totalPoints >= record.required ? 'bg-emerald-500' : 'bg-teal-500'}`}
                        style={{ width: `${Math.min((record.totalPoints / record.required) * 100, 100)}%` }}
                      />
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
                  {record.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                        <p className="text-xs text-slate-500">{new Date(activity.date).toLocaleDateString('en-AU')} • {activity.type}</p>
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

const EquipmentView = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} />
          Add Equipment
        </button>
      </div>
      
      <div className="grid gap-4">
        {equipment.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5">
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
                  <p className="text-sm text-slate-800">{new Date(item.lastInspection).toLocaleDateString('en-AU')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Next Due</p>
                  <p className={`text-sm font-medium ${item.status === 'attention' ? 'text-amber-600' : 'text-slate-800'}`}>
                    {new Date(item.nextInspection).toLocaleDateString('en-AU')}
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

const ChecklistView = () => {
  const [items, setItems] = useState(checklistItems);
  
  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };
  
  const sections = [...new Set(items.map(i => i.section))];
  const completedCount = items.filter(i => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);
  
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 font-display">VPB Hospital Self-Assessment</h2>
            <p className="text-sm text-slate-500">Based on Guideline GH03</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800">{completedCount}/{items.length}</p>
              <p className="text-xs text-slate-500">Items Complete</p>
            </div>
            <ProgressRing progress={progress} size={80} strokeWidth={6} />
          </div>
        </div>
      </div>
      
      {/* Checklist Sections */}
      <div className="space-y-6">
        {sections.map(section => {
          const sectionItems = items.filter(i => i.section === section);
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
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.completed 
                            ? 'bg-teal-600 border-teal-600' 
                            : 'border-slate-300 hover:border-teal-400'
                        }`}
                      >
                        {item.completed && <CheckCircle size={14} className="text-white" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {item.item}
                        </p>
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
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const viewConfig = {
    dashboard: { title: 'Compliance Dashboard', subtitle: 'Northside Veterinary Hospital', component: DashboardView },
    calendar: { title: 'Compliance Calendar', subtitle: 'Track all your important dates', component: CalendarView },
    documents: { title: 'Documents', subtitle: 'Store and manage compliance documents', component: DocumentsView },
    licences: { title: 'Licences & Registrations', subtitle: 'Track all practice and staff licences', component: LicencesView },
    cpd: { title: 'CPD Tracker', subtitle: 'Monitor continuing professional development', component: CPDView },
    equipment: { title: 'Equipment Register', subtitle: 'Radiation and medical equipment tracking', component: EquipmentView },
    checklist: { title: 'Self-Assessment Checklist', subtitle: 'Prepare for VPB hospital inspections', component: ChecklistView },
  };
  
  const CurrentView = viewConfig[activeView].component;
  
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 min-w-0">
        <Header 
          title={viewConfig[activeView].title}
          subtitle={viewConfig[activeView].subtitle}
          setIsMobileOpen={setIsMobileOpen}
        />
        <CurrentView />
      </main>
    </div>
  );
}
