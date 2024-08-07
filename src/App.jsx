
import './App.css'
import HelloWorld from './HelloWorld'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import  FooterComponent  from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    // below tag in react is called a fragment tag and within this tag we can import HelloWorld component or other components
    // in order to configure the routing, we have use BrowserRouter, Routes from React Router Dom library
    // Routes is basically a container or parent for all the individual Route
    <>  
      <BrowserRouter>
        <HeaderComponent/>
        <Routes> 
          {/* // http://localhost:3000/ */}
          <Route path='/' element= {<ListEmployeeComponent/>}></Route>
          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>
          {/* // http://localhost:3000/edit-employee/{id} */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
          

          {/* // http://localhost:3000/departments */}
          <Route path='/departments' element={<ListDepartmentComponent />}></Route>
          {/* // http://localhost:3000/add-department */}
          <Route path='add-department' element = {<DepartmentComponent/>}></Route>

          <Route path='/edit-department/:id' element={<DepartmentComponent/>} ></Route>
        </Routes>
        <FooterComponent />
    
      </BrowserRouter>
      
    </>
  )
}

export default App
