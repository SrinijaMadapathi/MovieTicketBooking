package moviebooking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.models.TheatreOwnerModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.TheatreOwnerRepository;

@Service
@Transactional
public class TheatreOwnerService {
	@Autowired private TheatreOwnerRepository theatreOwnerRepository;
	@Autowired private CredentialRepository credentialRepository;
	
	public String addTheatreOwner(TheatreOwnerModel theatreOwnerModel) {
		List<TheatreOwnerModel> theatreOwnerModelList = theatreOwnerRepository.findByEmailOrPhone(theatreOwnerModel.getEmail(),theatreOwnerModel.getPhone());
		if(theatreOwnerModelList.size()>0) {
			return "Duplicate Details";
		}else {
			CredentialModel credentialModel3 = credentialRepository.findByUserName(theatreOwnerModel.getEmail());
			if(credentialModel3!=null) {
				return "Email Exists";
			}else {
				List<CredentialModel> credentialModelsList = credentialRepository.findAll();
				if(credentialModelsList.size()==0) {
					CredentialModel credentialModel = new CredentialModel();
					credentialModel.setUserName("admin");
					credentialModel.setPassword(new BCryptPasswordEncoder().encode("admin"));
					credentialModel.setRole("ROLE_ADMIN");
					credentialRepository.save(credentialModel);
					
					
				}
				CredentialModel credentialModel = new CredentialModel();
				credentialModel.setRole("ROLE_THEATREOWNER");
				credentialModel.setUserName(theatreOwnerModel.getEmail());
				credentialModel.setPassword(new BCryptPasswordEncoder().encode(theatreOwnerModel.getPassword()));
				credentialRepository.save(credentialModel);
				CredentialModel credentialModel2 = credentialRepository.findByUserName(theatreOwnerModel.getEmail());
				theatreOwnerModel.setCredentialModel(credentialModel2);
				theatreOwnerModel.setStatus("Not Verified");
				theatreOwnerRepository.save(theatreOwnerModel);
				return "Registered Successfully";
			}
			
		}
		
	}

	public List<TheatreOwnerModel> theatreOwners() {
		List<TheatreOwnerModel> theatreOwnerModelList = theatreOwnerRepository.findAll();
		return theatreOwnerModelList;
	}

	public String verifyTheatreOwner(long theatreOwnerId) {
		TheatreOwnerModel theatreOwnerModel = theatreOwnerRepository.findById(theatreOwnerId).get();
		if(theatreOwnerModel.getStatus().equalsIgnoreCase("Not Verified")) {
			theatreOwnerModel.setStatus("Verified");
			theatreOwnerRepository.saveAndFlush(theatreOwnerModel);
			return "Approved";
		}else {
			theatreOwnerModel.setStatus("Not Verified");
			theatreOwnerRepository.saveAndFlush(theatreOwnerModel);
			return "Rejected";

		}
		
	}

	public String theatreOwnerValid(String name) {
		TheatreOwnerModel theatreOwnerModel  = theatreOwnerRepository.findByEmail(name);
		if(theatreOwnerModel.getStatus().equalsIgnoreCase("Not Verified")) {
			return "Not Verified";
		}else {
			return "Verified";
		}
		
	}

}
