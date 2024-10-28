import { useEffect, useState } from "react";
import CustomerHead from "./CustomerHead";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require("../../EndPoints")

function CustomerHome() {
    const [schedules, setSchedules] = useState([])
    const [movies2, setMovies2] = useState([])
    const navigate = useNavigate("")

    const [languageId, getMovieLanguageId] = useState([])
    const [movies, setMovies] = useState([])
    const [languages, setLanguages] = useState([])

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }


    useEffect(() => {
        axios.get(rest.endPointViewLanguages, header).then(response => {
            setLanguages(response.data)
        })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(rest.endPointPublishedMovies + "?languageId=" + languageId, header).then(response => {
            console.log(response.data);
            setMovies(response.data)
        })
            .catch(err => {
                console.log(err);
            })
    }, [languageId])




    // useEffect(() => {
    //     axios.get(rest.endPointMovieLanguages, header)
    //         .then(response => {
    //             console.log(response.data);
    //             setMovieLanguages(response.data)
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    // }, [])



    const GetDetails = (movieId) => {
        axios.get(rest.endPointViewMoviesById + "?movieId=" + movieId, header).then(response => {
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


    const ChooseTheatre = e => {
        e.preventDefault();
        let movieId = e.target[0].value;
        navigate("/chooseTheatre?movieId=" + movieId)

    }

    const GiveRating = e =>{
        e.preventDefault();
        let movieId = e.target[0].value;
        navigate("/giveRating?movieId="+movieId)
    }



    return (
        <>
            <CustomerHead />
            <div className="card p-3" style={{ background: "#FF4500" }}>
                <div className="row">
                    {/* <div className="col-md-3">
                        <input type="date" id="date" className="form-control" onChange={e=>{getDate(e.target.value)}}></input>
                    </div> */}
                    <div className="col-md-3">
                        <select className="form-control" onChange={e => { getMovieLanguageId(e.target.value) }}>
                            <option value={""}>Choose Language</option>
                            {languages.map((language, index) =>
                                <option value={language['languageId']}>{language['language']}</option>
                            )}
                        </select>
                    </div>
                </div>

            </div>
            <div className="container-fluid mt-3">

                <div className="row">
                    {movies.map((movie, index) =>
                        <div className="col-md-3">
                            <div className="card p-3 mt-3" style={{ boxShadow: "0px 0px 7px rosybrown" }}>
                                <img src={'data:image/jpeg;base64,' + movie['poster2']} className="mt-1" style={{ maxWidth: "100%", height: "300px" }}></img>
                                <div className="" ><button type="button" class="nav-link" onClick={() => { GetDetails(movie['movieId']) }} data-bs-toggle="modal" data-bs-target="#myModal">
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
                                                    <div className="" style={{ fontSize: "12px" }}>Certification</div>
                                                    <div className="h6">{movies2['certification']}</div>
                                                    {movies2['genreModel'] != null ? <>
                                                        <div className="" style={{ fontSize: "12px" }}>Genre</div>
                                                        <div className="h6">{movies2['genreModel']['genreName']}</div>
                                                    </> : null}
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
                                        <button className="mt-1 btn btn-primary mb-1" style={{ fontSize: "11px" }} onClick={() => { WatchTrailer(movie['trailerUrl']) }}>Trailer</button>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <form onSubmit={ChooseTheatre}>
                                                <input type="hidden" id="movieId" value={movie['movieId']}></input>
                                                <input type="submit" value={"Book"} className="btn btn-primary w-50 mt-2"></input>
                                            </form>
                                        </div>
                                        <div className="col-md-6">
                                        <form onSubmit={GiveRating}>
                                                <input type="hidden" id="movieId" value={movie['movieId']}></input>
                                                <input type="submit" value={"GiveRating"} className="btn btn-primary w-100 mt-2"></input>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default CustomerHome;