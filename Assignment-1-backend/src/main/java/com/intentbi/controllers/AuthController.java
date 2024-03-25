package com.intentbi.controllers;


import com.intentbi.entities.User;
import com.intentbi.payloads.AuthResponse;
import com.intentbi.payloads.LoginDto;
import com.intentbi.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    @Autowired
    private  UserService userService;

    @PostMapping("/user/sign/up")
    public ResponseEntity<User> addUser(@Valid @RequestBody User user){
        user.setRole("ROLE_USER");
        return new ResponseEntity<User>(userService.creareUser(user), HttpStatus.CREATED);
    }
    @PostMapping("/admin/sign/up")
    public ResponseEntity<User> addAdmin(@Valid @RequestBody User user){
        user.setRole("ROLE_ADMIN");
        System.out.println(user);
        return new ResponseEntity<>(userService.creareUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/user/sign/in")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody LoginDto loginDto){
        return  new ResponseEntity<AuthResponse>(userService.loginUser(loginDto),HttpStatus.OK);
    }
}
