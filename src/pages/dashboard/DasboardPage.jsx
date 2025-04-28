import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DashboardStats from "./DashboardStats.jsx";

const DashboardPage = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            navigate('/login')
            return
        }

        axios.get('http://localhost:8080/api/v1/user/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUser(res.data))
            .catch(() => {
                localStorage.removeItem('accessToken')
                navigate('/login')
            })
    }, [])

    if (!user) return <p>Yuklanmoqda...</p>

    return (
        <div>
            <h2>Dashboard - {user.role}</h2>

            {/* SUPER */}
            {user.role === 'SUPER' && (
                <div>
                    <p>✅ Barcha foydalanuvchilarni boshqarish</p>
                    <p>✅ Statistika, kontraktlar, role management</p>
                </div>
            )}

            {/* ADMIN */}
            {user.role === 'ADMIN' && (
                <div>
                    <p>👨‍💼 Foydalanuvchilarni boshqarish, tahrirlash, tiklash</p>
                    <p>📊 Umumiy kontrakt nazorati</p>
                </div>
            )}

            {/* MANAGER */}
            {user.role === 'MANAGER' && (
                <div>
                    <p>👔 Mentor va foydalanuvchilar ro‘yxati bilan ishlash</p>
                    <p>📄 Hisobotlar yaratish</p>
                </div>
            )}

            {/* MENTOR */}
            {user.role === 'MENTOR' && (
                <div>
                    <p>📚 O‘quvchilar ro‘yxati</p>
                    <p>✅ Darslar va davomatlar bilan ishlash</p>
                </div>
            )}

            {/* USER */}
            {user.role === 'USER' && (
                <div>
                    <p>👤 O‘zingizga tegishli kontraktlar</p>
                    <p>📝 Shaxsiy testlar, kurslar</p>
                </div>
            )}
            {(user.role === 'SUPER' || user.role === 'ADMIN') && (
                <>
                    <DashboardStats />
                    <hr />
                </>
            )}
        </div>
    )
}

export default DashboardPage
