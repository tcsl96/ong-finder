package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.dto.DashboardDTO;
import com.ongfinder.ong_finder_api.entity.Candidatura;
import com.ongfinder.ong_finder_api.repository.CandidaturaRepository;
import com.ongfinder.ong_finder_api.repository.OngRepository;
import com.ongfinder.ong_finder_api.repository.VagaRepository;
import com.ongfinder.ong_finder_api.repository.VoluntarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OngService {

    private final OngRepository ongRepository;
    private final VagaRepository vagaRepository;
    private final VoluntarioRepository voluntarioRepository;
    private final CandidaturaRepository candidaturaRepository;

    @Autowired
    public OngService(OngRepository ongRepository,
                      VagaRepository vagaRepository,
                      VoluntarioRepository voluntarioRepository,
                      CandidaturaRepository candidaturaRepository) {
        this.ongRepository = ongRepository;
        this.vagaRepository = vagaRepository;
        this.voluntarioRepository = voluntarioRepository;
        this.candidaturaRepository = candidaturaRepository;
    }

    public DashboardDTO getDashboard(Long ongId) {
        long vagasAtivas = vagaRepository.countByOngIdAndAtivaTrue(ongId); 
        long candidaturas = candidaturaRepository.countByOngId(ongId);
        long voluntarios = candidaturaRepository.countDistinctVoluntariosByOngId(ongId);
        return new DashboardDTO(vagasAtivas, candidaturas, voluntarios);
    }

    public List<Candidatura> listarCandidaturas(Long ongId) {
        return candidaturaRepository.findByOngId(ongId);
    }

    public Candidatura atualizarStatusCandidatura(Long candidaturaId, Candidatura.Status status) {
        Candidatura candidatura = candidaturaRepository.findById(candidaturaId)
                .orElseThrow(() -> new RuntimeException("Candidatura não encontrada"));

        candidatura.setStatus(status);
        return candidaturaRepository.save(candidatura);
    }
}