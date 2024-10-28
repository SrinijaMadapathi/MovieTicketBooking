package moviebooking.controllers;


import java.security.Principal;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.ScheduleModel;
import moviebooking.models.SeatModel;
import moviebooking.services.Schduleservice;

@RestController
public class ScheduleController {
	@Autowired private Schduleservice schduleservice;
	
	
	@PostMapping("addMovieSchdule")
	public String addMovieSchdule(@RequestBody ScheduleModel scheduleModel) throws ParseException {
		return schduleservice.addMovieSchdule(scheduleModel);
	}
	
	@GetMapping("viewMovieSchdule")
	public List<ScheduleModel> viewMovieSchdule(Principal principal){
		return schduleservice.viewMovieSchdule(principal.getName());
	}
	
	@GetMapping("nowShowingMovies")
	public List<ScheduleModel> nowShowingMovies(@RequestParam("date") String date,@RequestParam("movieId") String movieId,@RequestParam("theatreId") String theatreId){
		return schduleservice.nowShowingMovies(date,movieId,theatreId);
	}
	
	@GetMapping("getSeats")
	public List<SeatModel> getSeats(@RequestParam("showId") long showId,@RequestParam("noOfSeats") int noOfSeats,@RequestParam("scheduleId") long scheduleId,@RequestParam("bookingDate") String bookingDate) throws ParseException{
		return schduleservice.getSeats(showId,noOfSeats,scheduleId,bookingDate);
	}
	
	@GetMapping("scheduledBookings")
	public List<ScheduleModel> scheduledBookings(@RequestParam("scheduleId") long scheduleId,@RequestParam("date") String date){
		return schduleservice.scheduledBookings(scheduleId,date);
	}

}
