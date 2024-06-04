package com.angelrosario.backend.registration;

import org.springframework.stereotype.Service;

import com.angelrosario.backend.appuser.AppUser;
import com.angelrosario.backend.appuser.AppUserRole;
import com.angelrosario.backend.appuser.AppUserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        return appUserService.signUpUser(
            new AppUser(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPassword(),
                AppUserRole.USER
            )
        );
    }
}
