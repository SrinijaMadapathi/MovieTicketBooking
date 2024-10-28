package moviebooking.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.BookingModel;
import moviebooking.models.BookingSeatModel;
import moviebooking.models.CredentialModel;
import moviebooking.models.CustomerModel;
import moviebooking.models.MovieModel;
import moviebooking.models.PaymentModel;
import moviebooking.models.PurchasedPassModel;
import moviebooking.models.ScheduleModel;
import moviebooking.models.ShowModel;
import moviebooking.repositories.BookingRepository;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.CustomerRepository;
import moviebooking.repositories.PaymentRepository;
import moviebooking.repositories.PurchasedPassRepository;
import moviebooking.repositories.ScheduleRepository;
import moviebooking.repositories.ShowRepository;
import moviebooking.repositories.TheatreOwnerRepository;

@Service
@Transactional
public class BookingService {
	@Autowired private BookingRepository bookingRepository;
	@Autowired private CustomerRepository customerRepository;
	@Autowired private PaymentRepository paymentRepository;
	@Autowired private ScheduleRepository scheduleRepository;
	@Autowired private ShowRepository showRepository;
	@Autowired private CredentialRepository credentialRepository;
	@Autowired private TheatreOwnerRepository theatreOwnerRepository;
	@Autowired private PurchasedPassRepository purchasedPassRepository;
	
	@Value("${poster.path}")
	String posterPath;
	

	public BookingModel bookSeats(BookingModel bookingModel, String name, long scheduleId) throws ParseException {
		CustomerModel customerModel = customerRepository.findByEmail(name).get(0);
		List<BookingSeatModel> bookingSeatModelList = bookingModel.getBookingSeatModelsList();
		bookingModel.setCustomerModel(customerModel);
		bookingModel.setDate(new Date());
		bookingModel.setStatus("Payment Pending");
		long showId = bookingModel.getShowId();
		ScheduleModel scheduleModel = scheduleRepository.findById(scheduleId).get();
		ShowModel showModel = showRepository.findById(showId).get();
		Date bookingDate  =bookingModel.getBookingDate();
		String date = bookingDate.getDate()+"/"+(bookingDate.getMonth()+1)+"/"+(bookingDate.getYear()+1900);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date2 = simpleDateFormat.parse(date);
		bookingModel.setShowModel(showModel);
		bookingModel.setBookingDate(date2);
		bookingModel.setScheduleModel(scheduleModel);
		Iterator<BookingSeatModel> iterator = bookingSeatModelList.iterator();
		BookingModel bookingModel2 = bookingRepository.save(bookingModel);
		while(iterator.hasNext()) {
			BookingSeatModel bookingSeatModel = iterator.next();
			bookingSeatModel.setStatus("Payment Pending");
			System.out.println(bookingModel2.getBookingId());
			bookingSeatModel.setBookingId2(bookingModel2.getBookingId());
			
		}
		BookingModel bookingModel3 = bookingRepository.saveAndFlush(bookingModel2);
		return bookingModel3;
	}
	
	
	

	public String payAmount(long bookingId, float totalPrice, String purchasePassId) {
		if(!purchasePassId.equalsIgnoreCase("")) {
			PurchasedPassModel purchasedPassModel = purchasedPassRepository.findById(Long.parseLong(purchasePassId)).get();
			purchasedPassModel.setMoviesWatched(purchasedPassModel.getMoviesWatched()+1);
			purchasedPassRepository.saveAndFlush(purchasedPassModel);
		}
		BookingModel bookingModel = bookingRepository.findById(bookingId).get();
		PaymentModel paymentModel = new PaymentModel();
		paymentModel.setStatus("Transaction Successful");
		paymentModel.setDate(new Date());
		paymentModel.setAmount(totalPrice);
		paymentModel.setBookingModel(bookingModel);
		paymentRepository.save(paymentModel);
		bookingModel.setTotalPrice(totalPrice);
	    bookingModel.setStatus("Booked");
	    List<BookingSeatModel> bookingSeatModelsList = bookingModel.getBookingSeatModelsList();
	    Iterator<BookingSeatModel> iterator = bookingSeatModelsList.iterator();
	    while(iterator.hasNext()) {
	    	BookingSeatModel bookingSeatModel = iterator.next();
	    	bookingSeatModel.setStatus("Booked");
	    }
	    bookingRepository.saveAndFlush(bookingModel);
	    
		return "Tickets Booked";
	}
	
	

