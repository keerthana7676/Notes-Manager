import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { getToken } from "../utils/auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchNotes();
  }, []);

  const fetchUsers = async () => {
    try {
      setError("");
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users");
    }
  };

  const fetchNotes = async () => {
    try {
      setError("");
      const res = await API.get("/admin/notes", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setNotes(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch notes");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/admin/notes/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}

      <h3>Registered Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name || "No Name"} – {u.email} {u.isAdmin && "(Admin)"}
          </li>
        ))}
      </ul>

      <h3>All Notes</h3>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            <strong>{n.title}</strong> – {n.description}  
            <br />
            <small>by {n.user?.email || "Unknown"}</small>
            <button onClick={() => deleteNote(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
