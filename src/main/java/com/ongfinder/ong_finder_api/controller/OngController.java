package com.ongfinder.ong_finder_api.controller;

import com.ongfinder.ong_finder_api.dto.DashboardDTO;
import com.ongfinder.ong_finder_api.entity.Candidatura;
import com.ongfinder.ong_finder_api.entity.Vaga;
import com.ongfinder.ong_finder_api.service.OngService;
import com.ongfinder.ong_finder_api.service.VagaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ong")
public class OngController {

    private final OngService ongService;

    @Autowired
    public OngController(OngService ongService) {
        this.ongService = ongService;
    }

    @Autowired
    private VagaService vagaService;

    // TODO: pegar o id da ONG autenticada
    private Long getAuthenticatedOngId() {
        return 1L;
    }

    @GetMapping("/dashboard")
    public DashboardDTO getDashboard() {
        Long ongId = getAuthenticatedOngId();
        return ongService.getDashboard(ongId);
    }

    @GetMapping("/candidaturas")
    public List<Candidatura> listarCandidaturas() {
        Long ongId = getAuthenticatedOngId();
        return ongService.listarCandidaturas(ongId);
    }

    @PutMapping("/candidaturas/{id}/status")
    public Candidatura atualizarStatus(
            @PathVariable Long id,
            @RequestParam Candidatura.Status status) {
        return ongService.atualizarStatusCandidatura(id, status);
    }

    @PostMapping("/vaga")
    public Vaga criarVaga(@RequestParam String titulo,
                        @RequestParam String descricao) {
        Long ongId = getAuthenticatedOngId();
        return vagaService.criarVaga(ongId, titulo, descricao);
    }

    @PutMapping("/vaga/{id}")
    public Vaga atualizarVaga(@PathVariable Long id,
                            @RequestParam String titulo,
                            @RequestParam String descricao,
                            @RequestParam boolean ativa) {
        return vagaService.atualizarVaga(id, titulo, descricao, ativa);
    }

    @GetMapping("/vagas")
    public List<Vaga> listarVagas() {
        Long ongId = getAuthenticatedOngId();
        return vagaService.listarPorOng(ongId);
    }

}
