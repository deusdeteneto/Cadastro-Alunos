package com.abutua.cadastro_aluno.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.cadastro_aluno.model.Student;

@RestController
@RequestMapping("/students")
public class StudentController {

    private List<Student> students = new ArrayList<>();
    
    // Cenário necessário para executar os testes
    public StudentController() {
        students.add(new Student(1, "João Silva", "joao@gmail.com", "(99) 12345-6789", 1, 1));
        students.add(new Student(2, "Maria Oliveira", "maria@gmail.com", "(00) 98765-4321", 2, 2));
        students.add(new Student(3, "Carlos Souza", "carlos@gmail.com", "(11) 99999-8888", 3, 3));
    }
    
}
