import { useEffect, useState } from "react";
import Thead from "./Thead";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const rest = require("../../EndPoints")
function Schedules(){
    const[schedules,setSchedules] = useState([])
    const [movies2, setMovies2] = useState([])
    const navigate = useNavigate("")

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
       axios.get(rest.endPointViewSchedule,header)
       .then(response=>{
        console.log(response.data);
         setSchedules(response.data)
       })
       .catch(e=>{
        console.log(e);
       })
    },[])
    const WatchTrailer = (trailerUrl) => {
        navigate("/WatchTrailer?trailerUrl=" + trailerUrl)
    }
    const GetDetails = (movieId) =>{
        axios.get(rest.endPointViewMoviesById+"?movieId="+movieId, header).then(response => {
            console.log(response.data);
            setMovies2(response.data)
        })
            .catch(err => {
                console.log(err);
            })
    }

    const ScheduleBookings  =e =>{
        e.preventDefault();
        let scheduleId = e.target[0].value;
        navigate("/scheduleBookings?scheduleId="+scheduleId)
    }
    return(
        <>
        <div className="phome-pic2">
        <Thead/>
        <div className="container-fluid mt-5">
          <div className="row">
            {schedules.map((schedule,index)=>
             <div className="col-md-12">
                <div className="card p-4 mt-2">
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-4">
                            <div className="h2">{schedule['movieModel']['title']}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        <div className="card p-3 mt-3" style={{ boxShadow: "0px 0px 7px rosybrown" }}>
                                <img src={'data:image/jpeg;base64,' + schedule['movieModel']['poster2']} className="mt-1" style={{ maxWidth: "100%", height: "300px" }}></img>
                                <div className="" ><button type="button" class="nav-link" onClick={()=>{GetDetails(schedule['movieModel']['movieId'])}}  data-bs-toggle="modal" data-bs-target="#myModal">
                                    <b className="h5">{schedule['movieModel']['title']}</b>
                                </button>
                                <div class="modal" id="myModal">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">{movies2['title']}</h4>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div className="" style={{fontSize:"12px"}}>Certification</div>
                                                <div className="h6">{movies2['certification']}</div>
                                                {movies2['genreModel']!=null?<>
                                                <div className="" style={{fontSize:"12px"}}>Genre</div>
                                                <div className="h6">{movies2['genreModel']['genreName']}</div>
                                                </>:null}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mt-1">{schedule['movieModel']['certification']}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="mt-1 btn btn-primary" style={{fontSize:"13px"}} onClick={() => { WatchTrailer(schedule['movieModel']['trailerUrl']) }}>Watch Trailer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 mt-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="text-secondary" >Start Date</div>
                                    <div className="h6">{schedule['fromDate'].split(".")[0].replace("T", " ").substring(0, 10)}</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-secondary">End Date</div>
                                    <div className="h6">{schedule['toDate'].split(".")[0].replace("T", " ").substring(0, 10)}</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-secondary">Ticket Price</div>
                                    <div className="h6">$ {schedule['pricePerSeat']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Theatre Name</div>
                                    <div className="h6">{schedule['theatreModel']['theatreName']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Theatre Location</div>
                                    <div className="h6">{schedule['theatreModel']['locationModel']['locationName']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Screen Size</div>
                                    <div className="h6">{schedule['theatreModel']['screenSize']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Seat Capacity</div>
                                    <div className="h6">{schedule['theatreModel']['noOfSeats']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Language</div>
                                    <div className="h6">{schedule['movieLanguageModel']['languageModel']['language']}</div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-secondary">Movie Type</div>
                                    <div className="h6">{schedule['movieModel']['genreModel']['genreName']}</div>
                                </div>
                                <div className="col-md-3 mt-5">
                                <form onSubmit={ScheduleBookings}>
                                    <input type="hidden" id="scheduleId" value={schedule['scheduleId']}></input>
                                    <input type="submit" value={"Bookings"} className="btn btn-primary"></input>
                                </form>
                            </div>
                                
                            </div>

                        </div>
                        <div className="row">
                           
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
export default Schedules;