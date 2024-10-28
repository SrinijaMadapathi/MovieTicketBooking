import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')

function Languages(){
    const[languages,setLanguages] = useState([])
    const[language,setLanguageName] = useState([])
    const[count,setCount] = useState(0)
    
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddLanguage = e =>{
        e.preventDefault();
        
        if(language.length==0){
            alert("Language Required!")
            return;
        }

        let postData= {
            "language":language
        }
        axios.post(rest.endPointAddLanguage,postData,header).then(response=>{
           alert(response.data)
           setCount(count+1)
           document.getElementById("language").value="";
        })
        .catch(err=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        axios.get(rest.endPointViewLanguages,header).then(response=>{
            setLanguages(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[count])
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="text-center h4 mt-3">Languages</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <div className="text-center mb-2 h4">Add Language</div>
                        <form onSubmit={AddLanguage}>
                            <div className="form-group mt-3">
                                <input type="text" id="language" onChange={e=>setLanguageName(e.target.value)} className="form-control mt-1" placeholder="Language Name"></input>
                            </div>
                            
                            <input type="submit" value={"Add Language"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8 mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Language ID</th>
                                <th>Language Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {languages.map((language,index)=>
                            <tr>
                                <td>{language['languageId']}</td>
                                <td>{language['language']}</td>
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
export default Languages;