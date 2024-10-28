import { Link } from "react-router-dom";

function AdminHead(){
    return(
        <>
         <nav class="navbar">
                <div class="container">
                    <div class="navbar-header">
                    <Link to="/adminHome" className="h2 nav-link" >
                            <div className="text-danger h3  " style={{lineHeight:"30px"}}> </div>
                        </Link>
                    </div>
                    <div class="navbar-menu" id="open-navbar1">
                        <ul class="navbar-nav">
                       
                            {/* <li class="active"><Link to={"/adminHome"}>DashBoard</Link></li> */}
                            <li><Link to={"/productionCompanies"}>Production Companies</Link></li>
                            <li><Link to={"/locations"}>Locations</Link></li>
                            <li><Link to={"/genres"}>Genres</Link></li>
                            <li><Link to={"/languages"}>Languages</Link></li>
                            <li><Link to={"/theatreOwners"}>TheatreOwners</Link></li>
                            <li><Link to={"/viewMovies"}>Movies</Link></li>
                            <li><Link to={"/ticketPasses"}>Ticket Passes</Link></li>
                            <li><Link to={"/discounts"}>Discounts</Link></li>
                            <li><Link to={"/logout"}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default AdminHead;