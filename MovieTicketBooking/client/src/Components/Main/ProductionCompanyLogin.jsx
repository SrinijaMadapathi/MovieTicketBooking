import { useState } from "react";
import Head from "./Head";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function ProductionCompanyLogin(){
    const[email,setUserName] = useState([])
    const[password,setPassword] = useState([])
    const navigate = useNavigate("")

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const ProductionCompanyLoginAction = e =>{
        e.preventDefault();
        let posData = {
            "userName":email,
            "password":password
        }
        axios.post(rest.endPointProductionCompanyLogin,posData,header).then(response=>{
            console.log(response.data);
            if(response.data==='Invalid Login Details'){
                alert("Invalid Login Details")
                return
            }else{
                Cookies.set("role","productionCompany")
                Cookies.set("token",response.data)
                navigate("/companyHome")
            }
        })
        .catch(err=>{
            console.log(err);
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
                    <div className="text-center p-2 h5"><b>ProductionCompany Login</b></div>
                        <div className="text-center">
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOSEzjSKwwOJU1NYr0D1pt608MTFpBIB6uQ&usqp=CAU" style={{height:"130px",maxWidth:"100%"}}></img>
                        </div>
                        <form onSubmit={ProductionCompanyLoginAction}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" onChange={e=>setUserName(e.target.value)} className="form-control mt-1" id="email" placeholder="Enter Email" required></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control mt-1" id="password" placeholder="Enter Password" required></input>
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
export default ProductionCompanyLogin;