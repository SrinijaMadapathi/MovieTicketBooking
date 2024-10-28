package moviebooking.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ticketPass")
public class TicketPassModel {
	@Id
	@GeneratedValue
	
	private long ticketPassId;
	private int validity;
	private int noOfMovieAllowed;
	private String passTitle;
	private Date startDate;
	private Date endDate;
	public long getTicketPassId() {
		return ticketPassId;
	}
	public void setTicketPassId(long ticketPassId) {
		this.ticketPassId = ticketPassId;
	}
	public int getValidity() {
		return validity;
	}
	public void setValidity(int validity) {
		this.validity = validity;
	}
	public int getNoOfMovieAllowed() {
		return noOfMovieAllowed;
	}
	public void setNoOfMovieAllowed(int noOfMovieAllowed) {
		this.noOfMovieAllowed = noOfMovieAllowed;
	}
	public String getPassTitle() {
		return passTitle;
	}
	public void setPassTitle(String passTitle) {
		this.passTitle = passTitle;
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
	
	
	

}
