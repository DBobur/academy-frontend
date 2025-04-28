import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div style={{ width: '220px', background: '#2c3e50', color: 'white', padding: '20px' }}>
            <h2>Academy</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link style={{ color: 'white' }} to="/home">Home</Link></li>
                <li><Link style={{ color: 'white' }} to="/">Dashboard</Link></li>
                <li><Link style={{ color: 'white' }} to="/profile">Profile</Link></li>
                <li><Link style={{ color: 'white' }} to="/users">Users</Link></li>
                <li><Link style={{ color: 'white' }} to="/users">Users</Link></li>
            </ul>

        </div>
    )
}

export default Sidebar
