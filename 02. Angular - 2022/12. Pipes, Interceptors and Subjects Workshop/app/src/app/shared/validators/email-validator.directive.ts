import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { customEmailValidator } from './email-validator';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements OnChanges, Validator {


  @Input() appEmailValidator: string[] = [];

  validator: ValidatorFn = ()=> null;

  constructor() {}


  ngOnChanges(changes: SimpleChanges): void {

    const appEmailChange = changes['appEmailValidator']
    if (appEmailChange) {
      this.validator = customEmailValidator(appEmailChange.currentValue);
      // console.log('From >>> EmailValidatorDirective <<<', appEmailChange);
    }
    
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control)
  }
}
