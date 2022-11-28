const express = require("express");
const router = express.Router();
const Teacheruser = require("../Models/TeachersModel");
// const { route } = require("./Auth");
// Add teacher to the database
router.post('/addTeacher', async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let teacherwillingtojoin=await Teacheruser.findOne({
        name:req.body.name,
        subject:req.body.subject,
        phoneNum:req.body.phoneNum,
        address:req.body.address,
        classteach:req.body.classteach
    })
    if(teacherwillingtojoin)
    {
        return res.json({
            Message:"Teacher with Corresponding Data Already Exist"
        })
    }
    for(let i=0;i<req.body.classteach.length;i++)
    {
        if(req.body.classteach[i]<1 || req.body.classteach[i]>12)
        {
             return res.json({
                DataCreatingProblem:req.body.classteach[i],
                Message:"Class should be between 1 to 12"
             })
        }
    }
   let new_teacher=await Teacheruser.create({
    name:req.body.name,
    subject:req.body.subject,
    phoneNum:req.body.phoneNum,
    address:req.body.address,
    classteach:req.body.classteach
   })
   return res.status(200).json({"progress":"New Teacher Added","Teacher Details":new_teacher})
})


//Fetch All teacher 
router.get('/fetchAllTeacher',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let all_teacher=await Teacheruser.find();
    return res.status(200).json({
        TeachersAvailable:all_teacher
    })

})
// Fetch Particular User
router.get('/fetchParticularTeacher/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let single_teacher=await Teacheruser.findById(req.params.id);
    if(!single_teacher)
    {
        return res.json({
            Message:"No Teacher with Particular id exist"
        })
    }
    return res.status(200).json({
        TeacherRequested:single_teacher
    })

})

// Delete particular Teacher
router.delete('/deleteTeacher/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let get_teacher=await Teacheruser.findById(req.params.id);
    if(!get_teacher)
    {
        return res.json({
            Message:"No Teacher With this id exists"
        })
    }
    get_teacher=await Teacheruser.findByIdAndDelete(req.params.id);
   return res.status(200).json({Message:"Teacher Deleted",TeacherDetailsDeleted:get_teacher})
})

//update the teacher details
router.put('/updateTeacher/:id',async(req,res)=>
{
    const auth_token=req.header('AUTH_TOKEN');
    if(!auth_token)
    {
        return res.json({
            Message:"No user logged In"
        })
    }
    let get_teacher = await Teacheruser.findById(req.params.id)
    if(!get_teacher)
    {
        return res.json({
            Message:"No Teacher With this id exists"
        })
    }
    for(let i=0;i<req.body.classteach.length;i++)
    {
        if(req.body.classteach[i]<1 || req.body.classteach[i]>12)
        {
             res.json({
                Message:"Class should be between 1 to 12"
             })
        }
    }

    if(req.body.name){get_teacher.name=req.body.name}
    if(req.body.subject){get_teacher.subject=req.body.subject}
    if(req.body.phoneNum){get_teacher.phoneNum=req.body.phoneNum}
    if(req.body.address){get_teacher.address=req.body.address}
    if(req.body.classteach){get_teacher.classteach=req.body.classteach}

    await get_teacher.save();

    get_teacher = await Teacheruser.findById(req.params.id)
    if(!get_teacher)
    {
        return res.json({
            Message:"No such User Exists"
        })
    }
    return res.status(200).json({Message:"Teacher Details Updated",Updated_teacher:get_teacher})
})


module.exports=router