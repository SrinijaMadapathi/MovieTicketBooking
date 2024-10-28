import axios from "axios";
import CustomerHead from "./CustomerHead";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const rest = require("../../EndPoints")

function GiveRating(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let movieId = params.get('movieId');
    const[count,setCount] = useState(0)
    const navigate = useNavigate("")
    const[ratings,setRatings] = useState([])

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
    axios.get(rest.endPointRatings+"?movieId="+movieId,header)
    .then(response=>{
        console.log(response.data);
        setRatings(response.data)
    })
    },[count])


    const GiveRatingAction = e =>{
        e.preventDefault();
        let rating = document.getElementById("rating").value;
        let review = document.getElementById("review").value;

        let data = {
            "rating":rating,
            "review":review
        }

        axios.post(rest.endPointGiveRating+"?movieId="+movieId,data,header)
        .then(response=>{
            setCount(count+1)
        })
        .catch(e=>{
            console.log(e);
        })

    }

    return(
        <>
        <CustomerHead/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {ratings.map((rating,index)=>
                         <div className="col-md-12">
                            <div className="card p-3 mt-2">
                                <div className="row">
                                    <div className="col-md-4 h4">{rating['rating']}</div>
                                    <div className="col-md-4 text-secondart" style={{fontSize:"12px"}}>Review On  : <b className="h6">{rating['date'].replace("T", " ").substring(0, 10)}</b></div>
                                    <div className="col-md-4  text-secondary" style={{fontSize:"12px"}}>Review By  : <b className="h6">{rating['customerModel']['name']}</b></div>
                                </div>
                                <div className="">{rating['review']}</div>
                            </div>
                         </div>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4 mt-2">
                        <div className="text-center h4">Give Rating</div>
                      <form onSubmit={GiveRatingAction}>
                        <div className="form-group">
                        <label>Rating</label>
                        <select className="form-control" id="rating">
                            <option value={"5"}>5</option>
                            <option value={"4"}>4</option>
                            <option value={"3"}>3</option>
                            <option value={"2"}>2</option>
                            <option value={"1"}>1</option>
                        </select>
                        </div>

                        <div className="form-group">
                            <label>Review</label>
                            <textarea id="review" placeholder="Review...." className="form-control mt-1"></textarea>
                        </div>
                        <input type="submit" value={"Submit"} className="btn btn-primary w-100 mt-2"></input>
                      </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default GiveRating;