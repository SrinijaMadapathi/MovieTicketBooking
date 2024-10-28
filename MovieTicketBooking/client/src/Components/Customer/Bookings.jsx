import CustomerHead from "./CustomerHead";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Phead from "../ProductionCompany/Phead";
import Thead from "../TheaterOwner/Thead";
import AdminHead from "../Admin/AdminHead";
const rest = require("../../EndPoints")

function Bookings() {
    const [bookings, setBookings] = useState([])
    const[count,setCount] = useState(0)
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let scheduleId = params.get('scheduleId');
    let showId = params.get('showId');
    let bookingDate = params.get("bookingDate");
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        axios.get(rest.endPointBookings+"?scheduleId="+scheduleId+"&showId="+showId+"&bookingDate="+bookingDate, header)
            .then(response => {
                console.log(response.data);
                setBookings(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [count])

    const CancelBooking = e =>{
        e.preventDefault();
        let bookingId = e.target[0].value;
        axios.get(rest.endPointCancelBooking+"?bookingId="+bookingId,header)
        .then(response=>{
            console.log(response.data);
            alert(response.data)
            setCount(count+1)
        })

    }

    return (
        <>
        <div className="theater-pic">
             {Cookies.get("role")==='customer'?<>
          <CustomerHead/>
        </>:<></>}
       {Cookies.get("role")==='theatreOwner'?<><Thead /></>:<></>}
       {Cookies.get("role")==='admin'?<><AdminHead /></>:<></>}
       {Cookies.get("role")==='productionCompany'?<><Phead/></>:<></>}

            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-"></div>
                    <div className="col-md-12">
                        <div className="row">
                            {bookings.map((booking, index) =>
                                <div className="col-md-4" >
                                    <div className="card p-2 mt-2" style={{background:"hsl(0, 64%, 81%)"}}>
                                        <div className="row">
                                            <div className="col-md-6" >
                                                <div className="" style={{ fontWeight: "30px" ,textTransform:"uppercase"}}><h2>{booking['scheduleModel']['movieModel']['title']}</h2></div>
                                                <div className="row">
                                                    <div className="col-md-4 " style={{ fontSize: "12px" }}>{booking['scheduleModel']['movieModel']['certification']}</div>
                                                    <div className="col-md-6" style={{ fontSize: "12px", textTransform: "uppercase" }}>{booking['scheduleModel']['movieLanguageModel']['languageModel']['language']}</div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mt-2"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbzY7QDEqCDDmwhwQBBuDRq54FZt2CI5L7lQ&s" style={{ height: "20px" }}></img>{booking['scheduleModel']['theatreModel']['theatreName']}, {booking['scheduleModel']['theatreModel']['locationModel']['locationName']}
                                                    </div>
                                                    {booking['status']==='Booked'?<>
                                                        <div className="col-md-8 mt-5">
                                                            <div className="h3 text-success">
                                                            {booking['status']}
                                                            </div>
                                                            </div>
                                                    </>:<>
                                                    
                                                    <div className="col-md-8 mt-5">
                                                            <div className="h3 text-danger">
                                                            {booking['status']}
                                                            </div>
                                                            </div>
                                                    </>}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <img src={'data:image/jpeg;base64,' + booking['scheduleModel']['movieModel']['poster2']} className="mt-1" style={{ width: "100%", height: "200px" }}></img>
                                            </div>
                                        </div>
                                        <div className="">------------------------------------------------------------</div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="text-secondary">{booking['bookingDate'].replace("T", " ").substring(0, 10)}</div>
                                                <div className="">{booking['showModel']['showTime']}</div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-secondary">Price</div>
                                                <div className="">$ <b>{booking['totalPrice']}</b></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8 mt-2">
                                                <div className="text-secondary">Seats</div>
                                                <div className="row" style={{overflow:"auto",height:"40px"}} >
                                                    {booking['bookingSeatModelsList'].map((bookingSeat, index) =>
                                                        <div className="col-md-2" >
                                                            <div className="">{bookingSeat['seatNumber']}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-4">
                                                {booking['status']=='Booked'?<>
                                                    <form onSubmit={CancelBooking}>
                                                    <input type="hidden" id="bookingId" value={booking['bookingId']}></input>
                                                   <input type="submit" value={"Cancel"} className="btn btn-danger"></input>
                                                </form>
                                                </>:<></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>
            </div>
        </>
    )
}
export default Bookings;