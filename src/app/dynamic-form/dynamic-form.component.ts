import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlBase } from '../models/control-base';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule,ControlComponent,ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone: true
})
export class DynamicFormComponent {
  @Input() controls: ControlBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
   ngOnInit() {
    this.form = this.transformJsonToFormGroup(this.controls as ControlBase<string>[]);
  }

  transformJsonToFormGroup(controls: ControlBase<string>[]) {
    const group: any = {};
    controls.forEach((control) => {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }

   onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }
}
