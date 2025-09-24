package com.ongfinder.ong_finder_api.entity;

import jakarta.persistence.*;

@Entity
public class Candidatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vaga_id", nullable = false)
    private Vaga vaga;

    @ManyToOne
    @JoinColumn(name = "voluntario_id", nullable = false)
    private Voluntario voluntario;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDENTE;

    public enum Status {
        PENDENTE,
        ACEITA,
        REJEITADA
    }

    public Candidatura() {}

    public Candidatura(Vaga vaga, Voluntario voluntario, Status status) {
        this.vaga = vaga;
        this.voluntario = voluntario;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vaga getVaga() {
        return vaga;
    }

    public void setVaga(Vaga vaga) {
        this.vaga = vaga;
    }

    public Voluntario getVoluntario() {
        return voluntario;
    }

    public void setVoluntario(Voluntario voluntario) {
        this.voluntario = voluntario;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}