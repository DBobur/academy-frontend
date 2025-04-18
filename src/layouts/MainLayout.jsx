import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const MainLayout = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) return navigate('/')
    axios.get('http://localhost:8080/api/v1/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data))
      .catch(() => navigate('/'))
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div className="layout-container">
      <Sidebar role={user.role} />
      <div className="main-section">
        <Topbar fullName={user.fullName} />
        <div className="page-content">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
