package com.example.userauth.service;

import com.example.userauth.dto.UserDto;
import com.example.userauth.model.User;
import com.example.userauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(UserDto userDto);
    User update(Long id, UserDto userDto);
    void deleteById(Long id);
}

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User update(Long id, UserDto userDto) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(userDto.getUsername());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setRole(userDto.getRole());
            if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
