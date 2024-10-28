package moviebooking.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="purchasedPass")
public class PurchasedPassModel {
	@Id
	@GeneratedValue
	
	private long purchasePassId;
	private  int moviesWatched;
	private Date startDate;
	private Date endDate;
	private int noOfMovieAllowed;

	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="customerId")
	private CustomerModel customerModel;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="ticketPassId")
	private TicketPassModel ticketPassModel;

	public long getPurchasePassId() {
		return purchasePassId;
	}

	public void setPurchasePassId(long purchasePassId) {
		this.purchasePassId = purchasePassId;
	}

	public int getMoviesWatched() {
		return moviesWatched;
	}

	public void setMoviesWatched(int moviesWatched) {
		this.moviesWatched = moviesWatched;
	}

	public CustomerModel getCustomerModel() {
		return customerModel;
	}

	public void setCustomerModel(CustomerModel customerModel) {
		this.customerModel = customerModel;
	}

	public TicketPassModel getTicketPassModel() {
		return ticketPassModel;
	}

	public void setTicketPassModel(TicketPassModel ticketPassModel) {
		this.ticketPassModel = ticketPassModel;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getNoOfMovieAllowed() {
		return noOfMovieAllowed;
	}

	public void setNoOfMovieAllowed(int noOfMovieAllowed) {
		this.noOfMovieAllowed = noOfMovieAllowed;
	}
	
	
	

}
