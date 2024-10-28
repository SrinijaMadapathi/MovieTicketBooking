package moviebooking.services;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.models.CustomerModel;
import moviebooking.models.PurchasedPassModel;
import moviebooking.models.TicketPassModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.CustomerRepository;
import moviebooking.repositories.PurchasedPassRepository;
import moviebooking.repositories.TicketPassRepository;

@Service
@Transactional
public class PurchasedPassService {
	@Autowired private PurchasedPassRepository purchasedPassRepository;
	@Autowired private TicketPassRepository ticketPassRepository;
	@Autowired private CustomerRepository customerRepository;
	@Autowired private CredentialRepository credentialRepository;

	public String buyTicketPass(long ticketPassId, Principal principal) {
		CustomerModel customerModel   = customerRepository.findByEmail(principal.getName()).get(0);
		TicketPassModel ticketPassModel = ticketPassRepository.findById(ticketPassId).get();
		PurchasedPassModel purchasedPassModel2 = purchasedPassRepository.findByCustomerModelAndTicketPassModel(customerModel,ticketPassModel);
		if(purchasedPassModel2!=null) {
			return "Already Purchased";
		}
		int moviesWatched = 0;
		PurchasedPassModel purchasedPassModel  = new PurchasedPassModel();
		purchasedPassModel.setEndDate(ticketPassModel.getEndDate());
		purchasedPassModel.setStartDate(ticketPassModel.getStartDate());
		purchasedPassModel.setNoOfMovieAllowed(ticketPassModel.getNoOfMovieAllowed());
		purchasedPassModel.setCustomerModel(customerModel);
		purchasedPassModel.setTicketPassModel(ticketPassModel);
		purchasedPassModel.setMoviesWatched(moviesWatched);
		purchasedPassRepository.save(purchasedPassModel);
		return "Purchased";
	}

	public List<PurchasedPassModel> purchasedTicketPasses(String name) {
		CustomerModel customerModel = customerRepository.findByEmail(name).get(0);
		List<PurchasedPassModel> purchasedPassModelsList = purchasedPassRepository.findByCustomerModel(customerModel);
		Iterator<PurchasedPassModel> iterator = purchasedPassModelsList.iterator();
		List<PurchasedPassModel> purchasedPassModelsList2  = new ArrayList<>();
		while(iterator.hasNext()) {
			PurchasedPassModel purchasedPassModel = iterator.next();
			Date date = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String currentDateTime = dateFormat.format(date);
		    PurchasedPassModel purchasedPassModel2 = purchasedPassRepository.getIsExpired(purchasedPassModel.getPurchasePassId(),currentDateTime);
		    System.out.println(purchasedPassModel2);
		    if(purchasedPassModel2!=null) {
		    	if(purchasedPassModel2.getNoOfMovieAllowed()!=purchasedPassModel2.getMoviesWatched()) {
		    		purchasedPassModelsList2.add(purchasedPassModel2);
		    	}
		    }
		}
		return purchasedPassModelsList2;
	}

	public List<PurchasedPassModel> purchasedPass(String name) {
		CredentialModel credentialModel = credentialRepository.findByUserName(name);
		List<PurchasedPassModel> purchasedPassModelsList = new ArrayList<>();
        if(credentialModel.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
        	purchasedPassModelsList = purchasedPassRepository.findAll();
        }else if(credentialModel.getRole().equalsIgnoreCase("ROLE_CUSTOMER")){
        	CustomerModel customerModel = customerRepository.findByEmail(name).get(0);
    		purchasedPassModelsList = purchasedPassRepository.findByCustomerModel(customerModel);
        }
		
		return purchasedPassModelsList;
	}

}
