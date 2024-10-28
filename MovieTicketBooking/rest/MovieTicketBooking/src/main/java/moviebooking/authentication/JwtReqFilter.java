package moviebooking.authentication;

import java.io.IOException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import moviebooking.services.CredentialLoginService;

@Component
public class JwtReqFilter extends OncePerRequestFilter {

	@Autowired
	private CredentialLoginService credentialLoginService;


	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		final String requestTokenHeader = request.getHeader("Authorization");

		String email = null;
		String jwtToken = null;
		// Getting Token From Bearer
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				email = jwtTokenUtil.getEmailFromToken(jwtToken);
			} catch (Exception e) {
				System.out.println(e);
			}
		} else {
			logger.warn("JWT Token does not Available");
		}

		// Validate the token
		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetailsAdmin = credentialLoginService.loadUserByUsername(email);
			if(userDetailsAdmin == null) {
				return;
			}
			if (jwtTokenUtil.validateToken(jwtToken, userDetailsAdmin)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetailsAdmin, null, userDetailsAdmin.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}			
			
		}
		chain.doFilter(request, response);
	}

}
