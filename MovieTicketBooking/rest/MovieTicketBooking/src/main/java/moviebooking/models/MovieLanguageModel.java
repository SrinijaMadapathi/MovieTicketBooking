package moviebooking.models;

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
@Table(name="movieLanguages")
public class MovieLanguageModel {
	@Id
	@GeneratedValue
	private long movieLanguageId;
	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="movieId")
	private MovieModel movieModel;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="languageId")
	private LanguageModel languageModel;
	public long getMovieLanguageId() {
		return movieLanguageId;
	}
	public void setMovieLanguageId(long movieLanguageId) {
		this.movieLanguageId = movieLanguageId;
	}
	public MovieModel getMovieModel() {
		return movieModel;
	}
	public void setMovieModel(MovieModel movieModel) {
		this.movieModel = movieModel;
	}
	public LanguageModel getLanguageModel() {
		return languageModel;
	}
	public void setLanguageModel(LanguageModel languageModel) {
		this.languageModel = languageModel;
	}
	
	
	

}
