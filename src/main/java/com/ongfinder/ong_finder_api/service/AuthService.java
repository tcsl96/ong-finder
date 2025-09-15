package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.entity.UserDetails;
import com.ongfinder.ong_finder_api.entity.Ong;
import com.ongfinder.ong_finder_api.entity.Voluntario;
import com.ongfinder.ong_finder_api.repository.OngRepository;
import com.ongfinder.ong_finder_api.repository.VoluntarioRepository;
import com.ongfinder.ong_finder_api.dto.LoginRequest;
import com.ongfinder.ong_finder_api.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private OngRepository ongRepository;

    @Autowired
    private VoluntarioRepository voluntarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse autenticar(LoginRequest loginRequest) {
        UserDetails usuario = null;
        String tipoUsuario = loginRequest.getTipoUsuario(); // CORRIGIDO: "tipoUsuario"
        String email = loginRequest.getEmail();
        String senha = loginRequest.getSenha();

        if ("ong".equalsIgnoreCase(tipoUsuario)) {
            usuario = ongRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("ONG não encontrada com este email"));
        } else if ("voluntario".equalsIgnoreCase(tipoUsuario)) {
            usuario = voluntarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Voluntário não encontrado com este email"));
        } else {
            throw new RuntimeException("Tipo de usuário inválido");
        }

        if (!usuario.isActive()) {
            throw new RuntimeException("Usuário inativo");
        }

        if (!passwordEncoder.matches(senha, usuario.getPassword())) {
            throw new RuntimeException("Senha incorreta");
        }

        String token = jwtService.generateToken(usuario);

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setTipoUsuario(tipoUsuario.toLowerCase());
        response.setUsuarioId(usuario.getUserId());
        response.setEmail(usuario.getUsername());

        if (usuario instanceof Ong) {
            response.setNome(((Ong) usuario).getNome());
        } else if (usuario instanceof Voluntario) {
            response.setNome(((Voluntario) usuario).getNomeCompleto());
        }

        return response;
    }

    public boolean emailExiste(String email, String tipoUsuario) {
        if ("ong".equalsIgnoreCase(tipoUsuario)) {
            return ongRepository.existsByEmail(email);
        } else if ("voluntario".equalsIgnoreCase(tipoUsuario)) {
            return voluntarioRepository.existsByEmail(email);
        }
        return false;
    }
}