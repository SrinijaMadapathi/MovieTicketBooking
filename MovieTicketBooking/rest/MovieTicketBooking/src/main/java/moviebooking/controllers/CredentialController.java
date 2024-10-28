package moviebooking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.CredentialModel;
import moviebooking.services.CredentialService;

@RestController
public class CredentialController {
	@Autowired private CredentialService credentialService;
	
	@PostMapping("customerLogin")
	public ResponseEntity<String> customerLogin(@RequestBody CredentialModel credentialModel) {
		return credentialService.loginAction(credentialModel);
	}
	@PostMapping("adminLogin")
	public ResponseEntity<String> adminLogin(@RequestBody CredentialModel credentialModel) {
		return credentialService.loginAction(credentialModel);
	}
	@PostMapping("theatreOwnerLogin")
	public ResponseEntity<String> theatreOwnerLogin(@RequestBody CredentialModel credentialModel) {
		return credentialService.loginAction(credentialModel);
	}
	@PostMapping("productionCompanyLogin")
	public ResponseEntity<String> productionCompanyLogin(@RequestBody CredentialModel credentialModel) {
		return credentialService.loginAction(credentialModel);
	}
	
	
	

}
