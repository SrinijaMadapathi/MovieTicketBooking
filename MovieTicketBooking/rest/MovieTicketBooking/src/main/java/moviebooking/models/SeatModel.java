package moviebooking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="seats")
public class SeatModel {
	@Id
	@GeneratedValue
	
	private long seatId;
	private int seatNumber;
	private boolean isSeatBooked;
	public long getSeatId() {
		return seatId;
	}
	public void setSeatId(long seatId) {
		this.seatId = seatId;
	}
	
	public int getSeatNumber() {
		return seatNumber;
	}
	public void setSeatNumber(int seatNumber) {
		this.seatNumber = seatNumber;
	}
	public boolean isSeatBooked() {
		return isSeatBooked;
	}
	public void setSeatBooked(boolean isSeatBooked) {
		this.isSeatBooked = isSeatBooked;
	}
	
	
	

}
