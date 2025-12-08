import { Routes } from '@angular/router';
import { EmployeeComponent } from './features/components/employee/employee';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeComponent,
  },
  {
    path: '**',
    redirectTo: 'employees',
  },
];
