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
@Table(name="bookings")
public class BookingModel {
	@Id
	@GeneratedValue
	
	private long bookingId;
	private String status;
	private Date bookingDate;
	private Date date;
	private float totalPrice;
	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @OneToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="bookingId")
	private List<BookingSeatModel> bookingSeatModelsList;
	
	@Transient
	private long customerId;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="customerId")
	private CustomerModel customerModel;
	
	
	@Transient
	private long showId;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="showId")
	private ShowModel showModel;
	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="scheduleId")
	private ScheduleModel scheduleModel;
	
	

	public long getBookingId() {
		return bookingId;
	}

	public void setBookingId(long bookingId) {
		this.bookingId = bookingId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public CustomerModel getCustomerModel() {
		return customerModel;
	}

	public void setCustomerModel(CustomerModel customerModel) {
		this.customerModel = customerModel;
	}

	public long getShowId() {
		return showId;
	}

	public void setShowId(long showId) {
		this.showId = showId;
	}

	public ShowModel getShowModel() {
		return showModel;
	}

	public void setShowModel(ShowModel showModel) {
		this.showModel = showModel;
	}

//	public long getScheduleId() {
//		return scheduleId;
//	}
//
//	public void setScheduleId(long scheduleId) {
//		this.scheduleId = scheduleId;
//	}
//
//	public ScheduleModel getScheduleModel() {
//		return scheduleModel;
//	}
//
//	public void setScheduleModel(ScheduleModel scheduleModel) {
//		this.scheduleModel = scheduleModel;
//	}

	public List<BookingSeatModel> getBookingSeatModelsList() {
		return bookingSeatModelsList;
	}

	public void setBookingSeatModelsList(List<BookingSeatModel> bookingSeatModelsList) {
		this.bookingSeatModelsList = bookingSeatModelsList;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public ScheduleModel getScheduleModel() {
		return scheduleModel;
	}

	public void setScheduleModel(ScheduleModel scheduleModel) {
		this.scheduleModel = scheduleModel;
	}
	

	
	
	
	
	
	
	

}
