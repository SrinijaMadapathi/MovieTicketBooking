package moviebooking.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.ShowModel;

public interface ShowRepository extends JpaRepository<ShowModel, Long> {


}
