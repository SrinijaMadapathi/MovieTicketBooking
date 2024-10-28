package moviebooking.services;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.models.TicketPassModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.TicketPassRepository;

@Service
@Transactional
public class TicketPassService {
	@Autowired private TicketPassRepository ticketPassRepository;
	@Autowired private CredentialRepository credentialRepository;

	public String addTicketPass(TicketPassModel ticketPassModel) throws ParseException {
		 LocalDate startDate = LocalDate.now();
		 LocalDate endDate = startDate.plusDays(ticketPassModel.getValidity());
		 Date date = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		 String date2 = date.getDate()+"/"+(date.getMonth()+1)+"/"+(date.getYear()+1900);
		 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		 Date startDate2 = simpleDateFormat.parse(date2);
		 Date endDate2 =  Date.from(endDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		 ticketPassModel.setStartDate(startDate2);
		 ticketPassModel.setEndDate(endDate2);
		 ticketPassRepository.save(ticketPassModel);
		 return "Ticket Pass Added";
	}

	public List<TicketPassModel> ticketPasses(Principal principal) {
		CredentialModel credentialModel = credentialRepository.findByUserName(principal.getName());
		List<TicketPassModel> ticketPassModelsList = new ArrayList<>();
		if(credentialModel.getRole().equalsIgnoreCase("ROLE_CUSTOMER")) {
			ticketPassModelsList = ticketPassRepository.findAll();
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
			ticketPassModelsList = ticketPassRepository.findAll();
		}
		return ticketPassModelsList;
	}
	

}
