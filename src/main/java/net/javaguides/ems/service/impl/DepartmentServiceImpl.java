package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.entity.Department;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.DepartmentMapper;
import net.javaguides.ems.repository.DepartmentRepository;
import net.javaguides.ems.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // using this annotation will automatically create a spring bean for this DepartmentService
@AllArgsConstructor   // this lombok annotation is used to 5o automatically create the DepartmentServiceImpl class constructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;   // creating an instance member for injecting the dependency using the Constructor DI

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

        // below we are converting the DepartmentDto to Department entity and then we will save the Department entity object into database table
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);

    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department is not found with a given id: " + departmentId));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();
        return departments.stream()
                .map((department) -> DepartmentMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exists with a given id:" + departmentId));

        // here basically the updatedDepartment object holds all the updated data
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        // here we're saving this updatedDepartment object into database
         Department savedUpdatedObj = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedUpdatedObj);
    }

    @Override
    public void deleteDepartment(Long departmentId) {

        departmentRepository.findById(departmentId)     // here findById retuns optional and optional has orElseThrow method
                .orElseThrow(()-> new ResourceNotFoundException("Department does not exists with a given id:" + departmentId));

        departmentRepository.deleteById(departmentId);


    }
}
