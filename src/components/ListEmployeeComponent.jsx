import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

// below code is written using react arrow function component shortcut is rafce
const ListEmployeeComponent = () => {

    /*// below code is the list of dummy data stored in array
    const dummyData = [
        {
            "id": 1,
            "firstName": "Prashant",
            "lastName": "Gavandar",
            "email": "prashant@gmail.com"
        },

        {
            "id": 2,
            "firstName": "Akash",
            "lastName": "Nadar",
            "email": "akash@gmail.com"
        },

        {
            "id": 3,
            "firstName": "Joel",
            "lastName": "Zach",
            "email": "joel@gmail.com"
        }
    ]
    */

    // below we're going to display the response of rest api instead of dummy data.  
    //So in order to hold the response of the REST API, we have to use the state variable. And in a functional components ie REACT components in order to define the state variable, we have to use useState hook.
    // Always REMEMBER: useState hook allows us to use state variables in a functional components.

    // below is the syntax to use useState hook and its a javascript function or a react library
    const [employees, setEmployees] = useState([])

    //in order to navigate user from one page to another page we can use useNavigate() hook. So it is a Javascript function
    const navigator = useNavigate();

    // In order to make the REST API call or AJAX call in a Reaxt functional component we use useEffect() Hook. It is used to trigger the AJAX request. It is used to get the list of all employees data from REST API using Axios
    useEffect(() => {
        getAllEmployees();

    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewEmployee(){
        // in order to navigate user from one page to another page we can use useNavigate() hook. So it is a Javascript function
            navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)   // here we need to pass the employee id dynamically so use this syntax also enclose the route url in a back tick symbol ad ot the single quote symbol
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) =>{
                getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (

    // below written jsx code to display a list ofr employees in the HTML table
    // below onClick={addNewEmployee} is the event handler and it has a function addNewEmployee and in that function we're using navigator which const variable of useNavigate() hook to navigate to the EmployeeComponent using Route path = '/add-employee'
    <div className='container'>

        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button> 

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th> Employee ID </th>
                    <th> Employee First Name</th>  
                    <th> Employee Last Name </th>
                    <th> Email ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {   // below to use javascript code within jsx we used {} braces and used map method takes the callback function and to iterate over the employees array i.e. the state variable present in useState hook
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                {/* here below passing the arrow function to pass the employee ID to the handler method and also in delete button we're using the inline style so we can call inline style property and then object */}
                                <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>  
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
               
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent