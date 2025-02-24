package com.jsp.PerfumesTask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jsp.PerfumesTask.Dto.ReviewsDto;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewsDto, Integer>{
	
}
