package moviebooking.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import moviebooking.models.BookingModel;
import moviebooking.models.CustomerModel;
import moviebooking.models.ScheduleModel;
import moviebooking.models.ShowModel;

public interface BookingRepository extends JpaRepository<BookingModel, Long> {

	List<BookingModel> findByBookingDateAndShowModel(Date bookingDate2,
			ShowModel showModel);

	List<BookingModel> findByCustomerModel(CustomerModel customerModel);


	List<BookingModel> findByShowModel(ShowModel showModel);

	List<BookingModel> findByShowModelAndScheduleModel(ShowModel showModel, ScheduleModel scheduleModel);

	List<BookingModel> findByShowModelAndScheduleModelAndBookingDate(ShowModel showModel, ScheduleModel scheduleModel,
			Date bookingDate2);

}
