import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Role:</strong> SUPER</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ProfilePage
