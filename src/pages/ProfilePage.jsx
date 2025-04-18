import { useEffect, useState } from 'react'
import axios from 'axios'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    axios.get('http://localhost:8080/api/v1/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data)
      setForm(res.data)
    }).catch(err => {
      console.error('Failed to fetch user info:', err)
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.put('http://localhost:8080/api/v1/user/update', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Profile updated!')
      setUser(form)
      setEditMode(false)
    } catch (err) {
      alert('Update failed')
      console.error(err)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label><strong>Full Name:</strong></label><br />
        {editMode ? (
          <input name="fullName" value={form.fullName} onChange={handleChange} />
        ) : (
          <p>{user.fullName}</p>
        )}
        <br />
        <label><strong>Email:</strong></label><br />
        {editMode ? (
          <input name="email" value={form.email} onChange={handleChange} />
        ) : (
          <p>{user.email}</p>
        )}
        <br />
        <label><strong>Phone Number:</strong></label><br />
        {editMode ? (
          <input name="number" value={form.number || ''} onChange={handleChange} />
        ) : (
          <p>{user.number || '–'}</p>
        )}
        <br /><br />
        {editMode ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
