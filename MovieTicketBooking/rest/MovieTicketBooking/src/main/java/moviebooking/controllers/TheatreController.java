package moviebooking.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.TheatreModel;
import moviebooking.services.TheatreService;

@RestController
public class TheatreController {
	@Autowired private TheatreService theatreService;
	
	@PostMapping("addTheatre")
	public String addTheatre(@RequestBody TheatreModel theatreModel,Principal principal,@RequestParam("locationId") long locationId) {
		return theatreService.addTheatre(theatreModel,principal.getName(),locationId);
	}
	
	@GetMapping("viewTheatres")
	public List<TheatreModel> viewTheatres(Principal principal){
		return theatreService.viewTheatres(principal.getName());
	}
	
	@GetMapping("getTheatres")
	public List<TheatreModel> getTheatres(){
		return theatreService.getTheatres();
	}

}
