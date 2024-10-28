package moviebooking.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import moviebooking.models.ScheduleModel;
import moviebooking.models.TheatreModel;

public interface ScheduleRepository extends JpaRepository<ScheduleModel, Long> {

	List<ScheduleModel> findByTheatreModelIn(List<TheatreModel> theatreModelsList);
	
	
	@Query(value = "select * from schedules where ?1>=from_date and ?1<=to_date and movie_id=?2 ", nativeQuery = true)
	List<ScheduleModel> getSchedule(String currentDateTime, long l);

	@Query(value = "select * from schedules where ?1>=from_date and ?1<=to_date and movie_id=?2", nativeQuery = true)
	List<ScheduleModel> getSchedule2(String currentDateTime, long l);

	@Query(value = "select * from schedules where ?1>=from_date and ?1<=to_date and movie_id=?2 and theatre_id=?3", nativeQuery = true)
	List<ScheduleModel> getSchedule3(String currentDateTime,long l, long l2);

	@Query(value = "select * from schedules where ?1>=from_date and ?1<=to_date and schedule_id=?2", nativeQuery = true)
	List<ScheduleModel> getSchedule4(String currentDateTime, long scheduleId);

}
