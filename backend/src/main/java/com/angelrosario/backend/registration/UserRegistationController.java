package com.angelrosario.backend.registration;

import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties.Registration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import com.angelrosario.backend.registration.RegistrationRequest; // Import the missing RegistrationRequest class

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class UserRegistationController {
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
}
