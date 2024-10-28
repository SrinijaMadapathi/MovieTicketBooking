package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.LanguageModel;

public interface LanguageRepository extends JpaRepository<LanguageModel, Long> {

	List<LanguageModel> findByLanguage(String language);

}
