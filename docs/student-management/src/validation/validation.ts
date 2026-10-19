import { Student, Grade } from "../models/types";

// simple function to check email
export function checkEmail(email: string): boolean {
  // very basic email check
  return email.includes("@") && email.includes(".");
}

export function validateStudent(s: Student) {
  if (!s.id) {
    throw new Error("ID is required");
  }
  if (s.name.length < 2) {
    throw new Error("Name should be min 2 chars");
  }
  if (!checkEmail(s.email)) {
    throw new Error("Email is not valid: " + s.email);
  }
  if (s.age < 16 || s.age > 60) {
    throw new Error("Age must be between 16 to 60");
  }
  if (s.marks < 0 || s.marks > 100) {
    throw new Error("Marks must be 0 to 100");
  }
}

// grade calculation
export function calculateGrade(marks: number): Grade {
  if (marks >= 90 && marks <= 100) {
    return "A";
  } else if (marks >= 75) {
    return "B";
  } else if (marks >= 60) {
    return "C";
  } else if (marks >= 40) {
    return "D";
  } else {
    return "F";
  }
}