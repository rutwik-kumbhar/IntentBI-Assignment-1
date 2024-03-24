package com.intentbi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(UserException.class)
    public ResponseEntity<ExceptionFormat> userException(UserException ex , WebRequest request){
        return new ResponseEntity<ExceptionFormat>(new ExceptionFormat(LocalDateTime.now(),ex.getMessage(),request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(ResourcesNotFoundException.class)
    public ResponseEntity<ExceptionFormat> resourceNotFoundExceptionHandler(ResourcesNotFoundException ex , WebRequest request){
        return new ResponseEntity<ExceptionFormat>(new ExceptionFormat(LocalDateTime.now(),ex.getMessage(),request.getDescription(false)),HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ExceptionFormat> handlerNotFoundException(NoHandlerFoundException ex ,WebRequest request){
        ExceptionFormat ef = new ExceptionFormat(LocalDateTime.now(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<ExceptionFormat>(ef,HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionFormat> globalException(Exception ex , WebRequest request){
        return new ResponseEntity<ExceptionFormat>(new ExceptionFormat(LocalDateTime.now(),ex.getMessage(),request.getDescription(false)),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionFormat> myMANVExceptionHandler(MethodArgumentNotValidException me)  {
        ExceptionFormat  err  =new ExceptionFormat(LocalDateTime.now(),"Validation Error", Objects.requireNonNull(me.getBindingResult().getFieldError()).getDefaultMessage());

        return new ResponseEntity<>(err,HttpStatus.BAD_REQUEST);

    }

}
