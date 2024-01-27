import { ForbiddenError } from './ForbiddenError';

describe('ForbiddenError', () => {
  it('should create an instance of ForbiddenError', () => {
    const forbiddenError = new ForbiddenError();
    expect(forbiddenError).toBeInstanceOf(ForbiddenError);
  });

  it('should have the correct name', () => {
    const forbiddenError = new ForbiddenError();
    expect(forbiddenError.name).toEqual('ForbiddenError');
  });

  it('should have the correct error message', () => {
    const forbiddenError = new ForbiddenError();
    expect(forbiddenError.message).toEqual('Forbidden');
  });

  it('should have the correct stack trace', () => {
    const forbiddenError = new ForbiddenError();
    expect(forbiddenError.stack).toBeDefined();
  });
});
