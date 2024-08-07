import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/departments'

// creating a arrow function and lets export it
// below writing the REST Client code to make or call a get All Depatment REST API call using Axios API
// below can also be written as export const getAllDepartments = () => axios.get(DEPARTMENT_REST_API_BASE_URL);
export const getAllDepartments = () => {

    return axios.get(DEPARTMENT_REST_API_BASE_URL)
}

// writing the REST client code to call the create department REST API using axios
export const createDepartment = (department) => axios.post(DEPARTMENT_REST_API_BASE_URL, department);


// writing the REST Client code to call the get department id using axios.get method where we pass the base url along with / and then append the departmentId
export const getDepartmentById = (departmentId) => axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);

// writing the rest client code to call the update department rest api using axios.put method
// here below using the arrow function where we're passing the (first parameter as departmentId, Second parameter as department object) so here the department object basically contains the updated department information
export const updateDepartment = (departmentId, department) => axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId, department);

// writing a rest client code to delete department REST API using axios.delete() method
export const deleteDepartment = (departmentId) => axios.delete(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId);