package com.intentbi.services.impl;

import com.intentbi.entities.User;
import com.intentbi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CustomerDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optinal = userRepository.findByEmail(username);

        User user = optinal.orElseThrow(() -> new UsernameNotFoundException("user not found with email " + username));
        List<GrantedAuthority> authorities = new ArrayList<>();

        SimpleGrantedAuthority sga = new SimpleGrantedAuthority(user.getRole());
        authorities.add(sga);

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
