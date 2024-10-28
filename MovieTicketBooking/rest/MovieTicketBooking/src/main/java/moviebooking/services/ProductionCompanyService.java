package moviebooking.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.models.ProductionCompanyModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.ProductionCompanyRepository;


@Service
@Transactional
public class ProductionCompanyService {
	@Autowired private ProductionCompanyRepository productionCompanyRepository;
	@Autowired private CredentialRepository credentialRepository;
	@Value("${logo.path}")
	String logoPath;
	

	public String addProdutionCompany(ProductionCompanyModel productionCompanyModel) {
		List<ProductionCompanyModel> productionCompanyModelsList = productionCompanyRepository.findByEmailOrPhone(productionCompanyModel.getEmail(),productionCompanyModel.getPhone());
		if(productionCompanyModelsList.size()>0) {
			return "Duplicate Details";
		}else {
			CredentialModel credentialModel = credentialRepository.findByUserName(productionCompanyModel.getEmail());
			if(credentialModel!=null) {
				return "Email Exists";
			}else {
				CredentialModel credentialModel2 = new CredentialModel();
				credentialModel2.setUserName(productionCompanyModel.getEmail());
				credentialModel2.setPassword(new BCryptPasswordEncoder().encode(productionCompanyModel.getPassword()));
				credentialModel2.setRole("ROLE_PRODUCTIONCOMPANY");
				CredentialModel credentialModel3 = credentialRepository.save(credentialModel2);
				productionCompanyModel.setCredentialModel(credentialModel3);
				productionCompanyRepository.save(productionCompanyModel);
				return "Added Successfullly";
			}
			
		}
		
	}


	public List<ProductionCompanyModel> produtionCompanies() {
		List<ProductionCompanyModel>  productionCompanyModelList = new ArrayList<ProductionCompanyModel>();
		List<ProductionCompanyModel>  productionCompanyModelList2 = productionCompanyRepository.findAll();
		Iterator<ProductionCompanyModel> iterator = productionCompanyModelList2.iterator();
		while(iterator.hasNext()) {
			ProductionCompanyModel productionCompanyModel = iterator.next();
			try {
				 File file=new File(logoPath+"/"+productionCompanyModel.getLogo());
				 InputStream in = new FileInputStream(file);
				 productionCompanyModel.setLogo2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			productionCompanyModelList.add(productionCompanyModel);
		}
		return productionCompanyModelList;
	}

}
