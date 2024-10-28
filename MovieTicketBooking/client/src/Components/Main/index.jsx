import Head from "./Head";

function Index(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let message = params.get('message');
    return(
        <>
        <div className="home-pic">
           <Head/>
           {message!=""?<>
             <div className="text-danger text-center h1 mt-5">{message}</div>
           </>:<></>}
           <div className="text-center h1" style={{lineHeight:"500px"}}><b className="bg-info p-2">Welcome To Movie Ticket Booking</b></div>
        </div>
        
        </>
    )
}
export default Index;