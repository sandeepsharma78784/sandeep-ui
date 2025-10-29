import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HighlightDirective } from './highlight.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ControlComponent } from './control/control.component';
import { Observable } from 'rxjs';
import { ControlService } from './control.service';
import { ControlBase } from './models/control-base';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, EmployeeListComponent, HighlightDirective, DynamicFormComponent, ControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sandeep-ui';
  controls$: Observable<any[]>;

  // we are calling api in this componen and dynamic form is its child compoent we will pass data to dynamic form
  // then dynamic form will create form controls and pass each control to control component to render
  constructor(service: ControlService) {
    this.controls$ = service.getControls();
  }

}
