import { Injectable } from '@angular/core';
import { ControlBase } from './models/control-base';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor() { }
  // suppose this is the api response.
  getControls() {
    // const controls: ControlBase<string>[] = 
    return of( [
      {
        key: 'country',
        label: 'Select Country',
        options: [
          {key: 'usa', value: 'United States'},
          {key: 'uk', value: 'United Kingdom'},
          {key: 'can', value: 'Canada'},
          {key: 'aus', value: 'Australia'},
          {key: 'ger', value: 'Germany'},
          {key: 'fra', value: 'France'},
          {key: 'ind', value: 'India'}
        ],
        order: 1,
        controlType: 'autocomplete',
      },
      { 
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          {key: 'cat', value: 'Cat'},
          {key: 'dog', value: 'Dog'},
          {key: 'horse', value: 'Horse'},
          {key: 'capybara', value: 'Capybara'},
        ],
        order: 3,
        controlType: 'dropdown',
      },
      {
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: 'text',
      },
      {
        key: 'emailAddress',
        label: 'Email',
        controlType: 'textbox', 
        type: 'email',
        order: 2,
      }
    ]);
    // return controls.sort((a, b) => a.order - b.order);
    // return of(questions.sort((a, b) => a.order - b.order));
  }
}
