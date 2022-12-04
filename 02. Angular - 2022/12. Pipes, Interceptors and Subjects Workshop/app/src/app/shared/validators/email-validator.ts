import { ValidatorFn } from '@angular/forms';

export function customEmailValidator(domains: string[]): ValidatorFn {
  const domainString = domains.join('|');
  const regex = new RegExp(`^[^@]{6,}@gmail\.(${domainString})$`);
  return (control) => {
    return control.value === '' || regex.test(control.value)
      ? null
      : { customEmailValidator: true , message: 'Invalid email address!'};
  };
}
