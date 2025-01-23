const mongoose = require('mongoose');

const SchoolModel = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    adminId: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('School', SchoolModel);