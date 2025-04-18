import { useEffect, useState } from 'react'
import axios from 'axios'

const UserListPage = () => {
  const [users, setUsers] = useState([])
  const [roleFilter, setRoleFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get('http://localhost:8080/api/v1/user', {
        headers: { Authorization: `Bearer ${token}` },
        params: roleFilter ? { roleName: roleFilter } : {}
      })

      console.log('User API response:', response.data)

      if (Array.isArray(response.data.content)) {
        setUsers(response.data.content)
      } else {
        setUsers([])
        console.warn('content is not an array:', response.data)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [roleFilter])

  return (
      <div>
        <h2>User List</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>Filter by Role: </label>
          <select onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">All</option>
            <option value="SUPER">SUPER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANEGER">MANEGER</option>
            <option value="USER">USER</option>
          </select>
        </div>

        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {users.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No users found</td></tr>
          ) : (
              users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.fullName}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button onClick={() => alert('Edit user ' + u.id)}>Edit</button>
                      <button onClick={() => alert('Delete user ' + u.id)}>Delete</button>
                    </td>
                  </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
  )
}

export default UserListPage
