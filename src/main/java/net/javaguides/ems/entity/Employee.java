package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// using java annotation library Lombok annotation  to reduce the boilerplate code such as getters, setters and constructors etc
@Getter
@Setter
@NoArgsConstructor   // to create a no argument constructor ie default constructor
@AllArgsConstructor  //

// below created Employee POJO class
@Entity  // to make the Employee class as an entity by using JPA annotation ie to specify a class as an JPA entity
@Table(name="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // specifying primary key. So using generation stratergy that uses database auto increment feature to auto increment primary key
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    //here we're going to establish many to one relatioship between employee entity and department entity
    // bidirectional mapping is not necessary here bcos we're going to perform CRUD operations on individual entities.
    // below creating a department instance variable and in order to establish many to one relationship between employee and department use @ManyToOne annotation
    // and here we're passing fetchType = LAZY bcos whenever we get a employee entity object from the database, then Hibernate wont load the dependent object i.e department object. immediately wer can get this department object lazily or on demand
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")// here incase of many to one relationship, we have to maintain a  foreingn key in a employee table and we can specify it by using @JoinColumn annotation an using its name attribute to define the foreign key name
    private Department department;


}
