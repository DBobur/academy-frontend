import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DashboardStats = () => {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        axios.get('http://localhost:8080/api/v1/user/stats', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setStats(res.data))
            .catch(() => toast.error('Statistikani olishda xatolik!'))
    }, [])

    if (!stats) return <p>Statistika yuklanmoqda...</p>

    return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="stat-card">👥 Umumiy foydalanuvchilar: {stats.totalUsers}</div>
            <div className="stat-card">🟢 Aktiv kontraktlar: {stats.activeContracts}</div>
            <div className="stat-card">🔴 Tugagan kontraktlar: {stats.expiredContracts}</div>
            <div className="stat-card">👤 USER: {stats.roleCounts.USER || 0}</div>
            <div className="stat-card">👨‍🏫 MENTOR: {stats.roleCounts.MENTOR || 0}</div>
            <div className="stat-card">👨‍💼 ADMIN: {stats.roleCounts.ADMIN || 0}</div>
            <div className="stat-card">👑 SUPER: {stats.roleCounts.SUPER || 0}</div>
        </div>
    )
}

export default DashboardStats
