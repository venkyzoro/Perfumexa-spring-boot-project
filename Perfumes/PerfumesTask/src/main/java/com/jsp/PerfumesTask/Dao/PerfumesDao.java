package com.jsp.PerfumesTask.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jsp.PerfumesTask.Dto.PerfumesDto;
import com.jsp.PerfumesTask.repository.PerfumeRepo;

@Repository
public class PerfumesDao {
	
	@Autowired
	PerfumeRepo repo;

	public List<PerfumesDto> saveList(List<PerfumesDto> p) {
//		for(PerfumesDto per:p) {
//			repo.save(per);
//		}
		return repo.saveAll(p);
	}
	
	public Optional<PerfumesDto> findById(int id) {
		return repo.findById(id);
	}
	
	public List<PerfumesDto> fetchAll(){
		return repo.findAll();
	}
	
	
}
