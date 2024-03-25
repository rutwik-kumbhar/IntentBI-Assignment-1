package com.intentbi.payloads;

import com.intentbi.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AuthResponse {

    private User user;
    private  String token;
    private String message;
}
