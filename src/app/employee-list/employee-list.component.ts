import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
// ,NgIf,NgFor,FormsModule
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule,NgIf,NgFor,FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  standalone: true
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage = '';
  
  newEmployee: Employee = {
    name: '',
    salary: 0
  };

  addError = '';
  addSuccess = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (error) => {
        console.log('Error fetching employees:', error);
        this.errorMessage = 'Could not load employees.'
      }
    });
  }
  onAddEmployee() {
    this.addError = '';
    this.addSuccess = '';

    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: (data) => {
        this.addSuccess = 'Employee added successfully!';
        this.employees.push(data);  // Update list immediately
        this.newEmployee = { name: '', salary: 0 }; // reset form
      },
      error: (err) => {
        this.addError = 'Failed to add employee.';
      }
    });
  }


  // yaha ab hum vo signup wala kaa krege kyuki hum onpremise nai auth0 ka db use krre hai
  addEmployeeToAuthDB() {
    this.employeeService.addEmployeeToAuthDB().subscribe({
      next: (data) => {
      alert(data);
      },
      error: (err) => {
        this.addError = 'Failed to add employee.';
      }
    });
  }

login() {
    this.employeeService.login().subscribe({
      next: (data) => {
      alert(data);
      },
      error: (err) => {
        this.addError = 'Failed to add employee.';
      }
    });
  }
}