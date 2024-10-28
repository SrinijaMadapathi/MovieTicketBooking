package moviebooking.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.DiscountModel;
import moviebooking.repositories.DiscountRepository;

@Service
@Transactional
public class DiscountService {
	@Autowired private DiscountRepository discountRepository;

	public String addDiscount(DiscountModel discountModel) throws ParseException {
		Date expDate  =discountModel.getExpDate();
		String date = expDate.getDate()+"/"+(expDate.getMonth()+1)+"/"+(expDate.getYear()+1900);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date expDate2 = simpleDateFormat.parse(date);
		Date cu_date = new Date();
		String date2 = cu_date.getDate()+"/"+(cu_date.getMonth()+1)+"/"+(cu_date.getYear()+1900);
		SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("dd/MM/yyyy");
		Date startDate = simpleDateFormat2.parse(date2);
		discountModel.setExpDate(expDate2);
		discountModel.setStartDate(startDate);
		discountRepository.save(discountModel);
		return "Discount Added";
	}

	public List<DiscountModel> discounts() {
		List<DiscountModel> discountModelsList = discountRepository.findAll();
		return discountModelsList;
	}

	public DiscountModel validateDiscountCoupon(String couponCode) {
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String currentDateTime = dateFormat.format(date);
		DiscountModel discountModel = discountRepository.getDiscountValidate(couponCode,currentDateTime);
		return discountModel;
	}

}
