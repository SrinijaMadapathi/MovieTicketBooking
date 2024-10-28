package moviebooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.PaymentModel;

public interface PaymentRepository extends JpaRepository<PaymentModel, Long> {

}
