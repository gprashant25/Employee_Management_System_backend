package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Department;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.DepartmentRepository;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service  // this annotation tells the spring container to create a spring bean for this EmployeeServiceImpl class
@AllArgsConstructor  // this is used bcos to use the constructor based dependency injection
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;  // creating instance member for using constructor based dependency injection

    // Please note: so whenever we save the employee object into the database, we have to also add the department object to the employee object bcos department is acting as a foreign key here
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        // EmployeeMapper class is used bcos we need to store the Employee entity into database
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        // this is done bcos of Many to one relationship between employee and department object
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exists with id: " + employeeDto.getDepartmentId() ));
        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);  // here save method is used bcos when if the employee doesn't contain the primary key ID then it will perform the insert operation

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)  // here findById method returns optional and optional has orElseThrow method
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map((employee)-> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        // to check if employee with given id exist in database then update that specific id or else if id not exists then we have to throw the ResourceNotFound exception
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id:" + employeeId));

        // below code is for setting all the details from updatedEmployee object into this Employee object. So, whatever the client is updating the details in updatedEmployee Object we have to set it in Employee object
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        // this is ndone bcos of Many to one relationship between employee and department object
        Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exists with id: " + updatedEmployee.getDepartmentId() ));
        employee.setDepartment(department);


        // here employeeRepository ie Spring JPA Repository save method used to save the Employee objects with the updated details entered by client
        // save method perform both save(ie insert operation) and update operation : So, here the save method is used bcos here if the employee object contains the Primary key id, then save method will internally perform the update operation o.w. it  will perform the insert operation
        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        // to check validation if employee with given id exist in database then delete that specific id or else if id not exists then we have to throw the ResourceNotFound exception
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with given id:" + employeeId));

        employeeRepository.deleteById(employeeId);

    }


}
