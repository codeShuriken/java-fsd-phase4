package com.hclfsd.team10jan.capstone.repositories;
import org.springframework.data.repository.CrudRepository;

import com.hclfsd.team10jan.capstone.entities.Track;
public interface TrackRepository extends CrudRepository<Track, Integer>{
}