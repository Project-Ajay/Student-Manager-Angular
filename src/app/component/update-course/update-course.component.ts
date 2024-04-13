import { Component, OnInit } from '@angular/core';
import { Course } from "../../model/course";
import { CourseService } from "../../services/course.service";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course?: Course;
  allowEdit?: string;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.getCourse(this.route.snapshot.params['id']);
    this.getEditQuery();
  }

  getCourse(id: number) {
    this.courseService.getCourseById(id).subscribe({
      next: (data: Course) => {
        this.course = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  getEditQuery() {
    this.route.queryParams.subscribe(params => {
      this.allowEdit = params['allowEdit'];
      console.log("AllowEdit: " + this.allowEdit);
    });
  }

  updateCourse() {
    if (this.allowEdit === '1' && this.course?.id) {
      this.courseService.updateCourse(this.course, this.course?.id).subscribe({
        next: (data) => {
          console.log("Course updated successfully:", data);
          alert('Course Updated');
        }
      });
    }
  }


}
