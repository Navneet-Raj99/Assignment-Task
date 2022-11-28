// import React from 'react'
import React,{useEffect,useState} from 'react'
import { useParams, Link } from "react-router-dom";
function StudentIndivisual() {
    const { id } = useParams();
    const urlStart = "http://localhost:8000";
    const [name, setname] = useState("")
    const [fatherName,setfathername]=useState("");
    const [phoneNum, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const [classstudy,setclassstudy]=useState("")
    useEffect(() => {
        bringparticularStudentdata(id)
       }, [])
       let json;
       async function ParticularStudentDataChange()
       {
          // http://localhost:8000/api/teacher/fetchParticularTeacher/6383a38355586fba4df1059f
          const response = await fetch(`${urlStart}/api/student/updateStudent/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
            },
            body: JSON.stringify({ name,fatherName,address,phoneNum,classstudy }),
          });
          window.location.href='/student'
       }
       async function bringparticularStudentdata(id)
       {
           // http://localhost:8000/api/teacher/fetchParticularTeacher/6383a38355586fba4df1059f
           const response = await fetch(`${urlStart}/api/student/fetchParticularStudent/${id}`, {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
                 "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
               },
             });
             json = await response.json();
             console.log(json.StudentRequested);
             setname(json.StudentRequested.name)
             setfathername(json.StudentRequested.fatherName)
             setaddress(json.StudentRequested.address);
             setphoneNum(json.StudentRequested.phoneNum);
            //  setsubject(json.TeacherRequested.subject)
             setclassstudy(json.StudentRequested.classstudy)
       }
  return (
    <div id="exampleModal" tabindex="-1" aria-hidden="true">
    <h1> Dashboard</h1>
    <div class="modal-body">
        <p>Name: <input type="text" value={name} onChange={(e)=>
        {
                let demo=e.target.value;
                setname(demo);
        }}/></p>
        <p>fatherName: <input type="text" value={fatherName} onChange={(e)=>
        {
                let demo=e.target.value;
                setfathername(demo);
        }}  /></p>
        <p>Phone Num. : <input type="text" value={phoneNum} onChange={(e)=>
        {
                let demo=e.target.value;
                setphoneNum(demo);
        }} /></p>
        <p>Address : <input type="text" value={address} onChange={(e)=>
        {
                let demo=e.target.value;
                setaddress(demo);
        }}/></p>
        <p>classstudy : <input type="text" value={classstudy} 
        onChange={(e)=>
            {
                    let demo=e.target.value;
                    setclassstudy(demo);
            }}/></p>
    </div>
    <div class="modal-footer">
        <Link to='/student'><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></Link>
        <button type="button" class="btn btn-primary" onClick={ParticularStudentDataChange}>Save changes</button>
    </div>
</div>
  )
}

export default StudentIndivisual