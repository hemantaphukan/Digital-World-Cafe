import React, { useState } from 'react';
import { 
  ExternalLink, FileText, Car, LogIn, Printer, Zap, 
  ShieldCheck, FileSpreadsheet, Fingerprint, Search, 
  Smartphone, UserCircle, Link as LinkIcon, Vote, 
  Download, FileSearch, Train, Layout, Plane, 
  CreditCard, HeartPulse, Bot, Upload, ChevronRight,
  ShieldAlert, QrCode, Globe
} from 'lucide-react';

// Categories for the navigation tabs
const CATEGORIES = [
  { id: 'business', label: 'Business & Tools', icon: Layout },
  { id: 'print2', label: 'Print Portals', icon: Printer },
  { id: 'transport', label: 'Transport & Travel', icon: Car },
  { id: 'citizen', label: 'Citizen Services', icon: UserCircle },
  { id: 'uid-user', label: 'UID User', icon: Fingerprint },
  { id: 'birth', label: 'Online Birth Portal', icon: FileText },
  { id: 'findmaster', label: 'FindMaster Portal', icon: Globe },
  { id: 'digital-egazette', label: 'Digital eGazette Portal', icon: Globe },
  { id: 'all-in-one-manual-print', label: 'All In One Manual Print', icon: Printer },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

const EXTERNAL_LINKS = [
  // UID User (Tab 5) - Dedicated Identity Services
  { id: 9, category: 'uid-user', label: 'Aadhaar Download', url: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar/en', icon: Fingerprint, description: 'Download your digital Aadhaar card securely from UIDAI.' },
  { id: 10, category: 'uid-user', label: 'Aadhaar Status', url: 'https://myaadhaar.uidai.gov.in/CheckAadhaarStatus/en', icon: Search, description: 'Check your Aadhaar application or update status online.' },
  { id: 11, category: 'uid-user', label: 'Mobile Link Status', url: 'https://myaadhaar.uidai.gov.in/check-aadhaar-validity/en', icon: Smartphone, description: 'Verify which mobile number is linked to your Aadhaar.' },
  { id: 33, category: 'uid-user', label: 'Verify Aadhaar', url: 'https://myaadhaar.uidai.gov.in/verifyAadhaar', icon: ShieldCheck, description: 'Verify any Aadhaar number to check its validity.' },
  { id: 36, category: 'uid-user', label: 'UC-Digiucore Login', url: 'https://digiucore.in/login.php', icon: ShieldCheck, description: 'Direct access to the UID Client management portal.' },
  { id: 53, category: 'uid-user', label: 'UC- Prosewa login', url: 'https://prosewa.in/login.php', icon: ShieldCheck, description: 'Direct access to the Prosewa UID management portal.' },

  // Citizen Services (Tab 4)
  { id: 13, category: 'citizen', label: 'PAN-Aadhaar Link', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status', icon: LinkIcon, description: 'Check Income Tax PAN and Aadhaar linkage status.' },
  { id: 14, category: 'citizen', label: 'Voter Search', url: 'https://electoralsearch.eci.gov.in/', icon: Vote, description: 'Search for voter details in the national electoral roll.' },
  { id: 15, category: 'citizen', label: 'Voter Download', url: 'https://voters.eci.gov.in/', icon: Download, description: 'Download e-EPIC card and link mobile number.' },
  { id: 23, category: 'citizen', label: 'e-Shram Registration', url: 'https://register.eshram.gov.in/#/user/self', icon: CreditCard, description: 'Apply for the National Database of Unorganized Workers.' },
  { id: 25, category: 'citizen', label: 'Life Certificate', url: 'https://jeevanpramaan.gov.in/v1.0/ppouser/login', icon: HeartPulse, description: 'Digital life certificate portal for pensioners.' },
  
  // Transport & Travel (Tab 3)
  { id: 1, category: 'transport', label: 'PUCC Fine Check', url: 'https://puc.parivahan.gov.in/puc/views/OnlineFinePayment.xhtml', icon: FileText, description: 'Check and pay pollution-related fines.' },
  { id: 2, category: 'transport', label: 'PUCC Online 0.1', url: 'https://695a8b13b07f32612f9f25da--shiny-frangipane-72ccc9.netlify.app/', icon: Car, description: 'Primary portal for PUCC registration.' },
  { id: 16, category: 'transport', label: 'Bike & Car Details', url: 'https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml', icon: FileSearch, description: 'Access national vehicle registration details.' },
  { id: 17, category: 'transport', label: 'Train Booking', url: 'https://www.irctc.co.in/nget/train-search', icon: Train, description: 'Official IRCTC Indian Railways ticket portal.' },
  { id: 19, category: 'transport', label: 'Flight Booking', url: 'https://www.skyscanner.co.in/', icon: Plane, description: 'Search for best flight deals via Skyscanner.' },
  { id: 28, category: 'transport', label: 'Learner License', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do', icon: Car, description: 'Apply for learner and driving licenses.' },
  
  // Business & Tools (Tab 1)
  { id: 3, category: 'business', label: 'eSTAMP Online', url: 'https://www.shcilestamp.com/OnlineStamping/OlnEsi', icon: LogIn, description: 'Access SHCIL e-Stamping and legal services.' },
  { id: 6, category: 'business', label: 'Vehicle Insurance', url: 'https://www.pbpartners.com/', icon: ShieldCheck, description: 'Renew and manage commercial vehicle insurance.' },
  { id: 18, category: 'business', label: 'CSC Digital Seva', url: 'https://digitalseva.csc.gov.in/', icon: Layout, description: 'Common Service Centers official login.' },
  { id: 20, category: 'business', label: 'UTI PAN Portal', url: 'https://sathsafar.in/portallogin/login', icon: CreditCard, description: 'Apply for offline PAN cards through UTI.' },
  { id: 22, category: 'business', label: 'NSDL PAN Services', url: 'https://egovcsc.csccloud.in/nsdl/', icon: CreditCard, description: 'CSC-integrated NSDL PAN applications.' },
  { id: 24, category: 'business', label: 'CIBIL Score', url: 'https://bureau.csccloud.in/', icon: ShieldCheck, description: 'Check official bank credit reports and CIBIL scores.' },
  { id: 26, category: 'business', label: 'Arunachal e-GRAS', url: 'https://egras.arunachal.gov.in/', icon: CreditCard, description: 'Govt. challan payment system for Arunachal Pradesh.' },
  { id: 29, category: 'business', label: 'Retailer Data Upload', url: 'https://695a8b88c793d8785da0ad52--profound-meringue-5b967f.netlify.app/', icon: Upload, description: 'Portal for retailer data submission and management.' },
  { id: 27, category: 'business', label: 'AI Assistant', url: 'https://www.perplexity.ai/', icon: Bot, description: 'Advanced AI tools for document drafting and research.' },

  // Print Portals (Tab 2)
  { id: 4, category: 'print2', label: 'Print Fast Portal', url: 'https://printfastportal.net/members/login', icon: Printer, description: 'Cloud-based document printing and management.' },
  { id: 5, category: 'print2', label: 'S2P Operations', url: 'https://servicetopoint.com/web/index.php/auth/login.php', icon: Zap, description: 'Service-to-Point business operational portal.' },
  { id: 31, category: 'print2', label: 'Print Card Portal', url: 'https://printscards.com/login.php', icon: Printer, description: 'Access the latest Print Card Portal for enhanced printing and card services.' },
  { id: 7, category: 'print2', label: 'VLE Print Services', url: 'https://vleprintportal.com/login.php', icon: FileSpreadsheet, description: 'Document processing for VLE operators.' },
  { id: 35, category: 'print2', label: 'NewSkill Prints', url: 'https://newskill.fun/login.php', icon: Printer, description: 'Access NewSkill integrated printing and document portal.' },
  { id: 38, category: 'print2', label: 'Rekha Print Portal', url: 'https://rekhaprint.co/', icon: Printer, description: 'Main landing page for Rekha Print services.' },
  { id: 50, category: 'print2', label: 'Rekha Print Portal Login', url: 'https://rekhaprint.co/members/login', icon: Printer, description: 'Secure access to Rekha Print portal services.' },
  { id: 46, category: 'print2', label: 'Aditya Print', url: 'https://adityaprint.in/members/login', icon: Printer, description: 'Access Aditya Print portal for document services.' },
  { id: 48, category: 'print2', label: 'All-In-One Print', url: 'https://vleprint1.in/login.php', icon: Printer, description: 'Comprehensive printing solutions via the All-In-One Print portal.' },
  { id: 59, category: 'print2', label: 'RBM Zone Portal', url: 'https://rbmzone.in/loginz.php', icon: Printer, description: 'Direct access to the RBM Zone portal for printing and document services.' },
  { id: 65, category: 'print2', label: 'Armitra Print Portal Login', url: 'https://armitra.in/login.php', icon: Printer, description: 'Direct access to the Armitra Print portal for document services.' },
  { id: 70, category: 'print2', label: 'Shyam Print Portal Login', url: 'https://newunique.verrify.in/login.php', icon: Printer, description: 'Direct access to the Shyam Print Portal for professional document services.' },

  // Online Birth Portal (Tab 6)
  { id: 40, category: 'birth', label: 'AS Birth Server- 2', url: 'https://dc.crsorgi-gov.cc/general-public', icon: FileText, description: 'Public portal for national Civil Registration System birth registration services.' },
  { id: 41, category: 'birth', label: 'AS Birth Server- 1', url: 'https://crsi.co-in.site/', icon: Search, description: 'Enhanced public access portal for CRS birth and death registration services.' },
  { id: 57, category: 'birth', label: 'DL Birth Server- 1', url: 'https://dc.crsorgi.gov.in.viewd.in/login_rs.php', icon: FileText, description: 'Direct access to the third CRS birth registration server.' },
  { id: 61, category: 'birth', label: 'DL Birth Server- 2', url: 'https://dc.crsorgi.gov.in.web.dccertificate.in/login.php', icon: FileText, description: 'Access the fourth CRS birth registration server (DL Server 2).' },
  { id: 63, category: 'birth', label: 'DL Demo Birth Portal', url: 'https://crsorgi.gov.in.web.index.birthcetficate.co/dr_login.php', icon: FileText, description: 'Access the DL Demo Birth Portal for testing and demonstration.' },
  { id: 71, category: 'birth', label: 'AS Birth Login', url: 'https://crsi.crsorgi-gov.cc/login.php', icon: LogIn, description: 'Secure login portal for the AS Birth registration system.' },
  { id: 43, category: 'findmaster', label: 'FindMaster Login', url: 'https://findmaster.pro/login', icon: Globe, description: 'Main entry point for the FindMaster professional services platform.' },
  { id: 45, category: 'all-in-one-manual-print', label: 'JantaLife- 1 Login', url: 'https://jantaportal.life/login.php', icon: Printer, description: 'Direct login for the Manual Print Portal v.2 services.' },
  { id: 39, category: 'all-in-one-manual-print', label: 'JantaPro- 2 Login', url: 'https://jantapro.org.in/login', icon: Printer, description: 'Quick access to the manual document printing and management portal.' },
  
  // Digital eGazette Portal
  { id: 52, category: 'digital-egazette', label: 'Digital eGazette Login', url: 'https://dps.jshtml.shop/user/login', icon: Globe, description: 'Direct login to the Digital eGazette Portal management system.' },
  { id: 55, category: 'digital-egazette', label: 'e-Sewa Portal Login', url: 'https://dashboardworld.in/web/index.php/auth/login.php', icon: LogIn, description: 'Direct access to the e-Sewa Portal for integrated digital services.' },
  { id: 67, category: 'all-in-one-manual-print', label: 'All In One Manual Print Login', url: 'https://dc.crsorgi.gov.in.dc-verify.co.in/web/index.php/login.php', icon: LogIn, description: 'Secure access to the All In One Manual Print Login portal.' },
  { id: 68, category: 'all-in-one-manual-print', label: 'Manual Print Server- 1', url: 'https://rtps.verrify.in/login.php', icon: LogIn, description: 'Direct access to the Manual Print Server- 1 portal.' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryId>(CATEGORIES[0].id);

  const filteredLinks = EXTERNAL_LINKS.filter(link => link.category === activeTab);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Fixed Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Layout size={20} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight hidden lg:block">Digital Services Portal</h1>
          </div>
          
          {/* Main Tab Controls - Scrollable on Mobile */}
          <nav className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dynamic Title and Breadcrumb */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.25em] mb-3">
            <ChevronRight size={14} />
            {CATEGORIES.find(c => c.id === activeTab)?.label}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Resource <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">Dashboard</span>
          </h2>
        </div>

        {/* Links Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in" 
          key={activeTab}
        >
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-slate-900 border border-white/5 rounded-[2rem] p-8 hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-12px_rgba(79,70,229,0.35)] flex flex-col h-full overflow-hidden"
                >
                  {/* Decorative Background Glows */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-[60px] group-hover:bg-indigo-500/25 transition-all duration-500" />
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-fuchsia-500/5 blur-[60px] group-hover:bg-fuchsia-500/15 transition-all duration-500" />
                  
                  {/* Card Icon Container */}
                  <div className="mb-6 p-4 bg-slate-950 border border-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-500 group-hover:border-indigo-400/50 shadow-2xl">
                    <Icon size={24} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>

                  {/* Card Content */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-indigo-200 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {link.description}
                  </p>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-400 transition-colors">
                      Access Portal
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center group-hover:bg-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Base Animated Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </a>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 italic">No resources available for this category yet.</p>
            </div>
          )}
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="py-20 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">All Systems Operational</span>
          </div>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Digital Services Portal. Direct secure access to essential service platforms.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;