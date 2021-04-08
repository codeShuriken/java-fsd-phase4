package com.hclfsd.team10jan.capstone.repositories;
import org.springframework.data.repository.CrudRepository;

import com.hclfsd.team10jan.capstone.entities.Album;

public interface AlbumRepository extends CrudRepository<Album, Integer>{
}