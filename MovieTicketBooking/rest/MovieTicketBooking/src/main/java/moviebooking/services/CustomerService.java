package moviebooking.services;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import moviebooking.config.email.EmailSending;
import moviebooking.models.CredentialModel;
import moviebooking.models.CustomerModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.CustomerRepository;

@Service
@Transactional
public class CustomerService {
	@Autowired private CustomerRepository customerRepository;
	@Autowired private CredentialRepository credentialRepository;

	public CustomerModel customerEmailVerify(String email) {
		List<CustomerModel> customerModelsList = customerRepository.findByEmail(email);
		if(customerModelsList.size()>0) {
			String otp= new DecimalFormat("000000").format(new Random().nextInt(999999));
			EmailSending.send_message(email, "Otp For Login Account", "Use This Otp To Login Your Account \n OTP :"+otp);
			CustomerModel customerModel = customerModelsList.get(0);
			customerModel.setAuthenticateEmail("Email Exists");
			customerModel.setOtp(otp);
			return customerModel;
		}
		else {
			String otp= new DecimalFormat("000000").format(new Random().nextInt(999999));
			EmailSending.send_message(email, "Otp For Login Account", "Use This Otp To Login Your Account \n OTP :"+otp);
			CustomerModel customerModel = new CustomerModel();
			customerModel.setAuthenticateEmail("Email Not Exists");
			customerModel.setOtp(otp);
			return customerModel;
		}
	}

	public String cutsomerRegistration(CustomerModel customerModel) {
		List<CredentialModel> credentialModelsList = credentialRepository.findAll();
		if(credentialModelsList.size()==0) {
			CredentialModel credentialModel = new CredentialModel();
			credentialModel.setUserName("admin");
			credentialModel.setPassword(new BCryptPasswordEncoder().encode("admin"));
			credentialModel.setRole("ROLE_ADMIN");
			credentialRepository.save(credentialModel);
			
			
		}
		CredentialModel credentialModel = new CredentialModel();
		credentialModel.setRole("ROLE_CUSTOMER");
		credentialModel.setUserName(customerModel.getEmail());
		credentialModel.setPassword(new BCryptPasswordEncoder().encode("customer"));
		credentialRepository.save(credentialModel);
		CredentialModel credentialModel2 = credentialRepository.findByUserName(customerModel.getEmail());
		customerModel.setCredentialModel(credentialModel2);
		customerRepository.save(customerModel);
		return "Registered Successfully";
	}

}
