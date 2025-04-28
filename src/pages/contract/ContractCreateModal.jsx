import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ContractCreateModal = ({ userId, onClose, onContractCreated }) => {
    const [form, setForm] = useState({
        userId: userId,
        contractTy: 'WORK',
        status: 'ACTIVE',
        startDate: '',
        endDate: '',
        contractDetails: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('accessToken')

        try {
            await axios.post('http://localhost:8080/api/v1/contracts', form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('Kontrakt muvaffaqiyatli qo‘shildi!')
            onContractCreated()
            onClose()
        } catch (err) {
            setError('Kontraktni yaratishda xatolik!')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Yangi Kontrakt</h3>
                <form onSubmit={handleSubmit}>
                    <select name="contractTy" value={form.contractTy} onChange={handleChange}>
                        <option value="WORK">ISH</option>
                        <option value="STUDY">O‘QISH</option>
                        <option value="INTERNSHIP">AMALIYOT</option>
                    </select>

                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="EXPIRED">EXPIRED</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                    </select>

                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />

                    <textarea
                        name="contractDetails"
                        placeholder="Qo‘shimcha ma’lumot"
                        value={form.contractDetails}
                        onChange={handleChange}
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Saqlash</button>
                    <button type="button" onClick={onClose}>Bekor qilish</button>
                </form>
            </div>
        </div>
    )
}

export default ContractCreateModal
