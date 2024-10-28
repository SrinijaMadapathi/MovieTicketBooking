package moviebooking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import moviebooking.authentication.JwtTokenUtil;
import moviebooking.models.CredentialModel;

@Service
@Transactional
public class CredentialService {
	@Autowired private CredentialLoginService credentialLoginService;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired private JwtTokenUtil jwtTokenUtil;
	
	public ResponseEntity<String> loginAction(CredentialModel credentialsModel)  {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsModel.getUserName(),credentialsModel.getPassword()));
		} catch (DisabledException e) {
			return ResponseEntity.ok("User Disabled");
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok("Invalid Login Details");
		} catch (Exception e) {
			return ResponseEntity.ok("Invalid Login Details");
		}
		final UserDetails userDetails = credentialLoginService.loadUserByUsername(credentialsModel.getUserName());
		final String token = jwtTokenUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(token);
	}
	

}
