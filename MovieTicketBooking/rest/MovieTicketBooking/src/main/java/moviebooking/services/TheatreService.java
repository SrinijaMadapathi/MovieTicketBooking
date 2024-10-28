package moviebooking.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.LocationModel;
import moviebooking.models.TheatreModel;
import moviebooking.models.TheatreOwnerModel;
import moviebooking.repositories.LocationRepository;
import moviebooking.repositories.TheatreOwnerRepository;
import moviebooking.repositories.TheatreRepository;

@Service
@Transactional
public class TheatreService {
	@Autowired private TheatreRepository theatreRepository;
	@Autowired private TheatreOwnerRepository theatreOwnerRepository;
	@Autowired private LocationRepository locationRepository;

	public String addTheatre(TheatreModel theatreModel, String name, long locationId) {
		TheatreOwnerModel theatreOwnerModel = theatreOwnerRepository.findByEmail(name);
		LocationModel locationModel = locationRepository.findById(locationId).get();
		theatreModel.setLocationModel(locationModel);
		theatreModel.setTheatreOwnerModel(theatreOwnerModel);
		theatreRepository.save(theatreModel);
		return "Theatre Added Successfully";
	}

	public List<TheatreModel> viewTheatres(String name) {
		
		TheatreOwnerModel theatreOwnerModel = theatreOwnerRepository.findByEmail(name);
		List<TheatreModel> theatreModelList = theatreRepository.findByTheatreOwnerModel(theatreOwnerModel);
		return theatreModelList;
	}

	public List<TheatreModel> getTheatres() {
		List<TheatreModel> theatreModelsList = theatreRepository.findAll();
		return theatreModelsList;
	}

}
