import { Validation } from '../../../infra/http/interfaces/Validation';
import { InvalidParamError } from '../../../infra/http/errors/InvalidParamError';
import { EnumValidator } from '@infra/http/validations/interfaces/EnumValidator';

export class EnumFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly enumValidator: EnumValidator,
    private readonly typeEnum: any,
  ) {}

  validate(input: any): Error | null {
    if (input[this.fieldName]) {
      const isValid = this.enumValidator.isValid(input[this.fieldName], this.typeEnum);
      if (!isValid) {
        return new InvalidParamError(this.fieldName);
      }
      return null;
    }
  }
}
