import {React,useState} from 'react'
import Navbar from '../Components/Navbar'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import TeacherCard from '../Components/TeacherCard';
function TeacherDisplay() {
  const urlStart = "http://localhost:8000";
  const [totalteacher,settotalteacher]=useState([])
  useEffect( () => {
   fetchTeacher();
  }, [])
  async function fetchTeacher()
  {
    const response = await fetch(`${urlStart}/api/teacher/fetchAllTeacher`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
      },
    });
    let json = await response.json();
    console.log(json);
    settotalteacher(json.TeachersAvailable);
  }
  return (
    <div>
        <Navbar />
        <br/>
        
        <Link to ='/addteacher'><button className='btn btn-danger'>Add Teacher</button></Link>
        <br/>
        <br/>
        <h2> Total Teacher Registered : {totalteacher.length}</h2><br/>
        <div className='d-flex flex-wrap'>
        {totalteacher.map((element)=>
        {
          return(
            <TeacherCard
            uniqueid={element._id}
              name={element.name}
              subject={element.subject}
              phoneNum={element.phoneNum}
              address={element.address}
              classteach={element.classteach}
            />
            // <h1> {element.name}</h1>
          )
        })}
      </div>
    </div>
  )
}

export default TeacherDisplay