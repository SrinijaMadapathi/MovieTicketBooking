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
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.models.GenreModel;
import moviebooking.models.LanguageModel;
import moviebooking.models.MovieLanguageModel;
import moviebooking.models.MovieModel;
import moviebooking.models.ProductionCompanyModel;
import moviebooking.repositories.CredentialRepository;
import moviebooking.repositories.GenreRepository;
import moviebooking.repositories.LanguageRepository;
import moviebooking.repositories.MovieLanguageRepository;
import moviebooking.repositories.MovieRepository;
import moviebooking.repositories.ProductionCompanyRepository;

@Service
@Transactional
public class MovieService {
	@Autowired private MovieRepository movieRepository;
	@Autowired private ProductionCompanyRepository productionCompanyRepository;
	@Autowired private GenreRepository genreRepository;
	@Autowired private MovieLanguageRepository movieLanguageRepository;
	@Autowired private LanguageRepository languageRepository;
	@Autowired private CredentialRepository credentialRepository;
	
	@Value("${poster.path}")
	String posterPath;
	
	public String addMovie(String name, String[] language_ids, long genreId, MovieModel movieModel) {
		ProductionCompanyModel productionCompanyModel = productionCompanyRepository.findByEmail(name);
		GenreModel genreModel = genreRepository.findById(genreId).get();
		movieModel.setStatus("Not Published");
		movieModel.setGenreModel(genreModel);
		movieModel.setProductionCompanyModel(productionCompanyModel);
		MovieModel movieModel2 = movieRepository.save(movieModel);
		for(int i = 0;i<language_ids.length;i++) {
			String languageId = language_ids[i];
			LanguageModel languageModel = languageRepository.findById(Long.parseLong(languageId)).get();
			MovieLanguageModel movieLanguageModel2 = new MovieLanguageModel();
			movieLanguageModel2.setLanguageModel(languageModel);
			movieLanguageModel2.setMovieModel(movieModel2);
			movieLanguageRepository.save(movieLanguageModel2);
		}
		return "Movie Added";
	}

	public List<MovieModel> viewMovies(String name) {
		CredentialModel credentialModel = credentialRepository.findByUserName(name);
		List<MovieModel> movieModelList = new ArrayList<MovieModel>();
		if(credentialModel.getRole().equalsIgnoreCase("ROLE_PRODUCTIONCOMPANY")) {
			ProductionCompanyModel productionCompanyModel = productionCompanyRepository.findByEmail(name);
			movieModelList = movieRepository.findByProductionCompanyModel(productionCompanyModel);
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
			movieModelList = movieRepository.findAll();
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_THEATREOWNER")) {
			movieModelList = movieRepository.findByStatus("Published");
		}else if(credentialModel.getRole().equalsIgnoreCase("ROLE_CUSTOMER")) {
			movieModelList = movieRepository.findByStatus("Published");;
		}
		Iterator<MovieModel> iterator = movieModelList.iterator();
		List<MovieModel> movieModelList2 = new ArrayList<MovieModel>();
		while(iterator.hasNext()) {
			MovieModel movieModel = iterator.next();
			try {
				 File file=new File(posterPath+"/"+movieModel.getPoster());
				 InputStream in = new FileInputStream(file);
				 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			movieModelList2.add(movieModel);
		}
		return movieModelList2;
	}

	public MovieModel getMovie(long movieId) {
		MovieModel movieModel = movieRepository.findById(movieId).get();
		return movieModel;
	}

	public String publishMovie(long movieId) {
		MovieModel movieModel = movieRepository.findById(movieId).get();
		movieModel.setStatus("Published");
		movieRepository.saveAndFlush(movieModel);
		return "Published";
	}

	public List<MovieModel> publishedMovies(String languageId) {
		List<MovieModel> movieModelsList2 = new ArrayList<>();
		if(languageId.equalsIgnoreCase("")) {
			List<MovieModel> movieModelsList = movieRepository.findByStatus("Published");
			Iterator<MovieModel> iterator = movieModelsList.iterator();
			while(iterator.hasNext()) {
				MovieModel movieModel = iterator.next();
				try {
					 File file=new File(posterPath+"/"+movieModel.getPoster());
					 InputStream in = new FileInputStream(file);
					 movieModel.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
					 
					 } catch (Exception e) {
				 }
				movieModelsList2.add(movieModel);
				
				
		   }
		}else {
			List<MovieModel> movieModelsList = movieRepository.findByStatus("Published");
			Iterator<MovieModel> iterator = movieModelsList.iterator();
			while(iterator.hasNext()) {
				MovieModel movieModel = iterator.next();
					LanguageModel languageModel = languageRepository.findById(Long.parseLong(languageId)).get();
					List<MovieLanguageModel> movieLanguageModelsList = movieLanguageRepository.findByLanguageModelAndMovieModel(languageModel,movieModel);
					Iterator<MovieLanguageModel> iterator2 = movieLanguageModelsList.iterator();
					while(iterator2.hasNext()) {
						MovieLanguageModel movieLanguageModel = iterator2.next();
						MovieModel movieModel2 = movieLanguageModel.getMovieModel();
						try {
							 File file=new File(posterPath+"/"+movieModel2.getPoster());
							 InputStream in = new FileInputStream(file);
							 movieModel2.setPoster2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
							 
							 } catch (Exception e) {
						 }
						movieModelsList2.add(movieModel2);
					}
			    }
			
		}
		
		
		 
		return movieModelsList2;
	}
	
	

}
