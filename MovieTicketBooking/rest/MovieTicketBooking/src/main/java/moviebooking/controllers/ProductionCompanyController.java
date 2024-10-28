package moviebooking.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import moviebooking.models.ProductionCompanyModel;
import moviebooking.services.ProductionCompanyService;

@RestController
public class ProductionCompanyController {
	@Autowired private ProductionCompanyService productionCompanyService;
	@Value("${logo.path}")
	String logoPath;
	
	@RequestMapping(value = "addProdutionCompany", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String addProdutionCompany (
			@RequestParam(name="logo") MultipartFile multipartFile,
			@RequestParam String companyName,
			@RequestParam String email,
			@RequestParam String phone,
			@RequestParam String  password
			)
	{
		try {
			File uploadedFile = new File(logoPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			ProductionCompanyModel productionCompanyModel = new ProductionCompanyModel();
			productionCompanyModel.setCompanyName(companyName);
			productionCompanyModel.setPassword(password);
			productionCompanyModel.setEmail(email);
			productionCompanyModel.setPhone(phone);
			productionCompanyModel.setLogo(multipartFile.getOriginalFilename());
			return productionCompanyService.addProdutionCompany(productionCompanyModel);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	
	@GetMapping("produtionCompanies")
	public List<ProductionCompanyModel> produtionCompanies(){
		return productionCompanyService.produtionCompanies();
	}

}
