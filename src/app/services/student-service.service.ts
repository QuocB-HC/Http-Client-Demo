import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  // Lấy danh sách sinh viên
  getStudents(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Thêm sinh viên mới
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, student);
  }

  // Xóa sinh viên
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
