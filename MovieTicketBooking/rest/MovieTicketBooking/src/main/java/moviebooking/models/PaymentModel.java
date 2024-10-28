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
@Table(name="payments")
public class PaymentModel {
	@Id
	@GeneratedValue
	
	private long paymentId;
	private String status;
	private Date date;
	private float amount;
   
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="bookingId")
	private BookingModel bookingModel;


	public long getPaymentId() {
		return paymentId;
	}


	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public float getAmount() {
		return amount;
	}


	public void setAmount(float amount) {
		this.amount = amount;
	}


	public BookingModel getBookingModel() {
		return bookingModel;
	}


	public void setBookingModel(BookingModel bookingModel) {
		this.bookingModel = bookingModel;
	}
	
	
	

}
