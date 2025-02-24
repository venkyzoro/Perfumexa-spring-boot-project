package com.jsp.PerfumesTask.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;

import com.jsp.PerfumesTask.Dto.PerfumesDto;
import com.jsp.PerfumesTask.Dto.ReviewsDto;
import com.jsp.PerfumesTask.repository.ResponseStructure;
import com.jsp.PerfumesTask.service.PerfumeService;
import com.jsp.PerfumesTask.utility.ContactUsMail;

@RestController
@RequestMapping("perfume")
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET })
public class PerfumeController {
	@Autowired
	PerfumeService service;

	@PostMapping("saveAll")
	public ResponseEntity<ResponseStructure> saveAll(@RequestBody ArrayList<PerfumesDto> dto) {
		System.out.println(dto);
		return service.saveAll(dto);
	}

	@GetMapping("findById/{id}")
	public ResponseEntity<ResponseStructure> findById(@PathVariable int id) {
		return service.findById(id);
	}

	@GetMapping("fetchAll")
	public ResponseEntity<ResponseStructure> fetchAll() {
		return service.fetchAll();
	}

	@PostMapping("saveReviews")
	public ResponseEntity<ResponseStructure> saveReviews(@RequestBody List<ReviewsDto> dtos) {
		return service.saveReviews(dtos);
	}

	@PostMapping("saveReview")
	public ResponseEntity<ResponseStructure> saveReview(@RequestBody ReviewsDto dto) {
		return service.saveReview(dto);
	}

	@GetMapping("fetchAllReviews")
	public ResponseEntity<ResponseStructure> fetchAllReviews() {
		return service.fetchAllReviews();
	}
	
	@Autowired
	ContactUsMail contactUsMail;
	
	@PostMapping("sentMail/{email}/{text}/{subject}")
	public void sentMail(@PathVariable String email, @PathVariable String text, @PathVariable String subject) {
	     contactUsMail.sendEmail(email, text, subject);
	}

}
