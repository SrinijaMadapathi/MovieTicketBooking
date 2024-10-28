package moviebooking.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CustomerModel;
import moviebooking.models.MovieModel;
import moviebooking.models.ReviewModel;
import moviebooking.repositories.CustomerRepository;
import moviebooking.repositories.MovieRepository;
import moviebooking.repositories.ReviewRepository;

@Service
@Transactional
public class Reviewservice {
	@Autowired private ReviewRepository reviewRepository;
	@Autowired private CustomerRepository customerRepository;
	@Autowired private MovieRepository movieRepository;

	public String giveRating(ReviewModel reviewModel, long movieId, String string) {
		CustomerModel customerModel = customerRepository.findByEmail(string).get(0);
		MovieModel movieModel = movieRepository.findById(movieId).get();
		reviewModel.setCustomerModel(customerModel);
        reviewModel.setDate(new Date());
        reviewModel.setMovieModel(movieModel);
        reviewRepository.save(reviewModel);
		return "Review Submited";
	}

	public List<ReviewModel> ratings(long movieId) {
		MovieModel movieModel= movieRepository.findById(movieId).get();
		List<ReviewModel> reviewModelsList = reviewRepository.findByMovieModel(movieModel);
		return reviewModelsList;
	}

}
