import React,{useEffect,useState} from 'react'
import { useParams, Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from "react-router-dom";
function AddStudent() {
    const urlStart = "http://localhost:8000";
    const [name, setname] = useState("")
    const [fatherName,setfathername]=useState("");
    const [phoneNum, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const[rollNum, setrollNum]=useState('');
    const [classstudy,setclassstudy]=useState("")
    const navigate = useNavigate();
    async function registerstudent()
    {
        if(!name || !fatherName || !phoneNum || !address || !rollNum || !classstudy)
        {
            toast.error('Please fill the form', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
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
        try{
            const response = await fetch(`${urlStart}/api/student/addStudent`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
                },
                body: JSON.stringify({ name,fatherName,address,phoneNum,classstudy,rollNum }),
              });
            //   window.location.href='/student'
            navigate('/student');
        }catch(err){
            toast.error('Error while fetching', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }
    }
  return (
    <div id="exampleModal" tabindex="-1" aria-hidden="true">
    <ToastContainer/>
    <h1> Dashboard</h1>
    <div class="modal-body">
        <p>Name: <input type="text" value={name} onChange={(e)=>
        {
                let demo=e.target.value;
                setname(demo);
        }}/></p>
         <p>Roll Num: <input type="text" value={rollNum} onChange={(e)=>
        {
                let demo=e.target.value;
                setrollNum(demo);
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
        <button type="button" class="btn btn-primary" onClick={registerstudent}>Add Student</button>
    </div>
</div>
  )
}

export default AddStudent