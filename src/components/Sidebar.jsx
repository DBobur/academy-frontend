import { FaHome, FaUser, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ role }) => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2 style={{ color: '#00A859' }}>LMS<span style={{ color: '#ff3333' }}>Online</span></h2>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/dashboard"><FaHome /> Dashboard</NavLink></li>
          <li><NavLink to="/profile"><FaUser /> Profile</NavLink></li>
          {(role === 'SUPER' || role === 'ADMIN' || role === 'MANEGER') && (
            <>
              <li><NavLink to="/users"><FaUsers /> Users</NavLink></li>
              <li><NavLink to="/contracts"><FaFileAlt /> Contracts</NavLink></li>
            </>
          )}
          <li><NavLink to="/settings"><FaCog /> Settings</NavLink></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <a href="/logout"><FaSignOutAlt /> Logout</a>
      </div>
    </aside>
  )
}

export default Sidebar
