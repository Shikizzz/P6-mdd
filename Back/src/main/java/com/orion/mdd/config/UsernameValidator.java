package com.orion.mdd.config;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UsernameValidator implements ConstraintValidator<UsernameValidation, String> {
    @Override
    public void initialize(UsernameValidation constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return checkIfNotEmail(value);
    }

    private boolean checkIfNotEmail(String value){
        for(int i=0; i<value.length();i++){
            if (Character.toString(value.charAt(i)).equals("@")){
                return false;
            }
        }
        return true;
    }
}
