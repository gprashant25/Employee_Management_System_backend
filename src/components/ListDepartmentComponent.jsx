import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';   //using Link component from the react-router-dom library

const ListDepartmentComponent = () => {

    // let dummyData = [
    //     {
    //         "id": 1,
    //         "departmentName": "R&D",
    //         "departmentDescription": "Research Sector Department"
    //     },

    //     {
    //         "id": 2,
    //         "departmentName": "Finance",
    //         "departmentDescription": "Finance Department"
    //     },

    //     {
    //         "id": 3,
    //         "departmentName": "Sports",
    //         "departmentDescription": "Sports Department"
    //     }
    // ]


    // below using the useState() hook so basically its a JavaScript function that takes the dummyData as initial values and it returns an array with exact two values( ie, state variable, setFunction)
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    // useEffect() hook is used to make or execute or trigger the AJAX request or the REST API call
    useEffect( ()=>{

        listOfDepartment();
    }, [])

    function listOfDepartment(){

        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }

    function updateDepartment(id){
        
        // here below wee need to pass the department id in the url and for that we use the syntax backtick symbol like(`/edit-department/${id}`) here we;re passing id dynamicallly hence using ${id} syntax
        navigate(`/edit-department/${id}`)

    }

    function removeDepartment(id){

        deleteDepartment(id).then((response) => {
            console.log(response.data);
            listOfDepartment();
        }).catch(error =>{
            console.error(error);
        })

    }



  return (

    <div className='container'>
    <h2 className='text-center' > List Of Department</h2>
    <Link className='btn btn-primary mb-2' to='/add-department'>Add Department</Link>   
    
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Department Id</th>
                <th>Department Name</th>
                <th>Department Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {/* below we are iterating over a department aaray ie the dummy data and we need to display each deparment as a row in a table */}
            {
            departments.map(department =>
                <tr key={department.id}>
                <td> {department.id} </td>
                <td> {department.departmentName} </td>
                <td> {department.departmentDescription} </td>
                <td>
                    {/* below using the onClick event hanlder method and using the arrow function which acts as handler to this function and we're passing the department id to updateDepartment function */}
                    <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                    <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} style={{marginLeft: '10px'}}>Delete</button>
                </td>
            </tr>

            )
           
            }
        </tbody>
    </table>
    </div>
  )
}

export default ListDepartmentComponent