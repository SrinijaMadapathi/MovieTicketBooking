package moviebooking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.LanguageModel;
import moviebooking.services.LanguageService;

@RestController
public class LanguageController {
	@Autowired private LanguageService languageService;
	
	@PostMapping("addLanguage")
	public String addLanguage(@RequestBody LanguageModel languageModel) {
		return languageService.addLanguage(languageModel);
	}
	
	@GetMapping("viewLanguages")
	public List<LanguageModel> viewLanguages(){
		return languageService.viewLanguages()
;	}

}
