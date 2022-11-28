const mongoose =require('mongoose');
const {Schema} = mongoose; // Taking Only Schema of Mongoose by destructuring

const StudentSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    rollNum:{
        type: Number,
        required: true
    },
    fatherName:{
        type: String,
        required: true
    },
    phoneNum :{
        type: String,
        required: true,
        min:1000000000,
        max:9999999999
    },
    address:{
        type: String,
        required:true
    },
    classstudy:{
        type:Number,
        required:true
    }

});

module.exports=mongoose.model('Students',StudentSchema);