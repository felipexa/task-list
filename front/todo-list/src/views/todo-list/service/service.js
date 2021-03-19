import axios from 'axios';
const baseUrlTask = "http://localhost:8080/task"
const baseUrlTaskList = "http://localhost:8080/taskList"

export const getTask = () => axios.get(baseUrlTask).then((resp) => resp.data);
export const updateTask = (id, data) => axios.put(`${baseUrlTask}/${id}`, data).then((resp) => resp.data);
export const addTask = (data) => axios.post(baseUrlTask, data).then((resp) => resp.data);
export const deleteTask = (id) => axios.delete(`${baseUrlTask}/${id}`);

export const getTaskList = () => axios.get(baseUrlTaskList).then((resp) => resp.data);
export const addTaskList = (data) => axios.post(baseUrlTaskList, data).then((resp) => resp.data);