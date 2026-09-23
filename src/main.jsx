import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3,
  Bell, Beaker, Building2, CalendarDays, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, ClipboardList, Clock3, CreditCard, Download,
  FileCheck2, FileSearch, FlaskConical, Gauge, Grid2X2, HeartPulse,
  Home, LayoutDashboard, Menu, Moon, MoreHorizontal, Package, Palette,
  PanelLeftClose, PanelLeftOpen, Plus, QrCode, Receipt, Search, Settings,
  ShieldCheck, Sparkles, Sun, TestTube2, UserRound, Users, WalletCards,
  X, Zap, SlidersHorizontal
} from 'lucide-react'
import './styles.css'

const navGroups = [
  { label: 'Overview', items: [
    ['Dashboard', LayoutDashboard],
    ['Analytics', BarChart3],
  ]},
  { label: 'Laboratory', items: [
    ['Patients', Users],
    ['Tests', TestTube2],
    ['Packages', Package],
    ['Samples', FlaskConical],
    ['Results', FileCheck2],
    ['Find Reports', FileSearch],
  ]},
  { label: 'Operations', items: [
    ['Billing', Receipt],
    ['Referrals', UserRound],
    ['Appointments', CalendarDays],
  ]},
  { label: 'Administration', items: [
    ['Lab Setup', Building2],
    ['Report Format', Palette],
    ['Billing Format', Receipt],
    ['Users & Roles', ShieldCheck],
    ['Settings', Settings],
  ]},
]

const patients = [
  { id: 'P-10482', name: 'Rahul Kumar', age: 32, gender: 'Male', mobile: '98••••4218', test: 'Full Body Checkup', status: 'Processing', time: '09:42 AM' },
  { id: 'P-10481', name: 'Ananya Singh', age: 27, gender: 'Female', mobile: '97••••1832', test: 'Thyroid Profile', status: 'Completed', time: '09:16 AM' },
  { id: 'P-10480', name: 'Mohit Verma', age: 44, gender: 'Male', mobile: '91••••7765', test: 'Lipid Profile', status: 'Pending', time: '08:58 AM' },
  { id: 'P-10479', name: 'Sana Khan', age: 35, gender: 'Female', mobile: '88••••0941', test: 'CBC + ESR', status: 'Completed', time: '08:41 AM' },
  { id: 'P-10478', name: 'Vikash Gupta', age: 51, gender: 'Male', mobile: '90••••3411', test: 'LFT', status: 'Collected', time: '08:27 AM' },
]

const tests = [
  ['CBC', 'Hematology', 'EDTA Blood', '₹350', '30 min', 'Active'],
  ['Lipid Profile', 'Biochemistry', 'Serum', '₹650', '4 hrs', 'Active'],
  ['Liver Function Test', 'Biochemistry', 'Serum', '₹800', '4 hrs', 'Active'],
  ['Thyroid Profile', 'Immunology', 'Serum', '₹700', '6 hrs', 'Active'],
  ['HbA1c', 'Biochemistry', 'Whole Blood', '₹500', '2 hrs', 'Active'],
  ['Urine Routine', 'Clinical Pathology', 'Urine', '₹220', '45 min', 'Active'],
]

const reports = [
  ['RP-2026-1042', 'Rahul Kumar', 'Full Body Checkup', '23 Sep 2026', 'Ready'],
  ['RP-2026-1041', 'Ananya Singh', 'Thyroid Profile', '23 Sep 2026', 'Ready'],
  ['RP-2026-1039', 'Sana Khan', 'CBC + ESR', '23 Sep 2026', 'Ready'],
  ['RP-2026-1034', 'Amit Roy', 'LFT', '22 Sep 2026', 'Ready'],
]

