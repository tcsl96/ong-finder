package com.ongfinder.ong_finder_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ongs")
public class Ong {

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

    // Para a foto, o mais comum é salvar a URL ou o caminho do arquivo
    private String urlFoto;

    private String telefone;

    @Column(nullable = false, unique = true)
    private String email;

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
