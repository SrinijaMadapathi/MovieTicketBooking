package moviebooking.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.ReviewModel;
import moviebooking.services.Reviewservice;

@RestController
public class ReviewController {
	@Autowired private Reviewservice reviewservice;
	
	
	@PostMapping("giveRating")
	public String giveRating(@RequestBody ReviewModel reviewModel,@RequestParam("movieId") long movieId,Principal principal) {
		return reviewservice.giveRating(reviewModel,movieId,principal.getName());
	}
	
	
	@GetMapping("ratings")
	public List<ReviewModel> ratings(@RequestParam("movieId") long movieId){
		return reviewservice.ratings(movieId);
	}

}
