import { useNavigate } from "react-router-dom";
import CustomerHead from "./CustomerHead";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const rest = require("../../EndPoints")

function BookTickets(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let bookingId = params.get('bookingId');
    let totalPrice = params.get("totalPrice");
    let totalPrice2 = totalPrice;
    const[ticketPasses,setTicketPasses] = useState([])
    const[ticketYes,setTicketYes] = useState([])
    const[discounts,setDiscounts] = useState([])
    const[freeMovie,setFreeMovie] = useState([])
    const[couponYes,setDiscountCoupon] = useState([])
    const[discountAmount,setDiscountAmount] = useState([])
    const[discount,setDiscount] = useState([])

    const[discountCoupon1,setDiscountCoupon1] = useState([])

    

    if(freeMovie!=''){
        totalPrice = 0;
    }
    else{
        totalPrice=totalPrice;
    }

     
     if(discountCoupon1=="no"){
        totalPrice = totalPrice;
    }
    else{
        totalPrice=totalPrice;
    }





    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }


    const setTicketPassY = (ticketPassY)=>{
        setTicketYes(ticketPassY)
            axios.get(rest.endPointPurchasedTicketPass,header)
            .then(response=>{
                console.log(response.data);
                setTicketPasses(response.data)
    
            })
            .catch(e=>{
                console.log(e);
            })
    }


        

    //  const setDiscountCoupon = (couponY)=>{
    //     setCouponYes(couponY)
    //     axios.get(rest.endPointDiscounts,header)
    //     .then(response=>{
    //         console.log(response.data);
    //         setDiscounts(response.data)
    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     })

    //  }
    

    const setCouponCode = e =>{
        e.preventDefault();
       let couponCode = e.target[0].value;
       axios.get(rest.endPointValidateDiscountCoupon+"?couponCode="+couponCode,header)
       .then(response=>{
        console.log(response.data);
        if(response.data===""){
            alert("Invalid Coupon")
            return
        }else{
            setDiscount(response.data['discount'])
            let discount = parseFloat(totalPrice)*parseFloat(response.data['discount'])/100;
            setDiscountAmount(discount)

        }
       })
       .catch(e=>{
        console.log(e);
       })

    }
    

  
    


    // useEffect(()=>{
    //     axios.get(rest.endPointPurchasedTicketPass,header)
    //         .then(response=>{
    //             console.log(response.data);
    //             setTicketPasses(response.data)
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         })
    // },[])

 
    const navigate = useNavigate([])

    const PayAmountAction = e => {
        e.preventDefault();
        let bookingId = document.getElementById("bookingId").value;
        let card_name = document.getElementById("card_name").value;
        let card_number = document.getElementById("card_number").value;
        let expire_date = document.getElementById("expire_date").value;
        let cvv = document.getElementById("cvv").value;
        let totalPrice = document.getElementById("totalPrice").value;
        



        if (card_number.length != 16) {
            alert("Card Number Should be 16")
            return
        }

        if (cvv.length != 3) {
            alert("Invalid CVV")
            return
        }


        if (expire_date.length != 5) {
            alert("Invalid Expire Date")
            return
        }

      
        axios.get(rest.endPointPayAmount + "?bookingId=" + bookingId+"&totalPrice="+totalPrice+"&purchasePassId="+freeMovie, header).then(response => {
            alert(response.data)
            navigate("/bookings")
        })
            .catch(e => {
                console.log(e);
            })



    }
    return(
        <>
        <CustomerHead/>
        <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-md-12">
                            <div class="row">
                                <div className="col-md-4">
                                    <div className="card p-4">
                                    <div className="">Do You Have TicketPasses</div>
                                    <div className="">
                                    <input type="radio" name="ticketPassY" onChange={e=>{setTicketPassY(e.target.value)}} id="yes" value={"yes"}></input><label htmlFor="yes"> Yes</label>

                                    </div>
                                   {ticketYes==='yes'?<>
                                    <div className="">
                                    <select className="form-control" id="purchasedPassId" onChange={e=>{setFreeMovie(e.target.value)}}>
                                        <option value={""}>Select Pass</option>
                                        {ticketPasses.map((ticketPass,index)=>
                                         <option value={ticketPass['purchasePassId']}>{ticketPass['ticketPassModel']['passTitle']}</option>
                                        )}
                                    </select>
                                   </div>
                                   </>:<></>}


                                   <div className="">Do You Have Discount Coupon</div>
                                   <div className="">
                                   <input type="radio" name="couponY" onChange={e=>{setDiscountCoupon(e.target.value)}} id="yes" value={"yes"}></input><label htmlFor="yes">Yes</label>
                                   </div>
                                  {couponYes==='yes'?<>
                                  <form onSubmit={setCouponCode}>
                                  <input type="text" id="couponCode" placeholder="Coupon Code"  className="form-control mt-1"></input>
                                  <input type="submit" value={"Validate"} className="btn btn-primary mt-2"></input>
                                  </form>
                                  </>:<></>}
                                   </div>
                                </div>
                                <div class="col-md-6 card p-3">
                                    <form onSubmit={PayAmountAction}>
                                        <input type="hidden" name="bookingId" id="bookingId" value={bookingId} />
                                        {freeMovie!=''?<>
                                            <input type="hidden" name="purchasePassId" id="purchasePassId" value={freeMovie} />
                                        </>:<></>}
                                        {discountAmount!=""?<>
                                            <input type="hidden" id="totalPrice" value={parseFloat(totalPrice)+parseFloat(totalPrice2)*10/100-discountAmount}></input>

                                        </>:<>
                                        <input type="hidden" id="totalPrice" value={parseFloat(totalPrice)+parseFloat(totalPrice2)*10/100}></input>

                                        </>}
                                        <div className="row">
                                            <div className="col-md-">
                                            {freeMovie!=''?<>
                                                <div className="h6 mt-1">No Price For Tickets</div>
                                            </>:<>
                                            {discountAmount!=""?<>
                                                <div className="mt-1">Tickets Price : <b>${totalPrice}</b></div>
                                            </>:<>
                                            <div className="mt-1">Tickets Price : <b>${totalPrice}</b></div>
                                            </>}
                                            
                                            </>}

                                            </div>
                                            <div className="col-md-">
                                                <div className="mt-1">Tax : 10(%) : <b>${parseFloat(totalPrice2)*10/100}</b></div>

                                            </div>
                                            <div className="col-md-">
                                                {discountAmount!=""?<>
                                                 <div className="mt-2">Discount Amount Applied : {discount}% →   <b>${discountAmount} = {totalPrice}-{discountAmount} </b></div>
                                                </>:<></>}
                                            </div>
                                            <div className="col-md-">
                                                <div className="mt-1">Grand Total →(tikcetPrice-discount+tax) : <b>${parseFloat(totalPrice)+parseFloat(totalPrice2)*10/100-discountAmount}</b></div>

                                            </div>

                                            
                                        </div>
                                        {discountAmount!=""?<>
                                            <div class="text-center h4 mt-3">Total Price : ${parseFloat(totalPrice)+parseFloat(totalPrice2)*10/100-discountAmount}</div>
                                        </>:<>
                                        <div class="text-center h4 mt-3">Total Price : ${parseFloat(totalPrice)+parseFloat(totalPrice2)*10/100}</div>

                                        </>}
                                        <div class="mt-3">
                                            <label>Name On Card</label>
                                            <input type="text" name="card_name" id="card_name" placeholder="Card holder_name" class="form-control" />
                                        </div>
                                        <div class="mt-3">
                                            <label>Card Number</label>
                                            <input type="number" min={1} name="card_number" id="card_number" placeholder="Card Number" class="form-control" />
                                        </div>
                                        <div class="mt-3">
                                            <label>Expire Date</label>
                                            <input type="text" name="expire_date" id="expire_date" class="form-control" placeholder="Expire Date" />
                                        </div>
                                        <div class="mt-3">
                                            <label>CVV</label>
                                            <input type="text" name="cvv" id="cvv" class="form-control" placeholder="Enter CVV" />
                                        </div>

                                        <div class="mt-3">
                                            <input type="submit" value="Pay" class="btn btn-success w-100 mt-1" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BookTickets;