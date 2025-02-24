package com.jsp.PerfumesTask.repository;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseStructure {
	private int status;
	private Object object;
	private String msg;
}
