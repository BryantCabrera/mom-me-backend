const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
    name: { type: String, default: 'Caretaker' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: 'https://i.imgur.com/KbicDVh.jpg' },
    skills: [String],
    experience: String,
    location: Number,
    rate: Number
});

const Caretaker = mongoose.model('Caretaker', caretakerSchema);

module.exports = Caretaker;