import axios from "axios";
import Head from "./Head";
import { useNavigate } from "react-router-dom";

function CustomerRegAction(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let otp = params.get('otp');
    let email = params.get('email');
    const navigate = useNavigate("");

    const VerifyOTPAction = e =>{
        e.preventDefault();
        let otp2 = document.getElementById("otp2").value;
        console.log(otp2);
        if(otp!=otp2){
            alert("Invalid Otp!")
            return
        }else{
            navigate("/customerRegAction1?email="+email)
        }


    }

    return(
        <>
        <Head/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <form onSubmit={VerifyOTPAction}>
                            <div className="">
                                <label>OTP</label>
                                <input type="number" min={1} id="otp2" className="form-control"></input>
                            </div>
                            <input type="submit" value={"Submit"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CustomerRegAction;