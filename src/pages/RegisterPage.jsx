import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    number: '',
    address: '',
    dateOfBirth: '',
    roles: new Set(['USER']) // default
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        roles: Array.from(form.roles) // Set → Array
      }

      await axios.post('http://localhost:8080/api/v1/auth/register', payload)
      alert('Registration successful!')
      navigate('/')
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert('Registration failed')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required /><br /><br />
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required /><br /><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required /><br /><br />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br /><br />
        <input name="number" value={form.number} onChange={handleChange} placeholder="Phone Number" /><br /><br />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" /><br /><br />
        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
