package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import moviebooking.models.CustomerModel;
import moviebooking.models.PurchasedPassModel;
import moviebooking.models.TicketPassModel;

public interface PurchasedPassRepository extends JpaRepository<PurchasedPassModel, Long> {

	List<PurchasedPassModel> findByCustomerModel(CustomerModel customerModel);
	
	@Query(value = "select * from purchased_pass where ?2>=start_date and ?2<=end_date and purchase_pass_id=?1", nativeQuery = true)
	PurchasedPassModel getIsExpired(long purchasePassId, String currentDateTime);

	PurchasedPassModel findByCustomerModelAndTicketPassModel(CustomerModel customerModel,
			TicketPassModel ticketPassModel);

}
