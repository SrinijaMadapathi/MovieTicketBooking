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
import jakarta.persistence.Transient;

@Entity
@Table(name="customers")
public class CustomerModel {
	
	@Id
	@GeneratedValue
	private long customerId;
	private String name;
	private String email;
	private String phone;
	@Transient
	private String authenticateEmail;
	@Transient
	private String otp;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="credentialId")
	private CredentialModel credentialModel;
	
	
	public long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public CredentialModel getCredentialModel() {
		return credentialModel;
	}
	public void setCredentialModel(CredentialModel credentialModel) {
		this.credentialModel = credentialModel;
	}
	public String getAuthenticateEmail() {
		return authenticateEmail;
	}
	public void setAuthenticateEmail(String authenticateEmail) {
		this.authenticateEmail = authenticateEmail;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	
	
	
	
	

}
