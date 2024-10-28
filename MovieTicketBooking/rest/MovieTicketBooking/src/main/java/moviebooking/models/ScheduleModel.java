package moviebooking.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="schedules")
public class ScheduleModel {
	@Id
	@GeneratedValue
	
	private long scheduleId;
	private Date fromDate;
	private Date toDate;
	private int pricePerSeat;
	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="scheduleId")
	private List<ShowModel> showModelsList;
	
	
	@Transient
	private long theatreId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="theatreId")
	private TheatreModel theatreModel;
	
	@Transient
	private long movieId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="movieId")
	private MovieModel movieModel;
	
    @Transient
    private long movieLanguageId;
  
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="movieLanguageId")
	private MovieLanguageModel movieLanguageModel;
	
	@Transient
	private String seatNumber;

	public long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(long scheduleId) {
		this.scheduleId = scheduleId;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public int getPricePerSeat() {
		return pricePerSeat;
	}

	public void setPricePerSeat(int pricePerSeat) {
		this.pricePerSeat = pricePerSeat;
	}

	

	public TheatreModel getTheatreModel() {
		return theatreModel;
	}

	public void setTheatreModel(TheatreModel theatreModel) {
		this.theatreModel = theatreModel;
	}

	public MovieLanguageModel getMovieLanguageModel() {
		return movieLanguageModel;
	}

	public void setMovieLanguageModel(MovieLanguageModel movieLanguageModel) {
		this.movieLanguageModel = movieLanguageModel;
	}

	

	public long getTheatreId() {
		return theatreId;
	}

	public void setTheatreId(long theatreId) {
		this.theatreId = theatreId;
	}

	public long getMovieLanguageId() {
		return movieLanguageId;
	}

	public void setMovieLanguageId(long movieLanguageId) {
		this.movieLanguageId = movieLanguageId;
	}

	public long getMovieId() {
		return movieId;
	}

	public void setMovieId(long movieId) {
		this.movieId = movieId;
	}

	public MovieModel getMovieModel() {
		return movieModel;
	}

	public void setMovieModel(MovieModel movieModel) {
		this.movieModel = movieModel;
	}

	public List<ShowModel> getShowModelsList() {
		return showModelsList;
	}

	public void setShowModelsList(List<ShowModel> showModelsList) {
		this.showModelsList = showModelsList;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}


	
	
	
	
	

}
