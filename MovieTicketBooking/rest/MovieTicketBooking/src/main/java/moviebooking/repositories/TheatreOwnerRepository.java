package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.TheatreOwnerModel;

public interface TheatreOwnerRepository extends JpaRepository<TheatreOwnerModel, Long> {

	List<TheatreOwnerModel> findByEmailOrPhone(String email, String phone);

	TheatreOwnerModel findByEmail(String name);

}
