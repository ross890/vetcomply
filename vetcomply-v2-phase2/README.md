# VetComply

Unified compliance management platform for NSW veterinary practices.

## Features

- **Compliance Dashboard** - Traffic light status for all regulatory areas
- **Calendar** - Track all deadlines and regulatory dates
- **Documents** - Store and manage compliance documents
- **Licences** - Track practice and staff licences
- **CPD Tracker** - Monitor continuing professional development
- **Equipment Register** - Radiation and medical equipment tracking
- **Self-Assessment Checklist** - Prepare for VPB hospital inspections

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

#### Option 1: Deploy via GitHub

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure everything
6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
vetcomply-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind directives + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customisation

### Adding Your Practice Details

Edit the following in `src/App.jsx`:

1. Practice name (search for "Northside Veterinary Hospital")
2. Staff names and registration numbers
3. Licence numbers and expiry dates
4. Equipment inventory

### Connecting to a Backend

This is currently a frontend prototype with mock data. To add a real backend:

1. **Supabase** - Easy PostgreSQL + Auth
2. **Firebase** - Real-time database + Auth
3. **Custom API** - Your own Node.js/Python backend

Replace the hardcoded data arrays (`initialComplianceData`, `documents`, `licences`, etc.) with API calls.

## Compliance Areas Covered

- **Controlled Substances** (NSW Health - S8/S4 drugs)
- **Radiation Safety** (EPA - equipment, licences)
- **Hospital Licence** (VPB - registration, inspections)
- **Practitioner Registration** (VPB - individual vets)
- **CPD** (VPB - 60 points/3 years)
- **Biosecurity** (DPI - notifiable diseases)

## License

MIT

## Support

For questions about NSW veterinary compliance requirements, refer to:
- [Veterinary Practitioners Board NSW](https://www.vpb.nsw.gov.au/)
- [NSW Health Pharmaceutical Services](https://www.health.nsw.gov.au/pharmaceutical/)
- [NSW EPA](https://www.epa.nsw.gov.au/)
