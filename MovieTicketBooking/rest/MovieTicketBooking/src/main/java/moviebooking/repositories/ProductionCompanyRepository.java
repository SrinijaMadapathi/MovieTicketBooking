package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.ProductionCompanyModel;

public interface ProductionCompanyRepository extends JpaRepository<ProductionCompanyModel, Long> {

	List<ProductionCompanyModel> findByEmailOrPhone(String email, String phone);

	ProductionCompanyModel findByEmail(String name);

}
