import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ContractEditModal = ({ contractId, onClose, onContractUpdated }) => {
    const [form, setForm] = useState({
        contractTy: '',
        status: '',
        startDate: '',
        endDate: '',
        contractDetails: '',
    })

    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        axios.get(`http://localhost:8080/api/v1/contracts/${contractId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setForm(res.data))
            .catch(() => setError('Kontrakt ma’lumotlarini olishda xatolik!'))
    }, [contractId])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('accessToken')

        try {
            await axios.put(`http://localhost:8080/api/v1/contracts/${contractId}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('Kontrakt yangilandi!')
            onContractUpdated()
            onClose()
        } catch (err) {
            setError('Kontraktni yangilashda xatolik!')
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Kontraktni Tahrirlash</h3>
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

export default ContractEditModal
