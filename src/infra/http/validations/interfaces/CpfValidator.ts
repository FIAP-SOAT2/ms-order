export interface CpfValidator {
  isValid: (cpf: string) => null | Error;
}
