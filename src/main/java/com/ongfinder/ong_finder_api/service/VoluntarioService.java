package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.repository.VoluntarioRepository;
import org.springframework.stereotype.Service;

@Service
public class VoluntarioService {

    private final VoluntarioRepository voluntarioRepository;


    public VoluntarioService(VoluntarioRepository voluntarioRepository) {
        this.voluntarioRepository = voluntarioRepository;
    }

}