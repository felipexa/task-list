package com.acme.tasklist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acme.tasklist.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
