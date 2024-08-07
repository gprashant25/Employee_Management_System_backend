package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")  // while making AJAX request to external rest api we have to handle the CORS policy error using this @CrossOrigin annotation
@AllArgsConstructor  // to inject the constructor based dependency injection
@RestController  // using @RestController annotation, this class becomes a Spring rest controllers and this class is capable to handle http request
@RequestMapping("/api/employees")   // @RequestMapping annotation is used to define the base URL for all the REST APIs that we're going to build within this Controller
public class EmployeeController {

    // Please note: we're creating a REST API using Springboot is simple, ie we just need to create a method in EmployeeService interface and override it in EmployeeServiceImpl class and then we'll convert that method into REST API by using Spring annotation
    private EmployeeService employeeService;   // creating instance member for using constructor based dependency injection


    // Building Add employee REST API ie we'll create a method and then we'll make that method as REST API by using spring annotation
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){

        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }


    // Building Get Employee REST API
    @GetMapping("{id}")   // @GetMapping annotation to map the incoming Http request to this method
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){    // @PathVariable annotation will bind the value of this URL template variable to this method argument passed ie the Long employeeId parameter

        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }


    // Building Get All Employees REST API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){

        List<EmployeeDto> employeeDto = employeeService.getAllEmployees();
        return ResponseEntity.ok(employeeDto);
    }


    // Build Update Employee REST API
    // below code explanation: we used @PutMapping annotation to map incoming http put request to this method.
    // So we'll pass th ID and this ID is nothing but the template variable and we need to bind the value of this template variable to the method argument. hence we have used @PathVariable annotation over here.
    //We also used @RequestBody annotation will basically extract the updated JSON from the http request and it will convert that JSON into EmployeeDto java object.
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee){

        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
        return ResponseEntity.ok(employeeDto);
    }


    // Build the Delete Employee REST API
    // here @DeleteMapping annotation is used to map the incoming http request to this method.
    // And we need to pass the id to the @DeleteMapping annotation and this id is the URL template variable and we need to bind the value of this template variable to the below method argument using the @PathVariable annotation
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){

        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!");
    }




}
