package com.intentbi.services;

import com.intentbi.entities.User;
import com.intentbi.exceptions.AlreadyExistException;
import com.intentbi.payloads.AuthResponse;
import com.intentbi.payloads.LoginDto;

public interface UserService {
    /**
     * This method create new user
     * @param user
     * @return newly created user
     * @throws AlreadyExistException
     */
    User creareUser(User user) throws AlreadyExistException;


    /**
     * This method for login user
     * @param loginDto
     * @return
     */
    AuthResponse loginUser(LoginDto loginDto);

}
