package moviebooking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.LanguageModel;
import moviebooking.repositories.LanguageRepository;

@Service
@Transactional
public class LanguageService {
	@Autowired private LanguageRepository languageRepository;

	public String addLanguage(LanguageModel languageModel) {
		List<LanguageModel> languageModelList = languageRepository.findByLanguage(languageModel.getLanguage());
		if(languageModelList.size()>0) {
			return languageModel.getLanguage()+" Exists";
		}
		else {
			languageRepository.save(languageModel);
			return "Language Added Successfully";
		}
	}

	public List<LanguageModel> viewLanguages() {
		List<LanguageModel> languageModelList = languageRepository.findAll();
		return languageModelList;
	}

}
