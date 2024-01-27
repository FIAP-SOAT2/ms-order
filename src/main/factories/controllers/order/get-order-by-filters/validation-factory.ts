import { ValidationComposite } from '../../../../../infra/http/validations/ValidationComposite';
import { RequiredFieldValidation } from '../../../../../infra/http/validations/RequiredFieldValidation';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { StatusEnum } from '../../../../../domain/enum/OrderEnum';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';

export const makeGetOrderByFiltersValidation = (): ValidationComposite => {
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite([new RequiredFieldValidation('status'), new EnumFieldValidation('status', enumValidator, StatusEnum)], 'query');
};
