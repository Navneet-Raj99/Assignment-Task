const mongoose =require('mongoose');
const {Schema} = mongoose; // Taking Only Schema of Mongoose by destructuring

const TeacherSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    phoneNum :{
        type: Number,
        required: true,
        min:1000000000,
        max:9999999999
    },
    address:{
        type: String,
        required: true
    },
    classteach:{
        type:Array,
        required: true
    }

});

module.exports=mongoose.model('Teachers',TeacherSchema);