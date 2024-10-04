package com.abutua.cadastro_aluno.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.cadastro_aluno.model.Student;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {

    private List<Student> students = new ArrayList<>();

    // Cenário necessário para executar os testes #Alunos
    // public StudentController() {
    //     students.add(new Student(1, "João Silva", "joao@gmail.com", "(99) 12345-6789", 1, 1));
    //     students.add(new Student(2, "Maria Oliveira", "maria@gmail.com", "(00) 98765-4321", 2, 2));
    //     students.add(new Student(3, "Carlos Souza", "carlos@gmail.com", "(11) 99999-8888", 3, 3));
    // }
    
    @GetMapping
    public List<Student> getAllStudents() {
        return students;
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return students.stream()
                .filter(student -> student.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    @PostMapping
    public ResponseEntity<Student> addStudents(@RequestBody Student student) {
        if (student.getName() == null || student.getEmail() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(student);
    }

}
