import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ControlBase } from '../models/control-base';

@Component({
  selector: 'app-control',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
  standalone: true
})
export class ControlComponent implements OnInit {
  @Input() control!: ControlBase<string>;
  @Input() form!: FormGroup;
  
  currentInputValue: string = '';
  showCustomOption: boolean = false;
  filteredOptions: { key: string, value: string }[] = [];
  showDropdown: boolean = false;
  isCustomValueChecked: boolean = false;

  private formControl = this.form?.get(this.control?.key);

  ngOnInit() {
    // Initialize input value from form if it exists
    if (this.formControl?.value) {
      const matchingOption = this.control.options?.find(opt => opt.key === this.formControl?.value);
      if (matchingOption) {
        this.currentInputValue = matchingOption.value;
      }
    }
    // Ensure form value is empty if no option is selected and custom value isn't checked
    if (!this.isCustomValueChecked && !this.currentInputValue) {
      this.formControl?.setValue(null);
    }
  }

  private clearFormValue() {
    this.formControl?.setValue(null);
    this.isCustomValueChecked = false;
  }

  onInputChange(event: any) {
    this.currentInputValue = event.target.value;
    this.showCustomOption = false;
    this.showDropdown = true;
    
    // Clear form value when input changes
    this.clearFormValue();

    // Filter options based on input
    if (this.currentInputValue.trim() !== '') {
      this.filteredOptions = this.control.options?.filter(opt => 
        opt.value.toLowerCase().includes(this.currentInputValue.toLowerCase()) ||
        opt.key.toLowerCase().includes(this.currentInputValue.toLowerCase())
      ) || [];
    } else {
      this.filteredOptions = this.control.options || [];
    }

    this.showCustomOption = this.filteredOptions.length < 1 && this.currentInputValue.trim() !== '';
  }

  selectOption(option: { key: string, value: string }) {
    if (option && option.key) {
      this.formControl?.setValue(option.key);
      this.currentInputValue = option.value;
      this.showDropdown = false;
      this.isCustomValueChecked = false;
    } else {
      this.clearFormValue();
    }
  }

  onFocusOut(event: FocusEvent) {
    // Give time for click events to register before hiding dropdown
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onFocus() {
    this.showDropdown = true;
  }

  toggleCustomValue(event: any) {
    this.isCustomValueChecked = event.target.checked;
    if (this.isCustomValueChecked && this.currentInputValue) {
      // Only set custom value if checkbox is checked
      this.formControl?.setValue(this.currentInputValue);
    } else {
      // Clear form value if unchecking
      this.clearFormValue();
    }
    this.showDropdown = true; // Keep dropdown open after toggling
  }

  onInputChangeWithCustom(event: any) {
    this.onInputChange(event);
    // Ensure form value is cleared when typing
    if (!this.isCustomValueChecked) {
      this.clearFormValue();
    }
  }
}
