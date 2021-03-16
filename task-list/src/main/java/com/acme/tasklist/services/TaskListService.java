package com.acme.tasklist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acme.tasklist.entities.TaskList;
import com.acme.tasklist.repositories.TaskListRepository;
import com.acme.tasklist.services.exceptions.ResourceNotFoundException;

@Service
public class TaskListService {
	
	@Autowired	
	private TaskListRepository repository;
	
	public List<TaskList> findAll() {
		return repository.findAll();
	}
	
	public TaskList findById(Long id) {
		Optional<TaskList> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public TaskList insert(TaskList obj) {
		return repository.save(obj);
	}

}
