import validator from 'validator';
import { StringValidator } from '@infra/http/validations/interfaces/StringValidator';

export class StringValidatorAdapter implements StringValidator {
  isValid(string: any): boolean {
    return validator.isAlpha(String(string));
  }
}
