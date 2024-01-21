import { InvalidParamError } from '../errors/InvalidParamError';
import { Validation } from '../interfaces/Validation';
import { CpfValidator } from './interfaces/CpfValidator';

export class CpfValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator,
  ) {}

  validate(input): Error | null {
    if (input[this.fieldName]) {
      const isValid = this.cpfValidator.isValid(input[this.fieldName]);
      const ensureCpf = this.isValid(input[this.fieldName]);
      if (!isValid) {
        return new InvalidParamError(this.fieldName);
      }
      if (!ensureCpf) {
        return new InvalidParamError(ensureCpf.message);
      }
      return null;
    }
  }

  isValid(cpf) {
    if (!cpf) {
      return null;
    }

    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) {
      return Error('CPF deve conter 11 dígitos');
    }

    if (/^(\d)\1+$/.test(cleanedCpf)) {
      return Error('CPF inválido');
    }

    const cpfArray = cleanedCpf.split('').map(Number);
    const [a, b, c, d, e, f, g, h, i] = cpfArray;

    const checker1 = (a * 10 + b * 9 + c * 8 + d * 7 + e * 6 + f * 5 + g * 4 + h * 3 + i * 2) % 11;
    const checker2 = (a * 11 + b * 10 + c * 9 + d * 8 + e * 7 + f * 6 + g * 5 + h * 4 + i * 3) % 11;

    if (checker1 % 10 !== cpfArray[9] || checker2 % 10 !== cpfArray[10]) {
      return Error('CPF inválido');
    }

    return null;
  }
}
