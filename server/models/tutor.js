const mongoose = require('mongoose')

const tutorSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        bio:{
            type: String,
            required: true,
        },
        major:{
            type: String,
            required: true,
        },
        totalTutoringHours: {
            type: String,
            required: true,
        },
        pastTutoringCourses: {
            type: Array
        }
    },
);

module.exports = mongoose.model('tutor', tutorSchema)
