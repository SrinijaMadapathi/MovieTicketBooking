package moviebooking.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.CustomerModel;
import moviebooking.services.CustomerService;

@RestController
public class CustomerController {
	@Autowired private CustomerService customerService;
	
	
	@PostMapping("customerEmailVerify")
	public CustomerModel customerEmailVerify(@RequestBody CustomerModel customerModel) {
		return customerService.customerEmailVerify(customerModel.getEmail());
	}
	@PostMapping("cutsomerRegistration")
	public String cutsomerRegistration(@RequestBody CustomerModel customerModel) {
		return customerService.cutsomerRegistration(customerModel);
	}

}
