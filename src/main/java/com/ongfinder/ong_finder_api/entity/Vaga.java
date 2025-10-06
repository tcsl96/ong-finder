package com.ongfinder.ong_finder_api.entity;

import jakarta.persistence.*;

@Entity
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private boolean ativa = true;

    @ManyToOne
    @JoinColumn(name = "ong_id", nullable = false)
    private Ong ong;

    public Vaga() {}

    public Vaga(String titulo, String descricao, boolean ativa, Ong ong) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.ativa = ativa;
        this.ong = ong;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isAtiva() {
        return ativa;
    }

    public void setAtiva(boolean ativa) {
        this.ativa = ativa;
    }

    public Ong getOng() {
        return ong;
    }

    public void setOng(Ong ong) {
        this.ong = ong;
    }
}