import React,{useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTeacher() {
    const urlStart = "http://localhost:8000";
    const [name, setname] = useState("")
    const [subject, setsubject] = useState("")
    const [phoneNum, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const [classteach,setclassteach]=useState([])
    const[refresh, setrefresh]=useState(false);
    const [number, setNumber] = useState("");
    const navigate = useNavigate();
    function pressEnter(e)
       {
        if (e.charCode === 13) {
            console.log("hello");
            for (var i = 0; i < classteach.length; i++) {
              if (classteach[i] === number) {
                return;
              }
            }
            if (number < 1 || number > 12) {
              toast.error("Class Should be between 1 and 12", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }
            setclassteach((temp) => [...temp, number]);
            setNumber("");
            console.log(classteach);
          }
       }
    async function registerteacher()
    {
        if(!name || !subject || !phoneNum || !address || !classteach )
       {
        toast.error(
            'Please enter valid fields', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }
        )
        return;
       }
       if(phoneNum<1000000000 || phoneNum>9999999999)
       {
        toast.error(
            'Please enter valid phone Number', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }
        )
        return;
       }
       
    
        try {
             // http://localhost:8000/api/teacher/fetchParticularTeacher/6383a38355586fba4df1059f
       const response = await fetch(`${urlStart}/api/teacher/addTeacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
        },
        body: JSON.stringify({ name,subject,address,phoneNum,classteach }),
      });
      console.log(response.json)
    //   window.location.href='/teacher'
    
    navigate('/teacher');
            
        } catch (error) {
            toast.error("Error Occured Invalid Credentials", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            
        }
       
    // <Navigate to='/teacher'/>
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
        <p>Subject: <input type="text" value={subject} onChange={(e)=>
        {
                let demo=e.target.value;
                setsubject(demo);
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
        <p>classTeach : <input type="text" value={number} 
        onKeyPress={pressEnter}
        onChange={(e)=>
            {
                    let demo=e.target.value;
                    setNumber(demo);
            }}/></p>
            {classteach.map((element)=>
            {
                return(
                    <span onClick={()=>
                    {
                        let temparray=[];
                        for(let i=0;i<classteach.length;i++)
                        {
                            if(classteach[i]!=element)
                            {
                                temparray.push(classteach[i])
                            }
                        }
                        setclassteach(temparray);
                    }}>{element}, </span>
                )
            })}
    </div>
    <div class="modal-footer">
        <Link to='/teacher'><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></Link>
        <button type="button" class="btn btn-primary" onClick={registerteacher} >Add Teacher</button>
    </div>
</div>
  )
}

export default AddTeacher