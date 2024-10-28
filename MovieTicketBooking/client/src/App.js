import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Components/Main';
import AdminLogin from './Components/Main/AdminLogin';
import ProductionCompanyLogin from './Components/Main/ProductionCompanyLogin';
import TheaterOwnerLogin from './Components/Main/TheaterOwnerLogin';
import CustomerLogin from './Components/Main/CustomerLogin';
import CustomerRegAction from './Components/Main/CustomerRegAction';
import CustomerRegAction1 from './Components/Main/CustomerRegAction1';
import CustomerLoginAction1 from './Components/Main/CustomerLoginAction1';
import CustomerHome from './Components/Customer/CustomerHome';
import Logout from './Logout';
import TheaterOwnerRegistration from './Components/Main/TheaterOwnerRegisration';
import AdminHome from './Components/Admin/AdminHome';
import ProductionCompanies from './Components/Admin/ProductionCompanies';
import Locations from './Components/Admin/Locations';
import Genres from './Components/Admin/Genres';
import Languages from './Components/Admin/Languages';
import TheatreOwners from './Components/Admin/TheatreOwners';
import ViewMovies from './Components/ProductionCompany/ViewMovies';
import CompanyHome from './Components/ProductionCompany/CompanyHome';
import AddMovie from './Components/ProductionCompany/ AddMovie';
import WatchTrailer from './Components/ProductionCompany/WatchTrailer';
import TheatreOwnerHome from './Components/TheaterOwner/TheatreOwnerHome';
import Theatres from './Components/TheaterOwner/Theatres';
import ScheduleMovie from './Components/TheaterOwner/ScheduleMovie';
import Schedules from './Components/TheaterOwner/Schedules';
import ChooseTheatre from './Components/Customer/ChooseTheatre';
import SeatsLayout from './Components/Customer/SeatsLayout';
import BookTickets from './Components/Customer/BookTickets';
import Bookings from './Components/Customer/Bookings';
import ScheduleBookings from './Components/TheaterOwner/ScheduleBookings';
import TicketPasses from './Components/Admin/TicketPasses';
import Discounts from './Components/Admin/Discounts';
import GiveRating from './Components/Customer/GiveRating';

function App() {
  return (
   <Router>
    <div className="App">
      <Routes>
      <Route path='/' Component={Index} />
      <Route path='/adminLogin' Component={AdminLogin} />
      <Route path='/productionCompanyLogin' Component={ProductionCompanyLogin} />
      <Route path='/theaterOwnerLogin' Component={TheaterOwnerLogin} />
      <Route path='/customerLogin' Component={CustomerLogin} />
      <Route path='/customerRegAction' Component={CustomerRegAction} />
      <Route path='/customerRegAction1' Component={CustomerRegAction1} />
      <Route path='/customerLoginAction1' Component={CustomerLoginAction1} />
      <Route path='/customerHome' Component={CustomerHome} />
      <Route path='/logout' Component={Logout} />
      <Route path='/theaterOwnerReg' Component={TheaterOwnerRegistration} />
      <Route path='/adminHome' Component={AdminHome} />
      <Route path='/productionCompanies' Component={ProductionCompanies} />
      <Route path='/locations' Component={Locations} />
      <Route path='/genres' Component={Genres} />
      <Route path='/languages' Component={Languages} />
      <Route path='/theatreOwners' Component={TheatreOwners} />
      <Route path='/viewMovies' Component={ViewMovies} />
      <Route path='/companyHome' Component={CompanyHome} />
      <Route path='/addMovie' Component={AddMovie} />
      <Route path='/WatchTrailer' Component={WatchTrailer} />
      <Route path='/theatreOwnerHome' Component={TheatreOwnerHome} />
      <Route path='/theatres' Component={Theatres} />
      <Route path='/scheduleMovie' Component={ScheduleMovie} />
      <Route path='/schedules' Component={Schedules} />
      <Route path='/chooseTheatre' Component={ChooseTheatre} />
      <Route path='/seatsLayout' Component={SeatsLayout} />
      <Route path='/bookTickets' Component={BookTickets} />
      <Route path='/bookings' Component={Bookings} />
      <Route path='/scheduleBookings' Component={ScheduleBookings} />
      <Route path='/ticketPasses' Component={TicketPasses} />
      <Route path='/discounts' Component={Discounts} />
      <Route path='/giveRating' Component={GiveRating} />
      
      </Routes>
    </div>
   </Router>
  );
}

export default App;
