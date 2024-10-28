import Cookies from "js-cookie";
import Phead from "./Phead";
import { useEffect, useState } from "react";
import axios from "axios";
const rest = require("../../EndPoints")

function AddMovie(){
    const[genres,setGenres] = useState([])
    const[languages,setLanguages] = useState([])
    const[title,setTitle] = useState("")
    const[trailerUrl,setTrailerUrl] = useState("")
    const[certification,setCertification] = useState("")
    const[releaseDate,setReleaseDate] = useState("")
    const[description,setDescription] = useState("")
    const[genreId,setGenreId] = useState("")
    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewGenres,header).then(response=>{
            setGenres(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    useEffect(()=>{
        axios.get(rest.endPointViewLanguages,header).then(response=>{
            setLanguages(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const AddMovieAction = e =>{
        e.preventDefault();
        let selectedLanguages = e.target[5].selectedOptions
        let language_ids = []
        for(let i=0; i<selectedLanguages.length;i++){
            console.log(selectedLanguages[i].value)
            language_ids.push(selectedLanguages[i].value)
        }
        let formData = new FormData();
        formData.append("title",title)
        formData.append('trailerUrl',trailerUrl)
        formData.append("certification",certification)
        formData.append("releaseDate",releaseDate)
        formData.append("description",description)
        formData.append("genreId",genreId)
        formData.append("poster",state.selectedFile)
        formData.append("language_ids",language_ids)
        axios.post(rest.endPointAddMovie,formData,header)
        .then(response=>{
            alert(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <>
         <div className="phome-pic2">
        <Phead/>
        <div className="text-center h4 mt-2">Add Movie</div>
        <div className="container mt-5">
        <form onSubmit={AddMovieAction}>
            <div className="card p-4">
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Title</label>
                            <input type="text" placeholder="Title" id="title" onChange={e=>setTitle(e.target.value)} className="form-control mt-1"></input>
                          </div>
                          <div className="form-group mt-1">
                            <label>Trailer Url</label>
                            <input type="url" id="trailerUrl" placeholder="URL" onChange={e=>setTrailerUrl(e.target.value)} className="mt-1 form-control"></input>
                          </div>
                          <div className="form-group mt-1">
                            <label>Certification</label>
                            <input type="text" id="certification" placeholder="Certification" onChange={e=>setCertification(e.target.value)} className="mt-1 form-control"></input>
                          </div>
                          <div className="form-group mt-1">
                            <label>Release Date</label>
                            <input type="date" id="releaseDate" onChange={e=>setReleaseDate(e.target.value)}  className="mt-1 form-control"></input>
                          </div>
                          <div className="form-group">
                                <label>Upload Poster</label>
                                <input type="file" id="poster" onChange={fileSelectedHandler} className="mt-1 form-control"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Choose Languages</label>
                                <select className="form-control mt-1 languageId"  multiple  name="languageId">
                                    {languages.map((language,index)=>
                                    <option value={language['languageId']}>{language['language']}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group mt-1">
                                <label>Genres</label>
                                <select className="form-control mt-1" id="genreId" onChange={e=>setGenreId(e.target.value)}>
                                    <option value="">Choose Genre</option>
                                    {genres.map((genre,index)=>
                                    <option value={genre['genreId']}>{genre['genreName']}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group mt-1">
                                <label>Description</label>
                                <textarea  id="description"  placeholder="Description" onChange={e=>setDescription(e.target.value)} className="mt-2 form-control"></textarea>
                          </div>
                            <input type="submit" value={"Add Movie"} className="btn btn-primary w-100 mt-3"></input>
                        </div>
                    </div>
               </div>
            </form>
        </div>
        </div>
        </>
    )
}
export default AddMovie;