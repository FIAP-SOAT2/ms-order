import { ValidationComposite } from '../../../../../infra/http/validations/ValidationComposite';
import { NumberFieldValidation } from '../../../../../infra/http/validations/NumberFieldValidation';
import { NumberValidatorAdapter } from '../../../../../infra/http/validators/NumberValidatorAdapter';
import { StringValidatorAdapter } from '../../../../../infra/http/validators/StringValidatorAdapter';
import { EnumValidatorAdapter } from '../../../../../infra/http/validators/EnumValidatorAdapter';
import { EnumFieldValidation } from '../../../../../infra/http/validations/EnumFieldValidation';
import { PaymentEnum, StatusEnum } from '../../../../../domain/enum/OrderEnum';
import { StringFieldValidation } from '../../../../../infra/http/validations/StringFieldValidation';

export const makeUpdateOrderValidation = (): ValidationComposite => {
  const numberValidator = new NumberValidatorAdapter();
  const stringValidator = new StringValidatorAdapter();
  const enumValidator = new EnumValidatorAdapter();

  return new ValidationComposite([new NumberFieldValidation('userId', numberValidator), new EnumFieldValidation('status', enumValidator, StatusEnum), new EnumFieldValidation('payment', enumValidator, PaymentEnum), new StringFieldValidation('note', stringValidator)], 'body');
};
