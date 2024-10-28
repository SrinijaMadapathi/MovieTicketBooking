import { Link } from "react-router-dom";

function Thead(){
    return(
        <>
        <nav class="navbar">
                <div class="container">
                    <div class="navbar-header">
                    <Link to="/theatreOwnerHome" className="h2 nav-link" >
                            <div className="text-danger h3  " style={{lineHeight:"30px"}}>Movie Ticket Booking</div>
                        </Link>
                    </div>
                    <div class="navbar-menu" id="open-navbar1">
                        <ul class="navbar-nav">
                            <li class="active"><Link to={"/theatreOwnerHome"}></Link></li>
                            <li><Link to={"/theatres"}>Theatres</Link></li>
                            <li><Link to={"/viewMovies"}>Movies</Link></li>
                            <li><Link to={"/schedules"}>Schedules</Link></li>
                            <li><Link to={"/logout"}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Thead;