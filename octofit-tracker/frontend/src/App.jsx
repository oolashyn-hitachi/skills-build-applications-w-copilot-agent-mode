import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users', icon: 'bi-people' },
  { label: 'Teams', path: '/teams', icon: 'bi-people-fill' },
  { label: 'Activities', path: '/activities', icon: 'bi-activity' },
  { label: 'Leaderboard', path: '/leaderboard', icon: 'bi-trophy' },
  { label: 'Workouts', path: '/workouts', icon: 'bi-lightning-charge' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="navbar app-navbar">
        <div className="container-fluid app-navbar-inner">
          <NavLink className="navbar-brand app-brand" to="/users">
            <img
              src="/octofitapp-small.png"
              alt=""
              className="app-brand-logo"
              width="48"
              height="48"
            />
            <span>
              <strong>OctoFit</strong>
              <small>TRACKER</small>
            </span>
          </NavLink>
          <span className="app-navbar-caption">Your movement, your momentum</span>
        </div>
      </header>

      <div className="container-fluid app-content">
        <aside className="app-sidebar" aria-label="Main navigation">
          <p className="sidebar-label">TRACKER</p>
          <nav className="nav nav-pills flex-column">
            {navigation.map(({ label, path, icon }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link app-nav-link${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                <i className={`bi ${icon}`} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="sidebar-note-icon" aria-hidden="true">
              <i className="bi bi-heart-pulse" />
            </span>
            <strong>Small steps add up.</strong>
            <span>Keep showing up for yourself.</span>
          </div>
        </aside>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate replace to="/users" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/users" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
