import { describe, it, expect } from 'vitest';
import { validateEmail, formValidations } from '@/utils/validations';

describe('validateEmail', () => {
  it('should return true for valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
  });

  it('should return false for emails with consecutive dots', () => {
    expect(validateEmail('email@domain..com')).toBe(false);
    expect(validateEmail('email@domain...com')).toBe(false);
  });
});

describe('formValidations', () => {
  it('should return errors for empty form', () => {
    const errors = formValidations({});
    expect(errors).toHaveProperty('firstName');
    expect(errors).toHaveProperty('lastName');
    expect(errors).toHaveProperty('email');
    expect(errors).toHaveProperty('message');
  });

  it('should return empty object for valid form', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      message: 'Test message',
    };
    const errors = formValidations(formData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should return email error for invalid email', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      message: 'Test message',
    };
    const errors = formValidations(formData);
    expect(errors).toHaveProperty('email');
  });
});
