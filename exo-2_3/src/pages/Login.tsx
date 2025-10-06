import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        login(data.token)
        navigate('/tasks')
      } else {
        setError('Email ou mot de passe incorrect')
      }
    } catch (err) {
      setError('Erreur de connexion')
    }
  }

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
          />
        </div>
        
        <div>
          <label>Mot de passe:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        
        <button type="submit">Se connecter</button>
      </form>
      
      <p>Test: student@example.com / password</p>
    </div>
  )
}
