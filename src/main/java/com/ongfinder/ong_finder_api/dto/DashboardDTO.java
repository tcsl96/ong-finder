package com.ongfinder.ong_finder_api.dto;

public class DashboardDTO {
    private long numVagasAtivas;
    private long numCandidaturas;
    private long numVoluntarios;

    public DashboardDTO() {}

    public DashboardDTO(long numVagasAtivas, long numCandidaturas, long numVoluntarios) {
        this.numVagasAtivas = numVagasAtivas;
        this.numCandidaturas = numCandidaturas;
        this.numVoluntarios = numVoluntarios;
    }

    public long getNumVagasAtivas() {
        return numVagasAtivas;
    }

    public void setNumVagasAtivas(long numVagasAtivas) {
        this.numVagasAtivas = numVagasAtivas;
    }

    public long getNumCandidaturas() {
        return numCandidaturas;
    }

    public void setNumCandidaturas(long numCandidaturas) {
        this.numCandidaturas = numCandidaturas;
    }

    public long getNumVoluntarios() {
        return numVoluntarios;
    }

    public void setNumVoluntarios(long numVoluntarios) {
        this.numVoluntarios = numVoluntarios;
    }
}