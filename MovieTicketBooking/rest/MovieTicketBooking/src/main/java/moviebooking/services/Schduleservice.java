package moviebooking.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
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
import moviebooking.models.MovieLanguageModel;
import moviebooking.models.MovieModel;
import moviebooking.models.ScheduleModel;
import moviebooking.models.SeatModel;
import moviebooking.models.ShowModel;
import moviebooking.models.TheatreModel;
import moviebooking.models.TheatreOwnerModel;
import moviebooking.repositories.BookingRepository;
import moviebooking.repositories.BookingSeatRepository;
import moviebooking.repositories.MovieLanguageRepository;
import moviebooking.repositories.MovieRepository;
import moviebooking.repositories.ScheduleRepository;
import moviebooking.repositories.ShowRepository;
import moviebooking.repositories.TheatreOwnerRepository;
import moviebooking.repositories.TheatreRepository;

@Service
@Transactional
public class Schduleservice {
	@Autowired private ScheduleRepository scheduleRepository;
	@Autowired private TheatreRepository theatreRepository;
	@Autowired private MovieLanguageRepository movieLanguageRepository;
	@Autowired private MovieRepository movieRepository;
	@Autowired private TheatreOwnerRepository theatreOwnerRepository;
	@Autowired private ShowRepository showRepository;
	@Autowired private BookingRepository bookingRepository;
	@Autowired private BookingSeatRepository bookingSeatRepository;
	
	@Value("${poster.path}")
	String posterPath;
	

	public String addMovieSchdule(ScheduleModel scheduleModel) throws ParseException {
		long theatreId = scheduleModel.getTheatreId();
		TheatreModel theatreModel = theatreRepository.findById(theatreId).get();
		long movieLanguageId = scheduleModel.getMovieLanguageId();
		long movieId  = scheduleModel.getMovieId();
		MovieModel movieModel = movieRepository.findById(movieId).get();
		MovieLanguageModel movieLanguageModel = movieLanguageRepository.findById(movieLanguageId).get();
		List<ShowModel>  showModelsList = scheduleModel.getShowModelsList();
		scheduleModel.setMovieLanguageModel(movieLanguageModel);
		scheduleModel.setTheatreModel(theatreModel);
		scheduleModel.setMovieModel(movieModel);
		Date from_date  =scheduleModel.getFromDate();
		String date = from_date.getDate()+"/"+(from_date.getMonth()+1)+"/"+(from_date.getYear()+1900);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date2 = simpleDateFormat.parse(date);
		scheduleModel.setFromDate(date2);
		Date to_date  =scheduleModel.getToDate();
		String to_date2 = to_date.getDate()+"/"+(to_date.getMonth()+1)+"/"+(to_date.getYear()+1900);
		SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("dd/MM/yyyy");
		Date date3 = simpleDateFormat2.parse(to_date2);
		scheduleModel.setToDate(date3);
		scheduleRepository.save(scheduleModel);
		return "Movie Scheduled";
	}

	public List<ScheduleModel> viewMovieSchdule(String name) {
		TheatreOwnerModel theatreOwnerModel = theatreOwnerRepository.findByEmail(name);
		List<TheatreModel> theatreModelsList = theatreRepository.findByTheatreOwnerModel(theatreOwnerModel);
		List<ScheduleModel> scheduleModelsList = scheduleRepository.findByTheatreModelIn(theatreModelsList);
		List<ScheduleModel> scheduleModelsList2 = new ArrayList<>();
		Iterator<ScheduleModel> iterator = scheduleModelsList.iterator();
		while(iterator.hasNext()) {
			ScheduleModel scheduleModel = iterator.next();
			MovieModel movieModel = scheduleModel.getMovieModel();
			try {
				 File file=new File(posterPath+"/"+movieModel.getPoster());
				 InputStream in = new FileInputStream(file);
				 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			scheduleModelsList2.add(scheduleModel);
		}
		return scheduleModelsList2;
	}

	public List<ScheduleModel> nowShowingMovies(String date2, String movieId, String theatreId) {
		String currentDateTime="";
		if(date2.equalsIgnoreCase("")) {
			Date date = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			currentDateTime = dateFormat.format(date);
			
		}else {
			currentDateTime = date2;
		}
		List<ScheduleModel> scheduleModelsList = new ArrayList<>();
		if(!theatreId.equalsIgnoreCase("")) {
			scheduleModelsList = scheduleRepository.getSchedule3(currentDateTime,Long.parseLong(movieId),Long.parseLong(theatreId));
		}
		else {
			scheduleModelsList = scheduleRepository.getSchedule(currentDateTime,Long.parseLong(movieId));

		}
		Iterator<ScheduleModel> iterator = scheduleModelsList.iterator();
		List<ScheduleModel> scheduleModelsList2 = new ArrayList<>();
		while(iterator.hasNext()) {
			ScheduleModel scheduleModel = iterator.next();
			MovieModel movieModel = scheduleModel.getMovieModel();
			try {
				 File file=new File(posterPath+"/"+movieModel.getPoster());
				 InputStream in = new FileInputStream(file);
				 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			scheduleModelsList2.add(scheduleModel);
			
		}
		return scheduleModelsList2;
	}
	

	public List<SeatModel> getSeats(long showId, int noOfSeats, long scheduleId, String bookingDate) throws ParseException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date bookingDate2 = simpleDateFormat.parse(bookingDate);
		List<SeatModel> seatModelsList = new ArrayList<>();
		for (int i = 1; i < noOfSeats+1; i++) {
			SeatModel seatModel = new SeatModel();
			seatModel.setSeatNumber(i);
			 List<BookingSeatModel> bookingSeatModelList = bookingSeatRepository.getBookingSeatModel(i,"Booked",bookingDate2,showId);
			 if(bookingSeatModelList.size()>0) {
				 seatModel.setSeatBooked(true);
			 }else {
				 seatModel.setSeatBooked(false); 
				 
			 }
			 seatModelsList.add(seatModel);
			
		}
		
		return seatModelsList;
	}

	
	public List<ScheduleModel> scheduledBookings(long scheduleId, String date2) {
		String currentDateTime="";
		if(date2.equalsIgnoreCase("")) {
			Date date = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			currentDateTime = dateFormat.format(date);
			
		}else {
			currentDateTime = date2;
		}
		List<ScheduleModel> scheduleModelsList = new ArrayList<>();
		scheduleModelsList = scheduleRepository.getSchedule4(currentDateTime,scheduleId);
		Iterator<ScheduleModel> iterator = scheduleModelsList.iterator();
		List<ScheduleModel> scheduleModelsList2 = new ArrayList<>();
		while(iterator.hasNext()) {
			ScheduleModel scheduleModel = iterator.next();
			MovieModel movieModel = scheduleModel.getMovieModel();
			try {
				 File file=new File(posterPath+"/"+movieModel.getPoster());
				 InputStream in = new FileInputStream(file);
				 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			scheduleModelsList2.add(scheduleModel);
			
		}
		return scheduleModelsList2;
	}

}
