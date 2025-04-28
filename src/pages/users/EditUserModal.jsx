import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from "react-toastify";

const EditUserModal = ({ userId, onClose, onUserUpdated }) => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        role: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        axios.get(`http://localhost:8080/api/v1/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const user = res.data
                setForm({
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                })
            })
            .catch(() => setError('Foydalanuvchini olishda xatolik!'))
    }, [userId])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('accessToken')

        try {
            await axios.put(`http://localhost:8080/api/v1/user/${userId}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('Foydalanuvchi yangilandi!')
            onUserUpdated()
            onClose()
        } catch (err) {
            setError('Foydalanuvchini yangilashda xatolik!')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Foydalanuvchini tahrirlash</h3>
                <form onSubmit={handleSubmit}>
                    <input name="fullName" placeholder="F.I.Sh" value={form.fullName} onChange={handleChange} required />
                    <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="USER">USER</option>
                        <option value="MENTOR">MENTOR</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="SUPER">SUPER</option>
                    </select>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Saqlash</button>
                    <button type="button" onClick={onClose}>Bekor qilish</button>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal
