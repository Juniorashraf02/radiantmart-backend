const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "first name is required"],
        validate: {
            validator: function (name){
                return name.length>=3 && name.length<=8
            },
            message: "first name must have 3 letters and less than 8 letters"
        },
        index:true,
    },
    lastName:{
        type:String,
        required:[true, "last name is required"],
        validate: {
            validator: function (name){
                return name.length>=3 && name.length<=8
            },
            message: "last name must have 3 letters and less than 8 letters"
        },
        index:true,
    },
    
    email:{
        type:String,
        required:[true, "email is required"],
        validate:{
            validator: function (email){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: (props)=> `${props.email} is not valid email!`
        },
        unique:true,
    },
    mobile:{
        type: String,
        required:[true, "mobile number is required"],
        validate: {
            validator: function (mobile){
                return mobile.length>=10 
            },
            message: "must be atleast 11 digit"
        },
        unique:true,
    },
    password:{
        type:String,
        required:[true, "password is required"],
        validate: {
            validator: function (password){
                return password.length>=5
            },
            message: "password must be atleast 5 letters!"
        },
        unique: true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);