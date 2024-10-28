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
@Table(name="theatreOwners")
public class TheatreOwnerModel {
	@Id
	@GeneratedValue
	private long theatreOwnerId;
	private String ownerName;
	private String email;
	private String phone;
	private String password;
	private String address;
	private String status;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="credentialId")
	private CredentialModel credentialModel;

	public long getTheatreOwnerId() {
		return theatreOwnerId;
	}

	public void setTheatreOwnerId(long theatreOwnerId) {
		this.theatreOwnerId = theatreOwnerId;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public CredentialModel getCredentialModel() {
		return credentialModel;
	}

	public void setCredentialModel(CredentialModel credentialModel) {
		this.credentialModel = credentialModel;
	}
	
	
	public void setStatus(String status) {
		this.status=status;
	}
	public String getStatus() {
		return status;
	}

}
