package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.LanguageModel;
import moviebooking.models.MovieLanguageModel;
import moviebooking.models.MovieModel;

public interface MovieLanguageRepository extends JpaRepository<MovieLanguageModel, Long> {

	List<MovieLanguageModel> findByMovieModel(MovieModel movieModel);

	List<MovieLanguageModel> findByLanguageModel(LanguageModel languageModel);

	List<MovieLanguageModel> findByLanguageModelAndMovieModel(LanguageModel languageModel, MovieModel movieModel);

}
