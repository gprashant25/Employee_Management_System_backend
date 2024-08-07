package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;

// this EmployeeMapper class is created to map the Employee entity or Employee JPA entity to EmployeeDto and also to map EmployeeDto to Employee entity.
// So whenever we build restful web service, then we have to convert Employee entity to EmployeeDto and vis-versa
public class EmployeeMapper {

    // we have created this method to map the Employee entity or Employee JPA entity into EmployeeDto
    public static EmployeeDto mapToEmployeeDto(Employee employee){

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment().getId()
                );

    }

    // we have created this method to map the EmployeeDto to Employee entity.
    // So here instead of using constructor here we will be using the setter method bcos we have add the department entity as instance variablein the employee entity
    public static Employee mapToEmployee(EmployeeDto employeeDto){

        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        return employee;
    }
}
