package com.ongfinder.ong_finder_api.controller;

import com.ongfinder.ong_finder_api.dto.LoginRequest;
import com.ongfinder.ong_finder_api.dto.LoginResponse;
import com.ongfinder.ong_finder_api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.autenticar(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailExists(
            @RequestParam String email,
            @RequestParam String tipoUsuario) {

        boolean exists = authService.emailExiste(email, tipoUsuario);
        return ResponseEntity.ok().body("{\"exists\": " + exists + "}");
    }
}