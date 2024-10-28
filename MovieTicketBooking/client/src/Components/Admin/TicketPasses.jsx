import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import Cookies from "js-cookie";
import axios from "axios";
import CustomerHead from "../Customer/CustomerHead";
const rest = require("../../EndPoints")
function TicketPasses(){
    const[count,setCount] = useState(0);
    const[ticketPasses,setTicketPasses] = useState([])
    const[purchasedPass,setPurchasedPass] = useState([])


    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
  

    useEffect(()=>{
        axios.get(rest.endPointPurchasedPasses,header)
        .then(response=>{
            console.log(response.data);
            setPurchasedPass(response.data)
        })
    },[count])


    useEffect(()=>{
        axios.get(rest.endPointTicketPasses,header)
        .then(response=>{
            console.log(response.data);
            setTicketPasses(response.data)
        })
    },[count])



    const AddTicketPass = e =>{
        e.preventDefault();
        let passTitle = document.getElementById("passTitle").value;
        let noOfMovieAllowed = document.getElementById("noOfMovieAllowed").value;
        let validity = document.getElementById("validity").value;

        if(passTitle.length==0){
            alert("Pass Title Required!");
            return;
        }
      
        if(noOfMovieAllowed.length==0){
            alert("No Of Movies Allowed Required !")
            return;
        }


        if(validity.length==0){
            alert("Validity Required!")
            return;
        }



        let data = {
            "passTitle":passTitle,
            "noOfMovieAllowed":noOfMovieAllowed,
            "validity":validity
        }
        console.log(data);

        axios.post(rest.endPointAddTicketPass,data,header)
        .then(response=>{
            console.log(response.data);
            setCount(count+1)
            document.getElementById("passTitle").value="";
            document.getElementById("noOfMovieAllowed").value="";
            document.getElementById("validity").value="";
        })
        .catch(e=>{
            console.log(e);
        })
    }


    const buyPass = (ticketPassId) =>{
      axios.get(rest.endPointBuTicketPass+"?ticketPassId="+ticketPassId,header)
      .then(response=>{
        console.log(response.data);
        alert(response.data)
        setCount(count+1)
      })
      .catch(e=>{
        console.log(e);
      })

    }

    return(
        <>
        {Cookies.get("role")==='admin'?<><AdminHead/></>:<></>}
        {Cookies.get("role")==='customer'?<><CustomerHead/></>:<></>}
        {Cookies.get("role")==='admin'?<>
            <div className="container-fluid mt-3">
            <div className="text-center mt-1 h5 mb-4">Movie Ticket Passes</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-4">
                        <form onSubmit={AddTicketPass}>
                            <div className="form-group">
                                <label>Pass Title</label>
                                <input type="text" className="form-control mt-1" id="passTitle" placeholder="Ticket Pass Title"></input>
                            </div>
                            <div className="form-group mt-2">
                                <label>No Movies Allowed</label>
                                <input type="number" min={1} className="form-control mt-1" id="noOfMovieAllowed" placeholder="Shows Allowed"></input>
                            </div>
                            <div className="form-group mt-2">
                                <label>Validy (in days)</label>
                                <input type="number" min={1} className="form-control mt-1" id="validity" placeholder="No Of Days"></input>
                            </div>
                            <input type="submit" value={"Add"} className="btn btn-primary mt-2 w-100"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <table  className="table table-bordered">
                       <thead>
                        <tr>
                            <th>Pass Title</th>
                            <th>Number Of Movies Allowed</th>
                            <th>Validity</th>
                           
                        </tr>
                       </thead>
                       <tbody>
                        {ticketPasses.map((ticketPass,index)=>
                         <tr>
                            <td>{ticketPass['passTitle']}</td>
                            <td>{ticketPass['noOfMovieAllowed']}</td>
                            <td>{ticketPass['validity']} days <div style={{fontSize:"10px"}}>(Expired---{ticketPass['endDate'].split(".")[0].replace("T", " ").substring(0, 10)})</div></td>
                         </tr>
                        )}
                       </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>:<>
        <div className="container-fluid mt-3">
            <div className="text-center mt-1 h5 mb-4">Movie Ticket Passes</div>
            <div className="row">
                
                <div className="col-md-8">
                    <table  className="table table-bordered">
                       <thead>
                        <tr>
                            <th>Pass Title</th>
                            <th>Number Of Movies Allowed</th>
                            <th>Validity</th>
                            <th>Action</th>
                        </tr>
                       </thead>
                       <tbody>
                        {ticketPasses.map((ticketPass,index)=>
                         <tr>
                            <td>{ticketPass['passTitle']}</td>
                            <td>{ticketPass['noOfMovieAllowed']}</td>
                            <td>{ticketPass['validity']} days <div style={{fontSize:"10px"}}>Expired---{ticketPass['endDate'].split(".")[0].replace("T", " ").substring(0, 10)}</div></td>
                            <td>
                                <button onClick={()=>{buyPass(ticketPass['ticketPassId'])}} className="w-100  btn btn-primary">Buy</button>
                            </td>
                         </tr>
                        )}
                       </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <table className="table table-bordered mt-w">
                      <thead>
                        <tr>
                            <th>Purchased Pass</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchasedPass.map((purchased)=>
                         <tr>
                            <td>{purchased['ticketPassModel']['passTitle']}</td>
                         </tr>
                        )}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        </>}
        
        </>
    )
}
export default TicketPasses;