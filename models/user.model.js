const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let User = new Schema({
    email:
    {
        type: String,
        default: ''
    },
    password:
    {
        type: String,
        default: ''
    },
    isDeleted: 
    {
        type: Boolean,
        default: false
    }
});

User.methods.generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);