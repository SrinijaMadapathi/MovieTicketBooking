package moviebooking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="locations")
public class LocationModel {
	@Id
	@GeneratedValue
	private long locationId;
	private String locationName;
	public long getLocationId() {
		return locationId;
	}
	public void setLocationId(long locationId) {
		this.locationId = locationId;
	}
	public String getLocationName() {
		return locationName;
	}
	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}
	
	

}
