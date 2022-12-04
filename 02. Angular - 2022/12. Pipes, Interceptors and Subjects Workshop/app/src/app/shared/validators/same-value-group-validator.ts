import { FormGroup, ValidatorFn } from "@angular/forms";

export function sameValueGroupValidator(control1: string , control2: string): ValidatorFn {
    return(control) =>{
      const group = control as FormGroup;
      const ctrl1 = group.get(control1);
      const ctrl2 = group.get(control2);
      
      // console.log('From >>> same-value-group-validator <<<',ctrl1?.value , ctrl2?.value);
      
     return ctrl1?.value === ctrl2?.value
      ? null
      : {sameValueGroupValidator: true, message: 'Passwords don\'t match!'}
    };    
}