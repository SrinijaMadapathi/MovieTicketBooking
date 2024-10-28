import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require('../../EndPoints')


function Locations(){
    const[locationName,setLocationName] = useState("")
    const[locations,setLocations] = useState([])
    const[count,setCount] = useState(0)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddLocation = e =>{
        e.preventDefault();

        if(locationName.length==0){
            alert("Enter LocationName")
            return;
        }
        
        let postData= {
            "locationName":locationName
        }
        axios.post(rest.endPointAddLocation,postData,header).then(response=>{
           alert(response.data)
           setCount(count+1)
           document.getElementById("locationName").value="";
        })
        .catch(err=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        axios.get(rest.endPointViewLocations,header).then(response=>{
            setLocations(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="text-center h4 mt-3">Locations</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <div className="text-center mb-2 h4">Add Location</div>
                        <form onSubmit={AddLocation}>
                            <div className="form-group mt-3">
                                <input type="text" id="locationName" onChange={e=>setLocationName(e.target.value)} className="form-control mt-1" placeholder="Location"></input>
                            </div>
                            
                            <input type="submit" value={"Add Location"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8 mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location,index)=>
                            <tr>
                                <td>{location['locationId']}</td>
                                <td>{location['locationName']}</td>
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
export default Locations;