	public List<BookingModel> bookings(String name, String scheduleId, String showId, String bookingDate) throws ParseException {
		CredentialModel credentialModel = credentialRepository.findByUserName(name);
		List<BookingModel> bookingModelsList  =new ArrayList<>();
		if(credentialModel.getRole().equalsIgnoreCase("ROLE_THEATREOWNER")) {
			if(!scheduleId.equalsIgnoreCase("") && !showId.equalsIgnoreCase("") && !bookingDate.equalsIgnoreCase("")) {
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date bookingDate2 = simpleDateFormat.parse(bookingDate);
				ShowModel showModel = showRepository.findById(Long.parseLong(showId)).get();
				ScheduleModel scheduleModel  = scheduleRepository.findById(Long.parseLong(scheduleId)).get();
				bookingModelsList = bookingRepository.findByShowModelAndScheduleModelAndBookingDate(showModel,scheduleModel,bookingDate2);
			}

		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_CUSTOMER")) {
			CustomerModel customerModel = customerRepository.findByEmail(name).get(0);
		bookingModelsList = bookingRepository.findByCustomerModel(customerModel);
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_PRODUCTIONCOMPANY")) {
			if(!scheduleId.equalsIgnoreCase("") && !showId.equalsIgnoreCase("") && !bookingDate.equalsIgnoreCase("")) {
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date bookingDate2 = simpleDateFormat.parse(bookingDate);
				ShowModel showModel = showRepository.findById(Long.parseLong(showId)).get();
				ScheduleModel scheduleModel  = scheduleRepository.findById(Long.parseLong(scheduleId)).get();
				bookingModelsList = bookingRepository.findByShowModelAndScheduleModelAndBookingDate(showModel,scheduleModel,bookingDate2);
			}
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
			if(!scheduleId.equalsIgnoreCase("") && !showId.equalsIgnoreCase("") && !bookingDate.equalsIgnoreCase("")) {
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date bookingDate2 = simpleDateFormat.parse(bookingDate);
				ShowModel showModel = showRepository.findById(Long.parseLong(showId)).get();
				ScheduleModel scheduleModel  = scheduleRepository.findById(Long.parseLong(scheduleId)).get();
				bookingModelsList = bookingRepository.findByShowModelAndScheduleModelAndBookingDate(showModel,scheduleModel,bookingDate2);
			}
		}
		List<BookingModel> bookingModelsList2 = new ArrayList<>();
		Iterator<BookingModel> iterator = bookingModelsList.iterator();
		while(iterator.hasNext()) {
			BookingModel bookingModel= iterator.next();
			ScheduleModel scheduleModel = bookingModel.getScheduleModel();
			MovieModel movieModel = scheduleModel.getMovieModel();
			try {
				 File file=new File(posterPath+"/"+movieModel.getPoster());
				 InputStream in = new FileInputStream(file);
				 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			
			bookingModelsList2.add(bookingModel);
			
		}
		
		return bookingModelsList2;
	}
	
	

	public String cancelBooking(long bookingId) {
		BookingModel bookingModel = bookingRepository.findById(bookingId).get();
		List<BookingSeatModel> bookingSeatModelsList  = bookingModel.getBookingSeatModelsList();
		Iterator<BookingSeatModel> iterator = bookingSeatModelsList.iterator();
		while(iterator.hasNext()) {
			BookingSeatModel bookingSeatModel = iterator.next();
			bookingSeatModel.setStatus("Cancelled");
		}
		bookingModel.setStatus("Cancelled");
		bookingRepository.saveAndFlush(bookingModel);
		return "Tickets Cancelled";
	}


}
