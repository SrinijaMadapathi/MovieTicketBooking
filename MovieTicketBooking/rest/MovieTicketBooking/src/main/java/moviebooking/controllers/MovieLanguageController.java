package moviebooking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.MovieLanguageModel;
import moviebooking.services.MovieLanguageService;

@RestController
public class MovieLanguageController {
	@Autowired private MovieLanguageService movieLanguageService;
	
	
	@GetMapping("getMovieLanguages")
	public List<MovieLanguageModel> getMovieLanguages(@RequestParam("movieId") long movieId){
		return movieLanguageService.getMovieLanguages(movieId);
	}
	
	@GetMapping("movieLanguages")
	public List<MovieLanguageModel> movieLanguages(){
		return movieLanguageService.movieLanguages();
	}

}
