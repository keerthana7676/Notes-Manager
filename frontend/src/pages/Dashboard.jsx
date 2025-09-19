import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { getToken, clearToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { setAuthHeader } from '../utils/api';
import Header from '../components/Header.jsx';

export default function Dashboard(){
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);
  const [error,setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = getToken();
    if (!t) return navigate('/login');
    setAuthHeader(t);
    fetchNotes();
  }, []);

  async function fetchNotes(){
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createOrUpdate(e){
    e.preventDefault();
    try {
      setError('');
      if (editing) {
        const res = await API.put(`/notes/${editing._id}`, { title, description });
        setNotes(notes.map(n => n._id === res.data._id ? res.data : n));
        setEditing(null);
      } else {
        const res = await API.post('/notes', { title, description });
        setNotes([res.data, ...notes]);
      }
      setTitle(''); setDescription('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed');
    }
  }

  function startEdit(note){
    setEditing(note);
    setTitle(note.title);
    setDescription(note.description);
  }

 const removeNote = async (id) => {
  const confirmDelete = window.confirm("This note will be deleted and cannot be recovered!!!");
  if (!confirmDelete) return;

  try {
    await API.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to delete note");
  }
};


  function logout(){
    clearToken();
    setAuthHeader(null);
    navigate('/login');
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <header>
          <h2>Your Notes</h2>
          <button onClick={logout}>Logout</button>
        </header>

        <form onSubmit={createOrUpdate} className="note-form">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
          <button type="submit">{editing ? 'Update' : 'Add'} Note</button>
          {editing && <button type="button" onClick={()=>{setEditing(null); setTitle(''); setDescription('');}}>Cancel</button>}
          {error && <div className="error">{error}</div>}
        </form>

        <ul className="notes-list">
          {notes.length === 0 && <li>No notes yet.</li>}
          {notes.map(note => (
            <li key={note._id}>
              <strong>{note.title}</strong>
              <p>{note.description}</p>
              <div className="actions">
                <button onClick={()=>startEdit(note)}>Edit</button>
                <button onClick={()=>removeNote(note._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}