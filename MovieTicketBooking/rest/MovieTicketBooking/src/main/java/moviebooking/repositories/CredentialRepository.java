package moviebooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.CredentialModel;

public interface CredentialRepository extends JpaRepository<CredentialModel, Long> {

	CredentialModel findByUserName(String username);

}
