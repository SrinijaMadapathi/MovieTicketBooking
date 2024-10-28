package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.GenreModel;

public interface GenreRepository extends JpaRepository<GenreModel, Long> {

	List<GenreModel> findByGenreName(String genreName);

}
