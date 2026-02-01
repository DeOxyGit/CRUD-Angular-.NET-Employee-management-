import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Create } from '../model/create.model';
import { Department } from '../model/department.model';
@Injectable({
  providedIn: 'root',
})
export class CreateService {
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7245/api'

  createEmployee(data : Create){
    return this.http.post(`${this.apiUrl}/Employees`,data);
  }
  getDepartments(){
    return this.http.get<Department[]>(`${this.apiUrl}/Departments`)
  }

}
