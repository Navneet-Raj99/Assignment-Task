import React from 'react'
import { Link, Navigate } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
function StudentCard(props) {
  const urlStart = "http://localhost:8000";
  // const navigate = useNavigate();
    return (
        <div class="card" style={{"width": "18rem"}}>
        {/* <img src="" class="card-img-top" alt="..."/> */}
        <div class="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p class="card-title">Father's Name: {props.fatherName}</p>
        <p class="card-text">Roll No.: {props.rollNum}</p>
        <p class="card-text">Phone No.: {props.phoneNum}</p>
        <p class="card-text">Address: {props.address}</p>
        <p class="card-text">Class Study: {props.classstudy}</p>
          <Link to={`/particularstudent/${props.index}`}><button class="btn btn-primary">Update</button></Link>
          <button class="btn btn-danger mx-5"  onClick={async ()=>
                {
                    alert("Do you want to permanently delete this Teacher ?")
                    const response = await fetch(`${urlStart}/api/student/deleteStudent/${props.index}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
                        },
                      });
                    //   alert("Successfully Deleted");
                    window.location.href='/student';
                    // navigate('/student');

                }}>Delete</button>
        </div>
      </div>
      )
}

export default StudentCard