import { useState } from "react";
import Head from "./Head";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const rest = require('../../EndPoints')

function TheaterOwnerRegistration(){
    const[ownerName,setCompanyOwner] = useState("")
    const[email,setEmail] = useState("")
    const[phone,setPhone] = useState("")
    const[password,setPassword] = useState("")
    const[address,setAddress] = useState("")

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddTheaterOwner = e =>{
        e.preventDefault();

        if(ownerName.length==0){
            alert("Enter Name")
            return;
        }

        if(email.length==0){
            alert("Enter Email");
            return
        }

        if(phone.length==0){
            alert("Enter Phone")
            return;
        }else if(phone.length!=10){
            alert("Phone Number Should Be 10")
            return
        }

        if(password.length==0){
           alert("Enter Password")
           return
        }

        if(address.length==0){
            alert("Enter Address")
            return
        }


        let postData = {
          "ownerName":ownerName,
          "email":email,
          "phone":phone,
          "password":password,
          "address":address
        }
        axios.post(rest.endPointAddTheatreOwner,postData,header)
        .then(response=>{
            console.log(response.data);
            alert(response.data)
            document.getElementById("ownerName").value=""
            document.getElementById("email").value=""
            document.getElementById("phone").value=""
            document.getElementById("password").value=""
            document.getElementById("address").value=""
        })
        .catch(err=>{
            console.log(err);
        })

    }
    return(
        <>
        <Head/>
        <div className="container-fluid mt-3">
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <div className="card p-4 mt-5">
                    <div className="text-center h4">Theatre Owner Registration</div>
                    <form onSubmit={AddTheaterOwner}>
                        <div className="form-group">
                            <label>Owner Name</label>
                            <input type="text" placeholder="Enter Name" onChange={e=>setCompanyOwner(e.target.value)} id="ownerName" className="form-control mt-1"></input>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter Email" id="email" onChange={e=>setEmail(e.target.value)} className="form-control mt-1"></input>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" id="phone" placeholder="Enter Phone" onChange={e=>setPhone(e.target.value)} className="form-control mt-1"></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} id="password" className="form-control mt-1"></input>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea  id="address" className="form-control mt-1" onChange={e=>setAddress(e.target.value)} placeholder="Address"></textarea>
                        </div>
                        <input type="submit" value={"SignUp"} className="btn btn-primary w-100 mt-3"></input>
                        <div className="text-end mt-2 ">
                                Already SignUp ? <Link to={"/theaterOwnerLogin"}>Login</Link>
                            </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default TheaterOwnerRegistration;