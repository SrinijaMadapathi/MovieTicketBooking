import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require("../../EndPoints")

function TheatreOwners(){
   const[theatreOwners,setTheatreOwners] = useState([])
   const[count,setCount] = useState(0)

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointTheatreOwners,header)
        .then(response=>{
            console.log(response.data);
            setTheatreOwners(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])

     const TheatreStatusAction = e =>{
        e.preventDefault();
        let theatreOwnerId = e.target[0].value;
        axios.get(rest.endPointVerifyTheatreOwner+"?theatreOwnerId="+theatreOwnerId,header).then(response=>{
            alert(response.data);
            setCount(count+1)
        })
        .catch(err=>{
            console.log(err);
        })

     }

    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TheatreOwner</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {theatreOwners.map((theatreOwner,index)=>
                    <tr>
                        <td>{theatreOwner['theatreOwnerId']}</td>
                        <td>{theatreOwner['ownerName']}</td>
                        <td>{theatreOwner['email']}</td>
                        <td>{theatreOwner['phone']}</td>
                        <td>{theatreOwner['address']}</td>
                        <td>{theatreOwner['status']}</td>
                        {theatreOwner['status']==='Not Verified'?<>
                          <td>
                            <form onSubmit={TheatreStatusAction}>
                                <input type="hidden" id="theatreOwnerId" value={theatreOwner['theatreOwnerId']}></input>
                                <input type="submit" value={"Approve"} className="btn btn-success"></input>
                            </form>
                          </td>
                        </>:<>
                        <td>
                            <form onSubmit={TheatreStatusAction}>
                                <input type="hidden" id="theatreOwnerId" value={theatreOwner['theatreOwnerId']}></input>
                                <input type="submit" value={"Reject"} className="btn btn-danger"></input>
                            </form>
                          </td>
                        </>}
                    </tr>
                   )}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default TheatreOwners;