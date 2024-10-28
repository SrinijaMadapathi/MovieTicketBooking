package moviebooking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.repositories.BookingSeatRepository;

@Service
@Transactional
public class BookingSeatService {
	@Autowired private BookingSeatRepository bookingSeatRepository;

}
