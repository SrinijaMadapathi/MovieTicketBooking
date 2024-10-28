package moviebooking.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="discount")
public class DiscountModel {
	@Id
	@GeneratedValue
	
	private long discountId;
	private Date expDate;
	private Date startDate;
	private int discount;
	private String couponCode;
	public long getDiscountId() {
		return discountId;
	}
	public void setDiscountId(long discountId) {
		this.discountId = discountId;
	}
	public Date getExpDate() {
		return expDate;
	}
	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public String getCouponCode() {
		return couponCode;
	}
	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
	
	
	
	

}
