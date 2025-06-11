import { useState, useEffect } from 'react'
import './App.css'
import api from './api'

function App() {

  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filterDate, setFilterDate] = useState('');

  const loadAppointments = async () => {
    const res = await api.get('/appointments');
    setAppointments(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId !== null) {
      await api.put(`/appointments/${editId}`, form);
    } else {
      await api.post('/appointments', form);
    }

    setForm({ title: '', date: '', time: '', description: '' });
    setEditId(null);
    loadAppointments();
  };


  const handleEdit = (appointment) => {
    setForm(appointment);
    setEditId(appointment.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/appointments/${id}`);
    loadAppointments();
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredAppointments = filterDate
    ? appointments.filter(a => a.date === filterDate)
    : appointments;

 useEffect(() => {
    loadAppointments();
  }, []);

  return (

    <div className="container">
      <h1>Agenda Pessoal</h1>
      <form onSubmit={handleSubmit}>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" required />
        <button type="submit">{editId !== null ? 'Atualizar' : 'Adicionar'}</button>

      </form>

      <div>
        {filteredAppointments.map((a) => (
          <div key={a.id} className="appointment">
            <h3>{a.title}</h3>
            <p>{a.date} às {a.time}</p>
            <p>{a.description}</p>
            <button onClick={() => handleEdit(a)}>Editar</button>
            <button onClick={() => handleDelete(a.id)}>Remover</button>
          </div>
        ))}
      </div>

      <div className="filter">
        <label>Filtrar por data: </label>
        <input type="date" value={filterDate} onChange={handleFilterChange} />
        <button onClick={() => setFilterDate('')}>Limpar Filtro</button>
      </div>
    </div>

  )

}

export default App
