package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.TheatreModel;
import moviebooking.models.TheatreOwnerModel;

public interface TheatreRepository extends JpaRepository<TheatreModel, Long> {

	List<TheatreModel> findByTheatreOwnerModel(TheatreOwnerModel theatreOwnerModel);

}
