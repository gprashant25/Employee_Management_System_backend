package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.entity.Department;
import net.javaguides.ems.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*") // here * means all the clients ie React frontend application can able to call the REST API from this Department Controller // while making AJAX request to external rest api we have to handle the CORS policy error using this @CrossOrigin annotation
@RestController      // using this @RestController annotation this controller class becomes a Spring MVC controller and it is capable of handling the http request and response.
@RequestMapping("/api/departments")      // using this annotation bcos we need to define the BASE REST API URL for all the REST API handler methods (such as @Getmapping, @PostMapping etc) that we're going to define within this department controller class
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;  // declaring an instance for injecting the constructor dependency injection

    // Building add or create department REST API . Please note: for creating a REST API using Springboot is simple. we need to create a method and then we need to convert that method into REST API handler method
    @PostMapping
    public ResponseEntity<DepartmentDto> createEmployee(@RequestBody DepartmentDto departmentDto){

        DepartmentDto savedDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }


    // Building a GET Department REST API
    // below we're passing the URI template variable i.e id, and we're using @PathVariable to bind our URI template variable to this method argument
    @GetMapping("{id}")   // using SpringBoot annotation @GetMapping to make this method as a REST API and this annotation used to map the incoming http get request to this particular method
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){

        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);

    }

    // Built get all Departments REST API
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){

        List<DepartmentDto> departmentDto = departmentService.getAllDepartments();
        return ResponseEntity.ok(departmentDto);    // here using the ResponseEntity static ok method
    }

    // Build the update department REST API
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId, @RequestBody DepartmentDto updatedDepartment){

        DepartmentDto departmentDto = departmentService.updateDepartment(departmentId, updatedDepartment);
        return ResponseEntity.ok(departmentDto);
    }


    // Build Delete department REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){

        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department deleted Successfully!");
    }

}
