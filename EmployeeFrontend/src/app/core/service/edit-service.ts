import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Create } from '../model/create.model';
@Injectable({
  providedIn: 'root',
})
export class EditService {
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7245/api'

  getById (id :number){
    return this.http.get(`${this.apiUrl}/Employees/${id}`);
  }
  editEmployee(id : number, data : Create){
    return this.http.put(`${this.apiUrl}/Employees/${id}`,data);
  }
}
