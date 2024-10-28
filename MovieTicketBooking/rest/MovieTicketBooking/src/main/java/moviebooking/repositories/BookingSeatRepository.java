package moviebooking.repositories;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import moviebooking.models.BookingSeatModel;

public interface BookingSeatRepository extends JpaRepository<BookingSeatModel, Long> {

	

	BookingSeatModel findBySeatNumberAndStatus(int seatNumber, String string);


	BookingSeatModel findBySeatNumberAndStatusAndBookingId2(int i, String string, long bookingId);

	@Query(value = "select * from booked_seats where booking_id in (select booking_id from bookings where booking_date=?3 and show_id=?4) and seat_number=?1 and status=?2", nativeQuery = true)
	List<BookingSeatModel> getBookingSeatModel(int i, String string, Date bookingDate2, long showId);

}
