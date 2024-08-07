// HERE onwards, we will connect our React application to get all the employees REST API and will populate the response of that REST API data in our react component table. So instead of displaying the dummy data, we'll be going to display the real world daqta that we will get from the REST API.
// IMPORTANT: In order to make REST API call in our React application, we have to use third party http library 
// In this project, we are going to use AXIOS third party http library to make our REST API call from our React application.

//So in this EmployeeServicre.js file, we will write our REST API Client code to make a REST API call using the Axios API(third party library)

import axios from "axios";

// below is the REST API base url
const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// below we have written REST client code and used the javascript arrow function to make all employees rest api call. And in return statement used axios.get() method and passed the rest api base url
// below code can also be written as export const listEmployees = () => axios.get(REST_API_BASE_URL);
export const listEmployees = () => {

    return (
        axios.get(REST_API_BASE_URL)
    )
}

// Below writing REST Client code to call Add Employee REST API using axios.post(REST_API_BASE_URL, employee object) method 
// Here we're going to connect our React application to Add Employee REST API. 
// Previously we have designed Add Employee form and whenever user submit this form then our React application have to connect to Add Employee REST API and then our React application will send this form information to Add Employee REST API and this Add Employee REST API will internally store this form data into MySQL database.
// below arrow function takes the employee object (ie employee) and this employee object holds the form data
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// below writing the REST client code to call the get employee REST API using Axios
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId );

// writing the REST client code to to call and update the Employee REST API  
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

// writing the REST Client code to call the delete Employee REST API using Axios
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);