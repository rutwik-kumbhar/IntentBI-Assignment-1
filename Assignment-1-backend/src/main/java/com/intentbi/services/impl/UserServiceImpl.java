package com.intentbi.services.impl;

import com.intentbi.config.JwtTokenProvider;
import com.intentbi.entities.User;
import com.intentbi.exceptions.AlreadyExistException;
import com.intentbi.exceptions.ResourcesNotFoundException;
import com.intentbi.payloads.AuthResponse;
import com.intentbi.payloads.LoginDto;
import com.intentbi.repositories.UserRepository;
import com.intentbi.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomerDetailsService customerDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public User creareUser(User user) throws AlreadyExistException {
        Optional<User> optional = userRepository.findByEmail(user.getEmail());
        if(optional.isPresent()) throw new AlreadyExistException("User already exist this email id " + user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public AuthResponse loginUser(LoginDto loginDto) {
        Authentication authentication = authenticate(loginDto.getUsername(), loginDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.genrateToken(authentication);
        String username =   jwtTokenProvider.getUsernameFromToken(token);
        User user =  userRepository.findByEmail(username).orElseThrow(()-> new ResourcesNotFoundException("User Not Found"));
         return AuthResponse.builder().user(user).token(token).message("User Login Successfully").build();

    }



    private Authentication authenticate(String username, String password) {
        // TODO Auto-generated method stub
        UserDetails userDetails = customerDetailsService.loadUserByUsername(username);
        if (userDetails == null)
            throw new BadCredentialsException("Invalid Username");
        if (!passwordEncoder.matches(password, userDetails.getPassword()))
            throw new BadCredentialsException("Invalid Password");
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
