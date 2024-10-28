import { useState } from "react";
import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function TheaterOwnerLogin(){
    const[email,setUserName] = useState([])
    const[password,setPassword] = useState([])
    const navigate = useNavigate("")
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const TheaterOwnerLoginAction = e =>{
        e.preventDefault();
        let posData = {
            "userName":email,
            "password":password
        }
        axios.post(rest.endPointTheatreOwnerLogin,posData,header).then(response=>{
            console.log(response.data);
            if(response.data==='Invalid Login Details'){
                alert("Invalid Login Details")
                return
            }else{
                Cookies.set("token",response.data)
                Cookies.set("role","theatreOwner")
                navigate("/theatreOwnerHome")
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
                    <div className="text-center p-2 h5"><b>TheatreOwner Login</b></div>
                        <div className="text-center">
                           <img src="https://cdn-icons-png.flaticon.com/512/708/708883.png" style={{height:"130px",maxWidth:"100%"}}></img>
                        </div>
                        <form onSubmit={TheaterOwnerLoginAction}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" onChange={e=>setUserName(e.target.value)} className="form-control mt-1" id="email" placeholder="Enter Email"></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control mt-1" id="password" placeholder="Enter Password"></input>
                            </div>
                            <div className="">
                                <input type="submit" value={"Login"} className="btn btn-primary mt-3 w-100"></input>
                            </div>
                            <div className="text-end mt-3">
                               New Owner  ? <Link className="text-end" to={"/theaterOwnerReg"}>SignUp</Link>
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
export default TheaterOwnerLogin;