package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.repository.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OngService {

    private final OngRepository ongRepository;


    @Autowired
    public OngService(OngRepository ongRepository) {
        this.ongRepository = ongRepository;
    }


}