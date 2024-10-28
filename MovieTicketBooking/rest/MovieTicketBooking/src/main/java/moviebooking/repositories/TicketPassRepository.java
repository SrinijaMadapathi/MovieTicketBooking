package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.CustomerModel;
import moviebooking.models.TicketPassModel;

public interface TicketPassRepository extends JpaRepository<TicketPassModel, Long> {


}
