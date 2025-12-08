import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ReadEmployeeModel } from '../../_models/employee/read-employee.model';
import { ApiResponse } from '../../_models/api-response.model';
import { AddEmployeeModel } from '../../_models/employee/add-employee.model';
import { UpdateEmployeeModel } from '../../_models/employee/update-employee.model';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ToolbarModule,
    TableModule,
    CurrencyPipe,
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class EmployeeComponent implements OnInit {
  employees: ReadEmployeeModel[] = [];
  form!: FormGroup;

  dialogVisible = false;
  viewVisible = false;

  isEdit = false;
  selectedEmployee: ReadEmployeeModel | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      dateHired: [new Date().toISOString()],
      salary: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  openCreate() {
    this.isEdit = false;
    this.form.reset({
      dateHired: new Date().toISOString(),
      salary: 0,
    });
    this.dialogVisible = true;
  }

  openEdit(emp: ReadEmployeeModel) {
    this.isEdit = true;
    this.form.patchValue(emp);
    this.dialogVisible = true;
  }

  saveEmployee() {
    if (this.form.invalid) return;

    if (this.isEdit) {
      const updateData: UpdateEmployeeModel = this.form.value;
      this.employeeService.update(updateData).subscribe({
        next: (res: ApiResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.loadEmployees();
          this.dialogVisible = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        },
      });
    } else {
      const createData: AddEmployeeModel = this.form.value;
      this.employeeService.create(createData).subscribe({
        next: (res: ApiResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.loadEmployees();
          this.dialogVisible = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        },
      });
    }
  }

  viewEmployee(emp: ReadEmployeeModel) {
    this.selectedEmployee = emp;
    this.viewVisible = true;
  }

  deleteEmployee(emp: ReadEmployeeModel) {
    if (!emp.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Employee ID not found',
      });
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${emp.firstName} ${emp.lastName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.delete(emp.id).subscribe({
          next: (res: ApiResponse) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: res.message,
            });
            this.loadEmployees();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
            });
          },
        });
      },
    });
  }
}
