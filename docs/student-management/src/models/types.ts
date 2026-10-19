// StudentId type alias
export type StudentId = string;

// Grade - literal types
export type Grade = "A" | "B" | "C" | "D" | "F";

// Course - union type
export type Course = "TypeScript" | "JavaScript" | "Python";

// Enum for pass/fail
export enum Status {
  PASS = "PASS",
  FAIL = "FAIL"
}

// Student Interface
export interface Student {
  id: StudentId;
  name: string;
  email: string;
  age: number;
  course: Course;
  marks: number;
  phone?: string; // optional property
}