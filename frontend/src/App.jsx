import { useEffect, useState } from 'react';
import './App.css'; // This connects your new design!

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [error, setError] = useState(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/guestbook');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ name: '', message: '' });
      fetchEntries();
    } catch (err) {
      setError('Failed to submit entry.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/guestbook/${id}`, { method: 'DELETE' });
      fetchEntries();
    } catch (err) {
      setError('Failed to delete entry.');
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div className="container">
      <h1 className="title">Guestbook</h1>
      
      {error && <div className="error-msg">Error: {error}</div>}

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input 
          className="input-field"
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <textarea 
          className="input-field textarea-field"
          placeholder="Write your message here..." 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          required 
        />
        <button className="btn-submit" type="submit">Post Entry</button>
      </form>
      
      <h2 className="entries-title">Recent Signatures</h2>
      
      <div>
        {entries.map((e) => (
          <div className="entry-card" key={e.id || e.name}>
            <div className="entry-content">
              <h3 className="entry-name">{e.name}</h3>
              <p className="entry-message">{e.message}</p>
            </div>
            {/* The Delete button is now styled and placed neatly on the right */}
            <button className="btn-delete" onClick={() => handleDelete(e.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;