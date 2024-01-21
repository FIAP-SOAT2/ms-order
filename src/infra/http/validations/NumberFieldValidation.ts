import { Validation } from '../../../infra/http/interfaces/Validation';
import { InvalidParamError } from '../../../infra/http/errors/InvalidParamError';
import { NumberValidator } from '../../../infra/http/validations/interfaces/NumberValidator';

export class NumberFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly numberValidator: NumberValidator,
  ) {}

  validate(input: any): Error | null {
    if (input[this.fieldName]) {
      const isValid = this.numberValidator.isValid(input[this.fieldName]);
      if (!isValid) {
        return new InvalidParamError(this.fieldName);
      }
      return null;
    }
  }
}
