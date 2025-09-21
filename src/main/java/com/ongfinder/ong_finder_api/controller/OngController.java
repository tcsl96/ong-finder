package com.ongfinder.ong_finder_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ongfinder.ong_finder_api.entity.Categoria;
import com.ongfinder.ong_finder_api.entity.Ong;
import com.ongfinder.ong_finder_api.entity.Voluntario;

import com.ongfinder.ong_finder_api.service.OngService;
import com.ongfinder.ong_finder_api.service.VoluntarioService;

import java.util.List;

@RestController
@RequestMapping("/api/voluntario")
public class OngController {
  private final OngService ongService;
  private final VoluntarioService voluntarioService;

  public OngController(OngService ongService, VoluntarioService voluntarioService) {
    this.ongService = ongService;
    this.voluntarioService = voluntarioService;
  }

  @GetMapping("/ongs")
  public List<Ong> listarOngs(@RequestParam(required = false) String nome,
      @RequestParam(required = false) Categoria categoria,
      @RequestParam(required = false) String cidade,
      @RequestParam(required = false) String estado,
      @RequestParam(required = false) String bairro) {

    List<Ong> ongs = ongService.buscarOngs(nome, categoria, cidade, estado, bairro);

    return ongs;
  }

  @PostMapping("/candidatar/{ongId}/{voluntarioId}")
  public ResponseEntity<String> candidatarVoluntario(
      @PathVariable Long ongId,
      @PathVariable Long voluntarioId) {

    voluntarioService.candidatarVoluntario(ongId, voluntarioId);

    return ResponseEntity.ok("Candidatura realizada com sucesso");
  }

  @PutMapping("/perfil/{voluntarioId}")
  public ResponseEntity<Voluntario> atualizarPerfil(
      @PathVariable Long voluntarioId,
      @RequestBody Voluntario novosDados) {

    Voluntario atualizado = voluntarioService.editarPerfil(voluntarioId, novosDados);

    return ResponseEntity.ok(atualizado);
  }
}
