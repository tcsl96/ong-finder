package com.ongfinder.ong_finder_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ongs")
public class Ong implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    private String website;
    private String urlFoto;
    private String telefone;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private boolean ativo = true;

    @Embedded
    private Endereco endereco;

    @ManyToMany
    @JoinTable(
            name = "ong_voluntario",
            joinColumns = @JoinColumn(name = "ong_id"),
            inverseJoinColumns = @JoinColumn(name = "voluntario_id")
    )
    private java.util.Set<Voluntario> voluntarios = new java.util.HashSet<>();

    public Ong() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getUrlFoto() {
        return urlFoto;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }


    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getRole() {
        return "ROLE_ONG";
    }

    @Override
    public boolean isActive() {
        return this.ativo;
    }

    @Override
    public Long getUserId() {
        return this.id;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public java.util.Set<Voluntario> getVoluntarios() {
        return voluntarios;
    }

    public void setVoluntarios(java.util.Set<Voluntario> voluntarios) {
        this.voluntarios = voluntarios;
    }
}