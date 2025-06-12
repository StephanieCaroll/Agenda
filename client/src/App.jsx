import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });
  const [editId, setEditId] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (date = '') => {
    try {
      const res = await axios.get('http://localhost:3001/appointments', {
        params: date ? { date } : {}
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3001/appointments/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3001/appointments', form);
      }
      setForm({ title: '', date: '', time: '', description: '' });
      fetchAppointments(filterDate);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    }
  };

 const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/appointments/${id}`);
      fetchAppointments(filterDate);
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

 const handleFilterChange = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    fetchAppointments(date);
  };

  
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

      <div className="filter">
        <label>Filtrar por data: </label>
        <input type="date" value={filterDate} onChange={handleFilterChange} />
        <button onClick={() => {
          setFilterDate('');
          fetchAppointments('');
        }}>Limpar Filtro</button>
      </div>

      <div>
        {appointments.map((a) => (
          <div key={a.id} className="appointment">
            <h3>{a.title}</h3>
            <p>{a.date} às {a.time}</p>
            <p>{a.description}</p>
            <button onClick={() => handleEdit(a)}>Editar</button>
            <button onClick={() => handleDelete(a.id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;