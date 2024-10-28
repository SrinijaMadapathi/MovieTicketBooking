import Thead from "./Thead";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const rest = require("../../EndPoints")
function TheatreOwnerHome(){
    const navigate = useNavigate([])

    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
        axios.get(rest.endPointTheatreOwnerValid,header)
        .then(response=>{
            console.log(response.data);
            if(response.data=='Not Verified'){
                Cookies.remove('token')
                Cookies.remove("role")
                navigate("/?message=Account Not Verified")
            }
        })
    },[])

    return(
        <>
         <div className="phome-pic2">
        <Thead/>
        <div className="text-center mt-4 h1"><b className="bg-white" style={{lineHeight:"200px"}}>Welcome Theatre Owner Page</b></div>

        </div>
        </>
    )
}
export default TheatreOwnerHome;