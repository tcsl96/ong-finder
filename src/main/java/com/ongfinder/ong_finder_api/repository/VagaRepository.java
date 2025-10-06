package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VagaRepository extends JpaRepository<Vaga, Long> {

    List<Vaga> findByOngId(Long ongId);

    @Query("SELECT COUNT(v) FROM Vaga v WHERE v.ong.id = :ongId AND v.ativa = true")
    long countByOngIdAndAtivaTrue(Long ongId);
}