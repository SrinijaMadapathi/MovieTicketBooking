package moviebooking.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.MovieLanguageModel;
import moviebooking.models.MovieModel;
import moviebooking.repositories.MovieLanguageRepository;
import moviebooking.repositories.MovieRepository;

@Service
@Transactional
public class MovieLanguageService {
	@Autowired private MovieLanguageRepository movieLanguageRepository;
	@Autowired private MovieRepository movieRepository;

	public List<MovieLanguageModel> getMovieLanguages(long movieId) {
		MovieModel movieModel = movieRepository.findById(movieId).get();
		List<MovieLanguageModel> movieLanguageModelList = movieLanguageRepository.findByMovieModel(movieModel);
		return movieLanguageModelList;
	}

	public List<MovieLanguageModel> movieLanguages() {
		List<MovieLanguageModel> movieLanguageModelList = movieLanguageRepository.findAll();
		return movieLanguageModelList;
	}

}
