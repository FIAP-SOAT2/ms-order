import validator from 'validator';
import { EnumValidator } from '@infra/http/validations/interfaces/EnumValidator';

export class EnumValidatorAdapter implements EnumValidator {
  isValid(dataEnum: any, typeEnum: any): boolean {
    const valide = validator.isAlpha(dataEnum) && Object.values(typeEnum).includes(dataEnum);
    return valide;
  }
}
