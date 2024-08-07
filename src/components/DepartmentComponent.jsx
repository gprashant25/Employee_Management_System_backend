import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

    // useState() hook is nothing but a Javascript function that returns the array with 2 values ie the state variables and function of that state variable with the initial value as empty values
    const [departmentName, setDepartmentName ] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')

    const navigate = useNavigate();

    // in order to get the id from the URL we have to use useParams() hook from react-router-dom. this hook return the key-value pair and we're using destructuring to get the value by using id
    const {id} = useParams();

    useEffect(() => {

        getDepartmentById(id).then((response)=>{
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription)
        }).catch((error)=>
            console.error(error))

    }, id)


    function saveOrUpdateDepartment(event){

        event.preventDefault();

        const department = {departmentName, departmentDescription}
        //console.log(department);

        if(id){
            updateDepartment(id, department).then((response) => {
                console.log(response.data);
                navigate('/departments');

            }).catch(error =>{
                console.error(error);
            })
        }
        else{
        createDepartment(department).then((response) =>{
            console.log(response.data);
            navigate('/departments');

        }).catch((error)=>{
            console.error(error);
        })
    }

    }

    // to display the page title dynamically for Add and Update department rest api client call
    function pageTitle(){
        // here below we could able to pass the id bcos of useParams() hook please check descripton above mentioned in useParams() hook
        if(id){
            return <h2 className='text-center'> Update Department</h2>
        }
        else{
            return <h2 className='text-center'> Add Department</h2>
        }
    }


  return (

    <div className='container'>
        <br/>
        <br/>
        <div className='row'>

            {/* below using code to display the add department form at center by using the bootstrap grid system */}
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()  // using this function to display the page title dynamically for Add & Update department
                }

                <div className='card-body'>
                    <form>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Name:</label>
                            <input
                            text='text'   // here ll these attributes like text, placeholder, name, value, className, onChange are all termed as attributes 
                            placeholder='Enter Department Name'
                            name='departmentName'
                            value={departmentName}   // passing state variable name to the value attribute
                            className='form-control'
                            onChange={(event)=>setDepartmentName(event.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'> Department Description:</label>
                            <input
                            text='text'
                            placeholder='Enter Department Description'
                            name='departmentDescription'
                            value={departmentDescription}
                            className='form-control'
                            onChange={(event) => setDepartmentDescription(event.target.value)}
                            >
                            </input>
                        </div>

                        <button className='btn btn-success mb-2' onClick={(event) => saveOrUpdateDepartment(event)}>Submit</button>
                                         
                    </form>

                </div>

            </div>
        </div>
        
        
    </div>
  )
}

export default DepartmentComponent