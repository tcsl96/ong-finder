package com.ongfinder.ong_finder_api.repository;

import com.ongfinder.ong_finder_api.entity.Ong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OngRepository extends JpaRepository<Ong, Long> {

}