const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creating a schema (the structure)
const userSchema = new schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    }
);

//creating the model
const UserDetail = mongoose.model('User-Detail', userSchema);

//exporting the module
module.exports = UserDetail;