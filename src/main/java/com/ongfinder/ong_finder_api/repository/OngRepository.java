package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Categoria;
import com.ongfinder.ong_finder_api.entity.Ong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import java.util.List;

public interface OngRepository extends JpaRepository<Ong, Long> {
  Optional<Ong> findByEmail(String email);

  boolean existsByEmail(String email);

  boolean existsByCnpj(String cnpj);

  @Query("SELECT o FROM Ong o " +
      "WHERE (:nome IS NULL OR LOWER(o.nome) = LOWER(CAST(:nome AS string))) " +
      "AND (:categoria IS NULL OR o.categoria = :categoria) " +
      "AND (:cidade IS NULL OR LOWER(o.endereco.cidade) = LOWER(CAST(:cidade AS string))) " +
      "AND (:estado IS NULL OR LOWER(o.endereco.estado) = LOWER(CAST(:estado AS string))) " +
      "AND (:bairro IS NULL OR LOWER(o.endereco.bairro) = LOWER(CAST(:bairro AS string)))")
  List<Ong> filtrarOngs(@Param("nome") String nome,
      @Param("categoria") Categoria categoria,
      @Param("cidade") String cidade,
      @Param("estado") String estado,
      @Param("bairro") String bairro);
}
