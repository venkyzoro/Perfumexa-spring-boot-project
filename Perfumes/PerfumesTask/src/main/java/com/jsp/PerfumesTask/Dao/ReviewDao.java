package com.jsp.PerfumesTask.Dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jsp.PerfumesTask.Dto.ReviewsDto;
import com.jsp.PerfumesTask.repository.PerfumeRepo;
import com.jsp.PerfumesTask.repository.ReviewRepo;

@Repository
public class ReviewDao {
	@Autowired
	ReviewRepo repo;
	@Autowired
	PerfumeRepo perfumeRepo;
	public List<ReviewsDto> saveAll(List<ReviewsDto> dtos){
		
		return repo.saveAll(dtos);
	}
	
	public ReviewsDto saveReview(ReviewsDto dto) {
		return repo.save(dto);
	}
	
	public List<ReviewsDto> fetchAllReviews() {
		return repo.findAll();
	}
}
