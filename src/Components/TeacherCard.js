import React, { useState,useEffect } from 'react'
import { Link, Navigate } from "react-router-dom";
// import TeacherIndivisual from '../Container/TeacherIndivisual';
function TeacherCard(props) {
    const urlStart = "http://localhost:8000";
    // const [modaldisplay, setmodaldisplay] = useState(false)


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
    //   settotalstudent(json.StudentAvailable);
    }

    // let json;
    const[flow,setflow]=useState(false);
   
    return (
        <div class="card" style={{ "width": "18rem" }}>
            {/* <img src="" class="card-img-top" alt="..."/> */}
            <div class="card-body">
                <h5 class="card-title">{props.name}</h5>
                <p class="card-text">Subject: {props.subject}</p>
                <p class="card-text">Phone No.: {props.phoneNum}</p>
                <p class="card-text">Address: {props.address}</p>
                <p class="card-text">classTeach: [
                    {props.classteach.map((element) => {
                        return (
                            <span> {element}</span>)
                    })}
                    ]
                </p>
                <Link to={`/particularteacher/${props.uniqueid}`}><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Update
                </button>

                </Link>
                <button class="btn btn-danger mx-5" onClick={async ()=>
                {
                    alert("Do you want to permanently delete this Teacher ?")
                    const response = await fetch(`${urlStart}/api/teacher/deleteTeacher/${props.uniqueid}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
                        },
                      });
                      window.location.href='/teacher';
                    //   alert("Successfully Deleted");
                    // return <Navigate to='/teacher'/>
                    // fetchStudent();

                }}>Delete</button>
               

            </div>
        </div>
    )
}

export default TeacherCard