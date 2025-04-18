import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const res = await axios.get('http://localhost:8080/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(res.data)
        console.log('USER:', res.data)
      } catch (err) {
        console.error('Failed to load user info:', err)
      }
    }

    fetchUser()
  }, [])

  if (!user) return <div>Loading user info...</div>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.fullName} 👋</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={() => {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
      }}>Logout</button>
    </div>
  )
}

export default Dashboard
