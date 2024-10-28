package moviebooking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.LocationModel;
import moviebooking.services.LocationService;

@RestController
public class LocationController {
	@Autowired private LocationService locationService;
	
	@PostMapping("addLocation")
	public String addLocation(@RequestBody LocationModel locationModel) {
		return locationService.addLocation(locationModel);
	}
	
	@GetMapping("viewLocations")
	public List<LocationModel> viewLocations(){
		return locationService.viewLocations();
	}

}
