package moviebooking.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.TheatreOwnerModel;
import moviebooking.services.TheatreOwnerService;

@RestController
public class TheatreOwnerController {
	@Autowired private TheatreOwnerService theatreOwnerService;

	@PostMapping("addTheatreOwner")
	public String addTheatreOwner(@RequestBody TheatreOwnerModel theatreOwnerModel) {
		return theatreOwnerService.addTheatreOwner(theatreOwnerModel);
	}
	
	@GetMapping("theatreOwners")
	public List<TheatreOwnerModel> theatreOwners(){
		return theatreOwnerService.theatreOwners();
	}
	
	@GetMapping("verifyTheatreOwner")
	public String verifyTheatreOwner(@RequestParam("theatreOwnerId") long theatreOwnerId) {
		return theatreOwnerService.verifyTheatreOwner(theatreOwnerId);
	}
	
    @GetMapping("theatreOwnerValid")
    public String theatreOwnerValid(Principal principal) {
    	return theatreOwnerService.theatreOwnerValid(principal.getName());
    }
}
