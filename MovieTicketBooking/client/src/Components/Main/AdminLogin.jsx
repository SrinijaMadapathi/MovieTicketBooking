import { useState } from "react";
import Head from "./Head";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function AdminLogin(){
    const navigate = useNavigate("")
    const[userName,setUserName] = useState("")
    const[password,setPassword] = useState("")
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const AdminLoginAction = e =>{
        e.preventDefault();
        let postData = {
            "userName":userName,
            "password":password

        }
     
    axios.post(rest.endPointAdminLogin,postData,header)
    .then(response=>{
        console.log(response.data);
        if(response.data!="Invalid Login Details"){
            Cookies.set("role","admin")
            Cookies.set("token",response.data)
            navigate("/adminHome")
        }
        else{
            alert("Invalid Login Details")
            return
        }
    })
    .catch(err=>{
        console.log(err);
        alert("Invalid Login Details")
        return
    })

        
    }
    return(
        <>
        <div className="admin-pic">
        <Head/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-3"></div>
                <div className="col-md-4 mt-4">
                    <div className="card p-3 mt-5">
                    <div className="text-center p-2 h5"><b>Admin Login</b></div>
                        <div className="text-center">
                           <img src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png" style={{height:"130px",maxWidth:"100%"}}></img>
                        </div>
                        <form onSubmit={AdminLoginAction}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" onChange={e=>setUserName(e.target.value)} className="form-control mt-1" id="userName" placeholder="Enter UserName"></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control mt-1" id="password" placeholder="Enter Password"></input>
                            </div>
                            <div className="">
                                <input type="submit" value={"Login"} className="btn btn-primary mt-3 w-100"></input>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
        </div>
        </>
    )
}
export default AdminLogin;