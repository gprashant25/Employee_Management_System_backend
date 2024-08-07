import React from 'react'
import { NavLink } from 'react-router-dom'


// below code is written using react arrow function component shortcut is rafce
const HeaderComponent = () => {

  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <a className="navbar-brand" href="https://www.javaguides.net">Employee Management System</a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* below using Navlink component from react router dom library to navigate user to particular page ie we're configuring the route here */}
                  <NavLink className="nav-link" to="/employees">Employees</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/departments'>Departments</NavLink>
              </li>
            </ul>
            
          </div>

        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent