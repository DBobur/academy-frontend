import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ContractDeleteModal = ({ contractId, onClose, onContractDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        setLoading(true)
        const token = localStorage.getItem('accessToken')

        try {
            await axios.delete(`http://localhost:8080/api/v1/contracts/${contractId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success('Kontrakt o‘chirildi!')
            onContractDeleted()
            onClose()
        } catch (err) {
            setError('Kontraktni o‘chirishda xatolik!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Kontraktni o‘chirish</h3>
                <p>Siz rostdan ham bu kontraktni o‘chirmoqchimisiz?</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        style={{ backgroundColor: 'tomato', color: 'white' }}
                    >
                        {loading ? 'O‘chirilmoqda...' : 'Ha, o‘chirish'}
                    </button>
                    <button onClick={onClose}>Bekor qilish</button>
                </div>
            </div>
        </div>
    )
}

export default ContractDeleteModal
