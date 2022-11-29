import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppMaxCountDirective,
      multi: true
    }
  ]
})
export class AppMaxCountDirective implements Validator {

  @Input() appMaxCount: number | undefined

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    
    
    if (
       this.appMaxCount === undefined
       || control.value?.length === 0
       || control.value?.length <= this.appMaxCount
       )
        { return null; }
        
        console.log('>>> control.value <<<',control.value);
        console.log('>>> control <<<',control);
          
    return {
      appMaxCount: this.appMaxCount
    }
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}
