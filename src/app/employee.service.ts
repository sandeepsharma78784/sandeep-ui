import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  salary: number;
  // add other properties if any
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    alert("get employees called");
    return this.http.get<Employee[]>(this.apiUrl);
  }

   addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  addEmployeeToAuthDB(): Observable<any> {
    let k ={
  "username": "sandeep",
  "email": "sandeep@example.com",
  "passwordHash": "hashed_pw",
  "role": "USER",
  "subscription": "FREE"
}

    
    return this.http.post<Employee>('http://localhost:8080/api/users', k);
  }


   login(): Observable<any> {
    let k ={
  "username": "sandeep",
  "email": "sandeep@example.com",
  "password": "hashed_pw",
}

    
    return this.http.post<Employee>('http://localhost:8080/api/auth/login', k);
  }

  

}
