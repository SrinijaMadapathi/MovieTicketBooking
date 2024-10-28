import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function ProductionCompanies(){
    const[companyName,setCompanyName] = useState("")
    const[email,setEmail] = useState("")
    const[phone,setPhone] = useState("")
    const[password,setPassword] = useState("")
    const[address,setAddress] = useState("")
    const[count,setCount] = useState(0)
    const [state, setState] = useState([])
    const[producitonCompanies,setProductionCompanies] = useState([])

    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddProdutionCompanyAction = e =>{
        e.preventDefault();
   
        let postData = new FormData();
        postData.append("companyName",companyName)
        postData.append("email",email)
        postData.append("phone",phone)
        postData.append("password",password)
        postData.append("address",address)
        postData.append("logo",state.selectedFile)


        axios.post(rest.endPointAddProdutionCompany,postData,header)
        .then(response=>{
            console.log(response.data);
            alert(response.data)
            setCount(count+1)
            document.getElementById("companyName").value="";
            document.getElementById("email").value="";
            document.getElementById("phone").value="";
            document.getElementById("password").value="";
            document.getElementById("address").value="";


        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        axios.get(rest.endPointProdutionCompanies,header)
        .then(response=>{
            console.log(response.data);
            setProductionCompanies(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])

    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="text-center h4 mt-3">Production Companies</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <div className="text-center mb-2 h4">Add Production Company</div>
                        <form onSubmit={AddProdutionCompanyAction}>
                            <div className="form-group mt-3">
                                <label>Production Company</label>
                                <input type="text" id="companyName" onChange={e=>setCompanyName(e.target.value)} className="form-control mt-1" placeholder="Name" required></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email" onChange={e=>setEmail(e.target.value)} className="form-control mt-1" placeholder="Email" required></input>
                            </div>
                            <div className="form-group">
                                <label>Contact</label>
                                <input type="tel" id="phone" onChange={e=>setPhone(e.target.value)} className="form-control mt-1" placeholder="Contact" required></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" onChange={e=>setPassword(e.target.value)} className="form-control mt-1" placeholder="Password" required></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Upload Logo</label>
                                <input type="file" id="logo" onChange={fileSelectedHandler} className="form-control mt-1" required></input>
                            </div>
                            <input type="submit" value={"Add"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8 mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Logo</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producitonCompanies.map((producitonCompany,index)=>
                            <tr>
                                <td>{producitonCompany['productionCompanyId']}</td>
                                <td><img src={'data:image/jpeg;base64,'+producitonCompany['logo2']} className="mt-1" style={{height:"100px",maxWidth:"50%"}}></img></td>
                                <td>{producitonCompany['companyName']}</td>
                                <td>{producitonCompany['email']}</td>
                                <td>{producitonCompany['phone']}</td>
                            </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default ProductionCompanies;