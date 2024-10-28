package moviebooking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="languages")
public class LanguageModel {
	@Id
	@GeneratedValue
	private long languageId;
	private String language;
	public long getLanguageId() {
		return languageId;
	}
	public void setLanguageId(long languageId) {
		this.languageId = languageId;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
   
	
}
