package moviebooking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.repositories.PaymentRepository;

@Service
@Transactional
public class PaymentService {
	@Autowired private PaymentRepository paymentRepository;

}
