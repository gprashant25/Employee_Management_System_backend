package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// we use EmployeeDto class to transfer the data between client and server. so when we build the restful web services, we'll use this EmployeeDto as a response for Rest API
public class EmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    private Long departmentId;
}
