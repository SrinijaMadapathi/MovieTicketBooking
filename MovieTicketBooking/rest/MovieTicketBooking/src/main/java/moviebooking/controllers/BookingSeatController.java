package moviebooking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.services.BookingSeatService;

@RestController
public class BookingSeatController {
	@Autowired private BookingSeatService bookingSeatService;

}
