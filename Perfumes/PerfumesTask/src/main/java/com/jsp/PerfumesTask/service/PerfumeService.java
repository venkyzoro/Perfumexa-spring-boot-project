package com.jsp.PerfumesTask.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.jsp.PerfumesTask.Dao.PerfumesDao;
import com.jsp.PerfumesTask.Dao.ReviewDao;
import com.jsp.PerfumesTask.Dto.PerfumesDto;
import com.jsp.PerfumesTask.Dto.ReviewsDto;
import com.jsp.PerfumesTask.repository.ResponseStructure;


@Service
public class PerfumeService {
	@Autowired
	PerfumesDao dao;
	@Autowired
	ReviewDao reviewDao;
	
	private ResponseEntity<ResponseStructure> buildResponse(HttpStatus status, String message, Object data) {
        ResponseStructure structure = ResponseStructure
                .builder()
                .status(status.value())
                .msg(message)
                .object(data)
                .build();
        return new ResponseEntity<>(structure, status);
    }

	public ResponseEntity<ResponseStructure> saveAll(ArrayList<PerfumesDto> dto){
		System.out.println(dto);
		try {
	        return buildResponse(HttpStatus.CREATED, "Saved successfully", dao.saveList(dto));
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save data", null);
	    }
	}
	
	public ResponseEntity<ResponseStructure> findById(int id){
		try {
	        return buildResponse(HttpStatus.CREATED, "Fetched successfully", dao.findById(id).get());
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch all", null);
	    }
	}
	
	public ResponseEntity<ResponseStructure> fetchAll(){
		try {
	        return buildResponse(HttpStatus.CREATED, "Fetch Successfull", dao.fetchAll());
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch", null);
	    }
	}
	
	public ResponseEntity<ResponseStructure> saveReviews(List<ReviewsDto> dtos){
		try {
	        return buildResponse(HttpStatus.CREATED, "Saved Successfull", reviewDao.saveAll(dtos));
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch", null);
	    }
	}
	
	public ResponseEntity<ResponseStructure> saveReview(ReviewsDto dto){
		try {
	        return buildResponse(HttpStatus.CREATED, "Saved Successfull", reviewDao.saveReview(dto));
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save"+e, null);
	    }
	}
	
	public ResponseEntity<ResponseStructure> fetchAllReviews(){
		try {
	        return buildResponse(HttpStatus.CREATED, "Fetched Successfull", reviewDao.fetchAllReviews());
	    } catch (Exception e) {
	        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch", null);
	    }
	}
}
