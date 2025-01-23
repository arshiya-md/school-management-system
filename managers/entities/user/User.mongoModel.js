const mongoose = require('mongoose');
const { password } = require('../../_common/schema.models');

const UserModel = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { 
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['super-admin', 'school-admin'],
    },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: false },

});

module.exports = mongoose.model('User', UserModel);