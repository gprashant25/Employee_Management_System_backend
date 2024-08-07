package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

// this we're creating ie DepartmentRepository interface that extends JpaRepository interface, then this Departmentrepository will get the CRUD methods to perform CRUD database operations on Department entity
// SpringData JpaRepository will automatically provide the implementation for all the CRUD methods that we can perform CRUD database operaions on this department JPA entity.
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
