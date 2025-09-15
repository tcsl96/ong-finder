package com.ongfinder.ong_finder_api.entity;

public interface UserDetails {
    String getUsername();
    String getPassword();
    String getRole();
    boolean isActive();
    Long getUserId();
}