package moviebooking.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.models.CredentialModel;
import moviebooking.repositories.CredentialRepository;

@Service
@Transactional
public class CredentialLoginService implements UserDetailsService{
	@Autowired private CredentialRepository credentialRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		CredentialModel credentialsModel = credentialRepository.findByUserName(username);
		if(credentialsModel == null) {
			throw new UsernameNotFoundException("{Invalid Username}");
		}
		List<SimpleGrantedAuthority> simpleGrantedAuthorityList = new ArrayList<SimpleGrantedAuthority>() ;
		SimpleGrantedAuthority  simpleGrantedAuthority = new SimpleGrantedAuthority(credentialsModel.getRole());
		simpleGrantedAuthorityList.add(simpleGrantedAuthority);
		return new User(credentialsModel.getUserName(), credentialsModel.getPassword(), simpleGrantedAuthorityList);
	}

}
