package com.intentbi.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Service
public class JwtTokenProvider {

    private final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    public String genrateToken(Authentication authentication) {
        return Jwts.builder()

                .setSubject("Jwt Token")
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 846000000))
                .claim("email", authentication.getName())
                .claim("authorities", populateAuthorities(authentication.getAuthorities()))
                .signWith(key).compact();
    }


    public String getUsernameFromToken(String jwt) {
//        jwt = jwt.substring(7);

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        return String.valueOf(claims.get("email"));
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {

        Set<String> authoritiesSet = new HashSet<>();

        for (GrantedAuthority authority : collection) {
            authoritiesSet.add(authority.getAuthority());
        }
        return String.join(",", authoritiesSet);

    }

}
