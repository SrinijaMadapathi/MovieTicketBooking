import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const rest = require("../../EndPoints")
function WatchTrailer(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let trailer = params.get('trailerUrl');
    useEffect(()=>{
        
    },[trailer])
    


    return(
        <>
        <div>
        <ReactPlayer url={trailer} width="100%" height="900px"  controls={true}  />
    </div>
        </>
    )
}
export default WatchTrailer;