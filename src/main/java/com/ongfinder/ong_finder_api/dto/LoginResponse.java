package com.ongfinder.ong_finder_api.dto;

public class LoginResponse {
    private String token;
    private String tipoUsuario;
    private Long usuarioId;
    private String nome;
    private String email;

    public LoginResponse() {
    }

    public LoginResponse(String token, String tipoUsuario, Long usuarioId, String nome, String email) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}