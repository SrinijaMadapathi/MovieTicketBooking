package moviebooking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="genres")
public class GenreModel {
	@Id
	@GeneratedValue
	private long genreId;
	private String genreName;
	public long getGenreId() {
		return genreId;
	}
	public void setGenreId(long genreId) {
		this.genreId = genreId;
	}
	public String getGenreName() {
		return genreName;
	}
	public void setGenreName(String genreName) {
		this.genreName = genreName;
	} 
	
	
	

}
