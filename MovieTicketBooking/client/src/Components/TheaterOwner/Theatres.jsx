import { useEffect, useState } from "react";
import Thead from "./Thead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require("../../EndPoints")

function Theatres(){
    const[locations,setLocations] = useState([])
    const[theatres,setTheatres] = useState([])
    const[count,setCount] = useState(0)

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    
    useEffect(()=>{
        axios.get(rest.endPointViewLocations,header).then(response=>{
            setLocations(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(rest.endPointViewTheatres,header)
        .then(response=>{
            console.log(response.data)
            setTheatres(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])

    const AddTheatre = e =>{
        e.preventDefault();
        let theatreName = document.getElementById("theatreName").value;
        let screenSize = document.getElementById("screenSize").value;
        let noOfSeats = document.getElementById("noOfSeats").value;
        let locationId = document.getElementById("locationId").value;
        let address = document.getElementById("address").value;

        let data = {
            "theatreName":theatreName,
            "screenSize":screenSize,
            "noOfSeats":noOfSeats,
            'locationId':locationId,
            "address":address
        }
        axios.post(rest.endPointAddTheatre+"?locationId="+locationId,data,header)
        .then(response=>{
            console.log(response.data);
            alert(response.data)
            setCount(count+1)

        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
        <Thead/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-4 mt-2">
                    <div className="card p-3">
                        <div className="h5 text-center ">Add Theatre</div>
                        <form onSubmit={AddTheatre}>
                            <div className="form-group">
                                <label>Theatre Name</label>
                                <input type="text" id="theatreName" className="form-control mt-1" placeholder="Enter Name"></input>
                            </div>
                            <div className="form-group">
                                <label>Screen Size</label>
                                <input type="text" id="screenSize" className="form-control mt-1" placeholder="Screen Size"></input>
                            </div>
                            <div className="form-group">
                                <label>No Of Seats</label>
                                <input type="number" min={1} id="noOfSeats" className="form-control mt-1" placeholder="No Of Seats"></input>
                            </div>
                            <div className="form-group">
                                <label>Locations</label>
                                <select className="form-control mt-1" id="locationId">
                                    <option>Choose Location</option>
                                    {locations.map((location,index)=>
                                    <option value={location['locationId']}>{location['locationName']}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <textarea type="number" min={1} id="address" className="form-control mt-1" placeholder="Address"></textarea>
                            </div>
                            <input type="submit" value={"Add Theatre"} className="btn btn-primary mt-3 w-100"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8 mt-1">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Theatre Id</th>
                                <th>Theatre Name</th>
                                <th>Screen Size</th>
                                <th>No Of Seats</th>
                                <th>Location</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                             {theatres.map((theatre,index)=>
                                <tr>
                                    <td>{theatre['theatreId']}</td>
                                    <td>{theatre['theatreName']}</td>
                                    <td>{theatre['screenSize']}</td>
                                    <td>{theatre['noOfSeats']}</td>
                                    <td>{theatre['locationModel']['locationName']}</td>
                                    <td>{theatre['address']}</td>
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
export default Theatres;