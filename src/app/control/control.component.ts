import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ControlBase } from '../models/control-base';

@Component({
  selector: 'app-control',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
  standalone: true
})
export class ControlComponent {
 @Input() control!: ControlBase<string>;
  @Input() form!: FormGroup;
  // get isValid() {
  //   return this.form.controls[this.control.key].valid;
  // }

  
}
