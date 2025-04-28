import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CreateUserModal from '../users/CreateUserModal'
import EditUserModal from '../users/EditUserModal'
import DeleteUserModal from '../users/DeleteUserModal'

const UserListPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editUserId, setEditUserId] = useState(null)
    const [deleteUserId, setDeleteUserId] = useState(null)

    const fetchUsers = () => {
        const token = localStorage.getItem('accessToken')
        axios.get('http://localhost:8080/api/v1/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUsers(response.data.content || response.data)
                setError(null)
            })
            .catch(() => setError('Foydalanuvchilarni olishda xatolik!'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <p>Yuklanmoqda...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Foydalanuvchilar ro‘yxati</h2>
                <button onClick={() => setShowCreateModal(true)}>➕ Yangi foydalanuvchi</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                    <th>#</th>
                    <th>F.I.Sh</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Amallar</th>
                </tr>
                </thead>
                <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>Foydalanuvchi topilmadi.</td>
                    </tr>
                ) : (
                    users.map((u, index) => (
                        <tr key={u.id}>
                            <td>{index + 1}</td>
                            <td>{u.fullName}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <Link to={`/users/${u.id}/view`}>
                                    <button style={{ marginRight: '5px' }}>Ko‘rish</button>
                                </Link>
                                <button
                                    onClick={() => setEditUserId(u.id)}
                                    style={{ marginRight: '5px' }}>
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => setDeleteUserId(u.id)}
                                    style={{ backgroundColor: 'tomato', color: 'white' }}>
                                    O‘chirish
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* MODALS */}
            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onUserCreated={fetchUsers}
                />
            )}

            {editUserId && (
                <EditUserModal
                    userId={editUserId}
                    onClose={() => setEditUserId(null)}
                    onUserUpdated={fetchUsers}
                />
            )}

            {deleteUserId && (
                <DeleteUserModal
                    userId={deleteUserId}
                    onClose={() => setDeleteUserId(null)}
                    onUserDeleted={fetchUsers}
                />
            )}
        </div>
    )
}

export default UserListPage
