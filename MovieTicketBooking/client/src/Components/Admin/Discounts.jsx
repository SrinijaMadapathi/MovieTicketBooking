import { useEffect, useState } from "react";
import AdminHead from "./AdminHead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require("../../EndPoints")
function Discounts(){
    const[count,setCount] = useState(0);
    const[discounts,setDiscounts] = useState([])

    let [date, getDate] = useState([])
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    useEffect(()=>{
        axios.get(rest.endPointDiscounts,header)
        .then(response=>{
            setDiscounts(response.data)
        })
        .catch(e=>{
            console.log(e);
        })
    },[count])


    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const AddDiscount = e =>{
        e.preventDefault();
        let couponCode = document.getElementById("couponCode").value;
        let discount = document.getElementById("discount").value;
        let expDate = document.getElementById("expDate").value;

        if(couponCode.length==0){
            alert("Coupon Code Required!")
            return;
        }

        if(discount.length==0){
            alert("Discount Required!")
            return;
        }

        let data = {
            "couponCode":couponCode,
            "discount":discount,
            "expDate":expDate
        }

        axios.post(rest.endPointAddDiscount,data,header)
        .then(response=>{
            console.log(response.data);
            alert(response.data)
            setCount(count+1)
            document.getElementById("couponCode").value="";
            document.getElementById("discount").value="";
            document.getElementById("expDate").value="";
        })
        .catch(e=>{
            console.log(e);
        })
    }


    return(
        <>
        <AdminHead/>

        <div className="container-fluid mt-3">
            <div className="text-center mt-1 h5 mb-4">Discounts</div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-4">
                        <form onSubmit={AddDiscount}>
                            <div className="form-group">
                                <label>Coupon Code</label>
                                <input type="text" className="form-control mt-1" id="couponCode" placeholder="Coupon Code"></input>
                            </div>
                            <div className="form-group mt-2">
                                <label>Discount(%)</label>
                                <input type="number" min={1} className="form-control mt-1" id="discount" placeholder="Discount"></input>
                            </div>
                            <div className="form-group mt-2">
                                <label>Expiry Date</label>
                                <input type="date" className="form-control mt-1" min={today} id="expDate" onChange={e => { getDate(e.target.value) }}></input>
                            </div>
                            <input type="submit" value={"Add Discount"} className="btn btn-primary mt-2 w-100"></input>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <table  className="table table-bordered">
                       <thead>
                        <tr>
                            <th>Coupon Code</th>
                            <th>Discount</th>
                            <th>Expiry Date</th>
                           
                        </tr>

                       </thead>

                       <tbody>
                          {discounts.map((discount,index)=>
                          <tr>
                            <td>{discount['couponCode']}</td>
                            <td>{discount['discount']} (%)</td>
                            <td>{discount['expDate'].split(".")[0].replace("T", " ").substring(0, 10)}</td>
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
export default Discounts;