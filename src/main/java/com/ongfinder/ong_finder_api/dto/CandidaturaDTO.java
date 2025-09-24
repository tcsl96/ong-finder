package com.ongfinder.ong_finder_api.dto;

import com.ongfinder.ong_finder_api.entity.Candidatura.Status;

public class CandidaturaDTO {
    private Long id;
    private String voluntarioNome;
    private String vagaTitulo;
    private Status status;

    public CandidaturaDTO() {}

    public CandidaturaDTO(Long id, String voluntarioNome, String vagaTitulo, Status status) {
        this.id = id;
        this.voluntarioNome = voluntarioNome;
        this.vagaTitulo = vagaTitulo;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVoluntarioNome() {
        return voluntarioNome;
    }

    public void setVoluntarioNome(String voluntarioNome) {
        this.voluntarioNome = voluntarioNome;
    }

    public String getVagaTitulo() {
        return vagaTitulo;
    }

    public void setVagaTitulo(String vagaTitulo) {
        this.vagaTitulo = vagaTitulo;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}