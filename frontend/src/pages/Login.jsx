import React, { useState } from 'react';
import API from '../utils/api';
import { saveToken } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthHeader } from '../utils/api';
import Header from '../components/Header.jsx';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await API.post('/auth/login', { email, password });
      saveToken(res.data.token);
      setAuthHeader(res.data.token);
      navigate('/notes');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
        <p>No account? <Link to="/register">Register</Link></p>
      </div>
    </>
  );
}