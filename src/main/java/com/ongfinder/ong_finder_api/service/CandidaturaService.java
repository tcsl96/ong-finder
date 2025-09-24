package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.dto.CandidaturaDTO;
import com.ongfinder.ong_finder_api.entity.Candidatura;
import com.ongfinder.ong_finder_api.repository.CandidaturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidaturaService {
    private final CandidaturaRepository candidaturaRepository;

    public CandidaturaService(CandidaturaRepository candidaturaRepository) {
        this.candidaturaRepository = candidaturaRepository;
    }

    public List<CandidaturaDTO> listarPorOng(Long ongId) {
        return candidaturaRepository.findByOngId(ongId).stream()
                .map(c -> new CandidaturaDTO(
                        c.getId(),
                        c.getVoluntario().getNomeCompleto(),
                        c.getVaga().getTitulo(),
                        c.getStatus()
                ))
                .collect(Collectors.toList());
    }

    public CandidaturaDTO atualizarStatus(Long ongId, Long id, Candidatura.Status novoStatus) {
        Candidatura c = candidaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidatura não encontrada"));
        if (!c.getVaga().getOng().getId().equals(ongId))
            throw new RuntimeException("Não autorizado");

        c.setStatus(novoStatus);
        candidaturaRepository.save(c);

        return new CandidaturaDTO(
                c.getId(),
                c.getVoluntario().getNomeCompleto(),
                c.getVaga().getTitulo(),
                c.getStatus()
        );
    }
}