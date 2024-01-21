import { Validation } from '../../../infra/http/interfaces/Validation';
import { InvalidParamError } from '../../../infra/http/errors/InvalidParamError';
import { StringValidator } from '@infra/http/validations/interfaces/StringValidator';

export class StringFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly stringValidator: StringValidator,
  ) {}

  validate(input: any): Error | null {
    if (input[this.fieldName]) {
      const isValid = this.stringValidator.isValid(input[this.fieldName]);
      if (!isValid) {
        return new InvalidParamError(this.fieldName);
      }
      return null;
    }
  }
}
