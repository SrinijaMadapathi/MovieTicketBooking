import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require('../../EndPoints')

function Genres(){
    const[genres,setGenres] = useState([])
    const[genreName,setGenreName] = useState([])
    const[count,setCount] = useState(0)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddGenre = e =>{
        e.preventDefault();

        if(genreName.length===0){
            alert("Genre Required!")
            return
        }
        let postData= {
            "genreName":genreName
        }
        axios.post(rest.endPointAddGenre,postData,header).then(response=>{
           alert(response.data)
           setCount(count+1)
           document.getElementById("genreName").value="";
        })
        .catch(err=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        axios.get(rest.endPointViewGenres,header).then(response=>{
            setGenres(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="text-center h4 mt-3">Genres</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <div className="text-center mb-2 h4">Add Genre</div>
                        <form onSubmit={AddGenre}>
                            <div className="form-group mt-3">
                                <input type="text" id="genreName" onChange={e=>setGenreName(e.target.value)} className="form-control mt-1" placeholder="Genre Name"></input>
                            </div>
                            
                            <input type="submit" value={"Add Genre"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8 mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Genre ID</th>
                                <th>Genre Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((genre,index)=>
                            <tr>
                                <td>{genre['genreId']}</td>
                                <td>{genre['genreName']}</td>
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
export default Genres;