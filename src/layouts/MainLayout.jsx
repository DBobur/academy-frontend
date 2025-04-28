import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="layout-container" style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Topbar />
                <div style={{ padding: '20px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
