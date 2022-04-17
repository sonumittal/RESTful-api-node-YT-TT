const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        uniqe:[true,"Email is already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        },
    },
        phone:{
            type:Number,
            min:10,
        
            required:true,
            uniqe:true,    
        },
        address:{
           type:String,
           required:true, 
        }
})

const Student=new mongoose.model('Student',studentSchema);

module.exports=Student;