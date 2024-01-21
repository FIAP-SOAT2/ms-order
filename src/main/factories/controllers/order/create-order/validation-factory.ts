import { ValidationComposite } from '../../../../../infra/http/validations/ValidationComposite';
import { NumberFieldValidation } from '../../../../../infra/http/validations/NumberFieldValidation';
import { NumberValidatorAdapter } from '../../../../../infra/http/validators/NumberValidatorAdapter';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { PaymentEnum, StatusEnum } from '../../../../../domain/enum/OrderEnum';
import { RequiredFieldValidation } from '../../../../../infra/http/validations/RequiredFieldValidation';

export const makeCreateOrderValidation = (): ValidationComposite => {
  const numberValidator = new NumberValidatorAdapter();
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite(
    [
      new RequiredFieldValidation('userId'),
      new NumberFieldValidation('userId', numberValidator),
      new RequiredFieldValidation('payment'),
      new EnumFieldValidation('payment', enumValidator, PaymentEnum),
      new RequiredFieldValidation('orderProducts'),
      new RequiredFieldValidation('note'),
      new EnumFieldValidation('status', enumValidator, StatusEnum),
    ],
    'body',
  );
};
