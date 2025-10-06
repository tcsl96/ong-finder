package com.ongfinder.ong_finder_api.dto;

public class VagaUpdateDTO {
    private String titulo;
    private String descricao;
    private boolean ativa;

    public VagaUpdateDTO() {}

    public VagaUpdateDTO(String titulo, String descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.ativa = true;
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
}