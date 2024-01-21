import { InvalidParamError } from '../errors/InvalidParamError';
import { Validation } from '../interfaces/Validation';
import { EmailValidator } from './interfaces/EmailValidator';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error | null {
    if (input[this.fieldName]) {
      const isValid = this.emailValidator.isValid(input[this.fieldName]);
      if (!isValid) {
        return new InvalidParamError(this.fieldName);
      }
      return null;
    }
  }
}
