package moviebooking.models;




import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="shows")
public class ShowModel {
	@Id
	@GeneratedValue
	private long showId;
	private String showNumber;
	private String showTime;
	
	
	@Transient
	private String seatNumber;
	
	
	public long getShowId() {
		return showId;
	}
	public void setShowId(long showId) {
		this.showId = showId;
	}
	
	
	public String getShowTime() {
		return showTime;
	}
	public void setShowTime(String showTime) {
		this.showTime = showTime;
	}
	public String getShowNumber() {
		return showNumber;
	}
	public void setShowNumber(String showNumber) {
		this.showNumber = showNumber;
	}
	public String getSeatNumber() {
		return seatNumber;
	}
	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}
	
	
	
	

}
