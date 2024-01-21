import validator from 'validator';
import { NumberValidator } from '@infra/http/validations/interfaces/NumberValidator';

export class NumberValidatorAdapter implements NumberValidator {
  isValid(number: any): boolean {
    return validator.isNumeric(String(number));
  }
}
