package com.jsp.PerfumesTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jsp.PerfumesTask.Dto.PerfumesDto;

@Repository
public interface PerfumeRepo extends JpaRepository<PerfumesDto, Integer>{
	
}
