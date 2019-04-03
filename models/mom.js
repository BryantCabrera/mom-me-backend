const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    name: String,
    age: Number,
    allergies: String,
    bed_time: String
});

const momSchema = new mongoose.Schema({
    name: { type: String, default: 'Parent' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: 'https://i.imgur.com/KbicDVh.jpg' },
    children: [childSchema],
    sex: String,
    location: Number,
    caretakers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Caretaker'}]
});

const Mom = mongoose.model('Mom', momSchema);

module.exports = Mom;