package moviebooking.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="movies")
public class MovieModel {
	@Id
	@GeneratedValue
	private long movieId;
	private String title;
	private String trailerUrl;
	private String certification;
	private String releaseDate;
	@Lob
	private String poster;
	@Transient 
	private String poster2;
	private String description;
	private String status;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="genreId")
	private GenreModel genreModel;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="productionCompanyId")
	private ProductionCompanyModel productionCompanyModel;
	public long getMovieId() {
		return movieId;
	}
	public void setMovieId(long movieId) {
		this.movieId = movieId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTrailerUrl() {
		return trailerUrl;
	}
	public void setTrailerUrl(String trailerUrl) {
		this.trailerUrl = trailerUrl;
	}
	public String getCertification() {
		return certification;
	}
	public void setCertification(String certification) {
		this.certification = certification;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public String getPoster2() {
		return poster2;
	}
	public void setPoster2(String poster2) {
		this.poster2 = poster2;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public GenreModel getGenreModel() {
		return genreModel;
	}
	public void setGenreModel(GenreModel genreModel) {
		this.genreModel = genreModel;
	}
	public ProductionCompanyModel getProductionCompanyModel() {
		return productionCompanyModel;
	}
	public void setProductionCompanyModel(ProductionCompanyModel productionCompanyModel) {
		this.productionCompanyModel = productionCompanyModel;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	

}
