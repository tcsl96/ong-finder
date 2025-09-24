package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {

    @Query("SELECT c FROM Candidatura c WHERE c.vaga.ong.id = :ongId")
    List<Candidatura> findByOngId(Long ongId);

    @Query("SELECT COUNT(c) FROM Candidatura c WHERE c.vaga.ong.id = :ongId")
    long countByOngId(Long ongId);

    @Query("SELECT COUNT(DISTINCT c.voluntario.id) FROM Candidatura c WHERE c.vaga.ong.id = :ongId")
    long countDistinctVoluntariosByOngId(Long ongId);
}