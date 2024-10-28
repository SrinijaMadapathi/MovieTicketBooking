package moviebooking.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.PurchasedPassModel;
import moviebooking.services.PurchasedPassService;

@RestController
public class PurchasedPassController {
	@Autowired private PurchasedPassService purchasedPassService;
	
	
	@GetMapping("buyTicketPass")
	public String buyTicketPass(@RequestParam("ticketPassId") long ticketPassId,Principal principal) {
		return purchasedPassService.buyTicketPass(ticketPassId,principal);
	}
	
	
	@GetMapping("purchasedTicketPasses")
	public List<PurchasedPassModel> purchasedTicketPasses(Principal principal) {
		return purchasedPassService.purchasedTicketPasses(principal.getName());
	}
	
	@GetMapping("purchasedPass")
	public List<PurchasedPassModel> purchasedPass(Principal principal){
		return purchasedPassService.purchasedPass(principal.getName());
	}

}
