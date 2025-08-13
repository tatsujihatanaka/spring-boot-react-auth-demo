package com.example.userauth.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String password; // Only used for updates
}
