const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Appointment = require('./models/Appointment.js');
const appointmentRoutes = require('./routes/appointments.route.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/appointments', appointmentRoutes);

const PORT = 3001;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
