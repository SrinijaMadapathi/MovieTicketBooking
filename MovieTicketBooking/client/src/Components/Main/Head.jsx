import { Link } from "react-router-dom";

function Head() {
    return (
        <>
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-header">
                    <Link to="/" className="h2 nav-link" >
                            <div className="text-danger h3  " style={{lineHeight:"30px"}}>Movie Ticket Booking</div>
                        </Link>
                    </div>
                    <div class="navbar-menu" id="open-navbar1">
                        <ul class="navbar-nav">
                       
                            <li class="active"><Link to={"/"}>Home</Link></li>
                            <li><Link to={"/adminLogin"}>Admin</Link></li>
                            <li><Link to={"/productionCompanyLogin"}>Production Company</Link></li>
                            <li><Link to={"/theaterOwnerLogin"}>Theatre Owner</Link></li>
                            <li><Link to={"/customerLogin"}>Customer</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Head;