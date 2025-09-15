package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Ong;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OngRepository extends JpaRepository<Ong, Long> {
    Optional<Ong> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByCnpj(String cnpj);
}