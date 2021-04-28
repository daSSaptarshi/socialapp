const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name :
        {
            type : String,
            required : true
        },
        email:
        {
            type : String,
            required : true
        },
        phone :
        {
            type : String
        },
        password : 
        {
            type : String,
            required : true
        },
        role : 
        {
            type : String,
            default : 'user'
        }

    }
)

module.exports = mongoose.model('User', UserSchema)