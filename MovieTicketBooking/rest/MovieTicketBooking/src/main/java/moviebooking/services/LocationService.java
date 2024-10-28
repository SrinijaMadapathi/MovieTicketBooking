package moviebooking.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.LocationModel;
import moviebooking.repositories.LocationRepository;

@Service
@Transactional
public class LocationService {
	@Autowired private LocationRepository locationRepository;

	public String addLocation(LocationModel locationModel) {
		List<LocationModel> locationModelList = locationRepository.findByLocationName(locationModel.getLocationName());
		if(locationModelList.size()>0) {
			return locationModel.getLocationName() + " Exists";
		}else {
			locationRepository.save(locationModel);
			return "Location Added Successfully";
		}
	}

	public List<LocationModel> viewLocations() {
		List<LocationModel> locationModelList = locationRepository.findAll();
		return locationModelList;
	}

}
