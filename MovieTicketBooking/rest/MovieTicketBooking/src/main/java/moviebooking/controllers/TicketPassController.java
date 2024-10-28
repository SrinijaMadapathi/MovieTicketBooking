package moviebooking.controllers;

import java.security.Principal;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.TicketPassModel;
import moviebooking.services.TicketPassService;

@RestController
public class TicketPassController {
	@Autowired private TicketPassService ticketPassService;
	
	
	@PostMapping("addTicketPass")
	public String addTicketPass(@RequestBody TicketPassModel ticketPassModel) throws ParseException {
		return ticketPassService.addTicketPass(ticketPassModel);
	}
	
	
	@GetMapping("ticketPasses")
	public List<TicketPassModel> ticketPasses(Principal principal){
		return ticketPassService.ticketPasses(principal);
	}

}
