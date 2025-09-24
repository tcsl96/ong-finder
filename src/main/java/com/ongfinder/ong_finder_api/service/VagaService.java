package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.entity.Ong;
import com.ongfinder.ong_finder_api.entity.Vaga;
import com.ongfinder.ong_finder_api.repository.OngRepository;
import com.ongfinder.ong_finder_api.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VagaService {

    private final VagaRepository vagaRepository;
    private final OngRepository ongRepository;

    @Autowired
    public VagaService(VagaRepository vagaRepository, OngRepository ongRepository) {
        this.vagaRepository = vagaRepository;
        this.ongRepository = ongRepository;
    }

    public Vaga criarVaga(Long ongId, String titulo, String descricao) {
        Ong ong = ongRepository.findById(ongId)
                .orElseThrow(() -> new RuntimeException("ONG não encontrada"));

        Vaga vaga = new Vaga();
        vaga.setTitulo(titulo);
        vaga.setDescricao(descricao);
        vaga.setAtiva(true);
        vaga.setOng(ong);

        return vagaRepository.save(vaga);
    }

    public Vaga atualizarVaga(Long id, String titulo, String descricao, boolean ativa) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

        vaga.setTitulo(titulo);
        vaga.setDescricao(descricao);
        vaga.setAtiva(ativa);

        return vagaRepository.save(vaga);
    }

    public List<Vaga> listarPorOng(Long ongId) {
        return vagaRepository.findByOngId(ongId);
    }
}