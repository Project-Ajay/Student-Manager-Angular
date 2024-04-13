import { Component } from '@angular/core';
import { Course } from "../../model/course";
import { CourseService } from "../../services/course.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  course: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder)
  {
    this.course = new Course()
  }

  addCourse() {
    this.courseService.addCourse(this.course).subscribe(
      result => {
        console.log(`${this.course.courseName} ADDED`);
      },
      error => {
        console.error('Error adding course:', error);
      }
    );
  }
  protected readonly onsubmit = onsubmit;
}
