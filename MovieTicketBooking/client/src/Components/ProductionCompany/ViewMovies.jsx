import Cookies from "js-cookie";
import Phead from "./Phead";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHead from "../Admin/AdminHead";
import Thead from "../TheaterOwner/Thead";
const rest = require("../../EndPoints")
function ViewMovies() {
    const [movies, setMovies] = useState([])
    const [movies2, setMovies2] = useState([])
    const [count,setCount] = useState(0)
    const navigate = useNavigate("")
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(rest.endPointViewMovies, header).then(response => {
            console.log(response.data);
            setMovies(response.data)
        })
            .catch(err => {
                console.log(err);
            })
    }, [count])
    const GetDetails = (movieId) =>{
        axios.get(rest.endPointViewMoviesById+"?movieId="+movieId, header).then(response => {
            console.log(response.data);
            setMovies2(response.data)
        })
            .catch(err => {
                console.log(err);
            })
    }
   

    const WatchTrailer = (trailerUrl) => {
        navigate("/WatchTrailer?trailerUrl=" + trailerUrl)
    }
    const PublishMovie = (movieId) =>{
        axios.get(rest.endPointPublishMovie+"?movieId="+movieId,header).then(response=>{
            alert(response.data)
            setCount(count+1)
        })
        .catch(err=>{
            console.log(err);
        })

    }

    const ScheduleMovie = e =>{
        e.preventDefault();
        let movieId  = e.target[0].value;
        navigate("/scheduleMovie?movieId="+movieId)

    }

    const ChooseTheatre = e =>{
        e.preventDefault();
        let movieId = e.target[0].value;
        navigate("/chooseTheatre?movieId="+movieId)
        
    }
    return (
        <>
        <div className="phome-pic2">
            {Cookies.get('role')==='theatreOwner'?<><Thead/></>:<></>}
            {Cookies.get("role")==='productionCompany'?<><Phead/></>:<></>}
            {Cookies.get("role")==='admin'?<><AdminHead/></>:<></>}
            <head>
                <title>Bootstrap Example</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            </head>
            <div className="container mt-5">
                <div className="row">
                    {movies.map((movie, index) =>
                        <div className="col-md-3">
                            <div className="card p-3 mt-3" style={{ boxShadow: "0px 0px 7px rosybrown" }}>
                                <img src={'data:image/jpeg;base64,' + movie['poster2']} className="mt-1" style={{ maxWidth: "100%", height: "300px" }}></img>
                                
                                <div className="" ><button type="button" class="nav-link" onClick={()=>{GetDetails(movie['movieId'])}}  data-bs-toggle="modal" data-bs-target="#myModal">
                                    <b className="h5">{movie['title']}</b>
                                    
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
                                                <div className="" style={{fontSize:"12px"}}>ReleaseDate</div>
                                                <div className="h6">{movies2['releaseDate']}</div>
                                                <div className="" style={{fontSize:"12px"}}>Description </div>
                                                <div className="h5" style={{fontSize:"17px"}}>{movies2['description']}</div>
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
                                        <div className="mt-1">{movie['certification']}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="mt-1 btn btn-primary" style={{fontSize:"13px"}} onClick={() => { WatchTrailer(movie['trailerUrl']) }}>Watch Trailer</button>
                                    </div>
                                </div>
                                {Cookies.get("role")==='admin'?<>
                                   <div className="text-secondary" style={{fontSize:"12px"}}>Status : <b>{movie['status']}</b></div>
                                   {movie['status']==='Not Published'?<>
                                <button className="btn btn-primary mt-1" onClick={()=>{PublishMovie(movie['movieId'])}}>
                                    Publish
                                </button>
                                </>:<>
                                <div className="card-footer">
                                  <form onSubmit={ChooseTheatre}>
                                    <input type="hidden" id="movieId" value={movie['movieId']}></input>
                                    <input type="submit" value={"Bookings"} className="btn btn-primary w-50 mt-2"></input>
                                  </form>
                                </div>
                                </>}
                                </>:<></>}
                                {Cookies.get("role")==='productionCompany'?<>
                                  <div className="text-secondary" style={{fontSize:"12px"}}>Status : <b>{movie['status']}</b></div>
                                  <div className="card-footer">
                                  <form onSubmit={ChooseTheatre}>
                                    <input type="hidden" id="movieId" value={movie['movieId']}></input>
                                    <input type="submit" value={"Bookings"} className="btn btn-primary w-50 mt-2"></input>
                                  </form>
                                </div>
                                </>:<></>}
                                {Cookies.get("role")==="theatreOwner"?<>
                                  <form onSubmit={ScheduleMovie}>
                                    <input type="hidden" id="movieId" value={movie['movieId']}></input>
                                    <input type="submit" value={"Schedule Movie"} className="btn btn-primary w-100 mt-3"></input>
                                  </form>
                                </>:<></>}
                            </div>

                        </div>
                    )}
                </div>
            </div>
            </div>
        </>
    )
}
export default ViewMovies;