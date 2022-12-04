import { ValidatorFn } from '@angular/forms';

export function customEmailValidator(domains: string[]): ValidatorFn {
  // const domainString = domains.join('|');
  // const regex = new RegExp(`^[^@]{3,}@abv\.(${domainString})$`);
  const regex = new RegExp('(?<!\S)[A-Za-z0-9]+(\.|-|_)?[A-Za-z0-9]+@[A-Z-a-z]+\.[A-Z-a-z]+(\.[A-Z-a-z]*\.?)?');
  return (control) => {
    return control.value === '' || regex.test(control.value)
      ? null
      : { customEmailValidator: true , message: 'Invalid email address!'};
  };
}
