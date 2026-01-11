import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HighlightDirective } from './highlight.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ControlComponent } from './control/control.component';
import { Observable } from 'rxjs';
import { ControlService } from './control.service';
import { ControlBase } from './models/control-base';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BaseTemplateComponent } from './base-template/base-template.component';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, EmployeeListComponent, HighlightDirective,BaseTemplateComponent, DynamicFormComponent, ControlComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sandeep-ui';
  controls$: Observable<any[]>;

  // we are calling api in this componen and dynamic form is its child compoent we will pass data to dynamic form
  // then dynamic form will create form controls and pass each control to control component to render
  constructor(service: ControlService,public auth: AuthService) {
    this.controls$ = service.getControls();
  }


  login() {
    // alert(environment.auth0.redirectUri)
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

}
