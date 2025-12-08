import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ApiResponse } from '../_models/api-response.model';
import { AddEmployeeModel } from '../_models/employee/add-employee.model';
import { ReadEmployeeModel } from '../_models/employee/read-employee.model';
import { UpdateEmployeeModel } from '../_models/employee/update-employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private api: ApiService) {}

  // Get all employees
  getAll(): Observable<ReadEmployeeModel[]> {
    return this.api.get<ReadEmployeeModel[]>('Employee/list');
  }

  // Get employee by ID
  getById(id: string): Observable<ReadEmployeeModel> {
    return this.api.get<ReadEmployeeModel>(`Employee/${id}`);
  }

  // Add employee
  create(data: AddEmployeeModel): Observable<ApiResponse> {
    return this.api.post<ApiResponse>('Employee', data);
  }

  // Update employee
  update(data: UpdateEmployeeModel): Observable<ApiResponse> {
    return this.api.put<ApiResponse>('Employee', data);
  }

  // Delete employee
  delete(id: string): Observable<ApiResponse> {
    return this.api.delete<ApiResponse>(`Employee/${id}`);
  }
}
