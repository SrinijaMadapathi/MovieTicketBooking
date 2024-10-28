package moviebooking.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import moviebooking.models.MovieModel;
import moviebooking.services.MovieService;

@RestController
public class MovieController {
	@Autowired private MovieService movieService;
	
	@Value("${poster.path}")
	String posterPath;
	
	@RequestMapping(value = "addMovie", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String addMovie (
			@RequestParam(name="poster") MultipartFile multipartFile,
			@RequestParam String title,
			@RequestParam String trailerUrl,
			@RequestParam String certification,
			@RequestParam String  releaseDate,
			@RequestParam String description,
			@RequestParam long genreId,
			@RequestParam String[] language_ids,
			Principal principal
			)
	{
		System.out.println(multipartFile.getOriginalFilename());
		try {
			File uploadedFile = new File(posterPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			MovieModel movieModel = new MovieModel();
			movieModel.setTitle(title);
			movieModel.setTrailerUrl(trailerUrl);
			movieModel.setDescription(description);
			movieModel.setReleaseDate(releaseDate);
			
			movieModel.setCertification(certification);
			movieModel.setPoster(multipartFile.getOriginalFilename());
			return movieService.addMovie(principal.getName(),language_ids,genreId,movieModel);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	
	@GetMapping("viewMovies")
	public List<MovieModel> viewMovies(Principal principal){
		return movieService.viewMovies(principal.getName());
	}
	@GetMapping("getMovie")
	public MovieModel getMovie(@RequestParam("movieId") long movieId) {
		return movieService.getMovie(movieId);
	}
	
	@GetMapping("publishMovie")
	public String publishMovie(@RequestParam("movieId") long movieId) {
		return movieService.publishMovie(movieId);
	}
	
	@GetMapping("publishedMovies")
	public List<MovieModel> publishedMovies(@RequestParam("languageId") String languageId){
		return movieService.publishedMovies(languageId);
	}

}
