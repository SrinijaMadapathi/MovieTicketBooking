import { useState } from "react";
import Head from "./Head";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const rest = require('../../EndPoints')

function CustomerLogin(){
    const[email,setEmail] = useState("")
    const navigate  = useNavigate("")
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const CustomerLoginAction = e =>{
        e.preventDefault();

        if(email.length===0){
            alert("Enter Email")
            return
        }

        let data = {
            "email":email
        }
        axios.post(rest.endPointCustomerEmailVerify,data,header)
        .then(response=>{
          console.log(response.data);    
          if(response.data['authenticateEmail']==='Email Not Exists')   {
            navigate("/customerRegAction?otp="+response.data['otp']+"&email="+email)
          }else{
            navigate("/customerLoginAction1?otp="+response.data['otp']+"&email="+email)
          }    
        })
        .catch(err=>{
            console.log("Something Went Wrong");
        })

    }
    return(
        <>
        <div className="customer-pic">
        <Head/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-3"></div>
                <div className="col-md-4 mt-4">
                    <div className="card p-3 mt-5">
                    <div className="text-center p-2 h5"><b>Customer Login</b></div>
                        <div className="text-center">
                           <img src="data:image/png;base64,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" style={{height:"130px",maxWidth:"100%"}}></img>
                        </div>
                        <form onSubmit={CustomerLoginAction}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" onChange={e=>setEmail(e.target.value)} className="form-control mt-1" id="email" placeholder="Enter Email"></input>
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
export default CustomerLogin;