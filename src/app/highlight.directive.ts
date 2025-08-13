import { Directive, ElementRef, Input, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private element : ElementRef) { }

  @Input ('appHighlight') color?:string; // if user will not pass default will be blue;

  ngOnInit() {
    if(!this.color)
    {
      this.color='blue'
    }
    this.element.nativeElement.style.color= this.color;
  }

}
