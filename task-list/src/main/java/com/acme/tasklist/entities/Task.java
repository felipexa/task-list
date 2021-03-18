package com.acme.tasklist.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tb_task")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String description;
	
	private Boolean done;
		
	private Long tasklist;
	
 
	public Task() {		
	}
	
	public Task(String description, Boolean done, TaskList tasklist) {
		super();		
		this.description = description;
		this.done = done;
		this.tasklist = tasklist.getId();
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getDone() {
		return done;
	}

	public void setDone(Boolean done) {
		this.done = done;
	}



	public Long getTasklist() {
		return tasklist;
	}



	public void setTasklist(Long tasklist) {
		this.tasklist = tasklist;
	}

	
	
				
}
