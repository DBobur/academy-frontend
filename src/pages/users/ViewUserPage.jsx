import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import ContractCreateModal from '../contract/ContractCreateModal'
import ContractEditModal from '../contract/ContractEditModal'
import ContractDeleteModal from '../contract/ContractDeleteModal'

const ViewUserPage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [contracts, setContracts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editContractId, setEditContractId] = useState(null)
    const [deleteContractId, setDeleteContractId] = useState(null)

    const fetchContracts = () => {
        const token = localStorage.getItem('accessToken')
        axios.get(`http://localhost:8080/api/v1/contracts/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setContracts(res.data))
            .catch(() => toast.error('Kontraktlarni olishda xatolik!'))
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        axios.get(`http://localhost:8080/api/v1/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUser(res.data))
            .catch(() => setError('Foydalanuvchini olishda xatolik!'))

        fetchContracts()
        setLoading(false)
    }, [id])

    if (loading || !user) return <p>Yuklanmoqda...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h2>{user.fullName} - Profil</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Kontraktlar</h3>
                <button onClick={() => setShowCreateModal(true)}>➕ Kontrakt qo‘shish</button>
            </div>

            {contracts.length === 0 ? (
                <p>Hali kontrakt mavjud emas.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Boshlanish</th>
                        <th>Tugash</th>
                        <th>Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contracts.map(contract => (
                        <tr key={contract.id}>
                            <td>{contract.contractTy}</td>
                            <td>{contract.status}</td>
                            <td>{contract.startDate}</td>
                            <td>{contract.endDate}</td>
                            <td>
                                <button
                                    onClick={() => setEditContractId(contract.id)}
                                    style={{ marginRight: '5px' }}
                                >
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => setDeleteContractId(contract.id)}
                                    style={{ backgroundColor: 'tomato', color: 'white' }}
                                >
                                    O‘chirish
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* MODALLAR */}
            {showCreateModal && (
                <ContractCreateModal
                    userId={user.id}
                    onClose={() => setShowCreateModal(false)}
                    onContractCreated={fetchContracts}
                />
            )}

            {editContractId && (
                <ContractEditModal
                    contractId={editContractId}
                    onClose={() => setEditContractId(null)}
                    onContractUpdated={fetchContracts}
                />
            )}

            {deleteContractId && (
                <ContractDeleteModal
                    contractId={deleteContractId}
                    onClose={() => setDeleteContractId(null)}
                    onContractDeleted={fetchContracts}
                />
            )}
        </div>
    )
}

export default ViewUserPage
