export class EmployeeNotFoundError extends Error {
  constructor(id: number) {
    super(`Employee with ID ${id} not found`);
    this.name = "EmployeeNotFoundError";
  }
}

export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`Email ${email} already exists`);
    this.name = "DuplicateEmailError";
  }
}

export class DuplicateIdError extends Error {
  constructor(id: number) {
    super(`Employee ID ${id} already exists`);
    this.name = "DuplicateIdError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}   