import {React,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
function Navbar() {
    const urlStart = "http://localhost:8000";
    // useEffect(() => {
    //     fetchUserName();
    // }, [])
    // async function fetchUserName()
    // {
    //     const response = await fetch(`${urlStart}/api/auth/checkuser`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         // body: JSON.stringify({ email, password }),
    //       });
    //       let json = await response.json();
    //     //   personname=json.Name
    //       console.log(json.Name);
    // }
    
    let location = useLocation();
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand">Assignment</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active me-4" aria-current="page"></a>
                        </li>
                    </ul>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            {!localStorage.getItem('AUTH_TOKEN') && <>
                            
                                <Link to='/login'><button type="button" class="btn btn-primary me-2">Login</button> </Link>
                                <Link to='/signup'><button type="button" class="btn btn-secondary me-2">Signup</button> </Link>
                            </>}

                            {localStorage.getItem('AUTH_TOKEN') &&
                            <>
                            {location.pathname == "/teacher" && <Link to='/student'><button type="button" class="btn btn-success me-2">Student</button> </Link>}
                            {location.pathname=='/student' &&<Link to='/teacher'><button type="button" class="btn btn-success me-2">Teacher</button> </Link>}
                            
                             <button type="button" class="btn btn-danger me-2" onClick={()=>
                            {
                                localStorage.removeItem('AUTH_TOKEN');
                                window.location.href = "/login";
                            }}>Logout</button>
                            </>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar