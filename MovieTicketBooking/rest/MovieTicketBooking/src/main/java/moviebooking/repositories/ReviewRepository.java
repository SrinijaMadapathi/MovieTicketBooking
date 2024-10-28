package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.MovieModel;
import moviebooking.models.ReviewModel;

public interface ReviewRepository extends JpaRepository<ReviewModel, Long> {

	List<ReviewModel> findByMovieModel(MovieModel movieModel);

}
