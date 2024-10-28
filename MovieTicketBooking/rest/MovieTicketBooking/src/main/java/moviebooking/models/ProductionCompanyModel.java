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
@Table(name="productionCompanies")
public class ProductionCompanyModel {
	@Id
	@GeneratedValue
	private long productionCompanyId;
	private String companyName;
	private String email;
	private String phone;
	private String password;
	@Lob
	private String logo;
	@Transient
	private String logo2;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handle"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="credentialId")
	private CredentialModel credentialModel;
	public CredentialModel getCredentialModel() {
		return credentialModel;
	}
	public void setCredentialModel(CredentialModel credentialModel) {
		this.credentialModel = credentialModel;
	}
	public long getProductionCompanyId() {
		return productionCompanyId;
	}
	public void setProductionCompanyId(long productionCompanyId) {
		this.productionCompanyId = productionCompanyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getLogo2() {
		return logo2;
	}
	public void setLogo2(String logo2) {
		this.logo2 = logo2;
	}
	
	
	
	

}
