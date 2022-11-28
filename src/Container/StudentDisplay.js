import {React,useEffect, useState} from 'react'
import StudentCard from '../Components/StudentCard';
import {Link} from 'react-router-dom'
import Navbar from '../Components/Navbar'
function StudentDisplay() {
  const urlStart = "http://localhost:8000";
  const [totalstudent,settotalstudent]=useState([])
  let [iteration,setiteration]=useState(0);
  
  useEffect( () => {
   fetchStudent();
  }, [])
  useEffect( () => {
    fetchStudent();
   }, [totalstudent.length])
  
  async function fetchStudent()
  {
    const response = await fetch(`${urlStart}/api/student/fetchAllStudent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
      },
    });
    let json = await response.json();
    console.log(json);
    settotalstudent(json.StudentAvailable);
    console.log(totalstudent);
  }
  return (
    <div>
      
        <Navbar/>
        <br/>
        <Link to ='/addstudent'><button className='btn btn-danger'>Add Student</button></Link>
        <br/>
        <br/>
        <h2> Total Student Registered : {totalstudent.length}</h2>
        <br/>
        <div className='d-flex  flex-wrap'>
        {totalstudent.map((element,key)=>
        {
         
          return(
            <StudentCard
            index={element._id}
            name={element.name}
            fatherName={element.fatherName}
            rollNum={element.rollNum}
            phoneNum={element.phoneNum}
            address={element.address}
            classstudy={element.classstudy}
            />
            
          )
        })}
        
        {/* {console.log(totalstudent[iteration+1]._id)}
         <StudentCard
            index={totalstudent[iteration]._id}
            name={totalstudent[iteration].name}
            fatherName={totalstudent[iteration].fatherName}
            rollNum={totalstudent[iteration].rollNum}
            phoneNum={totalstudent[iteration].phoneNum}
            address={totalstudent[iteration].address}
            classstudy={totalstudent[iteration].classstudy}
            /> */}
      </div>
    </div>
  )
}

export default StudentDisplay