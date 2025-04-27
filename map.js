// Configuração do Mapa Leaflet
const map = L.map('map').setView([-15.788, -47.879], 4); // Centro no Brasil

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Marcadores de exemplo (pode ser substituído por dados do banco)
L.marker([-23.550, -46.633]).addTo(map)
    .bindPopup("São Paulo - Água com cloro elevado")
    .openPopup();

    // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/aquacheck', { useNewUrlParser: true });

// Modelo de Relatório
const Report = mongoose.model('Report', {
    location: String,
    waterQuality: String,
    description: String,
    date: { type: Date, default: Date.now }
});

// Rota para enviar relatórios
app.post('/api/reports', async (req, res) => {
    const report = new Report(req.body);
    await report.save();
    res.send(report);
});

// Rota para buscar relatórios
app.get('/api/reports', async (req, res) => {
    const reports = await Report.find();
    res.send(reports);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));