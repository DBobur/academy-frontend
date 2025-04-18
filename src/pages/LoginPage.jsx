import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username,
        password
      })

      const token = res.data
      localStorage.setItem('accessToken', token)

      alert('Login successful!')
      navigate('/dashboard') // keyingi sahifaga o‘tish
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'))
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )
}

export default LoginPage
