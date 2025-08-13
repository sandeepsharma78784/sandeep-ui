import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EmployeeListComponent,HighlightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sandeep-ui';
}
