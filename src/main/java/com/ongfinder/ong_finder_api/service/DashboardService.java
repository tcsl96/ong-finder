package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.dto.DashboardDTO;
import com.ongfinder.ong_finder_api.repository.CandidaturaRepository;
import com.ongfinder.ong_finder_api.repository.VagaRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final VagaRepository vagaRepository;
    private final CandidaturaRepository candidaturaRepository;

    public DashboardService(VagaRepository vagaRepository, CandidaturaRepository candidaturaRepository) {
        this.vagaRepository = vagaRepository;
        this.candidaturaRepository = candidaturaRepository;
    }

    public DashboardDTO getDashboard(Long ongId) {
        long vagasAtivas = vagaRepository.countByOngIdAndAtivaTrue(ongId);
        long candidaturas = candidaturaRepository.countByOngId(ongId);
        long voluntarios = candidaturaRepository.countDistinctVoluntariosByOngId(ongId);
        return new DashboardDTO(vagasAtivas, candidaturas, voluntarios);
    }
}