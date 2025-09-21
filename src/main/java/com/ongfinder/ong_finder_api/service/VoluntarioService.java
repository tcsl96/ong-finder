package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.entity.Ong;
import com.ongfinder.ong_finder_api.entity.Voluntario;
import com.ongfinder.ong_finder_api.repository.OngRepository;
import com.ongfinder.ong_finder_api.repository.VoluntarioRepository;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class VoluntarioService {
  private final OngRepository ongRepository;
  private final VoluntarioRepository voluntarioRepository;

  public VoluntarioService(VoluntarioRepository voluntarioRepository, OngRepository ongRepository) {
    this.voluntarioRepository = voluntarioRepository;
    this.ongRepository = ongRepository;
  }

  public void candidatarVoluntario(Long ongId, Long voluntarioId) {
    Ong ong = ongRepository.findById(ongId)
        .orElseThrow(() -> new RuntimeException("ONG não encontrada"));

    Voluntario voluntario = voluntarioRepository.findById(voluntarioId)
        .orElseThrow(() -> new RuntimeException("Voluntário não encontrado"));

    ong.getVoluntarios().add(voluntario);
    ongRepository.save(ong);
  }

  public void validarDados(Voluntario voluntario, Voluntario novosDados) {
    if (novosDados.getEmail() != null) {
      if (voluntarioRepository.existsByEmail(novosDados.getEmail())) {
        throw new RuntimeException("Email já cadastrado");
      }

      if (!novosDados.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
        throw new RuntimeException("Email inválido");
      }
    }

    if (novosDados.getEndereco() != null) {
      String cep = novosDados.getEndereco().getCep();

      if (cep != null && !cep.matches("^\\d{5}-?\\d{3}$")) {
        throw new RuntimeException("CEP inválido");
      }
    }

    if (novosDados.getDataNascimento() != null) {
      LocalDate hoje = LocalDate.now();

      int idade = Period.between(novosDados.getDataNascimento(), hoje).getYears();

      if (idade < 16 ||
          idade > 120 ||
          novosDados.getDataNascimento().isAfter(LocalDate.now())) {
        throw new RuntimeException("Data de nascimento inválida");
      }
    }

    if (novosDados.getTelefone() != null) {
      if (!novosDados.getTelefone().matches("^\\(?\\d{2}\\)?\\d{4,5}-?\\d{4}$")) {
        throw new RuntimeException("Telefone inválido");
      }

      if (voluntarioRepository.existsByTelefone(novosDados.getTelefone())) {
        throw new RuntimeException("Telefone já cadastrado");
      }
    }
  }

  public Voluntario editarPerfil(@PathVariable Long voluntarioId, @RequestBody Voluntario novosDados) {
    Voluntario voluntario = voluntarioRepository.findById(voluntarioId)
        .orElseThrow(() -> new RuntimeException("Voluntário não encontrado"));

    validarDados(voluntario, novosDados);

    voluntario.setEmail(novosDados.getEmail() != null ? novosDados.getEmail() : voluntario.getEmail());
    voluntario.setEndereco(novosDados.getEndereco() != null ? novosDados.getEndereco() : voluntario.getEndereco());
    voluntario.setNomeCompleto(
        novosDados.getNomeCompleto() != null ? novosDados.getNomeCompleto() : voluntario.getNomeCompleto());
    voluntario.setTelefone(
        novosDados.getTelefone() != null ? novosDados.getTelefone() : voluntario.getTelefone());
    voluntario.setDataNascimento(
        novosDados.getDataNascimento() != null ? novosDados.getDataNascimento() : voluntario.getDataNascimento());

    return voluntarioRepository.save(voluntario);
  }
}
