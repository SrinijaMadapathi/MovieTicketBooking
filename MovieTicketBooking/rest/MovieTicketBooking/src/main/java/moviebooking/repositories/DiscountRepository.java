package moviebooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import moviebooking.models.DiscountModel;

public interface DiscountRepository extends JpaRepository<DiscountModel, Long> {
	
	
	@Query(value = "select * from discount where ?2>=start_date and ?2<=exp_date and coupon_code=?1", nativeQuery = true)
	DiscountModel getDiscountValidate(String couponCode, String currentDateTime);

}
