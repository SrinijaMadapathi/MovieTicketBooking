import { useNavigate } from "react-router-dom";
import Head from "./Head";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function CustomerLoginAction1(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');
    let otp = params.get('otp');
    const navigate = useNavigate("");

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    const VerifyOTPAction1  =e =>{
        e.preventDefault();
        let otp2 = document.getElementById("otp2").value;

        if(otp2!=otp){
            alert("Invalid OTP")
            return
        }
        let postData = {
            "userName":email,
            "password":"customer"
        }
       axios.post(rest.endPointCustomerLogin,postData,header)
       .then(response=>{
        console.log(response.data);
        if(response.data==='Invalid Login Details'){
            alert("Something Went Wrong")
            return
        }
        else{
            Cookies.set("role","customer")
            Cookies.set("token",response.data)
            navigate("/customerHome")

        }
       })
       .catch(err=>{
        console.log(err);
       })


    }

    return(
        <>
        <Head/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <form onSubmit={VerifyOTPAction1}>
                            <div className="">
                                <label>OTP</label>
                                <input type="number" min={1} id="otp2" placeholder="Enter OTP" className="form-control"></input>
                            </div>
                            <input type="submit" value={"Login"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CustomerLoginAction1;