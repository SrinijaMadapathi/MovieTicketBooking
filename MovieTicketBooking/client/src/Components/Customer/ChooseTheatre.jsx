import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHead from "../Admin/AdminHead";
import CustomerHead from "./CustomerHead";
import Phead from "../ProductionCompany/Phead";
const rest = require("../../EndPoints")

function ChooseTheatre() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let movieId = params.get('movieId');
    const [theatres, setTheatres] = useState([])
    const navigate = useNavigate([])

    let [date, getDate] = useState([])
  


    

    
    if(date==""){
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date = yyyy + '-' + mm + '-' + dd;
    }else{
        date = date;
    }
    

    const [schedules, setSchedules] = useState([])
    const [theatreId, getTheatreId] = useState([])

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        axios.get(rest.endPointGetTheatres, header)
            .then(response => {
                setTheatres(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get(rest.endPointNowShowingMovies + "?date=" + date + "&movieId=" + movieId + "&theatreId=" + theatreId, header)
            .then(response => {
                setSchedules(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [date,movieId, theatreId])


    const seatLayout = (showId, scheduleId, noOfSeats, pricePerSeat, date) => {
        navigate("/seatsLayout?showId=" + showId + "&scheduleId=" + scheduleId + "&noOfSeats=" + noOfSeats + "&pricePerSeat=" + pricePerSeat + "&bookingDate=" + date)
    }
    return (
        <>
            <div className="theater-pic">
            {Cookies.get("role")==='customer'?<><CustomerHead/></>:<></>}
            {Cookies.get("role")==='admin'?<><AdminHead/></>:<></>}
            {Cookies.get("role")==='productionCompany'?<><Phead/></>:<></>}
            <div className="card p-3" style={{ background: "#FF4500" }}>
                <div className="row">
                    <div className="col-md-3">
                        <input type="date" id="date" min={date} className="form-control" onChange={e => { getDate(e.target.value) }}></input>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" onChange={e => { getTheatreId(e.target.value) }}>
                            <option value={""}>Choose Theatre</option>
                            {theatres.map((theatre, index) =>
                                <option value={theatre['theatreId']}>{theatre['theatreName']}</option>
                            )}
                        </select>
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
export default ChooseTheatre;