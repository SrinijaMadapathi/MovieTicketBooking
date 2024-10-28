package moviebooking.controllers;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import moviebooking.models.DiscountModel;
import moviebooking.services.DiscountService;

@RestController
public class DiscountController {
	@Autowired private DiscountService discountService;
	
	
	@PostMapping("addDiscount")
	public String addDiscount(@RequestBody DiscountModel discountModel) throws ParseException {
		return discountService.addDiscount(discountModel);
	}
	
	@GetMapping("discounts")
	public List<DiscountModel> discounts(){
		return discountService.discounts();
	}
	
	@GetMapping("validateDiscountCoupon")
	public DiscountModel validateDiscountCoupon(@RequestParam("couponCode") String couponCode) {
		return discountService.validateDiscountCoupon(couponCode);
	}

}
