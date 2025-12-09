# Employee List Application — Frontend (Angular with PrimeNG)

This is the frontend application for the **Employee List Application**, built using **Angular (Standalone Components)** and a UI framework **PrimeNG**.  
It communicates with a .NET Web API backend to perform CRUD operations for employees.

---

##  Features

-  Create a new Employee  
-  Update existing Employee  
-  View Employee details  
-  Delete an Employee  
-  Display all Employees in a list/table  

---

##  Technology Stack

- **Angular 20** (Standalone Components)
- **TypeScript**
- **PrimeNG**
- **RxJS & Angular HTTP Client**

---

##  Installation & Setup

### 1️. **Clone the repository**

git clone https://github.com/PauloXedric/EmployeeListApp-frontend.git

cd EmployeeListApp-frontend 

---

### 2. **Install dependencies***

npm install

---

### 3. **Configure the API base URL***

Before running the application, update the backend API URL inside:

src/environments/environment.ts

Modify this file as needed:

export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:44314/api', // Change this to your backend's local API URL
  
};

---

### 4. **Run the Angular development serve***

**npm start** or **ng serve**

---
 
## Backend Repository

The backend (.NET Web API with Entity Framework + MSSQL) is hosted separately:

https://github.com/PauloXedric/EmployeeListApp-backend


