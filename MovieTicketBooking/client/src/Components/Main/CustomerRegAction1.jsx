import { useNavigate } from "react-router-dom";
import Head from "./Head";
import axios from "axios";
const rest = require('../../EndPoints')

function CustomerRegAction1(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');
    const navigate = useNavigate("");

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }


    const CustomerRegAction2 = e =>{
        e.preventDefault();
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;

        if(name.length==0){
            alert("Enter Name")
            return;
        }

        if(phone.length==0){
            alert("Enter Phone");
            return;
        }else if(phone.length!=10){
            alert("Phone Number Sholud Be 10");
            return;

        }
        let postData = {
            "name":name,
            "phone":phone,
            "email":email
        }
        axios.post(rest.endPointCustomerRegistration,postData,header)
        .then(response=>{
            console.log(response.data);
            if(response.data==='Registered Successfully'){
                alert(response.data)
                navigate("/customerLogin")
            }
        })
        .catch(err=>{
            console.log('Something Went Wrong');
        })

    }
    return(
        <>
        <Head/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mt-4">
                        <form onSubmit={CustomerRegAction2}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" id="name" className="form-control mt-1" placeholder="Enter Name"></input>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" id="phone" className="form-control mt-1" placeholder="Enter Phone"></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email" className="form-control mt-1" value={email}></input>
                            </div>
                            <input type="submit" value={"Sign Up"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CustomerRegAction1;