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

import moviebooking.models.BookingModel;
import moviebooking.services.BookingService;

@RestController
public class BookingController {
	@Autowired private BookingService bookingService;
	
	
	@PostMapping("bookSeats")
	public BookingModel bookSeats(@RequestBody BookingModel bookingModel,Principal principal,@RequestParam("scheduleId") long scheduleId) throws ParseException {
		return bookingService.bookSeats(bookingModel,principal.getName(),scheduleId);
	}
	
	@GetMapping("payAmount")
	public String payAmount(@RequestParam("bookingId") long bookingId,@RequestParam("totalPrice") float totalPrice,@RequestParam("purchasePassId") String purchasePassId) {
		return bookingService.payAmount(bookingId,totalPrice,purchasePassId);
	}
	
	@GetMapping("bookings")
	public List<BookingModel> bookings(Principal principal,@RequestParam("scheduleId") String scheduleId,@RequestParam("showId") String showId,@RequestParam("bookingDate") String bookingDate) throws ParseException{
		return bookingService.bookings(principal.getName(),scheduleId,showId,bookingDate);
	}
	
	@GetMapping("cancelBooking")
	public String cancelBooking(@RequestParam("bookingId") long bookingId) {
		return bookingService.cancelBooking(bookingId);
	}

}
