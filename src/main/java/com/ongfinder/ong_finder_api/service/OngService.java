package com.ongfinder.ong_finder_api.service;

import com.ongfinder.ong_finder_api.entity.Categoria;
import com.ongfinder.ong_finder_api.entity.Ong;
import com.ongfinder.ong_finder_api.repository.OngRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OngService {
  private final OngRepository ongRepository;

  @Autowired
  public OngService(OngRepository ongRepository) {
    this.ongRepository = ongRepository;
  }

  public List<Ong> buscarOngs(String nome, Categoria categoria, String cidade, String estado, String bairro) {
    return ongRepository.filtrarOngs(nome, categoria, cidade, estado, bairro);
  }
}
