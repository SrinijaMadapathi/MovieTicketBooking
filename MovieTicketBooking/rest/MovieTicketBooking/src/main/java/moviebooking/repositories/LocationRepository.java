package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.LocationModel;

public interface LocationRepository extends JpaRepository<LocationModel, Long> {

	List<LocationModel> findByLocationName(String locationName);

}
