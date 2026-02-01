import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.mode';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7245/api'
  getEmployees(){
    return this.http.get<Employee[]>(`${this.apiUrl}/Employees`);
  }
  deleteEmployee(id : number) {
    return this.http.delete(`${this.apiUrl}/Employees/${id}`);
  }
}
