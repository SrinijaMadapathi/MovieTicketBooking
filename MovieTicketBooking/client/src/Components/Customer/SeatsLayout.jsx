import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomerHead from "./CustomerHead";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Thead from "../TheaterOwner/Thead";
import Phead from "../ProductionCompany/Phead";
import AdminHead from "../Admin/AdminHead";
const rest = require("../../EndPoints")

function SeatsLayout(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let showId = params.get('showId');
    let noOfSeats = params.get('noOfSeats');
    let scheduleId = params.get('scheduleId');
    let pricePerSeat = params.get("pricePerSeat")
    let bookingDate = params.get("bookingDate")
    
    const[seats,setSeats] = useState([])
    const navigate = useNavigate([])
    const header = {
      headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`
      }
  }

    useEffect(()=>{
        axios.get(rest.endPointGetSeats+"?showId="+showId+"&noOfSeats="+noOfSeats+"&scheduleId="+scheduleId+"&bookingDate="+bookingDate,header)
        .then(response=>{
          console.log(response.data);
          setSeats(response.data)
        })
        .catch(e=>{
          console.log(e);
        })
    },[])


    const BookTicket = e =>{
      e.preventDefault();
      let seats = []
      let totalPrice = document.getElementById("totalPrice").value;
      for(let i=0;i<e.target.length-1;i++){
        let seat = e.target[i].value;
        let seats2 = {
           "seatNumber":seat
        }
         seats.push(seats2)
      }
      let data = {
        "totalPrice":totalPrice,
        "bookingSeatModelsList":seats,
        "scheduleId":scheduleId,
        "bookingDate":bookingDate,
        "showId":showId,


      }
    
      axios.post(rest.endPointBookSeats+"?scheduleId="+scheduleId,data,header)
      .then(response=>{
        console.log(response.data);
              navigate("/bookTickets?bookingId="+response.data['bookingId']+"&totalPrice="+response.data['totalPrice'])

      })
      .catch(e=>{
        console.log(e);
      })
      
    }






    let selected_seats = []
    let selected_seats_prices = []
    let seatNumbers=[]
    const selected_seat = (seatNumber) => {
        let isSelected = document.getElementById(seatNumber).checked;
        if (isSelected) {
            const index = selected_seats.indexOf(seatNumber);
            if (index >= 0) {
                selected_seats.splice(index,1);
                selected_seats_prices.splice( index, 1 );
                seatNumbers.push(seatNumber)
            }
        } else {
            selected_seats.push(seatNumber)
            seatNumbers.push(seatNumber)
            selected_seats_prices.push(pricePerSeat)
            

        }


        selected_seats.sort(function (a, b) { return a - b })
        setUI();
    }
    function setUI() {
        let total_price = 0;
        let passengers = 
        `<div class="row">`
        for (let i =0; i<selected_seats.length; i++) {
            total_price =total_price + parseInt(selected_seats_prices[i])
            passengers = passengers + `
           
        <div class="col-md-6">
         <div class="card p-2 text-center mt-2">
         <input type="hidden" name="seatNumber${seatNumbers[i]}" id="seatNumber" value="${seatNumbers[i]}">
                 <div class="">${selected_seats[i]} </div>
        </div>
        </div>
        `
        }
        passengers = passengers + `
        <div class=" mt-3"><input type="submit" value="Book Seats" class="btn btn-success w-50 mt-1" /></div>
 </div>
  </div>
 `
        document.getElementById("selected_seats").innerHTML = passengers;
        document.getElementById("payable_amount").innerHTML = "Total Price : $"+total_price;
        document.getElementById("totalPrice").value=total_price;

    }


    const bookings  =e =>{
      e.preventDefault();
      let scheduleId = document.getElementById("scheduleId").value;
      let showId = document.getElementById("showId").value;
      let bookingDate = document.getElementById("bookingDate").value;
      navigate("/bookings?scheduleId="+scheduleId+"&showId="+showId+"&bookingDate="+bookingDate)
    }
   
    return(
        <>
        <div className="theater-pic">
        {Cookies.get("role")==='customer'?<>
          <CustomerHead/>
        </>:<></>}
       {Cookies.get("role")==='theatreOwner'?<><Thead /></>:<></>}
       {Cookies.get("role")==='productionCompany'?<><Phead/></>:<></>}
       {Cookies.get("role")==='admin'?<><AdminHead/></>:<></>}

       <div className="container-fluid mt-4">
       
        <div className="row">
           <div className="col-md-12">
            <div className="row">
              <div className="col-md-10">
              <div className="card p-5" style={{background:"#F8F8FF"}}>
                <div className="row">
                {seats.map((seat,index)=>
                <div className="col-md-1">
                  {Cookies.get("role")==='customer'?<>
                    {seat['seatBooked']===true?<>
                    <input type="checkbox" className="seats2" id={seat['seatNumber']}></input>
                    <label class="p-3  mt-3 w-100 text-center h6" htmlFor={seat['seatNumber']}></label>
                  </>:<>
                  <input type="checkbox" className="seats" id={seat['seatNumber']}></input>
                  <label class="p-3  mt-3 w-100 text-center h6" htmlFor={seat['seatNumber']} onClick={() => {selected_seat(seat['seatNumber'])}}>{seat['seatNumber']}</label>
                  </>}
                   </>:<>
                   {seat['seatBooked']===true?<>
                    <input type="checkbox" className="seats2" id={seat['seatNumber']}></input>
                    <label class="p-3  mt-3 w-100 text-center h6" htmlFor={seat['seatNumber']}></label>
                  </>:<>
                  <input type="checkbox" className="seats" id={seat['seatNumber']}></input>
                  <label class="p-3  mt-3 w-100 text-center h6" htmlFor={seat['seatNumber']}>{seat['seatNumber']}</label>
                  </>}
                   </>}
                 

              </div>
                 )}
                </div>
             
              </div>
              </div>
              
              <div className="col-md-2">
              <form onSubmit={BookTicket}>
                <div className="" id="selected_seats"></div>
                <div type="hidden"  id="totalPrice"></div>
                <div id="payable_amount"  class="h3 mt-3"></div>

                </form>
                {Cookies.get("role")==='theatreOwner'?<>
                   <form onSubmit={bookings}>
                    <input type="hidden" id="scheduleId" value={scheduleId}></input>
                    <input type="hidden" id="showId" value={showId}></input>
                    <input type="hidden" id="bookingDate" value={bookingDate}></input>
                    <input type="submit" value={"Bookings"} className="btn btn-success w-100"></input>
                   </form>
                </>:<></>}
                {Cookies.get("role")==='productionCompany'?<>
                   <form onSubmit={bookings}>
                    <input type="hidden" id="scheduleId" value={scheduleId}></input>
                    <input type="hidden" id="showId" value={showId}></input>
                    <input type="hidden" id="bookingDate" value={bookingDate}></input>
                    <input type="submit" value={"Bookings"} className="btn btn-success w-100"></input>
                   </form>
                </>:<></>}
                {Cookies.get("role")==='admin'?<>
                   <form onSubmit={bookings}>
                    <input type="hidden" id="scheduleId" value={scheduleId}></input>
                    <input type="hidden" id="showId" value={showId}></input>
                    <input type="hidden" id="bookingDate" value={bookingDate}></input>
                    <input type="submit" value={"Bookings"} className="btn btn-success w-100"></input>
                   </form>
                </>:<></>}
              </div>
           </div>
           </div>
       
        </div>
       
       </div>
       </div>
        </>
    )
}
export default SeatsLayout;