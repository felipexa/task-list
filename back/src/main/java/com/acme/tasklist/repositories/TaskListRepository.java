package com.acme.tasklist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acme.tasklist.entities.TaskList;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {

}