function App() {
  const [active, setActive] = useState('Dashboard')
  const [dark, setDark] = useState(true)
  const [sidebar, setSidebar] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const notify = (msg) => setToast(msg)

  const content = useMemo(() => {
    switch (active) {
      case 'Patients': return <Patients onAction={notify} />
      case 'Tests': return <Tests onAction={notify} />
      case 'Packages': return <Packages onAction={notify} />
      case 'Samples': return <Samples onAction={notify} />
      case 'Results': return <Results onAction={notify} />
      case 'Find Reports': return <FindReports onAction={notify} />
      case 'Billing': return <Billing onAction={notify} />
      case 'Referrals': return <Referrals onAction={notify} />
      case 'Analytics': return <Analytics />
      case 'Appointments': return <Generic title="Appointments" icon={CalendarDays} text="Manage patient appointments, collection slots and follow-ups." />
      case 'Lab Setup': return <Generic title="Lab Setup" icon={Building2} text="Configure lab identity, departments, branches and operational preferences." />
      case 'Report Format': return <Generic title="Report Format Setup" icon={Palette} text="Build report templates with headers, signatures, QR verification and result tables." />
      case 'Billing Format': return <Generic title="Billing Format Setup" icon={Receipt} text="Configure invoice layout, numbering, tax fields and payment receipts." />
      case 'Users & Roles': return <Generic title="Users & Roles" icon={ShieldCheck} text="Control access for reception, technicians, pathologists, billing and administrators." />
      case 'Settings': return <Generic title="Settings" icon={Settings} text="System preferences, notifications, numbering, security and integrations." />
      default: return <Dashboard onAction={notify} />
    }
  }, [active])

  return (
    <div className={`app-shell ${sidebar ? '' : 'sidebar-collapsed'}`}>
      <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={22} /></div>
          {sidebar && <div><div className="brand-name">nusfa<span>LIMS</span></div><div className="brand-sub">Laboratory Intelligence</div></div>}
          <button className="icon-btn mobile-only" onClick={() => setMobileMenu(false)}><X size={19}/></button>
        </div>
        <div className="lab-switch">
          <div className="lab-avatar"><Building2 size={18}/></div>
          {sidebar && <div className="grow"><b>Nusfa Diagnostics</b><small>Patna • Main Lab</small></div>}
          {sidebar && <ChevronDown size={16} className="muted" />}
        </div>
        <nav className="nav">
          {navGroups.map(group => <div className="nav-group" key={group.label}>
            {sidebar && <div className="nav-label">{group.label}</div>}
            {group.items.map(([name, Icon]) => (
              <button key={name} className={`nav-item ${active === name ? 'active' : ''}`} onClick={() => { setActive(name); setMobileMenu(false) }}>
                <Icon size={18}/>{sidebar && <span>{name}</span>}
                {name === 'Find Reports' && sidebar && <span className="nav-badge">12</span>}
              </button>
            ))}
          </div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-card">
            <div className="pulse-dot"></div>
            {sidebar && <div><b>System healthy</b><small>All services operational</small></div>}
          </div>
          <button className="profile" onClick={() => setActive('Users & Roles')}>
            <div className="avatar">AK</div>
            {sidebar && <div className="grow"><b>Arjun Kumar</b><small>Administrator</small></div>}
            {sidebar && <MoreHorizontal size={17}/>}
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="top-left">
            <button className="icon-btn" onClick={() => { if (window.innerWidth < 850) setMobileMenu(!mobileMenu); else setSidebar(!sidebar) }}>
              {window.innerWidth < 850 ? <Menu size={20}/> : sidebar ? <PanelLeftClose size={20}/> : <PanelLeftOpen size={20}/>}
            </button>
            <div className="breadcrumbs"><span>Nusfa LIMS</span><ChevronRight size={14}/><b>{active}</b></div>
          </div>
          <div className="top-actions">
            <div className="global-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search patient, report, test..." /><kbd>⌘ K</kbd></div>
            <button className="icon-btn theme-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
            <button className="icon-btn notify-btn" onClick={() => notify('You have 3 new notifications')}><Bell size={19}/><i>3</i></button>
            <div className="top-avatar">AK</div>
          </div>
        </header>

        <div className="content">
          {content}
        </div>
      </main>

      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />}
      {modal && <Modal type={modal} close={() => setModal(null)} onAction={notify}/>}
      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    </div>
  )
}

function PageHeader({ eyebrow, title, description, action, icon: Icon = Sparkles }) {
  return <div className="page-header">
    <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>
    {action && <button className="btn primary" onClick={action.onClick}><Plus size={17}/>{action.label}</button>}
  </div>
}

function Dashboard({onAction}) {
  return <>
    <PageHeader eyebrow="Good morning, Arjun" title="Lab overview" description="Everything important across your laboratory, in one place." action={{label:'New Patient', onClick:()=>onAction('Patient entry opened')}}/>
    <div className="kpi-grid">
      <Kpi title="Today's Patients" value="148" change="+12.8%" trend="up" icon={Users} detail="vs. yesterday"/>
      <Kpi title="Samples Collected" value="126" change="+8.4%" trend="up" icon={FlaskConical} detail="of 148 patients"/>
      <Kpi title="Reports Ready" value="94" change="+16.2%" trend="up" icon={FileCheck2} detail="54 released today"/>
      <Kpi title="Today's Collection" value="₹84,620" change="+9.7%" trend="up" icon={WalletCards} detail="vs. yesterday"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel">
        <div className="panel-head"><div><h3>Patient & Revenue Flow</h3><p>Last 7 days</p></div><button className="select-btn">This week <ChevronDown size={14}/></button></div>
        <div className="chart-wrap">
          <div className="y-labels"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
          <div className="area-chart">
            <svg viewBox="0 0 800 260" preserveAspectRatio="none">
              <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#27c7e8" stopOpacity=".35"/><stop offset="100%" stopColor="#27c7e8" stopOpacity="0"/></linearGradient></defs>
              <path d="M0 210 C70 170 95 185 150 145 S245 190 300 125 S390 80 450 135 S540 185 600 95 S690 115 800 38 L800 260 L0 260 Z" fill="url(#area)"/>
              <path d="M0 210 C70 170 95 185 150 145 S245 190 300 125 S390 80 450 135 S540 185 600 95 S690 115 800 38" fill="none" stroke="#42d5f3" strokeWidth="3"/>
              {[0,150,300,450,600,800].map((x,i)=><circle key={i} cx={x} cy={[210,145,125,135,95,38][i]} r="4" fill="#08131f" stroke="#61e3fa" strokeWidth="3"/>)}
            </svg>
            <div className="x-labels"><span>17 Sep</span><span>18 Sep</span><span>19 Sep</span><span>20 Sep</span><span>21 Sep</span><span>22 Sep</span><span>23 Sep</span></div>
          </div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><h3>Report Pipeline</h3><p>Today's status</p></div><button className="icon-btn"><MoreHorizontal size={18}/></button></div>
        <div className="donut-row"><div className="donut"><div><b>126</b><small>Samples</small></div></div><div className="legend">
          <Legend label="Completed" value="54" color="cyan"/><Legend label="Processing" value="38" color="blue"/><Legend label="Pending" value="24" color="amber"/><Legend label="Rejected" value="10" color="red"/>
        </div></div>
        <div className="mini-progress"><div><span>Turnaround target</span><b>91%</b></div><div className="progress"><i style={{width:'91%'}}/></div></div>
      </section>
    </div>
    <div className="bottom-grid">
      <section className="panel table-panel">
        <div className="panel-head"><div><h3>Recent Patients</h3><p>Latest registrations and samples</p></div><button className="link-btn" onClick={()=>onAction('Opening all patients')}>View all <ChevronRight size={15}/></button></div>
        <PatientTable compact />
      </section>
      <section className="panel activity-panel">
        <div className="panel-head"><div><h3>Live Activity</h3><p>Real-time lab events</p></div><span className="live-pill"><i/> LIVE</span></div>
        <ActivityItem icon={TestTube2} title="CBC result entered" meta="Rahul Kumar • 2 min ago" color="cyan"/>
        <ActivityItem icon={CheckCircle2} title="Report released" meta="Ananya Singh • 8 min ago" color="green"/>
        <ActivityItem icon={Receipt} title="Payment received" meta="Mohit Verma • 14 min ago" color="purple"/>
        <ActivityItem icon={FlaskConical} title="Sample collected" meta="Vikash Gupta • 22 min ago" color="blue"/>
      </section>
    </div>
  </>
}

function Kpi({title,value,change,trend,icon:Icon,detail}) {
  return <div className="kpi-card"><div className="kpi-top"><div className="kpi-icon"><Icon size={19}/></div><span className={`trend ${trend}`}>{trend==='up'?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>} {change}</span></div><div className="kpi-value">{value}</div><div className="kpi-label">{title}</div><div className="kpi-detail">{detail}</div></div>
}
function Legend({label,value,color}) { return <div className="legend-item"><i className={`dot ${color}`}/><span>{label}</span><b>{value}</b></div> }
function ActivityItem({icon:Icon,title,meta,color}) { return <div className="activity-item"><div className={`activity-icon ${color}`}><Icon size={16}/></div><div><b>{title}</b><small>{meta}</small></div><ChevronRight size={15} className="muted"/></div> }

function PatientTable({compact=false}) {
  return <div className="table-scroll"><table><thead><tr><th>Patient</th><th>Patient ID</th><th>Test / Package</th><th>Status</th><th>Time</th>{!compact&&<th/>}</tr></thead><tbody>{patients.map(p=><tr key={p.id}><td><div className="person"><div className="mini-avatar">{p.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><b>{p.name}</b><small>{p.age} yrs • {p.gender}</small></div></div></td><td className="mono">{p.id}</td><td>{p.test}</td><td><Status text={p.status}/></td><td>{p.time}</td>{!compact&&<td><button className="row-more"><MoreHorizontal size={17}/></button></td>}</tr>)}</tbody></table></div>
}
function Status({text}) { const cls = text.toLowerCase().replace(' ','-'); return <span className={`status ${cls}`}><i/>{text}</span> }

function Patients({onAction}) {
  return <><PageHeader eyebrow="Laboratory" title="Patients" description="Patient registry, visits, history and clinical records." action={{label:'Register Patient',onClick:()=>onAction('New patient form opened')}}/><div className="toolbar panel"><div className="search-field"><Search size={17}/><input placeholder="Search by name, patient ID or mobile..."/></div><button className="filter-btn"><SlidersHorizontal size={16}/> Filters</button><button className="filter-btn">Today <ChevronDown size={15}/></button></div><section className="panel table-panel"><div className="panel-head"><div><h3>Patient Registry</h3><p>14,842 registered patients</p></div><button className="icon-btn"><Download size={17}/></button></div><PatientTable /></section></>
}

function Tests({onAction}) {
 return <><PageHeader eyebrow="Laboratory" title="Test Management" description="Configure tests, parameters, pricing, reference ranges and turnaround times." action={{label:'Add Test',onClick:()=>onAction('Test creation form opened')}}/><div className="stat-strip"><MiniStat icon={TestTube2} label="Active Tests" value="286"/><MiniStat icon={Activity} label="Parameters" value="1,248"/><MiniStat icon={Clock3} label="Avg. TAT" value="3.8h"/><MiniStat icon={WalletCards} label="Price List" value="₹12.4L"/></div><section className="panel table-panel"><div className="panel-head"><div><h3>Test Catalogue</h3><p>All active laboratory tests</p></div><div className="head-actions"><div className="search-field small"><Search size={15}/><input placeholder="Search tests..."/></div><button className="filter-btn"><SlidersHorizontal size={15}/> Filter</button></div></div><div className="table-scroll"><table><thead><tr><th>Test</th><th>Department</th><th>Sample</th><th>Price</th><th>TAT</th><th>Status</th><th/></tr></thead><tbody>{tests.map(t=><tr key={t[0]}><td><b>{t[0]}</b><small className="table-sub">Code: {t[0].slice(0,3).toUpperCase()}-001</small></td><td>{t[1]}</td><td>{t[2]}</td><td><b>{t[3]}</b></td><td>{t[4]}</td><td><Status text={t[5]}/></td><td><button className="row-more"><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table></div></section></>
}
function MiniStat({icon:Icon,label,value}) {return <div className="mini-stat"><div className="kpi-icon"><Icon size={18}/></div><div><small>{label}</small><b>{value}</b></div></div>}

function Packages({onAction}) {
 const packs=[['Nusfa Complete Health','38 Tests','₹2,499','₹3,850'],['Diabetes Care','8 Tests','₹999','₹1,420'],['Women Wellness','16 Tests','₹1,799','₹2,460'],['Heart Shield','12 Tests','₹1,599','₹2,150']]
 return <><PageHeader eyebrow="Laboratory" title="Packages" description="Curate bundled diagnostics with smart pricing and offers." action={{label:'Create Package',onClick:()=>onAction('Package builder opened')}}/><div className="package-grid">{packs.map((p,i)=><div className="package-card" key={p[0]}><div className="package-top"><div className={`package-icon p${i}`}><Package size={19}/></div><button className="row-more"><MoreHorizontal size={17}/></button></div><h3>{p[0]}</h3><p>{p[1]} included • Preventive diagnostics</p><div className="package-price"><b>{p[2]}</b><del>{p[3]}</del><span>35% OFF</span></div><div className="package-foot"><span><CheckCircle2 size={14}/> Active</span><button className="link-btn">Manage <ChevronRight size={14}/></button></div></div>)}</div></>
}

function Samples({onAction}) {
 const rows=[['S-240923-126','Rahul Kumar','CBC, LFT','Blood + Serum','Processing'],['S-240923-125','Ananya Singh','Thyroid Profile','Serum','Completed'],['S-240923-124','Mohit Verma','Lipid Profile','Serum','Pending'],['S-240923-123','Vikash Gupta','LFT','Serum','Collected']]
 return <><PageHeader eyebrow="Laboratory" title="Sample Tracking" description="Track every specimen from collection to verification." action={{label:'Scan Barcode / QR',onClick:()=>onAction('Scanner ready')}}/><div className="stat-strip"><MiniStat icon={FlaskConical} label="Collected Today" value="126"/><MiniStat icon={Clock3} label="Processing" value="38"/><MiniStat icon={AlertTriangle} label="Recollection" value="4"/><MiniStat icon={CheckCircle2} label="Completed" value="84"/></div><section className="panel table-panel"><div className="panel-head"><div><h3>Live Sample Queue</h3><p>Specimen movement and status</p></div><div className="head-actions"><button className="filter-btn"><QrCode size={15}/> Scan</button><button className="filter-btn"><SlidersHorizontal size={15}/> Filter</button></div></div><div className="table-scroll"><table><thead><tr><th>Sample ID</th><th>Patient</th><th>Tests</th><th>Specimen</th><th>Status</th><th>Updated</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r[0]}><td className="mono">{r[0]}</td><td><b>{r[1]}</b></td><td>{r[2]}</td><td>{r[3]}</td><td><Status text={r[4]}/></td><td>{['2 min ago','8 min ago','14 min ago','22 min ago'][i]}</td></tr>)}</tbody></table></div></section></>
}

function Results({onAction}) {
 return <><PageHeader eyebrow="Laboratory" title="Result Entry & Verification" description="Enter, review and release laboratory results with controlled access." action={{label:'Open Worklist',onClick:()=>onAction('Result worklist opened')}}/><div className="result-layout"><section className="panel"><div className="panel-head"><div><h3>Technician Worklist</h3><p>38 results waiting for entry</p></div><span className="live-pill"><i/> LIVE</span></div>{['Rahul Kumar • CBC','Mohit Verma • Lipid Profile','Vikash Gupta • LFT','Sana Khan • CBC + ESR'].map((x,i)=><div className="work-item" key={x}><div className="mini-avatar">{i+1}</div><div className="grow"><b>{x}</b><small>Sample S-240923-{126-i} • {i<2?'Processing':'Collected'}</small></div><button className="btn ghost">Enter</button></div>)}</section><section className="panel result-preview"><div className="panel-head"><div><h3>Result Preview</h3><p>Rahul Kumar • CBC</p></div><Status text="Draft"/></div><div className="result-row header"><span>Parameter</span><span>Result</span><span>Unit</span><span>Reference</span></div>{[['Hemoglobin','13.4','g/dL','13.0 – 17.0'],['WBC','7,200','/µL','4,000 – 11,000'],['Platelets','2.45','lakh/µL','1.5 – 4.5']].map(r=><div className="result-row" key={r[0]}>{r.map((v,i)=><span key={i} className={i===1?'result-value':''}>{v}</span>)}</div>)}<div className="result-actions"><button className="btn ghost">Save Draft</button><button className="btn primary" onClick={()=>onAction('Result submitted for verification')}>Submit for Verification <CheckCircle2 size={16}/></button></div></section></div></>
}

function FindReports({onAction}) {
 return <><PageHeader eyebrow="Reports" title="Find Reports" description="Search, verify, print and securely share released reports." action={{label:'Scan QR',onClick:()=>onAction('QR scanner opened')}}/><div className="toolbar panel"><div className="search-field"><Search size={17}/><input placeholder="Search report no., patient, mobile, sample ID..." /></div><button className="filter-btn">Date range <ChevronDown size={15}/></button><button className="filter-btn">Status <ChevronDown size={15}/></button></div><section className="panel table-panel"><div className="panel-head"><div><h3>Released Reports</h3><p>Secure report access with QR verification</p></div><button className="btn ghost"><Download size={16}/> Export</button></div><div className="table-scroll"><table><thead><tr><th>Report No.</th><th>Patient</th><th>Test / Package</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{reports.map(r=><tr key={r[0]}><td className="mono">{r[0]}</td><td><b>{r[1]}</b></td><td>{r[2]}</td><td>{r[3]}</td><td><Status text={r[4]}/></td><td><div className="table-actions"><button className="row-btn" onClick={()=>onAction('Report opened')}><FileSearch size={15}/> View</button><button className="row-btn" onClick={()=>onAction('PDF download started')}><Download size={15}/></button><button className="row-btn"><QrCode size={15}/></button></div></td></tr>)}</tbody></table></div></section></>
}

function Billing({onAction}) {
 return <><PageHeader eyebrow="Operations" title="Billing & Payments" description="Invoices, receipts, discounts, dues and payment reconciliation." action={{label:'New Invoice',onClick:()=>onAction('Billing form opened')}}/><div className="kpi-grid"><Kpi title="Today's Billing" value="₹84,620" change="+9.7%" trend="up" icon={Receipt} detail="148 invoices"/><Kpi title="Collected" value="₹76,410" change="+12.2%" trend="up" icon={CreditCard} detail="90.3% collected"/><Kpi title="Outstanding" value="₹8,210" change="-4.6%" trend="up" icon={WalletCards} detail="31 invoices"/><Kpi title="Refunds" value="₹1,240" change="-12.1%" trend="up" icon={ArrowDownRight} detail="4 transactions"/></div><section className="panel"><div className="panel-head"><div><h3>Recent Invoices</h3><p>Today's billing activity</p></div><button className="filter-btn"><Download size={15}/> Export</button></div><div className="invoice-list">{[['INV-240923-148','Rahul Kumar','Full Body Checkup','₹2,499','Paid'],['INV-240923-147','Ananya Singh','Thyroid Profile','₹700','Paid'],['INV-240923-146','Mohit Verma','Lipid Profile','₹650','Due'],['INV-240923-145','Sana Khan','CBC + ESR','₹520','Paid']].map(x=><div className="invoice-row" key={x[0]}><span className="mono">{x[0]}</span><b>{x[1]}</b><span>{x[2]}</span><strong>{x[3]}</strong><Status text={x[4]}/><button className="row-more"><MoreHorizontal size={17}/></button></div>)}</div></section></>
}

function Referrals({onAction}) {
 return <><PageHeader eyebrow="Operations" title="Referral Management" description="Manage referring doctors, clinics, referral codes and performance." action={{label:'Add Doctor',onClick:()=>onAction('Doctor form opened')}}/><div className="doctor-grid">{[['Dr. Neha Sharma','General Physician','42 patients','₹68,400'],['Dr. Amit Raj','Cardiologist','31 patients','₹54,220'],['Dr. Priya Singh','Gynecologist','27 patients','₹47,180'],['Dr. Rakesh Kumar','Physician','19 patients','₹32,940']].map((d,i)=><div className="doctor-card" key={d[0]}><div className="doctor-avatar">{d[0].split(' ').slice(1,3).map(x=>x[0]).join('')}</div><div className="grow"><h3>{d[0]}</h3><p>{d[1]}</p></div><button className="row-more"><MoreHorizontal size={17}/></button><div className="doctor-metrics"><div><b>{d[2]}</b><small>This month</small></div><div><b>{d[3]}</b><small>Revenue</small></div></div></div>)}</div></>
}

function Analytics() {
 return <><PageHeader eyebrow="Overview" title="Analytics" description="Operational intelligence across patients, tests, revenue and turnaround time."/><div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-head"><div><h3>Revenue Trend</h3><p>September 2026</p></div></div><div className="big-bars">{[55,72,61,88,75,96,84,100,91,86,94,78].map((h,i)=><div key={i} style={{height:`${h}%`}}><i/><span>{i+1}</span></div>)}</div></section><section className="panel"><div className="panel-head"><div><h3>Top Tests</h3><p>By volume this month</p></div></div>{[['CBC','1,842','88%'],['Lipid Profile','1,204','71%'],['LFT','998','62%'],['Thyroid Profile','844','52%']].map(x=><div className="rank-row" key={x[0]}><div><b>{x[0]}</b><small>{x[1]} orders</small></div><strong>{x[2]}</strong></div>)}</section></div></>
}

function Generic({title,icon:Icon,text}) {
 return <><PageHeader eyebrow="Administration" title={title} description={text}/><div className="generic-grid"><div className="panel feature-card"><div className="feature-icon"><Icon size={28}/></div><h2>Build it your way</h2><p>This workspace is ready for the next configuration layer. The design system, navigation, responsive shell and component library are already connected.</p><button className="btn primary"><Plus size={16}/> Create Configuration</button></div><div className="panel checklist"><h3>Recommended setup</h3>{['Define master data','Configure permissions','Set default templates','Review workflow','Test before production'].map((x,i)=><div key={x}><span>{i+1}</span><b>{x}</b><CheckCircle2 size={17}/></div>)}</div></div></>
}

function Modal({type,close,onAction}) {
 return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">Quick action</span><h2>{type}</h2></div><button className="icon-btn" onClick={close}><X size={18}/></button></div><div className="modal-body"><label>Patient / Item Name<input autoFocus placeholder="Enter name..." /></label><div className="form-grid"><label>Reference ID<input placeholder="Auto-generated" /></label><label>Category<select><option>General</option><option>Hematology</option><option>Biochemistry</option></select></label></div><label>Notes<textarea placeholder="Add notes..."/></label></div><div className="modal-foot"><button className="btn ghost" onClick={close}>Cancel</button><button className="btn primary" onClick={()=>{close();onAction('Saved successfully')}}><CheckCircle2 size={16}/> Save</button></div></div></div>
}

function AppRoot(){ return <App/> }
createRoot(document.getElementById('root')).render(<AppRoot />)