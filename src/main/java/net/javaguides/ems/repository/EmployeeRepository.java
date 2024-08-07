package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

// here the EmployeeRepository will get a CRUD methods to perform CRUD database operations on this Employee entity
public interface EmployeeRepository extends JpaRepository<Employee, Long> {



}
