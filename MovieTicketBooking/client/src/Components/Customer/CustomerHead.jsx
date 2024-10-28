import { Link } from "react-router-dom";

function CustomerHead(){
    return(
        <>
        <nav class="navbar">
                <div class="container">
                    <div class="navbar-header">
                    <Link to="/customerHome" className="h2 nav-link" >
                            <div className="text-danger h3  " style={{lineHeight:"30px"}}>Movie Ticket Booking</div>
                        </Link>
                    </div>
                    <div class="navbar-menu" id="open-navbar1">
                        <ul class="navbar-nav">
                            <li class="active"><Link to={"/customerHome"}>DashBoard</Link></li>
                            <li><Link to={"/ticketPasses"}>Ticket Passes</Link></li>
                            <li class="active"><Link to={"/bookings"}>My Bookings</Link></li>
                            <li><Link to={"/logout"}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default CustomerHead;