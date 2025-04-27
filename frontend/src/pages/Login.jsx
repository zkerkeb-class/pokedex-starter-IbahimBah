import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.log(err)
      alert('Identifiants incorrects');
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f4f4f4'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minWidth: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;

