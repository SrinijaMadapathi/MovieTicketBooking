import { useEffect, useState } from "react";
import Thead from "./Thead";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require("../../EndPoints")
function ScheduleBookings() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let scheduleId = params.get('scheduleId');
    const [schedules, setSchedules] = useState([])
    let [date, getDate] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate([])

  

    if (date == "") {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date = yyyy + '-' + mm + '-' + dd;
        console.log("hi");
    } else {
        date = date;
        console.log("hello");
    }

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(rest.endPointScheduledBookings + "?scheduleId=" + scheduleId + "&date=" + date, header)
            .then(response => {
                console.log(response.data);
                setSchedules(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [scheduleId,date])


    const seatLayout = (showId, scheduleId, noOfSeats, pricePerSeat, date) => {
        navigate("/seatsLayout?showId=" + showId + "&scheduleId=" + scheduleId + "&noOfSeats=" + noOfSeats + "&pricePerSeat=" + pricePerSeat + "&bookingDate=" + date)
    }
    return (
        <>
        <div className="theater-pic">
            <Thead />
            <div className="card p-3" style={{ background: "#FF4500" }}>
                <div className="row">
                    <div className="col-md-3">
                        <input type="date" id="date" className="form-control" onChange={e => { getDate(e.target.value) }}></input>
                    </div>

                </div>
            </div>
            <div className="container-fluid mt-4">
                <div className="row">
                    {schedules.map((schedule, index) =>
                        <div className="col-md-12">
                            <div className="card p-3 mt-2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row">
                                            {schedule['showModelsList'].map((show, index) =>
                                                <div className="col-md-2 ">
                                                    <div className="text-center card-header p-3" style={{ background: "#F5F5F5" }}>
                                                        <button className="nav-link ms-4" onClick={() => { seatLayout(show['showId'], schedule['scheduleId'], schedule['theatreModel']['noOfSeats'], schedule['pricePerSeat'], date) }}><b className="text-center">{show['showTime']}</b></button></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className=""><h2>{schedule['theatreModel']['theatreName']}</h2></div>
                                        <div className="" style={{ fontSize: "12px" }}><h6>{schedule['theatreModel']['screenSize']}</h6></div>
                                        <div className="" style={{ fontSize: "12px" }}><h6>{schedule['theatreModel']['locationModel']['locationName']},{schedule['theatreModel']['address']}</h6></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </>
    )
}
export default ScheduleBookings;