const express = require("express");
const router = express.Router();
const Studentuser = require("../Models/StudentsModel");


// Add student to the database
router.post('/addStudent', async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let studentwillingtojoin=await Studentuser.findOne({
        name:req.body.name,
        rollNum:req.body.rollNum,
        fatherName:req.body.fatherName,
        phoneNum:req.body.phoneNum,
        address:req.body.address,
        classstudy:req.body.classstudy
    })
    if(studentwillingtojoin)
    {
        return res.json({
            Message:"Student with Corresponding Data Already Exist"
        })
    }
    
        if(req.body.classstudy<1 || req.body.classstudy>12)
        {
             return res.json({
                DataCreatingProblem:req.body.classstudy,
                Message:"Class should be between 1 to 12"
             })
        }

   let new_student=await Studentuser.create({
    name:req.body.name,
    rollNum:req.body.rollNum,
    fatherName:req.body.fatherName,
    phoneNum:req.body.phoneNum,
    address:req.body.address,
    classstudy:req.body.classstudy
   })
   return res.status(200).json({"progress":"New Student Added","Student Details":new_student})
})


//Fetch All students
router.get('/fetchAllStudent',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let all_student=await Studentuser.find();
    return res.status(200).json({
        StudentAvailable:all_student
    })

})
// Fetch Particular User
router.get('/fetchParticularStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let single_student=await Studentuser.findById(req.params.id);
    if(!single_student)
    {
        return res.json({
            Message:"No Student with Particular id exist"
        })
    }
    return res.status(200).json({
        StudentRequested:single_student
    })

})

// Delete particular student
router.delete('/deleteStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let get_student=await Studentuser.findById(req.params.id);
    if(!get_student)
    {
        return res.json({
            Message:"No Student With this id exists"
        })
    }
    get_student=await Studentuser.findByIdAndDelete(req.params.id);
   return res.status(200).json({Message:"Student Deleted",StudentDetailsDeleted:get_student})
})

//update the teacher details
router.put('/updateStudent/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let get_student = await Studentuser.findById(req.params.id)
    if(!get_student)
    {
        return res.json({
            Message:"No Student With this id exists"
        })
    }
   
        if(req.body.classstudy<1 || req.body.classstudy>12)
        {
             res.json({
                Message:"Class should be between 1 to 12"
             })
        }
    

    if(req.body.name){get_student.name=req.body.name}
    if(req.body.rollNum){get_student.rollNum=req.body.rollNum}
    if(req.body.fatherName){get_student.fatherName=req.body.fatherName}
    if(req.body.phoneNum){get_student.phoneNum=req.body.phoneNum}
    if(req.body.address){get_student.address=req.body.address}
    if(req.body.classstudy){get_student.classstudy=req.body.classstudy}

    await get_student.save();

    get_student = await Studentuser.findById(req.params.id)
    if(!get_student)
    {
        return res.json({
            Message:"No such User Exists"
        })
    }
    return res.status(200).json({Message:"Student Details Updated",Updated_student:get_student})
})


module.exports=router