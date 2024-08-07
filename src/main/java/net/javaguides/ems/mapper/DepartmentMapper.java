package net.javaguides.ems.mapper;


// creating a DepartmentMapper class to map the Department Entity or Department JPA entity into DepartmentDto and vise-versa

import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.entity.Department;

public class DepartmentMapper {

    // creating a static method to convert the Department JPA entity into Department Dto
    public static DepartmentDto mapToDepartmentDto(Department department){

        return new DepartmentDto(department.getId(), department.getDepartmentName(), department.getDepartmentDescription());
    }


    // converting DepartmentDto into Department Jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto){

        return new Department(departmentDto.getId(), departmentDto.getDepartmentName(), departmentDto.getDepartmentDescription());
    }
}
