package moviebooking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.GenreModel;
import moviebooking.services.GenreService;

@RestController
public class GenreController {
	@Autowired private GenreService genreService;
	
	@PostMapping("addGenre")
	public String addGenre(@RequestBody GenreModel genreModel) {
		return genreService.addGenre(genreModel);
	}
	
	@GetMapping("viewGenres")
	public List<GenreModel> viewGenres(){
		return genreService.viewGenres();
	}

}
