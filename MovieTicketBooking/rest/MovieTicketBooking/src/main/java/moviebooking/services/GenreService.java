package moviebooking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.GenreModel;
import moviebooking.repositories.GenreRepository;

@Service
@Transactional
public class GenreService {
	@Autowired private GenreRepository genreRepository;

	public String addGenre(GenreModel genreModel) {
		List<GenreModel> genreModelList = genreRepository.findByGenreName(genreModel.getGenreName());
		if(genreModelList.size()>0) {
			return genreModel.getGenreName()+" Exists";
		}
		else {
			genreRepository.save(genreModel);
			return "Genre Added Successfully";
		}
	}

	public List<GenreModel> viewGenres() {
		List<GenreModel> genreModelList = genreRepository.findAll();
		return genreModelList;
	}
	
	

}
