import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {

    // to define the state variable(ie firstName, lastname, emailId) in an EmployeeComponent using useState hook
    // useState() hook is a JavaScript function and we can pass the initial value
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    // below is the logic to retrieve all the departments ans we have stored those detasils in department state variable. using getAllDepartment() to populate as select box options
    useEffect(()=>{

        getAllDepartments().then((response)=>{
            setDepartments(response.data);
        }).catch(error=>{
            console.error(error);
        })


    },[])

    // using useState hook for validation error, so below are the object attributes that hold the validation errors with respect to the state variables
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    // using useParams() hook from react-router-dom library and its a js function that returns object with a key value pair and here we just want key
    const { id } = useParams();


    // useNavigate() is a JavaScript function and this is used in order to navigate the user from one page to another page or component
    const navigator = useNavigate();


    // using useEffec() hook to populate the employee data in the form for update
    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email)
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    // below creating a javascripyt function to get the value from thre input text box
    /// we can get the value from this event object by using event.target.value. So we have used setFirstName method to set the value to the firstName state variable
    // so whenever the USER enters the values in input text box, then that value we can get by using event.target.value an this value we're updating it in state variable by using setDepartmentName method or function
    function handleFirstName(event) {
        setFirstName(event.target.value);
    }

    // below using the JavaScript arrow function to simplify the code
    const handleLastName = (event) => setLastName(event.target.value);

    // here below code is commenyted bcos to simiply our code instead of passing the function name we can directly pass the function body inside the onchange{} event handler
    // const handleEmail = (event) => setEmail(event.target.value);


    // creating a saveEmployee(event object){} javaScript function that will handle the onClick event handler
    function saveOrUpdateEmployee(e) {
        e.preventDefault();  // this will prevent all the default activity that will happen while submitting the form

        if (validateForm()) {

            // lets set all the employee object such firstnmae, lastname, email and lets print this employee object to the console
            const employee = { firstName, lastName, email, departmentId }
            console.log(employee)

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            } else {

                // below we have called the createEmployee method from the EmployeeService.js which is the axios.post() method
                // here below createEmployee expect the employee object and notice here this employee object contains firstName, lastName, email. And lets call then() method and then method expects the promise object that contains the reponse.
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }

        }

    }

    // below code written for validation error, writing or calling the js function ie validateForm() that will check the form data
    function validateForm() {
        let valid = true;

        // below using spread operator to copy object into another object
        const errorsCopy = { ...errors }

        // using if-else condition ie if firstNmae is empty then only return validation error
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email ID is required';
            valid = false;
        }

        if(departmentId){
            errorsCopy.department=''
        }else{
            errorsCopy.department='Select Department'
            valid=false;
        }

        setErrors(errorsCopy);

        return valid;


    }


    // below writing the js function in this EmployeeComponent that supports both the operations like Add employee and update Employee as well.
    function pageTitle() {

        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }


    // below will be a Add Employee Form using HTML and Bootstrap classes: ie. classname = 'container' to display the form ina container
    // will be also using the bootstrap css class = ie className = 'card' so that we can display the form within a card 
    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                {/* below using code to display the add department form at center by using the bootstrap grid system */}
                <div className='card col-md-6 offset-md-3 offset-md-3 '> 
                    {
                        pageTitle()   // this is written to dynamically add the page title based on the employee id
                    }
                    <div className='card-body'>
                        <form>

                            {/* // creating input field for firstName */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}  // here value is the state variable
                                    className={` form-control ${errors.firstName ? 'is-invalid' : ''} `}
                                    // to get the user firstname value from the text box we use onChange event handler
                                    onChange={handleFirstName}   // using handleFirstName which is a javascript function to get the value from the input text box
                                >
                                </input>
                                {/* to display the error message in UI page ie employeeComponent */}
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>


                            {/* // creating input field for lastName */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={` form-control ${errors.lastName ? 'is-invalid' : ''} `}
                                    // to get the user lastname value from the text box we use onChange event handler
                                    onChange={handleLastName}
                                >
                                </input>
                                {/* to display the error message in UI page ie employeeComponent */}
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>


                            {/* // creating input field for email */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={` form-control ${errors.email ? 'is-invalid' : ''} `}
                                    // to get the user email value from the text box we use onChange event handler
                                    // here below to simiply our code instead of passing the function name we can directly pass the function body
                                    onChange={(event) => setEmail(event.target.value)}
                                >
                                </input>
                                {/* to display the error message in UI page ie employeeComponent */}
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                            </div>


                              {/* // creating input field for email */}
                              <div className='form-group mb-2'>
                                <label className='form-label'>Select Department:</label>
                                <select
                                    className={` form-control ${errors.department ? 'is-invalid' : ''} `}
                                    value={departmentId}
                                    onChange={(event)=>setDepartmentId(event.target.value)}
                                >
                                    <option value="Select Department">Select Department</option>
                                    {
                                        departments.map( department =>
                                            <option key={department.id} value={department.id}> {department.departmentName} </option>
                                        )
                                    }

                                </select>
                                {/* to display the error message in UI page ie employeeComponent */}
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}

                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent