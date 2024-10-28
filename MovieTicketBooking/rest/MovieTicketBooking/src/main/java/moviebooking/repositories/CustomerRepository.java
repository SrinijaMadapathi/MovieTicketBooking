package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.CustomerModel;

public interface CustomerRepository extends JpaRepository<CustomerModel, Long> {

	List<CustomerModel> findByEmail(String email);

}
