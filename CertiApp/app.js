const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sample = require('./Models/certidetails.js');
const path = require('path');

dotenv.config();


mongoose.connect('mongodb://localhost:27017/Certi');

const database = mongoose.connection;
database.on('error', (error) => {
    console.log('error', error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});

app.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const result = await sample.create(data);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const details = await sample.create(data);
        res.status(201).redirect('/submitted');
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

app.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const details = await sample.findOne({ certificateid: id });
        console.log('certificate', details);
        res.json(details);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmitted.html'));
});

app.get('/certificate', (req, res) => {
    res.json(certificates);
});

app.get('/certificate/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.get('/api/certificate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const details = await sample.findOne({ certificateid: id });
        console.log(details);
        res.json(details);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

module.exports = app;
