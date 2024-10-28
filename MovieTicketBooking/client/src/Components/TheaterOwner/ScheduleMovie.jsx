import Cookies from "js-cookie";
import Thead from "./Thead";
import { useEffect, useState } from "react";
import axios from "axios";
const rest = require("../../EndPoints")
function ScheduleMovie(){
    const[theatres,setTheatres] = useState([])
    const[movieLanguages,setMovieLanguages] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let movieId = params.get('movieId');
    const[numberOfShows,setNumberOfShows] = useState(0);

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    

    useEffect(()=>{
        axios.get(rest.endPointViewTheatres,header)
        .then(response=>{
            console.log(response.data)
            setTheatres(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    useEffect(()=>{
        axios.get(rest.endPointGetMovieLanguagesByMovieId+"?movieId="+movieId,header)
        .then(response=>{
            console.log(response.data)
            setMovieLanguages(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    if(numberOfShows!=""){
         let Shows = 
           `<div class="container-fluid">
           <div class="row">`;
           for(let i=1;i<=numberOfShows;i++){
               Shows = Shows +
               `<div class="col-md-4">
               <div class="card p-3 mt-3">
                   <label for="show${i}" class="text-center h5"> Show ${i} </label>
                   <input type="hidden"  class="form-control mt-2" value="${i}"  id="show${i}" required></input>
                   <div class="form-group">
                     <label class="mt-1">Show Time</label>
                     <input type="time"  class="form-control mt-2"  id="showTime" required></input>
                   </div>
                   
                   
                  </div>
            </div>`
            
           }
           Shows = Shows + `
            <div className="">
                        <input type="submit" value="Schedule Movie" class="btn btn-primary w-100 mt-5"></input>
                    </div>
              </div>
           </div>
           `
              document.getElementById("shows").innerHTML=Shows;
    }


    const ScheduleMovieAction = e =>{
        e.preventDefault();
        let fromDate = document.getElementById("fromDate").value;
        let toDate = document.getElementById("toDate").value;
        let pricePerSeat = document.getElementById("pricePerSeat").value;
        let movieLanguageId = document.getElementById("movieLanguageId").value;
        let theatreId = document.getElementById("theatreId").value;
        let shows = []
        for(let i=0;i<e.target.length-1;i++){
            if(i>5){
                let show = e.target[i].value;
                i++;
                let showTime = e.target[i].value;

                let Shows = {
                    "showNumber":show,
                    "showTime":showTime
                   
                }
                shows.push(Shows)
            }


        }
        let data = {
            "fromDate":fromDate,
            "toDate":toDate,
            "pricePerSeat":pricePerSeat,
            "showModelsList":shows,
            "movieLanguageId":movieLanguageId,
            "theatreId":theatreId,
            "movieId":movieId
           

        }

        axios.post(rest.endPointAddSchedule,data,header)
        .then(response=>{
            alert(response.data)
        })
        .catch(e=>{
            console.log(e);
        })
  
    }

   

    
    return(
        <>
        <Thead/>
        <div className="container mt-3">
            <div className="card p-3 mt-5">
                <div className="text-center h5 ">Schedule Movie</div>
                <form onSubmit={ScheduleMovieAction}>
                 <div className="row">
                   <div className="col-md-6">
                    <div className="form-group">
                        <label>Schedule Start</label>
                        <input type="date" id="fromDate" className="form-control mt-1"></input>
                    </div>
                    <div className="form-group">
                        <label>Schedule End</label>
                        <input type="date" id="toDate" className="form-control mt-1"></input>
                    </div>
                    <div className="form-group">
                        <label>Number Of Shows</label>
                        <input type="number"  id="numberOfShows" onChange={e=>{setNumberOfShows(e.target.value)}} className="form-control mt-1"></input>
                    </div>
                    {/* <div className="form-group">
                        <label>Show 2</label>
                        <input type="time" id="show2"  className="form-control mt-1"></input>
                    </div> */}
                    <div className="form-group mt-1">
                        <label>Price Per Seat</label>
                        <input type="number" min={1} id="pricePerSeat" placeholder="Price Per Seat"  className="form-control mt-1"></input>
                    </div>
                    <div className="form-group mt-1">
                        <label>Movie Languages</label>
                        <select className="form-control mt-1" id="movieLanguageId">
                            <option>Choose Languages</option>
                            {movieLanguages.map((movieLanguage,index)=>
                             <option value={movieLanguage['movieLanguageId']}>{movieLanguage['languageModel']['language']}</option>
                            )}
                        </select>
                    </div>
                    {/* <div className="form-group">
                        <label>Show 3</label>
                        <input type="time" id="show3"   className="form-control mt-1"></input>
                    </div> */}
                    {/* <div className="form-group mt-1">
                        <label>Show 4</label>
                        <input type="time" id="show4"  className="form-control mt-1"></input>
                    </div> */}
                    <div className="form-group mt-1">
                        <label>Theatres</label>
                        <select className="form-control mt-1" id="theatreId">
                            <option>Choose Theatre</option>
                            {theatres.map((theatre,index)=>
                             <option value={theatre['theatreId']}>{theatre['theatreName']}</option>
                            )}
                        </select>
                    </div>
                   </div>
                   <div className="col-md-6">
                   <div className="" id="shows"></div>
                    
                   
                   </div>
                </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default ScheduleMovie;