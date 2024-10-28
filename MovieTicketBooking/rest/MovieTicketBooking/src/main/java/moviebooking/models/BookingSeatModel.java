package moviebooking.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bookedSeats")
public class BookingSeatModel {
	@Id
	@GeneratedValue
	
	private long bookedSeatId;
	private int seatNumber;
	private String status;
	
	
	private long bookingId2;
	

	public long getBookedSeatId() {
		return bookedSeatId;
	}

	public void setBookedSeatId(long bookedSeatId) {
		this.bookedSeatId = bookedSeatId;
	}

	public int getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(int seatNumber) {
		this.seatNumber = seatNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getBookingId2() {
		return bookingId2;
	}

	public void setBookingId2(long bookingId2) {
		this.bookingId2 = bookingId2;
	}


	
	
	

}
