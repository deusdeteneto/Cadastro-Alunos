package com.abutua.cadastro_aluno.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.cadastro_aluno.model.Course;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {

    private List<Course> courses = new ArrayList<>();
    
    // Cenário necessário para executar os testes #Cursos
    public CourseController() {
        courses.add(new Course(1, "JavaScript"));
        courses.add(new Course(2, "Java"));
        courses.add(new Course(3, "Python"));
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courses;
    }    
}
