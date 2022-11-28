import React,{useEffect,useState} from 'react'
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
function TeacherIndivisual() {
    const { id } = useParams();
    const urlStart = "http://localhost:8000";
    const [name, setname] = useState("")
    const [subject, setsubject] = useState("")
    const [phoneNum, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const [classteach,setclassteach]=useState([])
    const[number,setnumber]=useState('');
    useEffect(() => {
     bringparticularTeacherdata(id)
    }, [])
    let json;
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
         setnumber("");
         console.log(classteach);
       }
    }
    async function ParticularTeacherDataChange()
    {
       // http://localhost:8000/api/teacher/fetchParticularTeacher/6383a38355586fba4df1059f
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
       for(var i=0;i<classteach.length;i++)
       {console.log(classteach[i])
        if((classteach[i]<1 || classteach[i]>12) &&classteach[i]!=','){
            // console.log(classteach[i]);
            toast.error(
                'Please enter valid Class', {
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
       }
       try{
        const response = await fetch(`${urlStart}/api/teacher/updateTeacher/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
            },
            body: JSON.stringify({ name,subject,address,phoneNum,classteach }),
          });
          window.location.href='/teacher'
       }catch(err){
        toast.error('Please enter valid fields', {
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
    }

    async function bringparticularTeacherdata(id)
    {
        // http://localhost:8000/api/teacher/fetchParticularTeacher/6383a38355586fba4df1059f
        const response = await fetch(`${urlStart}/api/teacher/fetchParticularTeacher/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
            },
          });
          json = await response.json();
          console.log(json.TeacherRequested);
          setname(json.TeacherRequested.name)
          setaddress(json.TeacherRequested.address);
          setphoneNum(json.TeacherRequested.phoneNum);
          setsubject(json.TeacherRequested.subject)
          setclassteach(json.TeacherRequested.classteach)
    }
  return (
    // <h1> hello</h1>
    <div id="exampleModal" tabindex="-1" aria-hidden="true">
        <ToastContainer/>
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
                            setnumber(demo);
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
                <button type="button" class="btn btn-primary" onClick={ParticularTeacherDataChange} >Save changes</button>
            </div>
        </div>
//     </div>
// </div>
  )
}

export default TeacherIndivisual