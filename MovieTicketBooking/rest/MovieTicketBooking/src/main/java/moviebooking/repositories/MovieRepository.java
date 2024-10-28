package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.MovieModel;
import moviebooking.models.ProductionCompanyModel;

public interface MovieRepository extends JpaRepository<MovieModel, Long> {

	List<MovieModel> findByProductionCompanyModel(ProductionCompanyModel productionCompanyModel);

	List<MovieModel> findByStatus(String string);

}
