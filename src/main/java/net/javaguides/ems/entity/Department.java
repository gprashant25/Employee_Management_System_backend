package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor   // to create a default constructor
@AllArgsConstructor   // to create a parameterized constructor
@Entity     // this annotation specifies that the department class as a JPA entity and this class can be mapped to a database table
@Table(name="departments")   // this annotation is used to explicitly provide the table name to this JPA entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "department_description")
    private String departmentDescription;


}
