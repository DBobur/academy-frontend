import React, { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify";

const CreateUserModal = ({ onClose, onUserCreated }) => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: 'USER',
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('accessToken')

        try {
            await axios.post('http://localhost:8080/api/v1/auth/register', form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('Yangi foydalanuvchi yaratildi!')
            onUserCreated()
            onClose()
        } catch (err) {
            setError('Foydalanuvchini yaratishda xatolik!')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Yangi foydalanuvchi</h3>
                <form onSubmit={handleSubmit}>
                    <input name="fullName" placeholder="F.I.Sh" onChange={handleChange} required />
                    <input name="username" placeholder="Username" onChange={handleChange} required />
                    <input name="email" placeholder="Email" onChange={handleChange} required />
                    <input name="password" placeholder="Parol" type="password" onChange={handleChange} required />
                    <select name="role" onChange={handleChange}>
                        <option value="USER">USER</option>
                        <option value="MENTOR">MENTOR</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="SUPER">SUPER</option>
                    </select>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Yaratish</button>
                    <button type="button" onClick={onClose}>Bekor qilish</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUserModal
