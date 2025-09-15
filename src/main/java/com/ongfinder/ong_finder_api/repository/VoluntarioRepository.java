package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VoluntarioRepository extends JpaRepository<Voluntario, Long> {
    Optional<Voluntario> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}