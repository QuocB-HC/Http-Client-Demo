import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student-service.service';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudentMSSV: number = Math.floor(10000000 + Math.random() * 90000000);
  newStudentName: string = '';
  newStudentEmail: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
      this.loadStudents();
  }

  // Tải danh sách sinh viên
  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  // Thêm sinh viên mới
  addStudent() {
    if (this.newStudentName.trim() == '' || this.newStudentEmail.trim() == '') {
      alert('Không được để trống tên hoặc email');
    }
    else {
      const newStudent = { mssv: this.newStudentMSSV, name: this.newStudentName, email: this.newStudentEmail };
      this.studentService.addStudent(newStudent).subscribe(student => {
        this.students.unshift(student);
        this.newStudentName = '';
        this.newStudentEmail = '';
      });
    }
  }

  // Xóa sinh viên
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(s => s.id !== id);
    });
  }
}
